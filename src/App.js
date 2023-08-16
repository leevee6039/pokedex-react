import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]); // The state for storing the pokemons array
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentPokemonIndex(prevIndex =>
      prevIndex === 0 ? pokemons.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentPokemonIndex(prevIndex =>
      prevIndex === pokemons.length - 1 ? 0 : prevIndex + 1
    );
  };

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
        <h1 className='container-heading'>Pokedex App</h1>
        <br />
        <div>
          <ul className='pokemons-list'>
            <div className='pokemon'>
              <Pokemon pokemon={pokemons[currentPokemonIndex]} />
            </div>
          </ul>
          <div className='pagination'>
            <button className='prev' onClick={handlePrevClick}>
              Prev
            </button>
            <button className='next' onClick={handleNextClick}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
