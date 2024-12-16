shubham

Bills

-Update the amount Paid
-Sorting on invoice_id
-Edit invoice toLocaleString
-edit bills add payment url(Done)
-Invoice Fetch according to projects and contacts(Done)
-Disable Bills(Done)
-When invoice change automatically all credit fields change(Done)


Tasks
Task when delete and Add 
-1 +1
but  one method for total 


Appointment letter where active projects




                    {isDatePickerOpen && (
                          <div
                            style={{
                              position: 'absolute',
                              zIndex: 999,
                              backgroundColor: 'white', // Ensure it's visible over the table
                              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional shadow for better visibility
                              padding: '10px', // Optional padding
                              borderRadius: '5px', // Optional rounded corners
                            }}
                          >
                            <DatePicker
                              selected={selectedDate}
                              onChange={(date) => {
                                setSelectedDate(date); // Update the selected date
                                setDatePickerOpen(false); // Close the date picker after selecting a date
                              }}
                              inline
                              dateFormat="yyyy/MM/dd"
                              onClickOutside={() => setDatePickerOpen(false)} // Close on outside click
                            />
                          </div>
                        )}
                        {/* <Table striped bordered hover> */}
                        <Table >
                          <thead>
                            <tr>

                              <th onClick={() => setDatePickerOpen(!isDatePickerOpen)} style={{ cursor: 'pointer' }}>Date</th>
                              <th>Project</th>
                              <th>Task Subject</th>
                              <th>Task Description</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredBuckets.length === 0 ? (
                              <tr>
                                <td >No data available</td>
                              </tr>
                            ) : (
                              filteredBuckets
                                .filter(bucket => bucket.user.username === username) // Filter by username from localStorage
                                .map(bucket => (
                                  bucket.tasks.length === 0 ? (
                                    <tr key={bucket._id}>
                                      {/* <td>{bucket._id}</td> */}
                                      {/* <td>{formatDate(bucket.date)}</td> */}
                                      {/* <td>{bucket.user.username}</td>  */}

                                    </tr>
                                  ) : (
                                    bucket.tasks.map(task => (
                                      <tr key={task._id}>
                                        {/* <td>{bucket._id}</td> */}

                                        <td colSpan={1} style={{ width: "30px" }}>{formatDate(bucket.date)}</td>
                                        <td scope="col">{findprojectname(task.projectid)}</td>
                                        <td scope="col">{task.taskSubject}</td>
                                        <td scope="col" style={{ whiteSpace: "pre-wrap", width: "30%" }}>{task.taskDescription}</td>
                                        <td>
                                          <Button variant="danger" className="me-2" onClick={() => handleDeleteTask(task._id)} >
                                            Delete
                                          </Button>
                                          <Button
                                            style={{ color: "grey" }}
                                            onClick={() => {
                                              handleComplete(task._id, task.taskCompleted)
                                              switchstatus(bucket, task._id)
                                              ////////console.log(task.taskCompleted)
                                            }}
                                          >
                                            {task.taskCompleted ? "Mark Incomplete" : "Mark Complete"}
                                          </Button>
                                        </td>
                                      </tr>
                                    ))
                                  )
                                ))
                            )}
                          </tbody>
                        </Table>
                      </>
                    );
                  })()}
                </Col>
              </Row>



               question.map((option, index) => {
                          let currentAnswer = existingquestion.find(data => data.question === option._id);
                          let tempfile;
                          // //console.log(option.type)
                          if (option.type == "Link") {
                            tempfile = currentAnswer ? findfile(currentAnswer.answer) : null;
                            // //console.log(tempfile)
                          }


                  <p style={{ border: "1px solid grey" }}>{index + 1}.{option.question}</p>
 option.type === "Text" ? (
                                      <pre style={{ whiteSpace: "pre-wrap" }}>{currentAnswer?.answer}</pre>
                                    ) : (
                                      <a
                                        href={tempfile?.current}
                                        download
                                        style={{ color: "blue", textDecoration: "underline" }}
                                      >
                                        {tempfile?.filename || "File not found"}
                                      </a>
                                    )
                                  )}


                                  ////////////


                                   const generateDocx = () => {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    let htmlContent = `
    <h1>Project Report</h1>
    `; // Initialize htmlContent variable
  
    question.forEach((option, index) => {
      const questionText = option.question || "Unknown Question";
      let currentAnswer = existingquestion.find(data => data.question === option._id);
      let tempfile;
      let flag=false
      if (/XL/i.test(questionText) && /Feasibility/i.test(questionText)) {
        flag=true // Skip this iteration if both words are found in the question text
      }
      // Handle "Text" type answer
      if (option.type === "Text") {
        htmlContent += `
          <p><strong>${index + 1}. ${questionText}</strong></p>
          <pre style="white-space: pre-wrap;">${currentAnswer?.answer || "NA"}</pre>
          <br>
        `;
      } 
      
      // Handle "Link" type answer
      else if (option.type === "Link") {
        tempfile = currentAnswer ? findfile(currentAnswer.answer) : null; // Find corresponding file if available
        htmlContent += `
          <p><strong>${index + 1}. ${questionText}</strong></p>
          <a style="color: blue; text-decoration: underline;" href="${flag==true?(null):(tempfile?.current || '#')}" download>
            ${flag==true?("NA"):(tempfile?.filename || "NA")}
          </a>
          <br>
        `;
      }
    });

    var html = preHtml+htmlContent+postHtml;


    var blob = new Blob(['\ufeff', html],{
        type: 'application/msword'
    });

    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html)

    let filename = 'document.doc';

    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        downloadLink.href = url;

        downloadLink.download = filename;

        downloadLink.click();
    }

    document.body.removeChild(downloadLink);

  };
  

    .watermark {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                opacity: 0.1;
                z-index: -1;
                pointer-events: none;
            }

            https://www.w3schools.com/cssref/css3_pr_background-size.php
             <img class="watermark" src="./a.jpg" width="100%" />




 .watermark {
                position: absolute;
                top: 50%; /* Adjusting positioning */
                left: 50%;
                transform: translate(-50%, -50%); /* Proper centering */
                opacity: 0.4;
                z-index: -1;
                pointer-events: none;
            }
             <img class="watermark" src="./a.jpg" width="130%" />



Example

<!DOCTYPE html>
<html>
<head>
<style>
#example1 {
  border: 2px solid black;
  padding: 25px;
  position: relative;
}

#example1 .background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(mountain.jpg);
  background-repeat: no-repeat;
  background-size: auto;
  opacity: 0.1; /* Set the opacity for the background image */
  z-index: -1; /* Ensure the image is behind the content */
}
</style>
</head>
<body>

<h2>background-size: auto with background image opacity:</h2>
<div id="example1">
  <div class="background-image"></div>
  <h2>Hello World</h2>
  <p>The background image has 50% opacity applied to it.</p>
</div>

</body>
</html>




 #example1 .background-image {
                position: absolute;
                top: 0;
                left:0 ;
                right: 200px;
                bottom: 0;
                background: url('./a.jpg');
                background-repeat:space;
                background-size: 100%;
                background-position: center 10000px;
                opacity: 0.1; /* Set the opacity for the background image */
                z-index: -1; /* Ensure the image is behind the content */
              }




              final


              let start = `  <html>
    <head>
        <style>
            .watermark {
                
                 top: 5%;
                transform: translate(-12%%, -30%); /* Proper centering */
                opacity: 0.4;
                z-index: -1;
                pointer-events: none;
            }
           #example1 {
                border: 2px solid black;
                padding: 25px;
                position: relative;
              }
              
        </style>
    </head>
    <body>
    <div id="example1">
            

            <h1>Project Report</h1>
            `
    let end = `
                 </div>
    </body>
    </html>
    `;



    let count=0
    question.forEach((option, index) => {
      const questionText = option.question || "Unknown Question";
      let currentAnswer = existingquestion.find(data => data.question === option._id);
      let tempfile;
      let flag = false;
      count++
      // if(count%10==0||count==0){
      //   console.log("here")
      //   htmlContent +=`<img class="watermark" src="./a.jpg" width="130%" />
      //     `
      // }
      console.log(count)
      if (/XL/i.test(questionText) && /Feasibility/i.test(questionText)) {
        flag = true; // Skip this iteration if both words are found in the question text
      }

      // Handle "Text" type answer
      // if (option.type === "Text") {
      //   htmlContent += `
      //     <a><strong>${index + 1}. ${questionText}</strong></a>
      //     <pre style="white-space: pre-wrap;">${currentAnswer?.answer || "NA"}</pre>
      //     <br>
      //   `;
      // }
      // // Handle "Link" type answer
      // else if (option.type === "Link") {
      //   tempfile = currentAnswer ? findfile(currentAnswer.answer) : null; // Find corresponding file if available
      //   htmlContent += `
      //     <p><strong>${index + 1}. ${questionText}</strong></p>
      //     <a style="color: blue; text-decoration: underline;" href="${flag == true ? (null) : (tempfile?.current || '#')}" download>
      //       ${flag == true ? ("NA") : (tempfile?.filename || "NA")}
      //     </a>
      //     <br>
      //   `;
      // }
    });

    var opt = {
      margin: 0.5,
      filename: 'myfile.pdf',
      // image:        { type: 'jpeg', quality: 0.98 },
      // html2canvas:  { scale: 2 },
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 4,  // High quality rendering
        letterRendering: true, // Ensure letters are rendered properly
        useCORS: true, // Enable cross-origin requests for external images
      },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      // jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // Create a PDF from the HTML content with the watermark

    let final = start + htmlContent + end
    // html2pdf()
    //   .from(final).set(opt)
    //   .save('document.pdf'); // Saves the file as PDF


      html2pdf().from(final).set(opt).toPdf().get('pdf').then((pdf) => {
        const pdfWidth = pdf.internal.pageSize.width;
        const pdfHeight = pdf.internal.pageSize.height;
  
        // Add watermark image
        const img = new Image();
        img.src = './a.jpg'; // Replace with your watermark image URL
  
    
        img.onload = () => {
          // Canvas
               // Create a canvas to adjust opacity
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size to the image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Set opacity (0.0 to 1.0)
        ctx.globalAlpha = 0.2; // Set opacity to 20%

        // Draw the image onto the canvas with opacity
        ctx.drawImage(img, 0, 0);

        // Convert canvas to data URL (base64 image)
        const dataUrl = canvas.toDataURL('image/png');
          const scale = 0.5; // Scale the watermark image
          const x = (pdfWidth - img.width * scale) / 2; // Center horizontally
          const y = (pdfHeight - img.height * scale) / 2; // Center vertically
  
          // Add watermark image to every page
          const totalPages = pdf.internal.pages.length;
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i); // Set the current page
            pdf.addImage(dataUrl, 'PNG', 0.2, 2, 0, 0, '', 'SLOW');
          }
  
          // Save the PDF with watermark on all pages
          pdf.save('example_with_watermark.pdf');
        };
      });
    };
    //   const doc = new jsPDF();
    //   doc.html(final, {
    //     callback: function (doc) {
    //         doc.save('output.pdf');
    //     },
    //     x: 10,
    //     y: 10,
    // });
 
<br><br><br><br><br><br><br><br><br>
             <img class="watermark" src="./c.png" width="130%" />
<div class="background-image"></div>

earlier Format create 
24-11-2024

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome, faQuran, faTrash, faAngleLeft, faAngleRight, faEdit } from "@fortawesome/free-solid-svg-icons";
// import { Breadcrumb, Col, Row, Form, Card, Button, Table, Container, InputGroup, Modal, Tab, Nav } from '@themesberg/react-bootstrap';
// import { ToastContainer, toast } from 'react-toastify/dist/react-toastify.cjs.development';
// import 'react-toastify/dist/ReactToastify.css';
// import { baseurl, ProjectStatus, banknames, types,Agency} from "../../api";
// import { triggerFunction, getPredefinedUrl } from '../../components/SignedUrl';
// import { useHistory } from 'react-router-dom';
// import { check } from '../../checkloggedin'
// import Multiselect from "../../components/Multiselect";
// import { useDispatch, useSelector } from "react-redux";
// import { getcontacts } from "../../features/contactslice";
// import { getinvoice } from "../../features/invoiceSlice"
// import { fetchProjects } from "../../features/projectslice";
// import { getConsolidated, disableConsolidated } from "../../features/consolidatedSlice";


// export default () => {

//   const [imageUrl, setImageUrl] = useState(null);

//   const [currentPage, setCurrentPage] = useState(0);
//   const [clickedImage, setClickedImage] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [data, setData] = useState([]);
//   const [editMode, setEditMode] = useState(false);

//   const itemsPerPage = 5; // Define itemsPerPage

//   // State variables for edit modal


//   const [arr, setArr] = useState([]);

