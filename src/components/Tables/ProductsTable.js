import axios from 'axios';
import React, { useEffect, useState } from "react";
import SubCategoriesTable from './SubCategoriesTable';
import { useSelection } from '../SelectionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProductsTable = () => {
    //selectedProducts contains the data selected in the product list 
    //toggleProduct hook to save the selected products or delete it in case of deselectionand 
    //toggleModal hook to determine whether or not to show the dialog
    const { selectedProducts, toggleProduct, toggleModal } = useSelection();
    //list products
    const [products, setProducts] = useState([]);
   
    //fetch products using axios
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}products`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                //show error message here
                console.error("There was an error fetching the products: ", error);
            });
    }, []);

    return (
        <div>
            <div className="mt-1">
                <div >
                    <div className="text-end">
                        <Link to='/' className='btn btn-primary bg-app'>Back to List</Link>
                    </div>
                </div>
            </div>
            <div className="app-padding app-color mt-2 products-container">
                <div className="app-color" >
                    <div className="center-content app-color app-textColor app-padding-title">
                        Products
                        <button className="add-sub-btn discreet-right" onClick={toggleModal}>DONE</button>
                    </div>
                </div>
                <div className="scrollable-tbody">
                    <table className="app-table-body">
                        <tbody >
                            {products.map((product) => (
                                <React.Fragment key={product.productId}>
                                    <tr>
                                        <td className='app-td'>{product.productName}</td>
                                        <td className='App'>
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.has(product.productId)}
                                                onChange={() => toggleProduct({ id: product.productId, name: product.productName })}
                                            />
                                        </td>
                                    </tr>
                                    {selectedProducts.has(product.productId) && (
                                        <tr>
                                            <td colSpan="2" className="center-content">
                                                <SubCategoriesTable ProductId={product.productId} />
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="centered-container app-padding-bottom app-color">
                <button className="add-sub-btn">
                    <FontAwesomeIcon icon={faPlus} /> ADD PRODUCT
                </button>
            </div>
        </div>
    );
};

export default ProductsTable;