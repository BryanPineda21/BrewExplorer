import React, { useEffect, useState } from "react";

const BreweryDetail = () => {
  const [breweries, setBreweries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch("https://api.openbrewerydb.org/v1/breweries");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBreweries(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  if (isLoading) {
    return <p>Loading brewery details...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Brewery Details</h1>
      <div className="brewery-container">
      {breweries.map((brewery) => (
        <div key={brewery.id} className="brewery-card">
          <h1>{brewery.name}</h1>
          <p>Address: {brewery.street}, {brewery.city}, {brewery.state}</p>
          <p>Type: {brewery.brewery_type}</p>
          {brewery.website_url && (
            <p>
              Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
                {brewery.website_url}
              </a>
            </p>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default BreweryDetail;