//   ////mine
//   const [key, setKey] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   let [selectedFiles, setSelectedFiles] = useState([]);
//   const [fileExtension, setFileExtension] = useState('');
//   const filepath = '../../index.js'

//   let history = useHistory();


//   // for this file only
//   const [users, setUsers] = useState([])
//   let [person, setPerson] = useState("")
//   let [pname, setPname] = useState("")
//   const [pnamearr, setPnamearr] = useState([])
//   const [invoice, setInvoice] = useState(null)
//   const [selectedusers, setSelectedusers] = useState([])
//   // for this create invoice only
 
//   const [amount, setAmount] = useState(0)
//   let [paymenttype, setPaymenttype] = useState("")

//   const [credittype, setcredittype] = useState(null)
//   const [bankaccount, setbankaccount] = useState(null)
//   let [editUrls, setEditUrls] = useState([])



//   const dispatch = useDispatch()
//   const { contacts, loading, error } = useSelector((state) => state.contact);
//   const { invoices, loading1, error1 } = useSelector((state) => state.invoice)
//   let [invoices1, setInvoices] = useState([])
//   const token = localStorage.getItem('token');





//   // project filtering
//   let [isActive, setIsActive] = useState(null);
//   let [companyname, setCompanyName] = useState('')
//   let [isActives, setIsActives] = useState(null)
//   let [amounttbrecieved, setAmounttbRecieved] = useState(0)
//   let [amountrecieved, setAmountRecieved] = useState(0)
//   let [consoid, setconsoid] = useState("")

//   const fileInputRef = useRef(null);
//   const [paymentproof, setPaymentproof] = useState(false)

//   // for Consolidated
//   let [conso, setConso] = useState([])
//   let [test, settest] = useState([])
 
//   let [editProject, setEditProject] = useState('')
//   let [editstage, setEditStage] = useState('')
//   // let [editproject,setEditProject]=useState('')
//   let [edittotalfees, setEdittotalfees] = useState(0)
//   let [editamounttst, setEditamounttst] = useState(0)
//   let [editamountrec, setEditamountrec] = useState(0)
//   let [edittype, setEdittype] = useState('')
//   let [editDescription, setEditDescription] = useState('')
//   let [previous, setPrevious] = useState([])

// // Format
// let [agency, setAgency] = useState('')
// let [subject, setSubject] = useState("")
// let [description, setDescription] = useState('')

//   const handleFileChange = async (event, tp) => {
//     const files = event.target.files;
//     const newSelectedFiles = [];
//     ////////////console.log(tp)
//     for (let i = 0; i < files.length; i++) {

//       const file = files[i];

//       if (file) {
//         // Read file extension
//         const fileExtension = file.name;
//         setSelectedFile(file);
//         setFileExtension(fileExtension);
        
//         const arr1 = await triggerFunction(fileExtension, agency);

//         // Add arr1[0] and arr1[1] to the newSelectedFiles array
//         newSelectedFiles.push([arr1[0], arr1[1], file]);
//       }
//     }
   
//     //////console.log(selectedFiles)
//   };
 
//   const handleEditFileChange = async (event, tp) => {
//     const files = event.target.files;
//     const newSelectedFiles = [];
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];

//       if (file) {
//         const fileExtension = file.name;
//         setSelectedFile(file);
//         setFileExtension(fileExtension);

//         const projectobj = pnamearr.find(proj => proj._id == editProject);

//         try {
//           const res = await triggerFunction(fileExtension, projectobj.name);
//           // //////console.log(res); // Log the response from triggerFunction
//           newSelectedFiles.push([res[0], res[1], file]);
//           if (tp == "Calculation") {
//             selectedFiles[0] = newSelectedFiles[0]
//             // //////console.log(selectedFiles)
//           }
//         } catch (error) {
//           console.error('Error in triggerFunction:', error);
//         }
//       }
//     }
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault()
//     const uniqueUrlsSet = new Set(); // Create a Set to store unique URLs

//     let urls = []
//     for (let i = 0; i < selectedFiles.length; i++) {
//       // //////////////////////console.log("hi")
//       let selectedFile = selectedFiles[i][2]
//       //////console.log(selectedFiles[i][1])
//       const url = getPredefinedUrl(selectedFiles[i][1]);


//       if (!uniqueUrlsSet.has(url)) {
//         uniqueUrlsSet.add(url); // Add the URL to the Set
//       }

//       if (selectedFile != null) {
//         // ////////////////console.log("hi",selectedFile)
//         const reader = new FileReader();
//         reader.onload = async (event) => {
//           const fileContent = event.target.result;
//           // urls.push(getPredefinedUrl(selectedFiles[i][1]))
//           // Perform your upload logic here
//           // For demonstration, let's just log the file extension and content
//           //////////////////////console.log('Selected File Extension:', fileExtension);
//           //////////////////////console.log('File Content:', fileContent);

//           try {
//             // Example: Uploading file content using Fetch

//             if (selectedFile) {
//               const responseFile = await fetch(selectedFiles[i][0], {
//                 method: 'PUT',
//                 body: fileContent,
//                 headers: {
//                   'Content-Type': 'application/octet-stream', // Set appropriate content type
//                 },
//                 mode: 'cors', // Enable CORS
//               });
//               if (!responseFile.ok) {
//                 throw new Error('Network response was not ok');
//               }

//               toast.success(`${selectedFiles[i][1]} uploaded succesfully`); // Call toast.success after successful addition

//               // Reload page after successful submission
//               // window.location.reload();

//               // Clear form data after submission

//             }
//           } catch (error) {
//             //console.error('Error:', error);
//             toast.error('Failed to add image'); // Display error toast if addition fails
//           }
//         };
//         reader.readAsArrayBuffer(selectedFile);
//       }
//     }
//     // api call

//     try {
//       const uniqueUrls = Array.from(uniqueUrlsSet);
//       ////////console.log(uniqueUrls);
//       let uniqueUrlsObjects = []
//       if (uniqueUrls.length == 1) {
//         uniqueUrlsObjects.push({ file: uniqueUrls[0], name: "Calculations" })
//       }
//       //   if(uniqueUrls.length==2){
//       //     uniqueUrlsObjects.push({file:uniqueUrls[0],name:"Payment Proof"})
//       //     uniqueUrlsObjects.push({file:uniqueUrls[1],name:"Tax Invoice"})

//       //   }
//       //   const uniqueUrlsObjects = uniqueUrls.map(url => ({ file: url, name: "Payment Proof" }));



//       const body = {
//         project: pname == '' ? undefined : pname,
//         total_amount: amount,
//         amount_stage: amounttbrecieved,
//         amount_recieved: amountrecieved,
//         type: paymenttype,
//         description: description,
//         urls: uniqueUrlsObjects.length != 0 ? uniqueUrlsObjects : [],//new
//       };
//       ////////console.log(body)



//       const responseFormData = await axios.post(`${baseurl}/consolidated/create`, body);
//       ////////console.log(responseFormData);
//       toast.success('Consolidated Statement Added successfully'); // Call toast.success after successful addition
//       // setPerson("");
//       // setCompanyName("");
//       // setcredittype("");
//       // setbankaccount("");
//       // setCreateDate("");
//       // setIsActive("");
//       // setPname("");
//       // setInvoice("");
//       // setSubject("");
//       // setAmount("");
//       // setDescription("")
//       fileInputRef.current.value = null;
//       setPaymentproof(false)
//       setSelectedFiles([])
//     } catch (error) {
//       //console.error(error);
//       // Assuming res is not defined, use //console.error instead
//       //console.error({ message: "backend error", data: error });
//     }
//   };





//   ////////////////////////////////////////////

//   const handleprojectFetch = async () => {
//     //////////////////////console.log(companyname)
//     dispatch(fetchProjects({
//       company: companyname ? companyname : null,
//       status: isActive ? isActive : null
//     })).then((resp) => {
//       setPnamearr(resp)
//       // //////////console.log(resp)
//     }).catch(error => {

//     })

//   }


//   //For Fetching Users and Projects
//   useEffect(() => {
//     //////////////////////console.log(check())
//     axios.get(`${baseurl}/user`)
//       .then(response => {
//         setUsers(response.data);
//       })
//       .catch(error => {
//         //console.error(error);
//       }, []);


//     handleprojectFetch()
//     // dispatch(getcontacts())
//     // dispatch(getinvoice())
//     dispatch(getConsolidated()).then((res) => {
//       //////console.log(res)
//       setConso(res)
//     }).catch(err => {
//       //////console.log(err)
//     })
//     setInvoices(invoices)
//     //////////////////console.log(contacts)
//     ////////////console.log(invoices)
//   }, [contacts.length, invoices.length]);



//   const handleInvoiceFilter = () => {
//     let temp = (invoices.filter((item) =>
//       (person == "" || item.person == person) &&
//       (pname == "" || item.project == pname)
//     ))
//     ////////////console.log(person,invoices1)
//     // for(let i=0;i<invoices1.length;i++){
//     //   if(invoices1[i].person==pid){
//     //     ////////////console.log(invoices1[i])
//     //   }
//     // }
//     // ////////////console.log(invoices1,temp)
//     setInvoices(temp)
//   }






//   const handleDelete = (id) => {
//     const token = localStorage.getItem('token');

//     axios.delete(`https://ab.execute-api.ap-south-1.amazonaws.com/production/api/services/${id}`, {
//       headers: {
//         Authorization: `${token}`
//       }
//     })
//       .then(response => {
//         //////////////////////console.log('Record deleted successfully:', response.data);
//         setData(prevData => prevData.filter(item => item.id !== id));
//         toast.success('Record deleted successfully'); // Display success toast
//       })
//       .catch(error => {
//         //console.error('Error deleting record:', error);
//         toast.error('Failed to delete record'); // Display error toast
//       });
//   }
//   // Calculate the index of the first item to display based on the current page and items per page




//   const findprojectname = (project) => {
//     //////////////////console.log(project,"Find project name")
//     // //////////////////////console.log(pnamearr)
//     let str = ""
//     for (let i = 0; i < pnamearr.length; i++) {
//       // //////////////////console.log(pnamearr[i])
//       if (pnamearr[i]._id == project) {
//         str = str + "{" + pnamearr[i].name + "}"
//         break
//       }

//     }
//     // for(let i=0;i<projects.length;i++){
//     //////////////////////console.log(projects[i])
//     //     for(let j=0;j<pnamearr.length;j++){
//     //   if(pnamearr[j]._id==projects[i]){
//     //     str=str+"{"+pnamearr[j].name+"}"
//     //     break
//     //   }
//     //     }
//     //   }
//     return str
//   }
//   // https://officecrm560.s3.ap-south-1.amazonaws.com/Imtiaz+Bandra++41./Lucky+Realty+Bandra1717420102462.xlsx
//   // https://officecrm560.s3.ap-south-1.amazonaws.com/Imtiaz+Bandra++41./Lucky+Realty+Bandra1717419135299.xlsx
//   const handleEditModal = (item) => {
//     //////console.log(item)

//     //////////////////console.log(temp,"hi")

//     setEditProject(item.project)
//     setEdittotalfees(item.total_amount)
//     setEditamounttst(item.amount_stage)
//     setEditamountrec(item.amount_recieved)
//     setEditUrls(item.urls)
//     setEdittype(item.type)
//     setconsoid(item._id)
//     setPrevious(item.previous)
//     setEditDescription(item.description)
//     setShowModal(true);
//     setEditMode(true); // Set editMode to true when opening the edit modal
//   }

//   const handleaddhistory = () => {

//   }

//   const handleComplete = () => {

//   }
//   const handleEditSubmit = async (e) => {
//     e.preventDefault()
//     const uniqueUrlsSet = new Set(); // Create a Set to store unique URLs

//     let urls = []
//     for (let i = 0; i < selectedFiles.length; i++) {
//       // //////////////////////console.log("hi")
//       let selectedFile = selectedFiles[i][2]

//       const url = getPredefinedUrl(selectedFiles[i][1]);
//       // //////console.log(selectedFiles[i][1])

//       if (!uniqueUrlsSet.has(url)) {
//         uniqueUrlsSet.add(url); // Add the URL to the Set
//       }

//       if (selectedFile != null) {
//         // ////////////////console.log("hi",selectedFile)
//         const reader = new FileReader();
//         reader.onload = async (event) => {
//           const fileContent = event.target.result;
//           // urls.push(getPredefinedUrl(selectedFiles[i][1]))
//           // Perform your upload logic here
//           // For demonstration, let's just log the file extension and content
//           //////////////////////console.log('Selected File Extension:', fileExtension);
//           //////////////////////console.log('File Content:', fileContent);

//           try {
//             // Example: Uploading file content using Fetch

