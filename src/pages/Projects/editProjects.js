import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faQuran, faTrash, faAngleLeft, faAngleRight, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Col, Row, Form, Card, Button, Table, Container, InputGroup, Modal, Tab , Nav} from '@themesberg/react-bootstrap';
import { ToastContainer, toast } from 'react-toastify/dist/react-toastify.cjs.development';
import 'react-toastify/dist/ReactToastify.css';

export default () => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [isActive, setIsActive] = useState('false');
  const [currentPage, setCurrentPage] = useState(0);
  const [clickedImage, setClickedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const itemsPerPage = 10; // Define itemsPerPage

  // State variables for edit modal
  const [editServiceName, setEditServiceName] = useState('');
  const [editServiceDescription, setEditServiceDescription] = useState('');
  const [editIsActive, setEditIsActive] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const pageData = new FormData();
    pageData.append('serviceName', serviceName);
    pageData.append('serviceDescription', serviceDescription);
    pageData.append('file', imageUrl);
    pageData.append('isActive', isActive);

    const token = localStorage.getItem('token');

    try {
      ////////////////////console.log(token)
      const response = await axios.post('https://ab.execute-api.ap-south-1.amazonaws.com/production/api/post/services', pageData, {
        headers: {
          Authorization: `${token}`
        }
      });
      ////////////////////console.log(response);
      toast.success('Data added successfully'); // Call toast.success after successful addition

      // Reload page after successful submission
      window.location.reload();

      // Clear form data after submission
      setServiceName('');
      setServiceDescription('');
      setImageUrl(null);
      setIsActive(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add data'); // Display error toast if addition fails
    }
  }


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
        ////////////////////console.log('Record deleted successfully:', response.data);
        setData(prevData => prevData.filter(item => item.id !== id));
        toast.success('Record deleted successfully'); // Display success toast
      })
      .catch(error => {
        console.error('Error deleting record:', error);
        toast.error('Failed to delete record'); // Display error toast
      });
  }

  useEffect(() => {
    axios.get('https://ab.execute-api.ap-south-1.amazonaws.com/production/api/get/services')
      .then(response => {
        ////////////////////console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        ////////////////////console.log(error);
      });
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

  const startIndex = currentPage * itemsPerPage;
  const endIndex = (currentPage + 1) * itemsPerPage;

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
    setEditServiceName(item.serviceName);
    setEditServiceDescription(item.serviceDescription);
    setEditIsActive(item.isActive);
    setShowModal(true);
    setEditMode(true); // Set editMode to true when opening the edit modal
  }

  const handleEditSubmit = async () => {
    const token = localStorage.getItem('token');
    const editData = {
      serviceName: editServiceName,
      serviceDescription: editServiceDescription,
      isActive: editIsActive
    };

    try {
      const response = await axios.put(`https://ab.execute-api.ap-south-1.amazonaws.com/production/api/services/${editItemId}`, editData, {
        headers: {
          Authorization: `${token}`
        }
      });
      ////////////////////console.log('Updated data:', response.data);
      toast.success('Data updated successfully');
      setShowModal(false);
      setData(prevData => prevData.map(item => item._id === editItemId ? { ...item, ...editData } : item));
    } catch (error) {
      console.error('Error updating record:', error);
      toast.error('Failed to update record');
    }
  }



  // Calculate the index of the first item to display based on the current page and items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
              Form
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="profile" className="mb-sm-3 mb-md-0">
              Table
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="home" className="py-4">
            <section className="d-flex align-items-center my-2 mt-lg-3 mb-lg-5">
              <Container>
                <form onSubmit={handleSubmit}>
                  <Row >
                    <Col xs={12} md={6}>
                      <Form.Group id="serviceName" className="mb-4">
                        <Form.Label>Service Name</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Control  required type="text" placeholder="Service Name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group id="serviceDescription" className="mb-4">
                        <Form.Label>Service Description</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Control as="textarea" placeholder="Service Description" value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group id="serviceImage" className="mb-4">
                        <Form.Label>Service Image</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImagesUpload}
                            placeholder="Upload Image"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group id="isActive" className="mb-4">
                        <Form.Label>Is Active</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                          </InputGroup.Text>
                          <Form.Select required value={isActive} onChange={(e) => setIsActive(e.target.value)}>
                            <option value="">Select Option</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
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
          <Tab.Pane eventKey="profile" className="py-4">
            <section>
              <Container>
                <Row>
                  <Col xs={12} lg={8} className="mx-auto">
                    <Card border="light" className="shadow-sm">
                      <Card.Header>
                        <Row className="align-items-center">
                          <Col>
                            <h5>Service List</h5>
                          </Col>
                          <Col className="text-end">
                            <Button variant="secondary" size="sm">See all</Button>
                          </Col>
                        </Row>
                      </Card.Header>
                      <Table responsive className="align-items-center table-flush">
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Service Name</th>
                            <th scope="col">Service Description</th>
                            <th scope="col">Service Image</th>
                            <th scope="col">Active</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.slice(startIndex, endIndex).map((row, index) => (
                            <tr key={index}>
                              <td>{startIndex + index + 1}</td>
                              <td>{row.serviceName}</td>
                              <td>{row.serviceDescription}</td>
                              <td>
                                {row.serviceImage && (
                                  <img
                                    src={row.serviceImage}
                                    alt="Service Image"
                                    style={{ maxWidth: "100px", cursor: "pointer" }}
                                    onClick={() => handleImageClick(row.serviceImage)}
                                  />
                                )}
                              </td>
                              <td>{row.isActive ? "True" : "False"}</td>
                              <td>
                                <Button variant="info" size="sm" onClick={() => handleEditModal(row)}>
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(row.id)}>
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="8">
                              <div className="d-flex justify-content-center mt-3">
                                <Button
                                  variant="light"
                                  disabled={currentPage === 1}
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
                        </tfoot>
                      </Table>
                      <Modal show={showModal && editMode} onHide={() => setEditMode(false)}>
                        <Modal.Header>
                          <Modal.Title>Edit Blog</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group className="mb-3" controlId="editHeading">
                              <Form.Label>serviceName</Form.Label>
                              <Form.Control type="text" value={editServiceName} onChange={(e) => setEditServiceName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editDescription">
                              <Form.Label>serviceDescription</Form.Label>
                              <Form.Control as="textarea" rows={3} value={editServiceDescription} onChange={(e) => setEditServiceDescription(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editIsActive">
                              <Form.Check type="checkbox" label="Is Active" checked={editIsActive} onChange={(e) => setEditIsActive(e.target.checked)} />
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={() => setEditMode(false)}>
                            Cancel
                          </Button>
                          <Button variant="primary" onClick={handleEditSubmit}>
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Card>
                  </Col>
                </Row>
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
