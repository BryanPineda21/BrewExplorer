import React from "react";
import { useState, useEffect } from "react";

const Card = () => {
  const [filterList, setList] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [filteredBreweries, setFilteredBreweries] = useState(null);

  useEffect(() => {
    const fetchBrewery = async () => {
      const brew_api = "https://api.openbrewerydb.org/breweries";
      const response = await fetch(brew_api);
      const data = await response.json();
      setList(data);
    };
    fetchBrewery().catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedType) {
      // Use the filter function to filter breweries by type
      const filteredData = filterList.filter((brewery) =>
        brewery.brewery_type === selectedType
      );
      setFilteredBreweries(filteredData);
    } else {
      // If no type is selected, show the full list
      setFilteredBreweries(filterList);
    }
  }, [selectedType, filterList]);

  return (

    <div className="filter-card">
    
    <h1>BREWERY TYPES</h1>


    <h3>Filter By Type:</h3>
      <select
        onChange={(e) => setSelectedType(e.target.value)}
        value={selectedType}
      >



        <option value="">All</option>
        {filterList &&
          [...new Set(filterList.map((brewery) => brewery.brewery_type))].map(
            (type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            )
          )}
      </select>

      <ul>
        {filteredBreweries &&
          filteredBreweries.map((brewery) => (
            <li key={brewery.id}>
              <h3>{brewery.name}</h3>
              <h5>State: {brewery.state}</h5>
              <p>Type: {brewery.brewery_type}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Card;







