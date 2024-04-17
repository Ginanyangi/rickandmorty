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
        <div className="max-w-md mx-auto bg-emerald-200 shadow-lg rounded-lg overflow-hidden ">
             <img src={character.image} alt={character.name} />
            <h2 className='font-bold text-white text-3xl'>{character.name}</h2>
            <p className=''>Status: {character.status}</p>
            <p>Species: {character.species}</p>
            <p>Origin: {character.origin.name}</p>
            <p>Gender: {character.gender}</p>
            <p>Created:{character.created}</p>
        </div>
    );
};

export default CharacterDetail;