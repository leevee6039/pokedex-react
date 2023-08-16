import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]); // The state for storing the pokemons array

  useEffect(() => {
    // The effect for fetching the data from the PokeAPI
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=151') // The endpoint for getting the first 151 pokemons
      .then(response => {
        // The callback for handling the successful response
        setPokemons(response.data.results); // Set the pokemons state with the results array
      })
      .catch(error => {
        // The callback for handling the error response
        console.error(error); // Log the error to the console
      });
  }, []); // The dependency array for running the effect only once

  return (
    <>
      <div className='container'>
        <h1>Pokedex App</h1>
        <br />
        <ul className='pokemons-list'>
          {pokemons.map(pokemon => (
            // Map over the pokemons array and render a Pokemon component for each item
            <Pokemon key={pokemon.name} pokemon={pokemon} /> // Pass the pokemon object as a prop
          ))}
        </ul>

        {/* <div className='pagination'>
          <button className='prev'>Prev</button>
          <button className='next'>Next</button>
        </div> */}
      </div>
    </>
  );
}

export default App;
