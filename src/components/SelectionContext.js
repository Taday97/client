import React, { createContext, useContext, useState } from 'react';

const SelectionContext = createContext();

export const useSelection = () => useContext(SelectionContext);

export const SelectionProvider = ({ children }) => {
    //state to control selected products
    const [selectedProducts, setSelectedProducts] = useState(new Map());
    //state to control selectedSubcategories
    const [selectedSubcategories, setSelectedSubcategories] = useState(new Map());
    //state to control selectedSubProducts
    const [selectedSubProducts, setSelectedSubProducts] = useState(new Map());
    //state to control the visibility of Modal that the selected data will have
    const [isModalOpen, setIsModalOpen] = useState(false);

    //hook to determine if there is a new product selected, add it to the selection or otherwise delete it
    const toggleProduct = (product) => {
        setSelectedProducts((prevSelectedProducts) => {
            const newSelection = new Map(prevSelectedProducts);
            if (newSelection.has(product.id)) {
                newSelection.delete(product.id);
                //If the product was deselected, the subcategories and products associated with it must be deselected.
                removeRelatedSubcategoriesAndSubproducts(product.id)
            } else {
                newSelection.set(product.id, product);
            }
            return newSelection;
        });
    };

    //hook to determine if there is a new subcategory selected, add it to the selection or otherwise delete it
    const toggleSubcategory = (subcategory) => {
        setSelectedSubcategories((prevSelectedCategories) => {
            const newSelection = new Map(prevSelectedCategories);
            if (selectedSubcategories.has(subcategory.id)) {
                newSelection.delete(subcategory.id);
                // function to remove sub-products associated
                removeRelatedSubproducts(subcategory.id);
            } else {
                newSelection.set(subcategory.id, subcategory);
            }
            return newSelection;
        });
    };
    //hook to determine if there is a new sub-product selected, add it to the selection or otherwise delete it
    const toggleSubProduct = (subproduct) => {
        setSelectedSubProducts((prevSelectedSubProducts) => {
            const newSelection = new Map(prevSelectedSubProducts);
            if (selectedSubProducts.has(subproduct.id)) {
                newSelection.delete(subproduct.id);
            } else {
                newSelection.set(subproduct.id, subproduct);
            }
            return newSelection;
        });
    };
    // function to remove subcategories
    const removeRelatedSubcategoriesAndSubproducts = (productId) => { 
        const relatedSubcategories = [...selectedSubcategories.values()].filter(subcategory => subcategory.productId === productId);
        console.log("relatedSubcategories "+ relatedSubcategories)
        relatedSubcategories.forEach(subcategory => {
            selectedSubcategories.delete(subcategory.id); 
            removeRelatedSubproducts(subcategory.id); 
        });
    };

    // function to remove subproducts
    const removeRelatedSubproducts = (subcategoryId) => {
        const relatedSubProducts = [...selectedSubProducts.values()].filter(subproduct => subproduct.subCategoryId === subcategoryId);
        relatedSubProducts.forEach(subproduct => {
            selectedSubProducts.delete(subproduct.id); 
        });
    };

    //to determine whether the modal should be shown or not
    const toggleModal = () => {
        console.log("sdfsfd");
        setIsModalOpen(!isModalOpen);
    };

    return (
        //important data and functions are shared with child components
        <SelectionContext.Provider value={{
            selectedProducts, toggleProduct,
            selectedSubcategories, toggleSubcategory,
            selectedSubProducts, toggleSubProduct,
            isModalOpen, toggleModal,
        }}>
            {children}
        </SelectionContext.Provider>
    );
};