//             if (selectedFile) {
//               const responseFile = await fetch(selectedFiles[i][0], {
//                 method: 'PUT',
//                 body: fileContent,
//                 headers: {
//                   'Content-Type': 'application/octet-stream', // Set appropriate content type
//                 },
//                 mode: 'cors', // Enable CORS
//               });
//               if (!responseFile.ok) {
//                 throw new Error('Network response was not ok');
//               }

//               toast.success(`${selectedFiles[i][1]} uploaded succesfully`); // Call toast.success after successful addition

//               // Reload page after successful submission
//               // window.location.reload();

//               // Clear form data after submission

//             }
//           } catch (error) {
//             //console.error('Error:', error);
//             toast.error('Failed to add image'); // Display error toast if addition fails
//           }
//         };
//         reader.readAsArrayBuffer(selectedFile);
//       }
//     }
//     // api call

//     try {
//       const uniqueUrls = Array.from(uniqueUrlsSet);
//       ////////console.log(uniqueUrls);
//       let uniqueUrlsObjects = []
//       if (uniqueUrls.length == 1) {
//         uniqueUrlsObjects.push({ file: uniqueUrls[0], name: "Calculations" })
//       }
//       //   if(uniqueUrls.length==2){
//       //     uniqueUrlsObjects.push({file:uniqueUrls[0],name:"Payment Proof"})
//       //     uniqueUrlsObjects.push({file:uniqueUrls[1],name:"Tax Invoice"})

//       //   }
//       //   const uniqueUrlsObjects = uniqueUrls.map(url => ({ file: url, name: "Payment Proof" }));


//       const ids = selectedusers.map(user => user.id);
//       const body = {
//         project: editProject,
//         total_amount: edittotalfees,
//         amount_stage: editamounttst,
//         amount_recieved: editamountrec,
//         type: edittype,
//         description: editDescription,
//         urls: uniqueUrlsObjects.length != 0 ? uniqueUrlsObjects : editUrls,//new
//       };
//       //////console.log(body)



//       const responseFormData = await axios.put(`${baseurl}/consolidated/${consoid}`, body);
//       ////////console.log(responseFormData);
//       toast.success('Consolidated Statement Added successfully'); // Call toast.success after successful addition
//       // setPerson("");
//       // setCompanyName("");
//       // setcredittype("");
//       // setbankaccount("");
//       // setCreateDate("");
//       // setIsActive("");
//       // setPname("");
//       // setInvoice("");
//       // setSubject("");
//       // setAmount("");
//       // setDescription("")
//       // fileInputRef.current.value = null;

//       dispatch(getConsolidated()).then((res) => {
//         setConso(res)
//       })
//       setShowModal(false)
//       setPaymentproof(false)
//       setSelectedFiles([])
//     } catch (error) {
//       //console.error(error);
//       // Assuming res is not defined, use //console.error instead
//       //console.error({ message: "backend error", data: error });
//     }
//   }

//   // redirect to projects page

//   let startIndex = currentPage * itemsPerPage;
//   let endIndex = (currentPage + 1) * itemsPerPage;
//   let currentItems = data.slice(startIndex, endIndex);


//   return (
//     <>
//       <ToastContainer />
//       <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
//         <div className="d-block mb-4 mb-xl-0">
//           <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
//             <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
//             <Breadcrumb.Item>Home</Breadcrumb.Item>
//             <Breadcrumb.Item active>Service</Breadcrumb.Item>
//           </Breadcrumb>
//         </div>
//       </div>
//       <Tab.Container defaultActiveKey="home">
//         <Nav fill variant="pills" className="flex-column flex-sm-row">
//           <Nav.Item>
//             <Nav.Link eventKey="home" className="mb-sm-3 mb-md-0">
//               Create Format
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey="profile" className="mb-sm-3 mb-md-0">
//               Table
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>
//         <Tab.Content>
//           <Tab.Pane eventKey="home" className="py-4">
//             <section className="d-flex align-items-center my-2 mt-lg-3 mb-lg-5">
//               <Container>
//                 <form onSubmit={handleUpload}>
//                   <Row >
//                   <Col xs={12} md={6}>
//                       <Form.Group id="pname" className="mb-4">
//                         <Form.Label>Agency</Form.Label>
//                         <InputGroup>
//                           <InputGroup.Text></InputGroup.Text>
//                           <Form.Select value={agency} onChange={(e) => {
//                             agency = e.target.value
//                             setAgency(e.target.value)
//                           }}>
//                             <option value="">Select Option</option>
//                             {Agency.map((option, index) => (
//                               <option key={index} value={option}>{option}</option>
//                             ))}
//                           </Form.Select>
//                         </InputGroup>
//                       </Form.Group>
//                     </Col>
//                     <Col xs={12} md={6}>
//                       <Form.Group id="tasksubject" className="mb-4">
//                         <Form.Label>Type</Form.Label>
//                         <InputGroup>
//                           <InputGroup.Text>
//                           </InputGroup.Text>
//                           <Form.Control autoFocus required type="text" placeholder="Type" value={subject} onChange={(e) => setSubject(e.target.value)} />
//                         </InputGroup>
//                       </Form.Group>
//                     </Col>
//                     <Col xs={12} md={6}>
//                       <Form.Group className="mb-3" controlId="editHeading">
//                         <Form.Label>Description</Form.Label>
//                       </Form.Group>
//                       <textarea rows="4" cols="60" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
//                     </Col>
//                     <Col xs={12} md={6}>
//                       {agency ? (

//                         <Form.Group id="Project Image" className="mb-4">
//                           <Form.Label>Calculation</Form.Label>
//                           <InputGroup>
//                             <InputGroup.Text>
//                             </InputGroup.Text>
//                             <Form.Control
//                               type="file"
//                               multiple
//                               ref={fileInputRef}
//                               onChange={(e) => {
//                                 handleFileChange(e, "Calculation")
//                                 setPaymentproof(true)
//                               }}
//                               placeholder="Upload Image"
//                             />
//                           </InputGroup>
//                         </Form.Group>

//                       ) : (null)}
//                       {/* 
//                           {selectedFiles.map((file)=>{
//                             return (
//                               <p>{file.name}</p>
//                             )
//                           })} */}

//                     </Col>
                  
//                     <Col className="d-flex justify-content-center"> {/* Centering the submit button */}
//                       <Button variant="primary" type="submit" className="w-100 mt-3">
//                         Submit
//                       </Button>
//                     </Col>
//                   </Row>
//                 </form>
//               </Container>
//             </section>
//           </Tab.Pane>
//           <Tab.Pane eventKey="profile" className="py-4">
//             <Card style={{ width: "max-content" }} border="light" className="shadow-sm">
//               {/* Second Pane */}
//               <Table responsive style={{ width: "maxWidth" }} className="align-items-center table-flush">
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">#</th>
//                     <th scope="col">Project Name</th>
//                     <th scope="col">Stage</th>
//                     <th scope="col">Type</th>
//                     <th scope="col">Description</th>
//                     <th scope="col">Total Fees</th>
//                     <th scope="col">Amount till stage</th>
//                     <th scope="col">Amount Recieved</th>
//                     <th scope="col">Link</th>
//                     <th scope="col">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {conso.map((row, index) => (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       <td>{findprojectname(row.project)}</td>
//                       <td>{row.stage}</td>
//                       <td>{row.type}</td>
//                       <td><pre>{row.description}</pre></td>
//                       <td>{row.total_amount}</td>
//                       <td>{row.amount_stage}</td>
//                       <td>{row.amount_recieved}</td>
//                       {row && (
//                         <td colSpan="1">
//                           <pre style={{ whiteSpace: "pre-wrap" }}>
//                             {row.urls && row.urls[0] && (
//                               <>
//                                 <a href={row.urls[0].file} download style={{ textDecoration: "underline", color: "blue" }}>
//                                   -{row.urls[0].name}
//                                 </a>
//                                 <br />
//                               </>
//                             )}
//                           </pre>
//                         </td>
//                       )}
//                       <td>
//                         <Button style={{ backgroundColor: "aqua", color: "black" }} variant="info" size="sm" onClick={() => handleEditModal(row)}>
//                           <FontAwesomeIcon icon={faEdit} />
//                         </Button>
//                         <Button style={{ borderColor: "black", backgroundColor: "aqua", color: "black", marginLeft: "2%" }} onClick={() => dispatch(disableConsolidated(row._id))} variant="danger" size="sm">
//                           <FontAwesomeIcon icon={faTrash} />
//                         </Button></td>
//                     </tr>
//                   ))}
//                 </tbody>

//               </Table>
//             </Card>
//           </Tab.Pane>
//         </Tab.Content>
//       </Tab.Container>
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header>
//           <Modal.Title>Edit Consolidated Bills</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-3" controlId="editHeading">
//             <Form.Label>Project</Form.Label>
//             <Form.Select value={editProject} onChange={(e) => setEditProject(e.target.value)}>
//               <option value="">Select Option</option>
//               {/* Mapping through the arr array to generate options */}
//               {pnamearr.map((option, index) => (
//                 <option key={index} value={option._id}>{option.name}</option>
//               ))}
//             </Form.Select>
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="editHeading">
//             <Form.Label>Stage</Form.Label>
//             <p>hello</p>
//           </Form.Group>
//           <Form.Group id="pname" className="mb-4">
//             <Form.Label>Total Fees</Form.Label>
//             <InputGroup>
//               <InputGroup.Text></InputGroup.Text>
//               <Form.Control autoFocus required type="number" placeholder="Amount" value={edittotalfees} onChange={(e) => setEdittotalfees(e.target.value)} />
//             </InputGroup>
//           </Form.Group>
//           <Form.Group id="pname" className="mb-4">
//             <Form.Label>Amount till Stage</Form.Label>
//             <InputGroup>
//               <InputGroup.Text></InputGroup.Text>
//               <Form.Control autoFocus required type="number" placeholder="Amount" value={editamounttst} onChange={(e) => setEditamounttst(e.target.value)} />
//             </InputGroup>
//           </Form.Group>
//           <Form.Group id="pname" className="mb-4">
//             <Form.Label>Amount Recieved</Form.Label>
//             <InputGroup>
//               <InputGroup.Text></InputGroup.Text>
//               <Form.Control autoFocus required type="number" placeholder="Amount" value={editamountrec} onChange={(e) => setEditamountrec(e.target.value)} />
//             </InputGroup>
//           </Form.Group>
//           <Form.Group id="pname" className="mb-4">
//             <Form.Label>Type</Form.Label>
//             <InputGroup>
//               <InputGroup.Text></InputGroup.Text>
//               <Form.Select value={edittype} onChange={(e) => { setEdittype(e.target.value) }
//               }>
//                 <option value="">Select Option</option>
//                 {/* Mapping through the arr array to generate options */}
//                 {types.map((option, index) => (
//                   <option key={index} value={option}>{option}</option>
//                 ))}
//               </Form.Select>
//             </InputGroup>
//           </Form.Group>


//           <Form.Group className="mb-3" controlId="editHeading">
//             <Form.Label>Description</Form.Label>
//           </Form.Group>
//           <textarea rows="4" cols="50" type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />

//           <Form.Group className="mb-3" controlId="editHeading">
//             <Form.Label>Payment Proof</Form.Label>
//             <p>Current File:<a style={{ textDecoration: "underline" }}>{editUrls[0]?.file}</a></p>
//             <InputGroup>
//               <Form.Control
//                 type="file"
//                 onChange={(e) => {
//                   handleEditFileChange(e, "Calculation")
//                 }}
//                 placeholder="Upload Image"
//               />
//             </InputGroup>
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="editHeading">
//             <Form.Label>Project</Form.Label>
//             <Form.Select value={editProject} onChange={(e) => setEditProject(e.target.value)}>
//               <option value="">Select Option</option>
//               {/* Mapping through the arr array to generate options */}
//               {pnamearr.map((option, index) => (
//                 <option key={index} value={option._id}>{option.name}</option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={(e) => handleEditSubmit(e)}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };


First Iteration


// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [rows, setRows] = useState(2);
//   const [columns, setColumns] = useState(2);
//   const [data, setData] = useState([["", ""]]); // Data for table cells
//   const [inputColumns, setInputColumns] = useState([]); // Track columns marked as input
//   const [backgrounds, setBackgrounds] = useState({}); // Background colors for cells

//   // Handle rows and columns update
//   const handleRowChange = (e) => setRows(Number(e.target.value));
//   const handleColumnChange = (e) => setColumns(Number(e.target.value));

//   const handleGenerateTable = () => {
//     const newData = Array.from({ length: rows }, () =>
//       Array.from({ length: columns }, () => "")
//     );
//     setData(newData);
//   };

//   // Handle cell background color update
//   const handleBackgroundChange = (row, col, color) => {
//     setBackgrounds({ ...backgrounds, [`${row}-${col}`]: color });
//   };

