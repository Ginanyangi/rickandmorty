import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
          .then(response => response.json())
          .then(data => {
            setCharacter(data);
          })
          .catch(error => {
            console.error('Error fetching character detail:',error)
          });
    },[id]);

    if(!character) {
        return <div>Loading...</div>;
    }


    return (
        <div className="max-w-md mx-auto bg-green-200 shadow-lg rounded-lg overflow-hidden ">
             <img src={character.image} alt={character.name}  style={{ maxWidth: '500px' }}  />
            <h2 className='font-bold text-white text-3xl'>{character.name}</h2>
            <p className='font-bold'>Status: {character.status}</p>
            <p className='font-bold'>Species: {character.species}</p>
            <p className='font-bold'>Origin: {character.origin.name}</p>
            <p className='font-bold'>Gender: {character.gender}</p>
            <p className='font-bold'>Created:{character.created}</p>
        </div>
    );
};

export default CharacterDetail;