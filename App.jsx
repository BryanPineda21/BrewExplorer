import { useState,useEffect } from 'react'
import './App.css'
import Card from './Components/card';
import { Link, BrowserRouter, Route,Routes } from 'react-router-dom';
import BreweryDetail from './Components/cardDetail';



function App() {

  const [list,setList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);


  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.filter((item) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults([...list]);
    }
  };

    useEffect(()=>{
    const api_url = `https://api.openbrewerydb.org/v1/breweries/search?query==${searchInput}`
    const fetchBrew = async() =>{
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);
    setList(data);
    }
    fetchBrew().catch(console.error);
    },[searchInput]);


    const listItems = list.map((brew) => (
      <li key={brew.id}>
        <Link to={`/brewery/${brew.id}`}> {/* Check that the 'to' prop is correctly set */}
          <h3>{brew.name}</h3>
          <h5>{brew.state}</h5>
          <p>{brew.brewery_type}</p>
        </Link>
      </li>
    ));

    return (
  
    <div className='whole-page'>
     

     
      
   <div className='search-container'>
   <h1 className='text-title'> SEARCH YOUR BREWERY</h1>
    <input
    type ="text"
    placeholder="search brewery"
    value={searchInput}
    onChange= {(e) => searchItems(e.target.value)}
    />

    <div className='list-card'>
    <ul>
      {searchInput.length > 0 ? filteredResults.map((brew) => (
      <div className='card-container' key={brew.id}>
      <li className="card">
        <h3>{brew.name}</h3>
        <h5>{brew.state}</h5>
        <p>{brew.brewery_type}</p>
      </li>
      </div>
    )) : listItems}
    </ul>
     </div>
     </div>
    </div>
  
  )
}

export default App
