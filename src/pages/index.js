import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Image from 'next/image';
import { fetchPokemonData } from './api/fetch-pokemon';


const Home = () => {

  const limit = 10;

  const [pokemon, setPokemon] = useState([]); 
  const [hasMore, setHasMore] = useState(true); 
  const [offset, setOffset] = useState(0); 

  const loadMore = async () => {
    const newPokemon = await fetchPokemonData({limit, offset}); 
    setPokemon((prevPokemon) => [...prevPokemon, ...newPokemon]); 

    setOffset(offset + limit); 

    if (newPokemon.length < limit) {
      setHasMore(false); 
    }
  };

  return (
    <div>
      <h1>Pokémon List</h1>
      <InfiniteScroll
        pageStart={0} 
        loadMore={loadMore}
        hasMore={hasMore} 
        loader={<div key={0}>Loading...</div>}
      >
        <div className="pokemon-container">
          {pokemon.map((p) => (
            <div key={p.id} className="pokemon-item">
              <Image
                src={p.sprites.front_default} 
                alt={p.name} 
                width={100} 
                height={100} 
              />
              <p>{p.name}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      <style jsx>{`
        .pokemon-container {
          display: flex; 
          flex-wrap: wrap; 
          gap: 16px; 
        }
        .pokemon-item {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Home; 
