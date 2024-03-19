import React from 'react';
import { useSelection } from '../SelectionContext';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/esm/Spinner';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ModalAdd = () => {
  const {
    bodyAddSubProduct,
    isModalAddOpen,
    toggleModalAdd,
    selectedSubcategories
  } = useSelection();

  const [validated, setValidated] = useState(false);
  //control Spinner
  const [isLoading, setIsLoading] = useState(false);
  const [subProductName, setSubProductName] = useState("");

  //modal visibility
  if (!isModalAddOpen) return null;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      //data body to add
      setIsLoading(true);
      const body = {
        subCategory: bodyAddSubProduct.subCategorieId,
        subProductName: subProductName,
      };
      axios.post(`${process.env.REACT_APP_API_URL}subproducts/create/`, body)
        .then(response => {
          //show messages here Success
          //console.log(':', response.data);
          setIsLoading(false);
          toggleModalAdd();
        })
        .catch(error => {
          //show messages here Errorc
          //console.error('Error:', error);
          setIsLoading(false);
        });
    }
    setValidated(true);
  };

  return (
    <div>
      <div className="overlay">
        {isLoading && (
          <div className="spinner-overlay">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
        <div className="modal">
          <div>
            <div className="header-modal-add">
            <div className="title"><FontAwesomeIcon icon={faPlus} /> ADD SUB-Produ</div>
            <button className="closeButton" onClick={() => {
              toggleModalAdd();
              setValidated(false); // Restablecer el estado validated a false
            }}>X</button>
            </div>
            <div className="body">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Col className="mb-4">
                  <Form.Group as={Col} md="12" controlId="validationCustomSubcategory">
                    <Form.Label>Subcategories</Form.Label>
                    <Form.Select value={bodyAddSubProduct.subCategorieId} disabled={true}>
                      <option>Open this select menu</option>
                      {Array.from(selectedSubcategories.values()).map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback>Please enter a Subcategory.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col className="mb-4">
                  <Form.Group as={Col} md="12" controlId="validationCustomSubProductName">
                    <Form.Label>Sub-Product Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Sub-Product Name"
                      onChange={(e) => setSubProductName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a Sub-Product Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <div className="footer">
                  <Button className="saveLink" type="submit">Save</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ModalAdd;