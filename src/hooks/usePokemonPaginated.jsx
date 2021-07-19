import { useEffect, useRef, useState,useCallback } from 'react';

export const usePokemonPaginated = () => {
    
    const [ isLoading, setIsLoading ] = useState(true);
    const [ simplePokemonList, setSimplePokemonList ] = useState([]);
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');
    

    const mapPokemonList = useCallback(( pokemonList ) => {

        const newPokemonList = pokemonList.map(({ name, url }) => {
            const urlParts = url.split('/');
            const id = urlParts[ urlParts.length - 2 ];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`;
            return { id, picture, name };
        });    

        setSimplePokemonList( pokemonList =>{
            return [...new Set([ ...pokemonList, ...newPokemonList  ])]
        });
        
        setIsLoading(false);
    },[])

    const loadPokemons = useCallback( async() => {
        setIsLoading(true);
        const resp = await fetch( nextPageUrl.current );
        const respJson = await resp.json()        
        nextPageUrl.current = respJson.next;      
        mapPokemonList( respJson.results ) ;
    },[mapPokemonList])


    useEffect(() => {
        loadPokemons();
    }, [loadPokemons])

    return {
        isLoading,
        simplePokemonList,
        loadPokemons
    }

}