//   // Handle cell data change
//   const handleCellChange = (row, col, value) => {
//     const updatedData = [...data];
//     updatedData[row][col] = value;
//     setData(updatedData);
//   };

//   // Toggle input column
//   const toggleInputColumn = (colIndex) => {
//     if (inputColumns.includes(colIndex)) {
//       setInputColumns(inputColumns.filter((col) => col !== colIndex));
//     } else {
//       setInputColumns([...inputColumns, colIndex]);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Interactive Table Generator</h1>
//       <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
//         {/* Controls */}
//         <div>
//           <h3>Controls</h3>
//           <label>
//             Rows:
//             <input
//               type="number"
//               value={rows}
//               onChange={handleRowChange}
//               min="1"
//             />
//           </label>
//           <br />
//           <label>
//             Columns:
//             <input
//               type="number"
//               value={columns}
//               onChange={handleColumnChange}
//               min="1"
//             />
//           </label>
//           <br />
//           <button onClick={handleGenerateTable}>Generate Table</button>
//           <br />
//           <h4>Input Columns</h4>
//           <ul>
//             {Array.from({ length: columns }).map((_, colIndex) => (
//               <li key={colIndex}>
//                 Column {colIndex + 1}{" "}
//                 <button onClick={() => toggleInputColumn(colIndex)}>
//                   {inputColumns.includes(colIndex) ? "Remove Input" : "Make Input"}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Table */}
//         <div>
//           <h3>Table</h3>
//           <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
//             <tbody>
//               {data.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {row.map((col, colIndex) => (
//                     <td
//                       key={colIndex}
//                       style={{
//                         backgroundColor:
//                           backgrounds[`${rowIndex}-${colIndex}`] || "white",
//                       }}
//                     >
//                       {inputColumns.includes(colIndex) ? (
//                         <input
//                           type="text"
//                           value={col}
//                           onChange={(e) =>
//                             handleCellChange(rowIndex, colIndex, e.target.value)
//                           }
//                           style={{ width: "100%" }}
//                         />
//                       ) : (
//                         <div
//                           contentEditable
//                           onInput={(e) =>
//                             handleCellChange(rowIndex, colIndex, e.currentTarget.textContent)
//                           }
//                         >
//                           {col}
//                         </div>
//                       )}
//                       <br />
//                       <input
//                         type="color"
//                         onChange={(e) =>
//                           handleBackgroundChange(rowIndex, colIndex, e.target.value)
//                         }
//                         title="Pick a background color"
//                       />
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

Third Iteration
// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [elements, setElements] = useState([]); // Elements to render
//   const [columnConfig, setColumnConfig] = useState([3]); // Column configuration, e.g., [3, 4]
//   const [defaultColumns, setDefaultColumns] = useState(3); // Default number of columns

//   const handleAddElement = (type) => {
//     const span = columnConfig.reduce((a, b) => a + b, 0); // Total columns
//     setElements([
//       ...elements,
//       {
//         id: Date.now(),
//         type,
//         content: Array(span).fill(""),
//         span: columnConfig,
//       },
//     ]);
//   };

//   const handleRemoveElement = (id) => {
//     setElements(elements.filter((element) => element.id !== id));
//   };

//   const handleColumnConfigChange = (index, value) => {
//     const updatedConfig = [...columnConfig];
//     updatedConfig[index] = Number(value);
//     setColumnConfig(updatedConfig);
//   };

//   const handleContentChange = (id, colIndex, value) => {
//     const updatedElements = elements.map((element) => {
//       if (element.id === id) {
//         const updatedContent = [...element.content];
//         updatedContent[colIndex] = value;
//         return { ...element, content: updatedContent };
//       }
//       return element;
//     });
//     setElements(updatedElements);
//   };

//   const handleAddColumnSet = () => {
//     setColumnConfig([...columnConfig, defaultColumns]);
//   };

//   return (
//     <div className="App">
//       <h1>Flexible Table Generator</h1>
//       <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
//         {/* Left Controls */}
//         <div>
//           <h3>Controls</h3>
//           <div>
//             <h4>Column Configurations</h4>
//             {columnConfig.map((columns, index) => (
//               <div key={index}>
//                 <label>
//                   Set Columns for Group {index + 1}:{" "}
//                   <input
//                     type="number"
//                     value={columns}
//                     onChange={(e) => handleColumnConfigChange(index, e.target.value)}
//                     min="1"
//                   />
//                 </label>
//               </div>
//             ))}
//             <button onClick={handleAddColumnSet}>Add Column Group</button>
//           </div>
//           <br />
//           <select onChange={(e) => handleAddElement(e.target.value)} defaultValue="">
//             <option value="" disabled>
//               Add Element
//             </option>
//             <option value="row">Row</option>
//             <option value="heading">Heading</option>
//             <option value="space">Space</option>
//           </select>
//         </div>

//         {/* Right Preview */}
//         <div>
//           <h3>Preview</h3>
//           <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
//             <tbody>
//               {elements.map((element) => (
//                 <tr key={element.id}>
//                   {element.type === "row" &&
//                     columnConfig.map((columns, groupIndex) =>
//                       Array.from({ length: columns }).map((_, colIndex) => (
//                         <td
//                           key={`${groupIndex}-${colIndex}`}
//                           colSpan={12 / columns} // Dynamic span calculation
//                         >
//                           <input
//                             type="text"
//                             value={element.content[groupIndex * columns + colIndex]}
//                             onChange={(e) =>
//                               handleContentChange(
//                                 element.id,
//                                 groupIndex * columns + colIndex,
//                                 e.target.value
//                               )
//                             }
//                             style={{ width: "100%" }}
//                           />
//                         </td>
//                       ))
//                     )}
//                   {element.type === "heading" && (
//                     <td
//                       colSpan={columnConfig.reduce((a, b) => a + b, 0)}
//                       style={{ fontWeight: "bold", textAlign: "center" }}
//                     >
//                       <input
//                         type="text"
//                         value={element.content[0]}
//                         onChange={(e) => handleContentChange(element.id, 0, e.target.value)}
//                         style={{ width: "100%" }}
//                       />
//                     </td>
//                   )}
//                   {element.type === "space" && (
//                     <td
//                       colSpan={columnConfig.reduce((a, b) => a + b, 0)}
//                       style={{ height: "20px", background: "#f0f0f0" }}
//                     ></td>
//                   )}
//                   <td style={{ textAlign: "center" }}>
//                     <button onClick={() => handleRemoveElement(element.id)}>-</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;




Fourth Iteration
import React, { useState } from "react";
import { Resizable } from "react-resizable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "react-resizable/css/styles.css";
import "./App.css";

