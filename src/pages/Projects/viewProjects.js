import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faQuran, faTrash, faAngleLeft, faAngleRight, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Col, Row, Form, Card, Button, Table, Container, InputGroup, Modal, Tab, Nav } from '@themesberg/react-bootstrap';
import { ToastContainer, toast } from 'react-toastify/dist/react-toastify.cjs.development';
import 'react-toastify/dist/ReactToastify.css';
import { baseurl, ProjectStatus } from "../../api";
import { useSelector, useDispatch } from 'react-redux';
import { triggerFunction, getPredefinedUrl } from '../../components/SignedUrl';
import { useHistory } from 'react-router-dom';
import { fetchProjects, importquestions, addfiles,deletefiles,OrderUpdate} from "../../features/projectslice";
import Multiselect from "../../components/Multiselect";
import { check,checkloginvailidity } from '../../checkloggedin.js';
import { useParams } from 'react-router-dom';
import { getquestions } from '../../features/questionslice.js'

export default () => {

  // common for all
  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState('');


  const [filename,setfilename]=useState('')
  const [createdate,setCreateDate]=useState('')

  const [developer, setDeveloper] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [area, setArea] = useState(0)
  const [company, setCompany] = useState('')
  const [pstage, setpstage] = useState('')
  let [filearr,setfilearr]=useState('')

  const [imageUrl, setImageUrl] = useState(null);
  const [isActive, setIsActive] = useState('false');
  let [companyname, setCompanyName] = useState("")
  let [feactive, setfeactive] = useState("")
  const [users, setUsers] = useState([])
  const [selectedusers, setSelectedusers] = useState([])

  const [currentPage, setCurrentPage] = useState(0);
  const [clickedImage, setClickedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("form");

  const itemsPerPage = 5; //Define itemsPerPage

  // State variables for edit modal
  const [editProjectId, setEditProjectId] = useState('');
  const [editProjectName, setEditProjectName] = useState('');
  const [editProjectType, setEditProjectType] = useState('');
  const [editProjectStage, setEditProjectStage] = useState('');
  const [editProjectStatus, setEditProjectStatus] = useState('')
  const [editDeveloper, setEditDeveloper] = useState('');
  const [editCompany, setEditCompany] = useState('');
  const [editProjectDescription, setEditProjectDescription] = useState('');
  const [editArea, setEditArea] = useState(null);
  const [editimageUrl, setEditImageUrl] = useState(null);
  const [editselectedusers, setEditSelectedusers] = useState([])
  const [addimage, setAddImage] = useState(false)
  
  let [files,setfiles]=useState([])

  const [ptype, setPtype] = useState('');
  const [arr, setArr] = useState([]);
  const [pstatus, setPstatus] = useState('')

  ////mine
  let [key, setKey] = useState("");
  let [url, setUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
let [selectedFiles,setSelectedFiles]=useState([])
  const [fileExtension, setFileExtension] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);

  const [folderName, setFolderName] = useState(''); // State for folder name
  const [folders, setFolders] = useState([]); // State for storing folder names
  


  // For table
  let [regu, setregu] = useState(null)
  let { id } = useParams();


  //For FAQS
  let [question, setquestions] = useState([])
  let [editmode, seteditmode] = useState(false)
  let [selectedquestion, setselectedquestion] = useState([])
  let [selectedquestions, setselectedquestions] = useState([])
  let [existingquestion, setexistingquestion] = useState([])
  let [thisproject, setthisproject] = useState(null)
  let [editorder,seteditorder]=useState(false)
  ///for disabled

  let [isDisabled, setIsDisabled] = useState(false)

  let history = useHistory();




  ////////////////////////////////////////////



  //For Type
  useEffect(() => {
    ////console.log(check())
    //console.log(id)

    // Set the value of arr using some asynchronous operation or any other logic
    dispatch(getquestions()).then((res) => {
      // let temp=[]
      // temp=res.map((val)=>val.question)
      setquestions(res)
      console.log(res)
    })
    const fetchOptions = async () => {
      try {
        // Example asynchronous operation fetching data
        // const response = await fetch('your/api/endpoint');
        // const data = await response.json();
        // // Assuming the data received is an array of options
        const arr = ["Reg 30B", "33(1)", ...Array.from({ length: 31 }, (_, i) => `33(${i + 1})`)];
        setArr(arr);


      } catch (error) {
        //console.error('Error fetching options:', error);
      }
    };

    // Call the fetchOptions function to set the value of arr
    fetchOptions();
  }, [question.length]);






  const handleDelete = (id) => {
    ////////////////////console.log(id)
    const token = localStorage.getItem('token');

    axios.delete(`${baseurl}/project/${id}`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(response => {
        ////////////////////console.log('Record deleted successfully:', response.data);
        setData(prevData => prevData.filter(item => item.id !== id));
        toast.success('Record deleted successfully'); // Display success toast
        window.location.reload()
      })
      .catch(error => {
        //console.error('Error deleting record:', error);
        toast.error('Failed to delete record'); // Display error toast
      });
  }
  // Calculate the index of the first item to display based on the current page and items per page


  const handleprojectFetch = async (e) => {
    //////////////////////console.log(companyname)
    ////console.log(typeof (isDisabled))

    dispatch(fetchProjects({
      company: companyname ? companyname : null,
      status: feactive ? feactive : null,
      isDisabled: isDisabled == 'true' ? true : false,
      type: regu ? regu : null,
    })).then((resp) => {
      setData(resp)
      ////console.log(resp)
    }).catch(error => {

    })
  }


  useEffect(() => {
    //get Projects
    ////console.log(isDisabled)
    dispatch(fetchProjects({
      company: companyname ? companyname : null,
      status: feactive ? feactive : null,
      isDisabled: isDisabled == 'true' ? true : false,
      id: id
    })).then((resp) => {
      // setData(resp)
      // let currproject = resp.find((value) => value._id == id)
      // //console.log(resp.find((value) => value._id == id))
      //console.log(resp[0])
      setthisproject(resp[0])
      thisproject = resp[0]
      //console.log(thisproject)
      setexistingquestion(resp[0].questions)
      // files
      console.log(thisproject)
      files=thisproject.files
      setfiles(thisproject.files)
    }).catch(error => {

    })
    // get Users
    axios.get(`${baseurl}/user/`)
      .then(response => {
        ////////////////////console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        ////////////////////console.log(error);
      });

  }, []);



  const handleimport = (e) => {
    dispatch(importquestions(id)).then((res) => {
      dispatch(fetchProjects({
        id
      })).then((resp) => {
        setthisproject(resp[0])
        thisproject = resp[0]
        //console.log(thisproject)
        setexistingquestion(resp[0].questions)
      })
    })
  }








  const handleEditSubmit = async (e) => {
    // s3
    e.preventDefault()
    // //console.log("here")
    // //console.log(selectedquestions)
    //console.log(existingquestion)
    // let newquestions = []
    // for (let i = 0; i < existingquestion.length; i++) {
    //   newquestions.push(existingquestion[i])
    // }


    // for (let i = 0; i < selectedquestions.length; i++) {
    //   let flag = true
    //   for (let j = 0; j < existingquestion.length; j++) {
    //     if (existingquestion[i].question == selectedquestions[i]) {
    //       flag = false
    //       break
    //     }
    //   }
    //   //console.log(flag)
    //   if (flag == true) {
    //     newquestions.push({ question: selectedquestions[i], answer: "" })
    //     //console.log("pushing")
    //   }
    // }
    // //console.log(newquestions)

    const token = localStorage.getItem('token');

    const editData = {
      questions: existingquestion
    };
    ////////////////////console.log(clickedImage)


    try {
      ////////////////////console.log(editselectedusers)
      const response = await axios.put(`${baseurl}/project/addquestions/${id}`, editData, {
        headers: {
          Authorization: `${token}`
        }
      });
      // ////////////////////console.log('Updated data:', response.data);
      toast.success('Data updated successfully');

      // Refresh
      dispatch(importquestions(id)).then((res) => {
        dispatch(fetchProjects({
          id
        })).then((resp) => {
          setthisproject(resp[0])
          thisproject = resp[0]
          //console.log(thisproject)
          setexistingquestion(resp[0].questions)
        })
      })

      setShowModal(false);
      // window.location.reload()
      // setData(prevData => prevData.map(item => item._id === editItemId ? { ...item, ...editData } : item));
    } catch (error) {
      //console.error('Error updating record:', error);
      toast.error('Failed to update record');
    }
  }

  // redirect to projects page
  const handleRedirect = (id) => {
    history.push(`/projects/${id}`)
  }


  let startIndex = currentPage * itemsPerPage;
  let endIndex = (currentPage + 1) * itemsPerPage;
  // let currentItems = data.slice(startIndex, endIndex);
  const findprojectname = (project) => {
    ////////////////console.log(project,"Find project name")
    // ////////////////////console.log(pnamearr)
    let str = ""
    for (let i = 0; i < data.length; i++) {
      // ////////////////console.log(pnamearr[i])
      if (data[i]._id == project) {
        str = data[i].name
        break
      }

    }
    return str
  }

  const handleeditmode = async (e) => {
    try {
      const isValid = await checkloginvailidity();
      //console.log(isValid)
      if (isValid) {
        seteditmode(!editmode);
      } else {
        toast.error("Not Verified Account");
      }
    } catch (error) {
      console.error("Error checking validity:", error);
      toast.error("An error occurred while checking validity");
    }
  };


  const findquestion = (id) => {

    // for(let i=0;i<question.length;i++){
    //   //console.log(question[i]._id)
    //   if(question[i]._id==id){
    //     //console.log(question[i]._id)
    //   }
    // }
    if (id != "" && question.length!=0) {
      let que = (question.find((value) => (value._id) == id)).question
      // //console.log(que, id)
      return que
    }
  }
  const handlesubmit = (e) => {
    e.preventDefault()
    //console.log("hello")

  }
  const handleAnswerChange = (index, newValue) => {
    // Create a copy of existingquestion array
    const updatedQuestions = [...existingquestion];
    // Update the answer property for the specified index
    updatedQuestions[index] = { ...updatedQuestions[index], answer: newValue };
    // Update the state with the new array
    setexistingquestion(updatedQuestions);
  };

  ////////////////////////////// For Addition and Viewing Files
  const handleFileChange = async (event) => {
    const files = event.target.files;
    const newSelectedFiles = [];
    let newarr=[]
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file) {
        // Read file extension
        const fileExtension = file.name;
        setSelectedFile(file);
        setFileExtension(fileExtension);
        
        const arr1 = await triggerFunction(fileExtension, thisproject.name);
        // key=arr1[0]
        // url=arr1[1]
        // setKey(arr1[0])
        // setUrl(arr1[1])
        newarr.push([arr1[0],arr1[1],file])

      }
      console.log(newarr)
      setSelectedFiles([...selectedFiles, ...newarr]);
    }
  };

  const fileadd = async (bool) => {
    console.log(bool);
    if(bool==""){
      setfiles(thisproject.files);
    }
    else{
    // Assuming `thisproject.files` is an array of file objects
    let files = thisproject.files;
    console.log(files)
    // Filter files based on the `bool` parameter
    let temp=[]
    for(let i=0;i<files.length;i++){
      // console.log(files[i].isDisabled,bool)
      if((files[i].isDisabled).toString()==bool.toString()){
        temp.push(files[i])
      }
    }
   
    console.log(temp)
    // Update the state or do something with the filtered files
    setfiles(temp);
    }
  
  };
  const handleeditorder=(id,value)=>{
    console.log(id,value)
    let updatedFiles = [...files];
    for (let i = 0; i < updatedFiles.length; i++) {
      if (updatedFiles[i]._id === id) {
        console.log("found")
        updatedFiles[i] = { ...updatedFiles[i], order: Number(value) };
        break; // Exit the loop once the file is found and updated
      }
    }
    files=updatedFiles
    setfiles(updatedFiles)
    console.log(files)
  }

  
  const updateorder=()=>{
    console.log(id)
  }

  return (
    <>
      <ToastContainer />
      <Card border="light" className="shadow-sm">

      </Card>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Projects</Breadcrumb.Item>
            <Breadcrumb.Item active>Create Projects</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <h1>Project:{thisproject ? (<h1>{thisproject.name}</h1>) : (<p>Loading</p>)}</h1>
      <Tab.Container defaultActiveKey="profile">
        <Nav fill variant="pills" className="flex-column flex-sm-row">
          <Nav.Item>
            <Nav.Link eventKey="home" className="mb-sm-3 mb-md-0">
              FAQS
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="profile" className="mb-sm-3 mb-md-0">
              Files
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Add" className="mb-sm-3 mb-md-0">
              Add Files
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="home" className="py-4">
            <section>
              <Container>
                <Row>
                  {/* Searching */}

                  <Col className="mx-auto">
                    <Card border="light" className="shadow-sm">
                      {/* If logged in only then visible */}
                      <Card.Header>
                        <Row className="align-items-center">
                          <Col className="text-start">
                            <Button variant="secondary" size="sm" onClick={(e) => handleeditmode(e)}>Edit</Button>
                            {editmode ? (<>
                              <Button variant="secondary" size="sm" onClick={(e) => handleimport(e)}>Import</Button></>) : (null)}
                          </Col>

                          <Col>
                            {/* {editmode ? (<>  <Form.Group className="mb-3" controlId="editDescription">
                              <Form.Label>Add Questions</Form.Label>


                              <Form.Select required value={selectedquestion} onChange={(e) => {
                                setselectedquestion(e.target.value)
                                handlechange(e.target.value)
                              }}>
                                <option value="">Select Option</option>
                                {question.map((option, index) => (
                                  <option key={index} value={option._id}>{option.question}</option>
                                ))}

                              </Form.Select>
                            </Form.Group>

                            </>) : (null)} */}

                          </Col>
                          {/* <h3>{index + 1}.{findquestion(option.question)}</h3> */}
                        </Row>
                      </Card.Header>
                      <Card.Header>
                        <Row className="align-items-center">
                          {existingquestion.map((option, index) => {
                            return (<>
                            {question.length==0?(<p>Loading</p>):(<p>{index + 1}.{findquestion(option.question)}</p>)}   
                              {editmode ? (
                                  <>
                              <Form.Control type="textarea" value={option.answer} onChange={(e) => handleAnswerChange(index, e.target.value)} />
                                <Form.Select required value={""} onChange={(e) => handleAnswerChange(index, e.target.value)}>
                                  {/* Mapping through the arr array to generate options */}
                                  {(option.prevanswer).map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                  ))}
                              </Form.Select>
                              </>
                               
                              ) : (<p>{option.answer}</p>)}

                            </>

                            )
                          })}
                          <Col className="text-end">
                            <Button variant="secondary" size="sm" onClick={(e) => handleEditSubmit(e)}>Submit</Button>
                          </Col>
                        </Row>
                      </Card.Header>


                     
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
          </Tab.Pane>
          {/* Files */}
          <Tab.Pane eventKey="profile" className="py-4">
        

          <Col xs={12} md={4}>
                    {check()[1] == 'john_doe' ? (<Form.Group id="taskstatus" className="mb-4">
                      <Form.Label>isDisabled</Form.Label>
                      <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Select value={isDisabled} onChange={(e) => {
                          isDisabled = e.target.value
                          setIsDisabled(e.target.value);
                          fileadd(e.target.value)
                        }}>
                          <option value="">Select Option</option>
                          <option value={true}>True</option>
                          <option value={false}>False</option>
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>) : (<p>{check()[1]}</p>)}
            </Col>
            <Col className="text-start">
                            <Button variant="secondary" size="sm" onClick={(e) => {
                              seteditorder(!editorder)
                            }}>Edit</Button>
                              <Button variant="secondary" size="sm" onClick={(e) => {dispatch(OrderUpdate(id,files))}}>Update order</Button>
                          </Col>
          <Table responsive className="align-items-center table-flush">
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Order</th>
                            <th scope="col">File</th>
                            <th scope="col">Link</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {data.slice(startIndex, endIndex).map((row, index) => ( */}
                          {files.map((row, index) => (
                            <tr key={index}>
                              {/* <td style={{f maxWidth: "100px", cursor: "pointer" }} onClick={()=>handleRedirect(row._id)}>{startIndex + index + 1}</td> */}
                              <td style={{ maxWidth: "100px", cursor: "pointer" }} onClick={() => handleRedirect(id,files)}>
                              {editorder ? (<>
                                <Form.Control autoFocus required type="text" placeholder="Project Name" value={row.order} onChange={(e) => handleeditorder(row._id,e.target.value)} />
                                </>) : (<p>{row.order}</p>)}
                                </td>
                              <td style={{ maxWidth: "100px", cursor: "pointer", whiteSpace: "pre-wrap" }} onClick={() => handleRedirect(row._id)}>{row.filename}</td>
                              <td colSpan="1"  ><pre style={{ whiteSpace: "pre-wrap" }}><a href={row.current} download style={{ textDecoration: "underline", color: "blue" }}>Link</a></pre></td>
                              
                              <td>
                                <Button variant="info" size="sm" onClick={() => handleEditModal(row)}>
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => {
                                  dispatch(deletefiles(id,row._id))
                                }}>
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        {/* <tfoot>
                          <tr>
                            <td colSpan="8">
                              <div className="d-flex justify-content-center mt-3">
                                <Button
                                  variant="light"
                                  disabled={currentPage === 0}
                                  onClick={() => handlePageChange(currentPage - 1)}
                                  className="me-2"
                                >
                                  <FontAwesomeIcon icon={faAngleLeft} />
                                </Button>
                                <Button
                                  variant="light"
                                  disabled={currentItems.length < itemsPerPage}
                                  onClick={() => handlePageChange(currentPage + 1)}
                                  className="ms-2"
                                >
                                  <FontAwesomeIcon icon={faAngleRight} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tfoot> */}
                      </Table>
          </Tab.Pane>
          {/* Add Files */}
          <Tab.Pane eventKey="Add" className="py-4">
            <section className="d-flex align-items-center my-2 mt-lg-3 mb-lg-5">
              <Container>
                <form onSubmit={(e)=>{
                  dispatch(addfiles({
                    id:id,
                    date:createdate?createdate:undefined,
                    filename:filename,
                    file:selectedFiles?selectedFiles:undefined,
                    url:""
                  }))
                  }}>
                  <Row >
                  <Col xs={12} md={6}>
                      <Form.Group id="pname" className="mb-4">
                        <Form.Label>Creation Date</Form.Label>
                        <InputGroup>
                          <InputGroup.Text></InputGroup.Text>
                          <Form.Control autoFocus type="date" placeholder="Amount" value={createdate} onChange={(e) => setCreateDate(e.target.value)} />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group id="pName" className="mb-4">
                        <Form.Label>File Name</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Control autoFocus required type="text" placeholder="Project Name" value={filename} onChange={(e) => setfilename(e.target.value)} />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      {filename?( <Form.Group id="Project Image" className="mb-4">
                        <Form.Label>Invoice Image if Required</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Control
                            type="file"
                            onChange={handleFileChange}
                            placeholder="Upload Image"
                          />
                        </InputGroup>
                      </Form.Group>):(null)}
                    </Col>
                   
             

                    <Col className="d-flex justify-content-center"> {/* Centering the submit button */}
                      <Button variant="primary" type="submit" className="w-100 mt-3">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </form>
              </Container>
            </section>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      {/* <Modal show={showModal && !editMode} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>{data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={clickedImage} alt="Zoomed Image" style={{ maxWidth: "100%" }} onClick={() => setEditMode(true)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};




