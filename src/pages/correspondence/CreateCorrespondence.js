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
import { check } from '../../checkloggedin'
import Multiselect from "../../components/Multiselect";
import { fetchProjects } from "../../features/projectslice";
import { addcorrespondence, getcorrespondence } from "../../features/correspondenceSlice";

export default () => {

  const [imageUrl, setImageUrl] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [clickedImage, setClickedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const itemsPerPage = 5; // Define itemsPerPage

  // State variables for edit modal
  const [editProjectName, setEditProjectName] = useState('');
  const [editServiceDescription, setEditServiceDescription] = useState('');
  const [editIsActive, setEditIsActive] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  let [selectedFiles, setSelectedFiles] = useState([])

  const [ptype, setPtype] = useState('');
  const [arr, setArr] = useState([]);

  ////mine
  const [key, setKey] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileExtension, setFileExtension] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [folderName, setFolderName] = useState(''); // State for folder name
  const [folders, setFolders] = useState([]); // State for storing folder names
  const [url, setUrl] = useState('');
  const filepath = '../../index.js'

  let history = useHistory();

  const dispatch = useDispatch();
  // for this file only
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [pname, setPname] = useState('')
  const [pnamearr, setPnamearr] = useState([])
  const [tasksubject, setTaskSubject] = useState('')
  const [taskdescription, setTaskdescription] = useState('')
  const [assignedby, setassignedby] = useState('')
  const [selectedusers, setSelectedusers] = useState([])
  const [createdate, setCreateDate] = useState('')
  let [projectname, setprojectname] = useState("")

  const token = localStorage.getItem('token');


  // project filtering
  let [isActive, setIsActive] = useState(null);
  let [companyname, setCompanyName] = useState('')
  let [isActives, setIsActives] = useState(null)


  // Correspondence
  let [previous, setPrevious] = useState("")
  let [next, setNext] = useState("")
  let [correspondence, setCorrespondence] = useState([])
  let [stop, setStop] = useState(true)
  let [letterno,setletterno]=useState("")

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const newSelectedFiles = [];
    let newarr = []
    setStop(false)
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file) {
        // Read file extension
        const fileExtension = file.name;
        setSelectedFile(file);
        setFileExtension(fileExtension);

        const arr1 = await triggerFunction(fileExtension, projectname);
        // key=arr1[0]
        // url=arr1[1]
        // setKey(arr1[0])
        // setUrl(arr1[1])
        newarr.push([arr1[0], arr1[1], file])
      }
      setStop(true)
      console.log(newarr)
      setSelectedFiles([...selectedFiles, ...newarr]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault()
    // //////////////////console.log("hi")
    let body = {
      project: pname,
      subject: tasksubject,
      description: taskdescription,
      letterno:letterno,
      date: createdate,
      file: selectedFiles,
    }
    console.log(body)
    dispatch(addcorrespondence(body)).then(() => {

    }).catch(error => {
      console.log(error)
    })

  };


  ////////////////////////////////////////////

  const handleprojectFetch = async () => {
    //////////////////console.log(companyname)

    dispatch(fetchProjects({
      company: companyname ? companyname : null,
      status: isActive ? isActive : null
    })).then((resp) => {
      setPnamearr(resp)
      // //////console.log(resp)
    }).catch(error => {

    })

  }


  //For Fetching Users and Projects
  useEffect(() => {
    //////////////////console.log(check())
    dispatch(getcorrespondence()).then((resp) => {
      setCorrespondence(resp)
      console.log(resp)
      // //////console.log(resp)
    }).catch(error => {
      console.log(error)
    })




    dispatch(fetchProjects({
      company: companyname ? companyname : null,
      status: isActive ? isActive : null
    })).then((resp) => {
      setPnamearr(resp)
      // //////console.log(resp)
    }).catch(error => {

    })


    axios.get(`${baseurl}/user`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        //console.error(error);
      });
    handleprojectFetch()
  }, []);









  const handleImagesUpload = (event) => {
    const image = event.target.files[0];
    setImageUrl(image);
  }

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');

    axios.delete(`https://ab.execute-api.ap-south-1.amazonaws.com/production/api/services/${id}`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(response => {
        //////////////////console.log('Record deleted successfully:', response.data);
        setData(prevData => prevData.filter(item => item.id !== id));
        toast.success('Record deleted successfully'); // Display success toast
      })
      .catch(error => {
        //console.error('Error deleting record:', error);
        toast.error('Failed to delete record'); // Display error toast
      });
  }
  // Calculate the index of the first item to display based on the current page and items per page



  const findprojectname = (id) => {
    ////////////////console.log(id,pnamearr)
    for (let i = 0; i < pnamearr.length; i++) {
      if (pnamearr[i]._id === id) {
        projectname = pnamearr[i].name
        setprojectname(pnamearr[i].name)
        console.log(projectname)
        break
      }
    }
  }


  const handleImageClick = (image) => {
    setClickedImage(image);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setClickedImage(null);
  }
  const handleEditModal = (item) => {
    setEditItemId(item._id);
    setEditProjectName(item.ProjectName);
    setEditServiceDescription(item.serviceDescription);
    setEditIsActive(item.isActive);
    setClickedImage(item.imageUrl)
    setShowModal(true);
    setEditMode(true); // Set editMode to true when opening the edit modal
  }

  const handleEditSubmit = async () => {
    const token = localStorage.getItem('token');
    const editData = {
      ProjectName: editProjectName,
      serviceDescription: editServiceDescription,
      isActive: editIsActive
    };

    try {
      const response = await axios.put(`https://ab.execute-api.ap-south-1.amazonaws.com/production/api/services/${editItemId}`, editData, {
        headers: {
          Authorization: `${token}`
        }
      });
      //////////////////console.log('Updated data:', response.data);
      toast.success('Data updated successfully');
      setShowModal(false);
      setData(prevData => prevData.map(item => item._id === editItemId ? { ...item, ...editData } : item));
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
  let currentItems = data.slice(startIndex, endIndex);


  return (
    <>
      <ToastContainer />
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Service</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Tab.Container defaultActiveKey="home">
        <Nav fill variant="pills" className="flex-column flex-sm-row">
          <Nav.Item>
            <Nav.Link eventKey="home" className="mb-sm-3 mb-md-0">
              Create Correspondence
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="home" className="py-4">
            <section className="d-flex align-items-center my-2 mt-lg-3 mb-lg-5">
              <Container>
                <form onSubmit={(e) => handleUpload(e)}>
                  <Row >
                    <Col xs={12} md={6}>
                      <Form.Group id="pname" className="mb-4">
                        <Form.Label>Creation Date</Form.Label>
                        <InputGroup>
                          <InputGroup.Text></InputGroup.Text>
                          <Form.Control autoFocus required type="date" placeholder="Amount" value={createdate} onChange={(e) => setCreateDate(e.target.value)} />
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group id="pname" className="mb-4">
                        <Form.Label>Company Name</Form.Label>
                        <InputGroup>
                          <InputGroup.Text></InputGroup.Text>
                          <Form.Select value={companyname} onChange={(e) => {
                            companyname = e.target.value
                            setCompanyName(e.target.value)
                            handleprojectFetch()
                          }}>
                            <option value="">Select Option</option>
                            <option value="Neo">Neo Modern</option>
                            <option value="BZ">BZ Consultants</option>
                            <option value="PMC">PMC</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group id="taskstatus" className="mb-4">
                        <Form.Label>Project Status</Form.Label>
                        <InputGroup>
                          <InputGroup.Text></InputGroup.Text>
                          <Form.Select value={isActive} onChange={(e) => {
                            isActive = e.target.value
                            setIsActive(e.target.value)
                            handleprojectFetch()
                          }}>
                            <option value="">Select Option</option>
                            {/* Mapping through the arr array to generate options */}
                            {ProjectStatus.map((option, index) => (
                              <option key={index} value={option}>{option}</option>
                            ))}
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group id="pname" className="mb-4">
                        <Form.Label>Project name</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Select value={pname} onChange={(e) => {
                            setPname(e.target.value)
                            findprojectname(e.target.value)
                          }}>
                            <option value="">Select Option</option>
                            {/* Mapping through the arr array to generate options */}
                            {pnamearr.map((option, index) => (
                              <option key={index} value={option._id}>{option.name}</option>
                            ))}
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                      {/* Letter No */}
                    <Col xs={12} md={6}>
                      <Form.Group id="tasksubject" className="mb-4">
                        <Form.Label>Letter No</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Control autoFocus type="text" placeholder="Task Subject" value={letterno} onChange={(e) => setletterno(e.target.value)} />
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group id="tasksubject" className="mb-4">
                        <Form.Label>Subject</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Control autoFocus type="text" placeholder="Task Subject" value={tasksubject} onChange={(e) => setTaskSubject(e.target.value)} />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    
                    <Col xs={12} md={6}>
                      <Form.Group id="Taskdescription" className="mb-4">
                        <Form.Label>Description</Form.Label>
                        <InputGroup>
                          <textarea autoFocus rows="4" cols="60" type="textarea" placeholder="Task Description" value={taskdescription} onChange={(e) => setTaskdescription(e.target.value)} />
                        </InputGroup>
                      </Form.Group>
                    </Col>


                    {projectname?(<>
                      <Col xs={12} md={6}>
                      <Form.Group id="Project Image" className="mb-4">
                        <Form.Label>File if Required</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Control
                            type="file"
                            onChange={handleFileChange}
                            placeholder="Upload Image"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    
                    </>):(null)}

                  



                    {/* <Col xs={12} md={6}>
                      <Form.Group id="ptype" className="mb-4">
                        <Form.Label>Assign Task To</Form.Label>
                          {users?(<Multiselect 
                          selectedValues={selectedusers} 
                          setSelectedValues={setSelectedusers} 
                          options={users}/>):(
                            <p>loading</p>
                            )}
                      </Form.Group>
                    </Col> */}
                    {/* Previous */}
                    {/* <Col xs={12} md={6}>
                      <Form.Group id="ptype" className="mb-4">
                        <Form.Label>Previous</Form.Label>
                        <Form.Select  value={previous} onChange={(e) => setPrevious(e.target.value)}>
                          <option value="">Select Option</option>
                           {correspondence.map((option,index)=>(
                            <option value={option._id}>{option.subject}</option>
                           ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>  */}
                    {/* Next */}
                    {/* <Col xs={12} md={6}>
                      <Form.Group id="ptype" className="mb-4">
                        <Form.Label>Link to</Form.Label>
                        <Form.Select value={next} onChange={(e) => setNext(e.target.value)}>
                          <option value="">Select Option</option>
                          {correspondence.map((option, index) => (
                            <option value={option._id}>{option.subject}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col> */}


                    <Col className="d-flex justify-content-center">
                    {stop?(<Button variant="primary" type="submit" className="w-100 mt-3">
                        Submit
                      </Button>):(null)}

                    </Col>
                  </Row>
                </form>
              </Container>
            </section>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <Modal show={showModal && !editMode} onHide={handleCloseModal}>
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
      </Modal>
    </>
  );
};