function App() {
  const [elements, setElements] = useState([]);

  const handleAddElement = (type) => {
    setElements([
      ...elements,
      { type, id: Date.now(), content: Array(3).fill("") }, // Default 3 columns
    ]);
  };

  const handleRemoveElement = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  const handleContentChange = (id, colIndex, value) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        const updatedContent = [...element.content];
        updatedContent[colIndex] = value;
        return { ...element, content: updatedContent };
      }
      return element;
    });
    setElements(updatedElements);
  };

  const handleAddColumnToRow = (id) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        return { ...element, content: [...element.content, ""] };
      }
      return element;
    });
    setElements(updatedElements);
  };

  const handleRemoveColumnFromRow = (id) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id && element.content.length > 1) {
        const updatedContent = [...element.content];
        updatedContent.pop();
        return { ...element, content: updatedContent };
      }
      return element;
    });
    setElements(updatedElements);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedElements = Array.from(elements);
    const [moved] = reorderedElements.splice(result.source.index, 1);
    reorderedElements.splice(result.destination.index, 0, moved);
    setElements(reorderedElements);
  };

  return (
    <div className="App">
      <h1>Dynamic Table Generator</h1>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Left Control Panel */}
        <div>
          <h3>Controls</h3>
          <select onChange={(e) => handleAddElement(e.target.value)} defaultValue="">
            <option value="" disabled>
              Add Element
            </option>
            <option value="row">Row</option>
            <option value="heading">Heading</option>
            <option value="space">Space</option>
          </select>
        </div>

        {/* Right Preview Panel */}
        <div>
          <h3>Preview</h3>
          <DragDropContext onDragEnd={handleDragEnd}>
            <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
              <Droppable droppableId="table-body">
                {(provided) => (
                  <tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {elements.map((element, index) => (
                      <Draggable key={element.id} draggableId={`${element.id}`} index={index}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {element.type === "row" &&
                              element.content.map((cell, colIndex) => (
                                <td key={colIndex}>
                                  <input
                                    type="text"
                                    value={cell}
                                    onChange={(e) =>
                                      handleContentChange(element.id, colIndex, e.target.value)
                                    }
                                    style={{ width: "100%" }}
                                  />
                                </td>
                              ))}
                            {element.type === "heading" && (
                              <td
                                colSpan={element.content.length}
                                style={{ fontWeight: "bold", textAlign: "center" }}
                              >
                                <input
                                  type="text"
                                  value={element.content[0]}
                                  onChange={(e) =>
                                    handleContentChange(element.id, 0, e.target.value)
                                  }
                                  style={{ width: "100%" }}
                                />
                              </td>
                            )}
                            {element.type === "space" && (
                              <td
                                colSpan={element.content.length}
                                style={{ height: "20px", background: "#f0f0f0" }}
                              ></td>
                            )}
                            <td>
                              <button onClick={() => handleAddColumnToRow(element.id)}>
                                + Column
                              </button>
                              <button
                                onClick={() => handleRemoveColumnFromRow(element.id)}
                                disabled={element.content.length <= 1}
                              >
                                - Column
                              </button>
                              <button onClick={() => handleRemoveElement(element.id)}>-</button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;


create excel webapp
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import "./App.css";

const initialColumns = [
  { id: "col1", name: "A", width: 100 },
  { id: "col2", name: "B", width: 100 },
  { id: "col3", name: "C", width: 100 },
];

const initialRows = [
  { id: "row1", cells: ["", "", ""] },
  { id: "row2", cells: ["", "", ""] },
];

function App() {
  const [columns, setColumns] = useState(initialColumns);
  const [rows, setRows] = useState(initialRows);

  // Handle drag and drop for rows
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    if (result.type === "row") {
      const reorderedRows = Array.from(rows);
      const [moved] = reorderedRows.splice(result.source.index, 1);
      reorderedRows.splice(result.destination.index, 0, moved);
      setRows(reorderedRows);
    }
  };

  // Handle cell editing
  const handleCellChange = (rowIndex, colIndex, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].cells[colIndex] = value;
    setRows(updatedRows);
  };

  // Add a new column
  const addColumn = () => {
    const newColumn = {
      id: `col${columns.length + 1}`,
      name: String.fromCharCode("A".charCodeAt(0) + columns.length),
      width: 100,
    };
    setColumns([...columns, newColumn]);
    setRows(rows.map((row) => ({ ...row, cells: [...row.cells, ""] })));
  };

  // Add a new row
  const addRow = () => {
    const newRow = { id: `row${rows.length + 1}`, cells: Array(columns.length).fill("") };
    setRows([...rows, newRow]);
  };

  return (
    <div className="App">
      <h1>Excel-like Web App</h1>
      <button onClick={addColumn}>Add Column</button>
      <button onClick={addRow}>Add Row</button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <Resizable
                  key={col.id}
                  width={col.width}
                  height={0}
                  onResizeStop={(e, { size }) =>
                    setColumns(
                      columns.map((c, i) =>
                        i === index ? { ...c, width: size.width } : c
                      )
                    )
                  }
                >
                  <th style={{ width: col.width, textAlign: "center" }}>{col.name}</th>
                </Resizable>
              ))}
            </tr>
          </thead>
          <Droppable droppableId="table-body" type="row">
            {(provided) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {rows.map((row, rowIndex) => (
                  <Draggable key={row.id} draggableId={row.id} index={rowIndex}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {row.cells.map((cell, colIndex) => (
                          <td key={colIndex} style={{ width: columns[colIndex]?.width }}>
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) =>
                                handleCellChange(rowIndex, colIndex, e.target.value)
                              }
                              style={{ width: "100%" }}
                            />
                          </td>
                        ))}
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    </div>
  );
}

export default App;



perfect till here
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

function App() {
  const [elements, setElements] = useState([]);
  const [columnLabels, setColumnLabels] = useState(["Column 1", "Column 2", "Column 3"]);

  const handleAddRow = () => {
    setElements([
      ...elements,
      { id: Date.now(), content: Array(columnLabels.length).fill(""), merged: [] }, // Default columns
    ]);
  };

  const handleRemoveRow = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  const handleContentChange = (id, colIndex, value) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        const updatedContent = [...element.content];
        updatedContent[colIndex] = value;
        return { ...element, content: updatedContent };
      }
      return element;
    });
    setElements(updatedElements);
  };

  const handleAddColumn = () => {
    setColumnLabels([...columnLabels, `Column ${columnLabels.length + 1}`]);
    setElements(
      elements.map((element) => ({
        ...element,
        content: [...element.content, ""],
      }))
    );
  };

  const handleRemoveColumn = () => {
    if (columnLabels.length > 1) {
      setColumnLabels(columnLabels.slice(0, -1));
      setElements(
        elements.map((element) => ({
          ...element,
          content: element.content.slice(0, -1),
        }))
      );
    }
  };

  const handleMergeColumns = (id, startIndex, endIndex) => {
    setElements(
      elements.map((element) => {
        if (element.id === id) {
          const newMerged = [...element.merged, { start: startIndex, end: endIndex }];
          return { ...element, merged: newMerged };
        }
        return element;
      })
    );
  };

  const handleUnmergeColumns = (id, startIndex, endIndex) => {
    setElements(
      elements.map((element) => {
        if (element.id === id) {
          const newMerged = element.merged.filter(
            (range) => !(range.start === startIndex && range.end === endIndex)
          );
          return { ...element, merged: newMerged };
        }
        return element;
      })
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedElements = Array.from(elements);
    const [moved] = reorderedElements.splice(result.source.index, 1);
    reorderedElements.splice(result.destination.index, 0, moved);
    setElements(reorderedElements);
  };

  const isMerged = (merged, colIndex) =>
    merged.some(([start, end]) => colIndex >= start && colIndex <= end);

  return (
    <div className="App">
      <h1>Dynamic Table Generator</h1>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Left Control Panel */}
        <div>
          <h3>Controls</h3>
          <button onClick={handleAddRow}>Add Row</button>
          <button onClick={handleAddColumn}>Add Column</button>
          <button onClick={handleRemoveColumn} disabled={columnLabels.length <= 1}>
            Remove Column
          </button>
        </div>

        {/* Right Preview Panel */}
        <div>
          <h3>Preview</h3>
          <DragDropContext onDragEnd={handleDragEnd}>
            <table
              border="1"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                tableLayout: "fixed", // Prevent shrinking of columns
              }}
            >
              <thead>
                <tr>
                  <th>Row</th>
                  {columnLabels.map((label, index) => (
                    <th key={index}>{label}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <Droppable droppableId="table-body">
                {(provided) => (
                  <tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {elements.map((element, index) => (
                      <Draggable key={element.id} draggableId={String(element.id)} index={index}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <td>{`Row ${index + 1}`}</td>
                            {element.content.map((cell, colIndex) => {
                              const merged = element.merged;
                              const mergeRange = merged.find(
                                (range) => colIndex >= range.start && colIndex <= range.end
                              );
                              if (mergeRange) {
                                // If the column is merged, render a merged cell
                                if (colIndex === mergeRange.start) {
                                  const colspan = mergeRange.end - mergeRange.start + 1;
                                  return (
                                    <td key={colIndex} colSpan={colspan} style={{ width: "100%" }}>
                                      <input
                                        type="text"
                                        value={cell}
                                        onChange={(e) =>
                                          handleContentChange(element.id, colIndex, e.target.value)
                                        }
                                        style={{ width: "100%" }}
                                      />
                                    </td>
                                  );
                                }
                                return null; // Skip rendering the cell part of the merge
                              }
                              return (
                                <td key={colIndex}>
                                  <input
                                    type="text"
                                    value={cell}
                                    onChange={(e) =>
                                      handleContentChange(element.id, colIndex, e.target.value)
                                    }
                                    style={{ width: "100%" }}
                                  />
                                </td>
                              );
                            })}
                            <td>
                              <button
                                onClick={() => handleMergeColumns(element.id, 0, 1)} // Example: Merge columns 1 and 2
                              >
                                Merge 1 & 2
                              </button>
                              <button
                                onClick={() => handleMergeColumns(element.id, 1, 2)} // Example: Merge columns 2 and 3
                              >
                                Merge 2 & 3
                              </button>
                              <button
                                onClick={() => handleMergeColumns(element.id, 0, element.content.length - 1)} // Merge all
                              >
                                Merge All
                              </button>
                              <button onClick={() => handleRemoveRow(element.id)}>-</button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;



last getConsolidated
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

function App() {
  const [elements, setElements] = useState([]);
  const [columnLabels, setColumnLabels] = useState(["Column 1", "Column 2", "Column 3"]);

  const handleAddRow = () => {
    setElements([
      ...elements,
      { id: Date.now(), content: Array(columnLabels.length).fill(""), merged: [], mergeInput: "" },
    ]);
  };

  const handleRemoveRow = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  const handleContentChange = (id, colIndex, value) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        const updatedContent = [...element.content];
        updatedContent[colIndex] = value;
        return { ...element, content: updatedContent };
      }
      return element;
    });
    setElements(updatedElements);
  };

  const handleAddColumn = () => {
    setColumnLabels([...columnLabels, `Column ${columnLabels.length + 1}`]);
    setElements(
      elements.map((element) => ({
        ...element,
        content: [...element.content, ""],
      }))
    );
  };

  const handleRemoveColumn = () => {
    if (columnLabels.length > 1) {
      setColumnLabels(columnLabels.slice(0, -1));
      setElements(
        elements.map((element) => ({
          ...element,
          content: element.content.slice(0, -1),
        }))
      );
    }
  };

  const handleMergeColumns = (id, rangeInput) => {
    const [start, end] = rangeInput.split("-").map((x) => parseInt(x, 10) - 1); // Convert to 0-based index
    if (start >= 0 && end >= start && end < columnLabels.length) {
      setElements(
        elements.map((element) => {
          if (element.id === id) {
            const newMerged = [...element.merged, { start, end }];
            return { ...element, merged: newMerged };
          }
          return element;
        })
      );
    }
  };

  const handleMergeInputChange = (id, value) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        return { ...element, mergeInput: value };
      }
      return element;
    });
    setElements(updatedElements);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedElements = Array.from(elements);
    const [moved] = reorderedElements.splice(result.source.index, 1);
    reorderedElements.splice(result.destination.index, 0, moved);
    setElements(reorderedElements);
  };

  const isMerged = (merged, colIndex) =>
    merged.some(([start, end]) => colIndex >= start && colIndex <= end);

  return (
    <div className="App">
      <h1>Dynamic Table Generator</h1>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Left Control Panel */}
        <div>
          <h3>Controls</h3>
          <button onClick={handleAddRow}>Add Row</button>
          <button onClick={handleAddColumn}>Add Column</button>
          <button onClick={handleRemoveColumn} disabled={columnLabels.length <= 1}>
            Remove Column
          </button>
        </div>

        {/* Right Preview Panel */}
        <div>
          <h3>Preview</h3>
          <DragDropContext onDragEnd={handleDragEnd}>
            <table
              border="1"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                tableLayout: "fixed",
              }}
            >
              <thead>
                <tr>
                  <th>Row</th>
                  {columnLabels.map((label, index) => (
                    <th key={index}>{label}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <Droppable droppableId="table-body">
                {(provided) => (
                  <tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {elements.map((element, index) => (
                      <Draggable key={element.id} draggableId={String(element.id)} index={index}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <td>{`Row ${index + 1}`}</td>
                            {element.content.map((cell, colIndex) => {
                              const merged = element.merged;
                              const mergeRange = merged.find(
                                (range) => colIndex >= range.start && colIndex <= range.end
                              );
                              if (mergeRange) {
                                // If the column is merged, render a merged cell
                                if (colIndex === mergeRange.start) {
                                  const colspan = mergeRange.end - mergeRange.start + 1;
                                  return (
                                    <td key={colIndex} colSpan={colspan} style={{ width: "100%" }}>
                                      <input
                                        type="text"
                                        value={cell}
                                        onChange={(e) =>
                                          handleContentChange(element.id, colIndex, e.target.value)
                                        }
                                        style={{ width: "100%" }}
                                      />
                                    </td>
                                  );
                                }
                                return null; // Skip rendering the cell part of the merge
                              }
                              return (
                                <td key={colIndex}>
                                  <input
                                    type="text"
                                    value={cell}
                                    onChange={(e) =>
                                      handleContentChange(element.id, colIndex, e.target.value)
                                    }
                                    style={{ width: "100%" }}
                                  />
                                </td>
                              );
                            })}
                            <td>
                              {/* Merge Input Box */}
                              <input
                                type="text"
                                value={element.mergeInput}
                                onChange={(e) =>
                                  handleMergeInputChange(element.id, e.target.value)
                                }
                                placeholder="e.g., 1-2"
                              />
                              <button
                                onClick={() =>
                                  handleMergeColumns(element.id, element.mergeInput)
                                }
                              >
                                Merge
                              </button>
                              <button onClick={() => handleRemoveRow(element.id)}>-</button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;


final 24/11/2024 Draggable + Row Height
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

function App() {
  const [elements, setElements] = useState([]);
  const [columnLabels, setColumnLabels] = useState(["Column 1", "Column 2", "Column 3"]);
  const [isPreviewMode, setIsPreviewMode] = useState(false); // New state for toggling preview mode

  const handleAddRow = () => {
    setElements([
      ...elements,
      { id: Date.now(), content: Array(columnLabels.length).fill(""), merged: [], mergeInput: "" },
    ]);
  };

  const handleRemoveRow = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  const handleContentChange = (id, colIndex, value) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        const updatedContent = [...element.content];
        updatedContent[colIndex] = value;
        return { ...element, content: updatedContent };
      }
      return element;
    });
    setElements(updatedElements);
  };

  const handleAddColumn = () => {
    setColumnLabels([...columnLabels, `Column ${columnLabels.length + 1}`]);
    setElements(
      elements.map((element) => ({
        ...element,
        content: [...element.content, ""],
      }))
    );
  };

  const handleRemoveColumn = () => {
    if (columnLabels.length > 1) {
      setColumnLabels(columnLabels.slice(0, -1));
      setElements(
        elements.map((element) => ({
          ...element,
          content: element.content.slice(0, -1),
        }))
      );
    }
  };

  const handleMergeColumns = (id, rangeInput) => {
    const [start, end] = rangeInput.split("-").map((x) => parseInt(x, 10) - 1); // Convert to 0-based index
    if (start >= 0 && end >= start && end < columnLabels.length) {
      setElements(
        elements.map((element) => {
          if (element.id === id) {
            const newMerged = [...element.merged, { start, end }];
            return { ...element, merged: newMerged };
          }
          return element;
        })
      );
    }
  };

  const handleMergeInputChange = (id, value) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        return { ...element, mergeInput: value };
      }
      return element;
    });
    setElements(updatedElements);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedElements = Array.from(elements);
    const [moved] = reorderedElements.splice(result.source.index, 1);
    reorderedElements.splice(result.destination.index, 0, moved);
    setElements(reorderedElements);
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode); // Toggle preview mode
  };

  return (
    <div className="App">
      <h1>Dynamic Table Generator</h1>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Left Control Panel */}
        <div>
          <h3>Controls</h3>
          <button onClick={handleAddRow}>Add Row</button>
          <button onClick={handleAddColumn}>Add Column</button>
          <button onClick={handleRemoveColumn} disabled={columnLabels.length <= 1}>
            Remove Column
          </button>
          <button onClick={togglePreviewMode}>
            {isPreviewMode ? "Edit Mode" : "Preview Mode"} {/* Toggle button text */}
          </button>
        </div>

        {/* Right Preview Panel */}
        <div>
          <h3>Preview</h3>
          <DragDropContext onDragEnd={handleDragEnd}>
            <table
              border="1"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                tableLayout: "fixed",
              }}
            >
              <thead>
                {!isPreviewMode && (
                  <tr>
                    <th>Row</th>
                    {columnLabels.map((label, index) => (
                      <th key={index}>{label}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                )}
              </thead>
              <Droppable droppableId="table-body">
                {(provided) => (
                  <tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {elements.map((element, index) => (
                      <Draggable key={element.id} draggableId={String(element.id)} index={index}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {!isPreviewMode && <td>{`Row ${index + 1}`}</td>} {/* Only show in edit mode */}
                            {element.content.map((cell, colIndex) => {
                              const merged = element.merged;
                              const mergeRange = merged.find(
                                (range) => colIndex >= range.start && colIndex <= range.end
                              );
                              if (mergeRange) {
                                // If the column is merged, render a merged cell
                                if (colIndex === mergeRange.start) {
                                  const colspan = mergeRange.end - mergeRange.start + 1;
                                  return (
                                    <td key={colIndex} colSpan={colspan} style={{ width: "100%" }}>
                                      {isPreviewMode ? (
                                        <p>{cell}</p> // Display in preview mode as text
                                      ) : (
                                        <input
                                          type="text"
                                          value={cell}
                                          onChange={(e) =>
                                            handleContentChange(element.id, colIndex, e.target.value)
                                          }
                                          style={{ width: "100%" }}
                                        />
                                      )}
                                    </td>
                                  );
                                }
                                return null; // Skip rendering the cell part of the merge
                              }

                              return (
                                <td key={colIndex}>
                                  {isPreviewMode ? (
                                    <p>{cell}</p> // Display as static text in preview mode
                                  ) : (
                                    <input
                                      type="text"
                                      value={cell}
                                      onChange={(e) =>
                                        handleContentChange(element.id, colIndex, e.target.value)
                                      }
                                      style={{ width: "100%" }}
                                    />
                                  )}
                                </td>
                              );
                            })}
                            {!isPreviewMode && (
                              <td>
                                {/* Merge Input Box */}
                                <input
                                  type="text"
                                  value={element.mergeInput}
                                  onChange={(e) =>
                                    handleMergeInputChange(element.id, e.target.value)
                                  }
                                  placeholder="e.g., 1-2"
                                />
                                <button onClick={() => handleMergeColumns(element.id, element.mergeInput)}>
                                  Merge
                                </button>
                                <button onClick={() => handleRemoveRow(element.id)}>-</button>
                              </td>
                            )}
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;


Last Draggable
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

function App() {
  const [elements, setElements] = useState([]);
  const [columnLabels, setColumnLabels] = useState(["Column 1", "Column 2", "Column 3"]);
  const [isPreviewMode, setIsPreviewMode] = useState(false); // New state for toggling preview mode

  const handleAddRow = () => {
    setElements([
      ...elements,
      { id: Date.now(), content: Array(columnLabels.length).fill(""), merged: [], mergeInput: "" },
    ]);
  };

  const handleRemoveRow = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  const handleContentChange = (id, colIndex, value) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        const updatedContent = [...element.content];
        updatedContent[colIndex] = value;
        return { ...element, content: updatedContent };
      }
      return element;
    });
    setElements(updatedElements);
  };

  const handleAddColumn = () => {
    setColumnLabels([...columnLabels, `Column ${columnLabels.length + 1}`]);
    setElements(
      elements.map((element) => ({
        ...element,
        content: [...element.content, ""],
      }))
    );
  };

  const handleRemoveColumn = () => {
    if (columnLabels.length > 1) {
      setColumnLabels(columnLabels.slice(0, -1));
      setElements(
        elements.map((element) => ({
          ...element,
          content: element.content.slice(0, -1),
        }))
      );
    }
  };

  const handleMergeColumns = (id, rangeInput) => {
    const [start, end] = rangeInput.split("-").map((x) => parseInt(x, 10) - 1); // Convert to 0-based index
    if (start >= 0 && end >= start && end < columnLabels.length) {
      setElements(
        elements.map((element) => {
          if (element.id === id) {
            const newMerged = [...element.merged, { start, end }];
            return { ...element, merged: newMerged };
          }
          return element;
        })
      );
    }
  };

  const handleMergeInputChange = (id, value) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        return { ...element, mergeInput: value };
      }
      return element;
    });
    setElements(updatedElements);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedElements = Array.from(elements);
    const [moved] = reorderedElements.splice(result.source.index, 1);
    reorderedElements.splice(result.destination.index, 0, moved);
    setElements(reorderedElements);
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode); // Toggle preview mode
  };

  return (
    <div className="App">
      <h1>Dynamic Table Generator</h1>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Left Control Panel */}
        <div>
          <h3>Controls</h3>
          <button onClick={handleAddRow}>Add Row</button>
          <button onClick={handleAddColumn}>Add Column</button>
          <button onClick={handleRemoveColumn} disabled={columnLabels.length <= 1}>
            Remove Column
          </button>
          <button onClick={togglePreviewMode}>
            {isPreviewMode ? "Edit Mode" : "Preview Mode"} {/* Toggle button text */}
          </button>
        </div>

        {/* Right Preview Panel */}
        <div>
          <h3>Preview</h3>
          <DragDropContext onDragEnd={handleDragEnd}>
            <table
              border="1"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                tableLayout: "fixed",
              }}
            >
              <thead>
                {!isPreviewMode && (
                  <tr>
                    <th>Row</th>
                    {columnLabels.map((label, index) => (
                      <th key={index}>{label}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                )}
              </thead>
              <Droppable droppableId="table-body">
                {(provided) => (
                  <tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {elements.map((element, index) => (
                      <Draggable key={element.id} draggableId={String(element.id)} index={index}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {!isPreviewMode && <td>{`Row ${index + 1}`}</td>} {/* Only show in edit mode */}
                            {element.content.map((cell, colIndex) => {
                              const merged = element.merged;
                              const mergeRange = merged.find(
                                (range) => colIndex >= range.start && colIndex <= range.end
                              );
                              if (mergeRange) {
                                // If the column is merged, render a merged cell
                                if (colIndex === mergeRange.start) {
                                  const colspan = mergeRange.end - mergeRange.start + 1;
                                  return (
                                    <td key={colIndex} colSpan={colspan} style={{ width: "100%" }}>
                                      {isPreviewMode ? (
                                        <p>{cell}</p> // Display in preview mode as text
                                      ) : (
                                        <input
                                          type="text"
                                          value={cell}
                                          onChange={(e) =>
                                            handleContentChange(element.id, colIndex, e.target.value)
                                          }
                                          style={{ width: "100%" }}
                                        />
                                      )}
                                    </td>
                                  );
                                }
                                return null; // Skip rendering the cell part of the merge
                              }

                              return (
                                <td key={colIndex}>
                                  {isPreviewMode ? (
                                    <p>{cell}</p> // Display as static text in preview mode
                                  ) : (
                                    <input
                                      type="text"
                                      value={cell}
                                      onChange={(e) =>
                                        handleContentChange(element.id, colIndex, e.target.value)
                                      }
                                      style={{ width: "100%" }}
                                    />
                                  )}
                                </td>
                              );
                            })}
                            {!isPreviewMode && (
                              <td>
                                {/* Merge Input Box */}
                                <input
                                  type="text"
                                  value={element.mergeInput}
                                  onChange={(e) =>
                                    handleMergeInputChange(element.id, e.target.value)
                                  }
                                  placeholder="e.g., 1-2"
                                />
                                <button onClick={() => handleMergeColumns(element.id, element.mergeInput)}>
                                  Merge
                                </button>
                                <button onClick={() => handleRemoveRow(element.id)}>-</button>
                              </td>
                            )}
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;


Relationships
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

function App() {
  const [elements, setElements] = useState([]);
  const [columnLabels, setColumnLabels] = useState(["Column 1", "Column 2", "Column 3"]);
  const [relationships, setRelationships] = useState([]);
  const [formulaInput, setFormulaInput] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [editFormula, setEditFormula] = useState(null); // Added state to handle editing a formula

  const handleAddRow = () => {
    setElements([
      ...elements,
      { id: Date.now(), content: Array(columnLabels.length).fill("") },
    ]);
  };

  const handleRemoveRow = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  const handleContentChange = (id, colIndex, value) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        const updatedContent = [...element.content];
        updatedContent[colIndex] = value;
        return { ...element, content: updatedContent };
      }
      return element;
    });
    setElements(updatedElements);
    recalculateDependentCells(id, colIndex, value);
  };

  const recalculateDependentCells = (rowId, colIndex, value) => {
    const updatedElements = [...elements];
    const sourceCell = { rowId, colIndex };

    relationships.forEach((rel) => {
      if (
        (rel.source1.rowId === sourceCell.rowId && rel.source1.colIndex === sourceCell.colIndex) ||
        (rel.source2?.rowId === sourceCell.rowId && rel.source2?.colIndex === sourceCell.colIndex)
      ) {
        const targetRow = updatedElements.find((el) => el.id === rel.target.rowId);
        if (targetRow) {
          const value1 = parseFloat(
            updatedElements.find((el) => el.id === rel.source1.rowId)?.content[rel.source1.colIndex] || 0
          );
          const value2 = rel.source2
            ? parseFloat(
                updatedElements.find((el) => el.id === rel.source2.rowId)?.content[rel.source2.colIndex] || 0
              )
            : parseFloat(rel.constant2 || 0);

          const result = rel.operation ? eval(`${value1} ${rel.operation} ${value2}`) : value1;
          targetRow.content[rel.target.colIndex] = String(result);
        }
      }
    });

    setElements(updatedElements);
  };

  const addRelationship = (formula) => {
    const regex =
      /^\((\d+),(\d+)\)=(\((\d+),(\d+)\)|(\d+))([\+\-\*\/])?(\((\d+),(\d+)\)|(\d+))?$/;
    const match = formula.match(regex);

    if (match) {
      const [
        _,
        targetRow,
        targetCol,
        source1,
        s1Row,
        s1Col,
        constant1,
        operation,
        source2,
        s2Row,
        s2Col,
        constant2,
      ] = match;

      const newRelationship = {
        target: { rowId: elements[parseInt(targetRow, 10) - 1]?.id, colIndex: parseInt(targetCol, 10) - 1 },
        source1: source1
          ? { rowId: elements[parseInt(s1Row, 10) - 1]?.id, colIndex: parseInt(s1Col, 10) - 1 }
          : null,
        source2: source2
          ? { rowId: elements[parseInt(s2Row, 10) - 1]?.id, colIndex: parseInt(s2Col, 10) - 1 }
          : null,
        constant1: constant1 || null,
        constant2: constant2 || null,
        operation: operation || null,
      };

      setRelationships([...relationships, newRelationship]);
    } else {
      alert("Invalid formula syntax. Example: (5,4)=(3,2) or (5,4)=(3,2)+(1,1)");
    }
  };

  const handleEditRelationship = (index) => {
    const relationship = relationships[index];
    setEditFormula(
      `(${elements.findIndex((el) => el.id === relationship.target.rowId) + 1},${
        relationship.target.colIndex + 1
      })=(${
        elements.findIndex((el) => el.id === relationship.source1.rowId) + 1
      },${relationship.source1.colIndex + 1})${
        relationship.operation
          ? ` ${relationship.operation} (${elements.findIndex((el) => el.id === relationship.source2?.rowId) + 1},${
              relationship.source2?.colIndex + 1
            })`
          : ""
      }`
    );
    // setEditFormulaIndex(index);
  };

  const handleDeleteRelationship = (index) => {
    const updatedRelationships = relationships.filter((_, i) => i !== index);
    setRelationships(updatedRelationships);
  };

  const handleUpdateRelationship = () => {
    const updatedRelationships = [...relationships];
    const regex =
      /^\((\d+),(\d+)\)=(\((\d+),(\d+)\)|(\d+))([\+\-\*\/])?(\((\d+),(\d+)\)|(\d+))?$/;
    const match = editFormula.match(regex);

    if (match) {
      const [
        _,
        targetRow,
        targetCol,
        source1,
        s1Row,
        s1Col,
        constant1,
        operation,
        source2,
        s2Row,
        s2Col,
        constant2,
      ] = match;

      updatedRelationships[editFormulaIndex] = {
        target: { rowId: elements[parseInt(targetRow, 10) - 1]?.id, colIndex: parseInt(targetCol, 10) - 1 },
        source1: source1
          ? { rowId: elements[parseInt(s1Row, 10) - 1]?.id, colIndex: parseInt(s1Col, 10) - 1 }
          : null,
        source2: source2
          ? { rowId: elements[parseInt(s2Row, 10) - 1]?.id, colIndex: parseInt(s2Col, 10) - 1 }
          : null,
        constant1: constant1 || null,
        constant2: constant2 || null,
        operation: operation || null,
      };
      setRelationships(updatedRelationships);
      setEditFormula(null);
    } else {
      alert("Invalid formula syntax.");
    }
  };

  const handleAddColumn = () => {
    setColumnLabels([...columnLabels, `Column ${columnLabels.length + 1}`]);
    setElements(
      elements.map((element) => ({
        ...element,
        content: [...element.content, ""],
      }))
    );
  };

  const handleRemoveColumn = () => {
    if (columnLabels.length > 1) {
      setColumnLabels(columnLabels.slice(0, -1));
      setElements(
        elements.map((element) => ({
          ...element,
          content: element.content.slice(0, -1),
        }))
      );
    }
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <div className="App">
      <h1>Dynamic Table Generator</h1>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        <div>
          <h3>Controls</h3>
          <button onClick={handleAddRow}>Add Row</button>
          <button onClick={handleAddColumn}>Add Column</button>
          <button onClick={handleRemoveColumn} disabled={columnLabels.length <= 1}>
            Remove Column
          </button>
          <button onClick={togglePreviewMode}>
            {isPreviewMode ? "Edit Mode" : "Preview Mode"}
          </button>

          <div style={{ marginTop: "20px" }}>
            <h4>Add Relationship</h4>
            <input
              placeholder="e.g., (5,4)=(3,2)"
              value={formulaInput}
              onChange={(e) => setFormulaInput(e.target.value)}
            />
            <button
              onClick={() => {
                addRelationship(formulaInput);
                setFormulaInput("");
              }}
            >
              Add Formula
            </button>
          </div>

          <div>
            <h4>Relationships</h4>
            {relationships.map((rel, index) => (
              <div key={index}>
                <span>
                  Target: ({elements.findIndex((el) => el.id === rel.target.rowId) + 1},{" "}
                  {rel.target.colIndex + 1}) = ({elements.findIndex((el) => el.id === rel.source1.rowId) + 1},{" "}
                  {rel.source1.colIndex + 1})
                  {rel.operation
                    ? ` ${rel.operation} (${elements.findIndex((el) => el.id === rel.source2?.rowId) + 1},${
                        rel.source2?.colIndex + 1
                      })`
                    : ""}
                </span>
                <button onClick={() => handleEditRelationship(index)}>Edit</button>
                <button onClick={() => handleDeleteRelationship(index)}>Delete</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3>Table</h3>
          <DragDropContext onDragEnd={() => {}}>
            <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                {!isPreviewMode && (
                  <tr>
                    <th>Row</th>
                    {columnLabels.map((label, index) => (
                      <th key={index}>{label}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                )}
              </thead>
              <Droppable droppableId="table-body">
                {(provided) => (
                  <tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {elements.map((element, rowIndex) => (
                      <Draggable key={element.id} draggableId={String(element.id)} index={rowIndex}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {!isPreviewMode && <td>{`Row ${rowIndex + 1}`}</td>}
                            {element.content.map((cell, colIndex) => (
                              <td key={colIndex}>
                                {isPreviewMode ? (
                                  <p>{cell}</p>
                                ) : (
                                  <input
                                    type="text"
                                    value={cell}
                                    onChange={(e) =>
                                      handleContentChange(element.id, colIndex, e.target.value)
                                    }
                                  />
                                )}
                              </td>
                            ))}
                            {!isPreviewMode && (
                              <td>
                                <button onClick={() => handleRemoveRow(element.id)}>-</button>
                              </td>
                            )}
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
        </div>
      </div>

      {editFormula && (
        <div>
          <h4>Edit Formula</h4>
          <input
            type="text"
            value={editFormula}
            onChange={(e) => setEditFormula(e.target.value)}
          />
          <button onClick={handleUpdateRelationship}>Update Formula</button>
        </div>
      )}
    </div>
  );
}

export default App;

Realtionshjjps 2
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

function App() {
  const [elements, setElements] = useState([]);
  const [columnLabels, setColumnLabels] = useState(["Column 1", "Column 2", "Column 3"]);
  const [formulaInput, setFormulaInput] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [editFormula, setEditFormula] = useState(null); // Added state to handle editing a formula
  const [editFormulaIndex, setEditFormulaIndex] = useState(null); // Track index for editing

  const handleAddRow = () => {
    setElements([
      ...elements,
      { id: Date.now(), content: Array(columnLabels.length).fill(""), relationships: [] },
    ]);
  };

  const handleRemoveRow = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  const handleContentChange = (id, colIndex, value) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        const updatedContent = [...element.content];
        updatedContent[colIndex] = value;
        return { ...element, content: updatedContent };
      }
      return element;
    });
    setElements(updatedElements);
    recalculateDependentCells(id, colIndex, value);
  };

  const recalculateDependentCells = (rowId, colIndex, value) => {
    const updatedElements = [...elements];
    const sourceCell = { rowId, colIndex };

    // Recalculate dependent cells based on relationships
    updatedElements.forEach((element) => {
      element.relationships.forEach((rel) => {
        if (
          (rel.source1.rowId === sourceCell.rowId && rel.source1.colIndex === sourceCell.colIndex) ||
          (rel.source2?.rowId === sourceCell.rowId && rel.source2?.colIndex === sourceCell.colIndex)
        ) {
          const targetRow = updatedElements.find((el) => el.id === rel.target.rowId);
          if (targetRow) {
            const value1 = parseFloat(
              updatedElements.find((el) => el.id === rel.source1.rowId)?.content[rel.source1.colIndex] || 0
            );
            const value2 = rel.source2
              ? parseFloat(
                  updatedElements.find((el) => el.id === rel.source2.rowId)?.content[rel.source2.colIndex] || 0
                )
              : parseFloat(rel.constant2 || 0);

            const result = rel.operation ? eval(`${value1} ${rel.operation} ${value2}`) : value1;
            targetRow.content[rel.target.colIndex] = String(result);
          }
        }
      });
    });

    setElements(updatedElements);
  };

  const addRelationship = (formula) => {
    const regex =
      /^\((\d+),(\d+)\)=(\((\d+),(\d+)\)|(\d+))([\+\-\*\/])?(\((\d+),(\d+)\)|(\d+))?$/;
    const match = formula.match(regex);

    if (match) {
      const [
        _,
        targetRow,
        targetCol,
        source1,
        s1Row,
        s1Col,
        constant1,
        operation,
        source2,
        s2Row,
        s2Col,
        constant2,
      ] = match;

      const newRelationship = {
        target: { rowId: elements[parseInt(targetRow, 10) - 1]?.id, colIndex: parseInt(targetCol, 10) - 1 },
        source1: source1
          ? { rowId: elements[parseInt(s1Row, 10) - 1]?.id, colIndex: parseInt(s1Col, 10) - 1 }
          : null,
        source2: source2
          ? { rowId: elements[parseInt(s2Row, 10) - 1]?.id, colIndex: parseInt(s2Col, 10) - 1 }
          : null,
        constant1: constant1 || null,
        constant2: constant2 || null,
        operation: operation || null,
      };

      const updatedElements = elements.map((el) =>
        el.id === newRelationship.target.rowId
          ? { ...el, relationships: [...el.relationships, newRelationship] }
          : el
      );

      setElements(updatedElements);
    } else {
      alert("Invalid formula syntax. Example: (5,4)=(3,2) or (5,4)=(3,2)+(1,1)");
    }
  };

  const handleEditRelationship = (rowId, index) => {
    const relationship = elements.find((el) => el.id === rowId).relationships[index];
    setEditFormula(
      `(${elements.findIndex((el) => el.id === relationship.target.rowId) + 1},${
        relationship.target.colIndex + 1
      })=(${
        elements.findIndex((el) => el.id === relationship.source1.rowId) + 1
      },${relationship.source1.colIndex + 1})${
        relationship.operation
          ? ` ${relationship.operation} (${elements.findIndex((el) => el.id === relationship.source2?.rowId) + 1},${
              relationship.source2?.colIndex + 1
            })`
          : ""
      }`
    );
    setEditFormulaIndex(index);
  };

  const handleDeleteRelationship = (rowId, index) => {
    const updatedElements = elements.map((el) => {
      if (el.id === rowId) {
        const updatedRelationships = el.relationships.filter((_, i) => i !== index);
        return { ...el, relationships: updatedRelationships };
      }
      return el;
    });
    setElements(updatedElements);
  };

  const handleUpdateRelationship = () => {
    const updatedElements = [...elements];
    const regex =
      /^\((\d+),(\d+)\)=(\((\d+),(\d+)\)|(\d+))([\+\-\*\/])?(\((\d+),(\d+)\)|(\d+))?$/;
    const match = editFormula.match(regex);

    if (match) {
      const [
        _,
        targetRow,
        targetCol,
        source1,
        s1Row,
        s1Col,
        constant1,
        operation,
        source2,
        s2Row,
        s2Col,
        constant2,
      ] = match;

      updatedElements[editFormulaIndex] = {
        target: { rowId: elements[parseInt(targetRow, 10) - 1]?.id, colIndex: parseInt(targetCol, 10) - 1 },
        source1: source1
          ? { rowId: elements[parseInt(s1Row, 10) - 1]?.id, colIndex: parseInt(s1Col, 10) - 1 }
          : null,
        source2: source2
          ? { rowId: elements[parseInt(s2Row, 10) - 1]?.id, colIndex: parseInt(s2Col, 10) - 1 }
          : null,
        constant1: constant1 || null,
        constant2: constant2 || null,
        operation: operation || null,
      };
      setElements(updatedElements);
      setEditFormula(null);
    } else {
      alert("Invalid formula syntax.");
    }
  };

  const handleAddColumn = () => {
    setColumnLabels([...columnLabels, `Column ${columnLabels.length + 1}`]);
    setElements(
      elements.map((element) => ({
        ...element,
        content: [...element.content, ""],
      }))
    );
  };

  const handleRemoveColumn = () => {
    if (columnLabels.length > 1) {
      setColumnLabels(columnLabels.slice(0, -1));
      setElements(
        elements.map((element) => ({
          ...element,
          content: element.content.slice(0, -1),
        }))
      );
    }
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <div className="App">
      <h1>Dynamic Table Generator</h1>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        <div>
          <h3>Controls</h3>
          <button onClick={handleAddRow}>Add Row</button>
          <button onClick={handleAddColumn}>Add Column</button>
          <button onClick={handleRemoveColumn} disabled={columnLabels.length <= 1}>
            Remove Column
          </button>
          <button onClick={togglePreviewMode}>
            {isPreviewMode ? "Edit Mode" : "Preview Mode"}
          </button>

          <div style={{ marginTop: "20px" }}>
            <h4>Add Relationship</h4>
            <input
              placeholder="e.g. (1,1)=(2,2)+(3,3)"
              value={formulaInput}
              onChange={(e) => setFormulaInput(e.target.value)}
            />
            <button onClick={() => addRelationship(formulaInput)}>Add Formula</button>
          </div>
        </div>

        <div>
          <h3>Columns</h3>
          {columnLabels.map((label, colIndex) => (
            <div key={colIndex}>{label}</div>
          ))}
        </div>
      </div>

      <DragDropContext>
        <Droppable droppableId="droppable">
          {(provided) => (
            <table {...provided.droppableProps} ref={provided.innerRef}>
              <tbody>
                {elements.map((row, rowIndex) => (
                  <tr key={row.id}>
                    {row.content.map((cellContent, colIndex) => (
                      <td key={colIndex}>
                        <input
                          value={cellContent}
                          onChange={(e) => handleContentChange(row.id, colIndex, e.target.value)}
                          readOnly={isPreviewMode}
                        />
                      </td>
                    ))}
                    <td>
                      <button onClick={() => handleRemoveRow(row.id)}>Remove Row</button>
                    </td>
                    <td>
                      <button onClick={() => handleEditRelationship(row.id, editFormulaIndex)}>
                        Edit Formula
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteRelationship(row.id, editFormulaIndex)}>
                        Delete Formula
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>

      {editFormula && (
        <div>
          <h3>Edit Formula</h3>
          <input
            value={editFormula}
            onChange={(e) => setEditFormula(e.target.value)}
            placeholder="e.g. (1,1)=(2,2)+(3,3)"
          />
          <button onClick={handleUpdateRelationship}>Update Formula</button>
        </div>
      )}
    </div>
  );
}

export default App;



// Color + Draggeable Working+ Font size + Font Color
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

function App() {
  const [elements, setElements] = useState([{ pageNo: 1, rows: [], columns: ["Column 1", "Column 2", "Column 3"] }]);
  const [activeTab, setActiveTab] = useState(0); // Track the active tab index
  const [isPreviewMode, setIsPreviewMode] = useState(false); // State for toggle preview mode

  // Function to add a regular row
  const handleAddRow = () => {
    const updatedElements = [...elements];
    updatedElements[activeTab].rows.push({
      id: Date.now(),
      content: Array(updatedElements[activeTab].columns.length).fill(""),
      type: "row",  // Normal row type
      merged: [],
      mergeInput: "",
      rowColor: "#ffffff", // Default row color (white)
      rowTextColor: "#000000", // Default text color (black)
      rowTextSize: "16px", // Default text size (16px)
    });
    setElements(updatedElements);
  };

  // Function to handle row color change
  const handleRowColorChange = (id, color) => {
    const updatedElements = [...elements];
    const updatedRow = updatedElements[activeTab].rows.find((row) => row.id === id);
    if (updatedRow) {
      updatedRow.rowColor = color; // Update the row color
    }
    setElements(updatedElements);
  };

  // Function to handle text color change
  const handleTextColorChange = (id, color) => {
    const updatedElements = [...elements];
    const updatedRow = updatedElements[activeTab].rows.find((row) => row.id === id);
    if (updatedRow) {
      updatedRow.rowTextColor = color; // Update the text color
    }
    setElements(updatedElements);
  };

  // Function to handle text size change
  const handleTextSizeChange = (id, size) => {
    const updatedElements = [...elements];
    const updatedRow = updatedElements[activeTab].rows.find((row) => row.id === id);
    if (updatedRow) {
      updatedRow.rowTextSize = size + "px"; // Ensure the size includes the "px" unit
    }
    setElements(updatedElements);
  };

  const handleRemoveRow = (id) => {
    const updatedElements = [...elements];
    updatedElements[activeTab].rows = updatedElements[activeTab].rows.filter((row) => row.id !== id);
    setElements(updatedElements);
  };

  const handleContentChange = (id, colIndex, value) => {
    const updatedElements = [...elements];
    const updatedRow = updatedElements[activeTab].rows.find((row) => row.id === id);
    if (updatedRow && updatedRow.type === "row") { // Only allow content change for normal rows
      updatedRow.content[colIndex] = value;
    }
    setElements(updatedElements);
  };

  const handleAddColumn = () => {
    const updatedElements = [...elements];
    updatedElements[activeTab].columns.push(`Column ${updatedElements[activeTab].columns.length + 1}`);
    updatedElements[activeTab].rows.forEach((row) => row.content.push(""));
    setElements(updatedElements);
  };

  const handleRemoveColumn = () => {
    if (elements[activeTab].columns.length > 1) {
      const updatedElements = [...elements];
      updatedElements[activeTab].columns.pop();
      updatedElements[activeTab].rows.forEach((row) => row.content.pop());
      setElements(updatedElements);
    }
  };

  const handleMergeColumns = (id, rangeInput) => {
    const [start, end] = rangeInput.split("-").map((x) => parseInt(x, 10) - 1); // Convert to 0-based index
    if (start >= 0 && end >= start && end < elements[activeTab].columns.length) {
      const updatedElements = [...elements];
      const updatedRow = updatedElements[activeTab].rows.find((row) => row.id === id);
      if (updatedRow) {
        updatedRow.merged.push({ start, end });
      }
      setElements(updatedElements);
    }
  };

  const handleMergeInputChange = (id, value) => {
    const updatedElements = [...elements];
    const updatedRow = updatedElements[activeTab].rows.find((row) => row.id === id);
    if (updatedRow) {
      updatedRow.mergeInput = value;
    }
    setElements(updatedElements);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedRows = [...elements[activeTab].rows];
    const [moved] = reorderedRows.splice(result.source.index, 1);
    reorderedRows.splice(result.destination.index, 0, moved);
    const updatedElements = [...elements];
    updatedElements[activeTab].rows = reorderedRows;
    setElements(updatedElements);
  };

  const handleAddTab = () => {
    const newTab = {
      pageNo: elements.length + 1,
      rows: [],
      columns: ["Column 1", "Column 2", "Column 3"],
    };
    setElements([...elements, newTab]);
  };

  const switchTab = (index) => {
    setActiveTab(index);
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode); // Toggle preview mode
  };

  return (
    <div className="App">
      <h1>Dynamic Table Generator</h1>

      {/* Tab Controls */}
      <div style={{ marginBottom: "20px" }}>
        {elements.map((tab, index) => (
          <button key={index} onClick={() => switchTab(index)}>
            Page {tab.pageNo}
          </button>
        ))}
        <button onClick={handleAddTab}>Add New Tab</button>
      </div>

      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Left Control Panel */}
        <div>
          <h3>Controls</h3>
          <button onClick={handleAddRow}>Add Row</button>
          <button onClick={handleAddColumn}>Add Column</button>
          <button onClick={handleRemoveColumn} disabled={elements[activeTab].columns.length <= 1}>
            Remove Column
          </button>
          <button onClick={togglePreviewMode}>
            {isPreviewMode ? "Edit Mode" : "Preview Mode"} {/* Toggle button text */}
          </button>
        </div>

        {/* Right Preview/Editing Panel */}
        <div>
          <h3>Page {elements[activeTab].pageNo}</h3>
          <DragDropContext onDragEnd={handleDragEnd}>
            <table
              border="1"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                tableLayout: "fixed",
              }}
            >
              <thead>
                {!isPreviewMode && (  // Only show row labels and column headers in edit mode
                  <tr>
                    <th>Row</th>
                    {elements[activeTab].columns.map((label, index) => (
                      <th key={index}>{label}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                )}
              </thead>
              <Droppable droppableId="table-body">
                {(provided) => (
                  <tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {elements[activeTab].rows.map((row, index) => (
                      <Draggable key={row.id} draggableId={String(row.id)} index={index}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ 
                              backgroundColor: row.rowColor,  // Apply selected color to the row
                              color: row.rowTextColor,  // Apply selected text color
                            }}
                          >
                            {!isPreviewMode && <td>{`Row ${index + 1}`}</td>} {/* Only show in edit mode */}
                            {row.type === "heading" ? (
                              // If it's a heading row, display it as a heading
                              row.content.map((content, colIndex) => (
                                <td key={colIndex} colSpan={elements[activeTab].columns.length}>
                                  <strong>{content}</strong>
                                </td>
                              ))
                            ) : row.type === "space" ? (
                              // If it's a space row, merge all columns
                              <td
                                colSpan={elements[activeTab].columns.length}
                                style={{
                                  textAlign: "center",
                                  fontSize: row.rowTextSize, // Apply text size here in preview mode
                                }}
                              >
                                Space
                              </td>
                            ) : (
                              // Render normal rows
                              row.content.map((cell, colIndex) => {
                                const merged = row.merged;
                                const mergeRange = merged.find(
                                  (range) => colIndex >= range.start && colIndex <= range.end
                                );
                                if (mergeRange) {
                                  if (colIndex === mergeRange.start) {
                                    const colspan = mergeRange.end - mergeRange.start + 1;
                                    return (
                                      <td
                                        key={colIndex}
                                        colSpan={colspan}
                                        style={{
                                          // fontSize: isPreviewMode ? row.rowTextSize : "inherit", // Apply text size only in preview mode
                                        }}
                                      >
                                        {isPreviewMode ? (
                                          <p style={{fontSize: row.rowTextSize}}>{cell}</p> // Display as text in preview mode
                                        ) : (
                                          <input
                                            type="text"
                                            value={cell}
                                            onChange={(e) =>
                                              handleContentChange(row.id, colIndex, e.target.value)
                                            }
                                            style={{ width: "100%" }}
                                          />
                                        )}
                                      </td>
                                    );
                                  }
                                  return null; // Skip rendering merged cells
                                }

                                return (
                                  <td
                                    key={colIndex}
                                    style={{
                                      fontSize: isPreviewMode ? row.rowTextSize : "inherit", // Apply text size only in preview mode
                                    }}
                                  >
                                    {isPreviewMode ? (
                                      <p style={{fontSize: row.rowTextSize}} >{cell}</p> // Display as static text in preview mode
                                    ) : (
                                      <input
                                        type="text"
                                        value={cell}
                                        onChange={(e) =>
                                          handleContentChange(row.id, colIndex, e.target.value)
                                        }
                                        style={{ width: "100%" }}
                                      />
                                    )}
                                  </td>
                                );
                              })
                            )}

                            {!isPreviewMode && (
                              <td>
                                {/* Row Color Picker */}
                                <input
                                  type="color"
                                  value={row.rowColor}
                                  onChange={(e) => handleRowColorChange(row.id, e.target.value)}
                                />
                                {/* Text Color Picker */}
                                <input
                                  type="color"
                                  value={row.rowTextColor}
                                  onChange={(e) => handleTextColorChange(row.id, e.target.value)}
                                />
                                {/* Text Size Picker */}
                                <input
                                  type="number"
                                  value={parseInt(row.rowTextSize, 10)}
                                  onChange={(e) => handleTextSizeChange(row.id, e.target.value)}
                                  style={{ width: "60px" }}
                                />
                                {/* Merge Input Box */}
                                <input
                                  type="text"
                                  value={row.mergeInput}
                                  onChange={(e) => handleMergeInputChange(row.id, e.target.value)}
                                  placeholder="e.g., 1-2"
                                />
                                <button onClick={() => handleMergeColumns(row.id, row.mergeInput)}>
                                  Merge
                                </button>
                                <button onClick={() => handleRemoveRow(row.id)}>-</button>
                              </td>
                            )}
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;


// 
import React from 'react'

const viewFeasibility = () => {
  return (
    <div>viewFeasibility</div>
  )
}

/*************  ✨ Codeium Command 🌟  *************/
const applyWatermark = async (pdfFile, watermarkFile) => {
  if (!pdfFile) return;

  // Read the uploaded PDF file
  const pdfBytes = await pdfFile.arrayBuffer();

  // Load the PDF into pdf-lib
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Load the watermark image
  const watermarkImage = await fetch(watermarkFile)
    .then((res) => res.arrayBuffer());

  const watermark = await pdfDoc.embedPng(watermarkImage);
  const watermarkWidth = watermark.width / 3; // Scale watermark
  const watermarkHeight = watermark.height / 3;

  const pages = pdfDoc.getPages();
  const { width, height } = pages[0].getSize();

  // Create a canvas to adjust opacity
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // Add watermark to each page
  pages.forEach((page) => {
    const img = new Image();
    img.src = URL.createObjectURL(new Blob([watermarkImage], { type: 'image/png' }));

    const dataUrl = canvas.toDataURL('image/png');
    img.onload = () => {
      // Canvas
      // Create a canvas to adjust opacity
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set canvas size to the image size
      canvas.width = img.width;
      canvas.height = img.height;

      // Set opacity (0.0 to 1.0)
      ctx.globalAlpha = 0.2; // Set opacity to 20%

      // Draw the image onto the canvas with opacity
      ctx.drawImage(img, 0, 0);

      // Convert canvas to data URL (base64 image)
      const dataUrl = canvas.toDataURL('image/png');
      const centerX = (width - watermarkWidth) / 2;
      const centerY = (height - watermarkHeight) / 2;
      page.drawImage(dataUrl, 'PNG', 0.2, 2, 0, 0, '', 'SLOW');
    };
  });

  // Save the PDF with watermark on all pages
  const pdfBytesWithWatermark = await pdfDoc.save();
  const blob = new Blob([pdfBytesWithWatermark], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'watermarked.pdf');
  document.body.appendChild(link);
  link.click();
};

export default viewFeasibility
/******  22f00370-eb3f-455e-b3e7-9d3b5d80982e  *******/</br>



const addWatermark = async (pdfBuffer) => {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();

  const watermarkImage = await fetch('./b.png')
    .then(res => res.arrayBuffer());

  const watermark = await pdfDoc.embedPng(watermarkImage);
  const watermarkWidth = watermark.width;
  const watermarkHeight = watermark.height;

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    const x = (width - watermarkWidth) / 2;
    const y = (height - watermarkHeight) / 2;
    page.drawImage(watermark, {
      x,
      y,
      width: watermarkWidth,
      height: watermarkHeight,
      opacity: 0.2,
    });
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

const viewFeasibility = () => {
  const [pdfFile, setPdfFile] = React.useState(null);

  const handleChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const pdfBytes = await addWatermark(await pdfFile.arrayBuffer());
    const url = window.URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'output.pdf'); //or any other extension
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit">Add Watermark</button>
      </form>
    </div>
  );
};
export default viewFeasibility



//</br></br>
Final 
import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
// import watermarkImg from "./a.png"; // Import the image directly

const ImageWatermarkPDF = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const applyWatermark = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF to apply the watermark.");
      return;
    }

    try {
      const pdfReader = new FileReader();

      pdfReader.onload = async () => {
        const pdfBytes = new Uint8Array(pdfReader.result);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Fetch the image from the source
        const imageResponse = await fetch('./a.png');
        const imageBytes = await imageResponse.arrayBuffer();
        const image = await pdfDoc.embedPng(imageBytes); // Embed PNG, or use `embedJpg` for JPG

        const imageDims = image.scale(0.8); // Scale down the image
        const pages = pdfDoc.getPages();

        for (const page of pages) {
          const { width, height } = page.getSize();

          page.drawImage(image, {
            x: width / 2 - imageDims.width / 2,
            y: height / 2 - imageDims.height / 2,
            width: imageDims.width,
            height: imageDims.height,
            opacity: 0.3, // Transparency for watermark
          });
        }

        const pdfDataUri = await pdfDoc.save();
        const blob = new Blob([pdfDataUri], { type: "application/pdf" });
        saveAs(blob, "watermarked_with_image.pdf");
      };

      pdfReader.readAsArrayBuffer(pdfFile);
    } catch (error) {
      console.error("Error applying watermark:", error);
      alert("An error occurred while processing the PDF.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>PDF Image Watermark Tool</h2>
      <div>
        <label>
          Upload PDF:{" "}
          <input type="file" accept="application/pdf" onChange={handlePdfChange} />
        </label>
      </div>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={applyWatermark}
      >
        Apply Watermark
      </button>
    </div>
  );
};

export default ImageWatermarkPDF;
