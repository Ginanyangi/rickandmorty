import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    
    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
          .then(response => response.json())
          .then(data => {
            setCharacters(data.results);
          })
          .catch (error => {
            console.error('Error fetching characters:', error);
          });
    }
    ,[]);

    // const handleSearchChange = event => {
    //     setSearchTerm(event.terget.value);
    // };

    const deleteCharacter = id =>{
        fetch (`https://rickandmortyapi.com/api/character${characters.id}`, {
            method:'Delete'
        }).then (() =>{
            setCharacters(characters.filter(character => character.id !== id));
        });
    };

    const filterCharacters= characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );


    return (
    <div className="container mx-auto px-4 py-8 text-center" >
        <h1 className='font-serif text-5xl mb-5 mt-5 text-red-500'>Rick and Morty Characters</h1>
        <input 
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className='w-full pt-2 border rounded-md border-red-400'
        />
          <div className='mt-5 grid grid-cols-3 gap-4'>
            {filterCharacters.map(character => (
             
                <div key={character.id}>

                     <img src={character.image} alt={character.name} />
                     
                     <Link to={`/character/${character.id}`}>{character.name}</Link><br />
                     <button onClick={() => deleteCharacter (character.id)} className='bg-red-500 border rounded-md w-full'>
                        Delete
                        </button>

                </div>
            ))}
        </div>
    </div>
    );
};

export default CharacterList;