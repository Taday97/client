import React from 'react';
import { useSelection } from '../SelectionContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './DoneModal.css';

const DoneModal = () => {
  const {
    isModalOpen,
    toggleModal,
    selectedProducts,
    selectedSubcategories,
    selectedSubProducts,
  } = useSelection();
  
  //control Spinner
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  //render model data
  const renderSelectedItems = (itemsMap) => {
    const itemNames = Array.from(itemsMap.values()).map(item => item.name);
    return <p>{itemNames.join(', ')}</p>;
  };
  //modal visibility
  if(!isModalOpen) return null;
 
  //save selected data
  const handleSave = () => {
    if (selectedProducts.size === 0 && selectedSubcategories.size === 0 && selectedSubProducts.size === 0) {
      toggleModal();
    } else {
      const isConfirmed = window.confirm("Are you sure you want to save the selected data?");
      if (isConfirmed) {
        //show spinner
        setIsLoading(true); 
       
        //data body to add
        const body = {
          product: Array.from(selectedProducts.keys()),
          subCategory: Array.from(selectedSubcategories.keys()),
          subProducts: Array.from(selectedSubProducts.keys()),
        };
        axios.post(`${process.env.REACT_APP_API_URL}/selectdata/create/`, body)
          .then(response => {
            //show messages here Success
            //console.log(':', response.data);
            setIsLoading(false);
            toggleModal();
            navigate('/');
          })
          .catch(error => {
            //show messages here Errorc
            //console.error('Error:', error);
            setIsLoading(false);
          });
      }
    }
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
            <div className="header">
              <button className="closeButton" onClick={toggleModal}>X</button>
            </div>
            <div className="body">
              {selectedProducts.size > 0 && (
                <>
                  <p><strong>Products</strong></p>
                  {renderSelectedItems(selectedProducts)}
                </>
              )}
              {selectedSubcategories.size > 0 && (
                <>
                  <p><strong>Sub Categories</strong></p>
                  {renderSelectedItems(selectedSubcategories)}
                </>
              )}
              {selectedSubProducts.size > 0 && (
                <>
                  <p><strong>Sub Products</strong></p>
                  {renderSelectedItems(selectedSubProducts)}
                </>
              )}
              {(selectedProducts.size === 0 && selectedSubcategories.size === 0 && selectedSubProducts.size === 0) && (
                <p>No data available to display</p>
              )}
            </div>
            <div className="footer">
              <button className="saveLink" onClick={handleSave}>SAVE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoneModal;