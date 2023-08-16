import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pokemon({ pokemon }) {
  const [details, setDetails] = useState(null); // The state for storing the pokemon details object

  useEffect(() => {
    // The effect for fetching more data about the pokemon
    axios
      .get(pokemon.url) // The endpoint for getting the pokemon details
      .then(response => {
        // The callback for handling the successful response
        setDetails(response.data); // Set the details state with the data object
      })
      .catch(error => {
        // The callback for handling the error response
        console.error(error); // Log the error to the console
      });
  }, [pokemon.url]); // The dependency array for running the effect whenever the pokemon prop changes

  return (
    <li className='pokemon-card'>
      {details ? ( // Check if details is not null
        <>
          <h2>{pokemon.name}</h2> {/* Render the pokemon name */}
          <img src={details.sprites.front_default} alt={pokemon.name} />{' '}
          {/* Render the pokemon image */}
          <ul className='pokemon-types'>
            {details.types.map(type => (
              // Map over the types array and render a list item for each type
              <li key={type.type.name}>{type.type.name}</li> // Render the type name
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p> // Render a loading message if details is null
      )}
    </li>
  );
}

export default Pokemon;
