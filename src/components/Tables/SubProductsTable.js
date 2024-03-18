import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelection } from '../SelectionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SubProductsTable = ({ SubCategorieId }) => {

    //selectedSubProducts contains the data selected
    //toggleSubProduct hook to save the selected sub-products or delete it in case of deselectionand 
    const { selectedSubProducts, toggleSubProduct } = useSelection();
    //values obtained in the data fetch
    const [subProducts, setSubProducts] = useState([]);
    //state to control when or not to expand the table data 
    const [isTableExpanded, setIsTableExpanded] = useState(true);
    //state for search by sub-product name
    const [search, setSearch] = useState("");

    //fetch sub-products given subCategorieId using axios
    useEffect(() => {
        if (SubCategorieId) {
            axios.get(`${process.env.REACT_APP_API_URL}subcategorieId/${SubCategorieId}/subproducts`)
                .then(response => {
                    setSubProducts(response.data);
                })
                .catch(error =>
                    //show error message here
                    console.error("Error fetching the subProducts:", error));
        } else {
            setSubProducts([]);
        }
    }, [SubCategorieId]);

    //hook to toggle table display
    const toggleTableDisplay = () => {
        setIsTableExpanded(!isTableExpanded);
    };

    //search data
    const searcher = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    };

    //filter method by sub-product name
    let result = !search ? subProducts : subProducts.filter(
        (datoNew) => datoNew.subProductName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="scrollable-tbody app-table-subproductos app-textColor">
                <div>
                    <div className="app-table-subproductos app-padding-bottom">
                        Select Sub-Productos
                        <div onClick={toggleTableDisplay} className="discreet-right">
                            {isTableExpanded ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
                        </div>
                    </div>
                </div>
                {isTableExpanded && (
                    <div>
                        <div className="app-table-products-body">
                            <div>
                                <table>
                                    <tbody className="app-table1-body">
                                        <tr>
                                            <td colSpan="2" className="center-content">
                                                <input
                                                    id="inlineFormInput"
                                                    value={search}
                                                    onChange={searcher}
                                                    type="text"
                                                    className="form-control search-product-input"
                                                    placeholder="search"
                                                />
                                            </td>
                                        </tr>
                                        {result.map((subProduct) => (
                                            <React.Fragment key={subProduct.subProductId}>
                                                <tr>
                                                    <td className='app-td'>{subProduct.subProductName}</td>
                                                    <td className='App'>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedSubProducts.has(subProduct.subProductId)}
                                                            onChange={() => toggleSubProduct({ id: subProduct.subProductId, name: subProduct.subProductName, subCategoryId: subProduct.subCategory })}
                                                        />
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </tbody>

                                </table>

                            </div>

                        </div>
                        <div className="centered-container not-padding-bottom app-table-subproductos">
                            <button className="add-sub-btn">
                                <FontAwesomeIcon icon={faPlus} /> ADD SUB-PRODUCT
                            </button>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
};

export default SubProductsTable;