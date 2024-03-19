import '../App.css';
import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import axios from 'axios';

function App() {
  const [selectData, setSelectData] = useState([])
  const [search, setSearch] = useState("")

  //fetch selected data
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/selectdata`)
      .then(response => {
        setSelectData(response.data);
      })
      .catch(error => {
        //show error message here
        console.error("There was an error fetching the selectdata: ", error);
      });
  }, []);
  

  //search data by any name of the displayed data set
  const searcher = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }

  //method filter by any name of the displayed data set
  let result = []
  result = !search ? selectData : selectData.filter((dato) =>
    dato.product.some(
      (datoNew) => datoNew.toLowerCase().includes(search.toLocaleLowerCase())
    )
    ||
    dato.subCategory.some(
      (datoNew) => datoNew.toLowerCase().includes(search.toLocaleLowerCase())
    )
    ||
    dato.subProducts.some(
      (datoNew) => datoNew.toLowerCase().includes(search.toLocaleLowerCase())
    )
  )


  return (
    <div className="container mt-2">
      <div className="col-md-12">
        <div className="text-end">
          <Link to='/create' className='btn btn-primary bg-app'>Add</Link>
        </div>
      </div>
      <div className="ibox-title d-flex justify-content-between mt-2">
        <h5>List of selected data</h5>
        <div className="d-flex align-items-center">
          <label className="my-1 mr-2" htmlFor="inlineFormInput">Find:</label>
          <input
            id="inlineFormInput"
            value={search}
            onChange={searcher}
            type="text"
            className="form-control search-input"
            placeholder="Search"
          />
        </div>
      </div>
      <table className="table table-striped mt-2">
        <thead >
          <tr className='text-white'>
            <th>Products Names</th>
            <th>Sub Categories Names</th>
            <th>Sub Products Names</th>
          </tr>
        </thead>
        <tbody>
          {
            result.map((data) =>
              <tr key={data.selectDataId}>
                <td>{data.product.join(',')}</td>
                <td>{data.subCategory.join(',')}</td>
                <td>{data.subProducts.join(',')}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>

  );
}

export default App;
