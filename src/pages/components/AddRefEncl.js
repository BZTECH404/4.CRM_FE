import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../../api";
import Swal from 'sweetalert2'
import { Breadcrumb, Col, Row, Form, Card, Button, Table, Container, InputGroup, Modal, Tab, Nav } from '@themesberg/react-bootstrap';
import { ToastContainer, toast } from 'react-toastify/dist/react-toastify.cjs.development';

import { triggerFunction, getPredefinedUrl } from '../../components/SignedUrl';

export default ({ corr, allcorr, setcorr, showModal2, setShowModal2 }) => {

  const [texthistory, setaddtexthistory] = useState("")
  let [selectedFiles, setSelectedFiles] = useState([])
  let [stop, setStop] = useState(true)
  let [filename, setfilename] = useState("")
  let [temp, settemp] = useState("")
  let [refto, setrefto] = useState([])
  let [enclose, setenclose] = useState([])
  let [selectedvalue, setSelectedValue] = useState("")

  useEffect(() => {
    setrefto([])
    setenclose([])
    // console.log(corr.refto)
    if (corr.refto) {
      setrefto(corr.refto)
    }
    if (corr.enclose) {
      setenclose(corr.enclosed)
    }

  }, [showModal2])

  const handleaddhistorysubmit = async (e) => {
    e.preventDefault()
    console.log("hi")
    // first Api for Updating References
    let body={
      refto
    }
    try{
      const response = await axios.put(`${baseurl}/correspondence/updateref/${corr._id}`, body);

    }
    catch(error){
      console.log(error)
    }
    let body2={
      enclose
    }

    // Second api for updating enlcosures
    try{
      const response = await axios.put(`${baseurl}/correspondence/updateenclosure/${corr._id}`, body);

    }
    catch(error){
      console.log(error)
    }

    // // Third Api for Updating Both
    // try{
    //   const response = await axios.put(`${baseurl}/correspondence/updatefrom/${corr._id}`, body);

    // }
    // catch(error){
    //   console.log(error)
    // }


    // let body = {
    //   description: texthistory,
    //   filename: filename,
    //   file: selectedFiles.length != 0 ? getPredefinedUrl(selectedFiles[0][1]) : null

    // }
    // // console.log(body,corr)

    // try {
    //   const response = await axios.post(`${baseurl}/correspondence/node/${corr._id}`, body);
    //   console.log(response.data);

    //   toast.success("History Added Succesfully");
    //   setShowModal2(false);
    //   setaddtexthistory("")
    // } catch (error) {
    //   //console.error(error);
    //   toast.error("Failed to add history");
    // }
  }

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
        // setSelectedFile(file);
        // setFileExtension(fileExtension);

        const arr1 = await triggerFunction(fileExtension, corr.projectname);
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
  // for Refto
  const handleReftoChange = (e) => {
    console.log(e.target.value)
    // const selectedOption = {
    //   id: e.target.value,
    //   name: e.target.selectedOptions[0].text,
    // };
    if(e.target.value==corr._id){
      toast.error("Can't Refer Self")
      return;
    }
    setSelectedValue(e.target.value);
    for (let i = 0; i < refto.length; i++) {
      if (refto[i].id === e.target.value) {
        toast.error("Already Added")
        return;
      }
    }
    setrefto((prevSelected) => [...prevSelected, e.target.value]);
    toast.success("Added Successfully");
  };

  // for enclosure
  const handleenclosureChange = (e) => {
    console.log(e.target.value)
    // const selectedOption = {
    //   id: e.target.value,
    //   name: e.target.selectedOptions[0].text,
    // };
    setSelectedValue(e.target.value);
    for (let i = 0; i < enclose.length; i++) {
      if (enclose[i].id === e.target.value) {
        toast.error("Already Added")
        return;
      }
    }
    setenclose((prevSelected) => [...prevSelected, e.target.value]);
    toast.success("Added Successfully");
  };

  const handleRemove = (id) => {
    console.log(id)
    setrefto((prevSelected) => prevSelected.filter((item) => item !== id));
  };

  return (
    <>
      <ToastContainer />
      <Modal className="#modal-content" style={{ width: "100%" }} show={showModal2} onHide={() => setShowModal2(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Add Correspondence History
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* Add File */}
          {/* <Form.Group id="Project Image" className="mb-4">
                    <Form.Label>File</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                        </InputGroup.Text>
                        <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        placeholder="Upload Image"
                        />
                    </InputGroup>
            </Form.Group> */}

          {/* Reference to */}
          <Form.Group id="pname" className="mb-4">

            <Form.Label>Reference to</Form.Label>
            <InputGroup>
              <InputGroup.Text>
              </InputGroup.Text>
              <Form.Select value={temp} onChange={(e) => handleReftoChange(e)}>
                <option value="">Select Option</option>
                {/* Mapping through the arr array to generate options */}
                {allcorr.map((option, index) => (
                  <option key={index} value={option._id}>{option.letterno}-{option.subject}</option>
                ))}
              </Form.Select>
            </InputGroup>
            <Form.Label>
              <ul style={{ listStyleType: 'none' }}>
                {(refto) && (refto).map((document, index) => (
                  <li key={index} style={{ marginBottom: '5px', paddingLeft: '20px', textIndent: '-15px' }}>
                    • <a style={{ textDecoration: "underline" }} href={document.url}>{document}</a>
                    <button onClick={() => handleRemove(document)} style={{ marginLeft: '5px' }}>
                    x
                    </button>
                  </li>
                ))}
              </ul>
            </Form.Label>
            
          </Form.Group>
          {/* Reference from */}
          <Form.Group id="pname" className="mb-4">
            <Form.Label>Enclosed</Form.Label>
            <InputGroup>
              <InputGroup.Text>
              </InputGroup.Text>
              <Form.Select value={temp} onChange={(e) => handleenclosureChange(e)}>
                <option value="">Select Option</option>
                {/* Mapping through the arr array to generate options */}
                {allcorr.map((option, index) => (
                  <option key={index} value={option._id}>{option.letterno}-{option.subject}</option>
                ))}
              </Form.Select>
            </InputGroup>
            <Form.Label>
              <ul style={{ listStyleType: 'none' }}>
                {(enclose) && (enclose).map((document, index) => (
                  <li key={index} style={{ marginBottom: '5px', paddingLeft: '20px', textIndent: '-15px' }}>
                    • <a style={{ textDecoration: "underline" }} href={document.url}>{document}</a>
                  </li>
                ))}
              </ul>
            </Form.Label>
         
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal2(false)}>
            Cancel
          </Button>
          <Button style={{ backgroundColor: "greenyellow" }} variant="secondary" onClick={(e) => handleaddhistorysubmit(e)}>
            Save Changes
          </Button> 
        </Modal.Footer>
      </Modal>
    </>

  )
}


