import React, {useEffect, useState} from 'react'
import '../index.css'
import PokemonCards from './PokemonCards'
function Pokemon() {
    const Api = "https://pokeapi.co/api/v2/pokemon?limit=300"
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    
    const fetchPokemon = async () => {
        try {
            const res = await fetch(Api)
        const data = await res.json()
        
        const detailData = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })
        const results = await Promise.all(detailData)
        setPokemon(results)
        setLoading(false)
        
        } catch (error) {
            console.log("there is an error", error);
            setLoading(false)
            setError(error)
        }
    }
    useEffect(() => {
        fetchPokemon()
    }, [])
    // search Function
    const searchData = pokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()));
    
    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>{error.message}</h1>
    }
  return (
    
    <>
    <section className='container'>
        <header>
            <h1>Lets Catch Pokemon </h1>
        </header>
        <div className='pokemon-search'>
            <input type="text" placeholder='Search Pokemon' 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
             />
            
        </div>
        <div>
            <ul className='cards'>
                {
                    searchData.map((pokemon) => {
                        return (
                          <PokemonCards
                          key={pokemon.id}
                          pokemonData = {pokemon}
                          />
                        )
                    })
                }
            </ul>
        </div>
    </section>
    </>
  )
}

export default Pokemon