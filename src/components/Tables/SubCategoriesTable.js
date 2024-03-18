import React, { useEffect, useState } from "react";
import SubProductsTable from "./SubProductsTable";
import axios from 'axios';
import { useSelection } from '../SelectionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SubCategoriesTable = ({ ProductId }) => {

    //selectedSubcategories contains the data selected
    //toggleSubcategory hook to save the selected subcategories or delete it in case of deselectionand 
    const { selectedSubcategories, toggleSubcategory } = useSelection();
    //values obtained in the data fetch
    const [subcategories, setSubcategories] = useState([]);
    //state to control when or not to expand the table data 
    const [isTableExpanded, setIsTableExpanded] = useState(true);
    //state for search by subcategories name
    const [search, setSearch] = useState("")
  
    //fetch subcategories given productId using axios
    useEffect(() => {
        if (ProductId) {
            axios.get(`${process.env.REACT_APP_API_URL}productId/${ProductId}/subcategories`)
                .then(response => {
                    setSubcategories(response.data);
                })
                .catch(error =>
                 //show error message here
                console.error("Error fetching the subcategories:", error));
        } else {
            setSubcategories([]);
        }
    }, [ProductId]);

    //hook to toggle table display
    const toggleTableDisplay = () => {
        setIsTableExpanded(!isTableExpanded);
    };

    //search data
    const searcher = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
    }

    //filter method by subcategory name
    let result = []
    result = !search ? subcategories : subcategories.filter(
        (datoNew) => datoNew.subCategoryName.toLowerCase().includes(search.toLocaleLowerCase())
    )

    return (
        <div>
            <div className="scrollable-tbody app-table-categories app-textColor">
                <div>
                    <div className="app-table-categories app-padding-bottom">
                        Select Subcategories
                        <div onClick={toggleTableDisplay} className="discreet-right">
                            {isTableExpanded ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
                        </div>
                    </div>
                </div>
                {isTableExpanded && (
                    <div>
                        <div className="app-table-categories-body">
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
                                        {result.map((subcategorie) => (
                                            <React.Fragment key={subcategorie.subCategoryId}>
                                                <tr>
                                                    <td className='app-td'>{subcategorie.subCategoryName}</td>
                                                    <td className='App'>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedSubcategories.has(subcategorie.subCategoryId)}
                                                            onChange={() => toggleSubcategory({ id: subcategorie.subCategoryId, name: subcategorie.subCategoryName, productId:subcategorie.product })}
                                                        />
                                                    </td>
                                                </tr>
                                                {selectedSubcategories.has(subcategorie.subCategoryId) && (
                                                    <tr>
                                                        <td colSpan="2" className="center-content">
                                                            <SubProductsTable SubCategorieId={subcategorie.subCategoryId} />
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>

                                </table>

                            </div>

                        </div>
                        <div className="centered-container not-padding-bottom app-table-categories">
                            <button className="add-sub-btn">
                                <FontAwesomeIcon icon={faPlus} /> ADD SUBCATEGORY
                            </button>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
};

export default SubCategoriesTable;