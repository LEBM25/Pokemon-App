import React, { useCallback, useEffect, useState } from 'react'
import { Palette } from "color-thief-react";
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { PokemonCard } from './PokemonCard';
import { Header } from '../Ui/Header';
import '../styles/styles.css'
import { Footer } from '../Ui/Footer';

export const PokemonsList = () => {

    const { simplePokemonList, loadPokemons } = usePokemonPaginated();
    const [isFetching, setIsFetching] = useState(false);

    const fetchMoreListItems = useCallback(() => {
        setIsFetching(false);
        loadPokemons()
    }, [loadPokemons]);

    const handleScroll = useCallback(() => {
        const scrollTop = window.innerHeight + document.documentElement.scrollTop
        const offsetHeight = document.documentElement.offsetHeight
        if (scrollTop >= offsetHeight - 500 && !isFetching) {
            setIsFetching(true);
        } else {
            return;
        }
    }, [isFetching]);


    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
    }, [isFetching, fetchMoreListItems]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <>
            <Header />
            <div className="wrap-container">
                
                {simplePokemonList.map((item) => {
                    return (
                        <Palette src={item.picture} crossOrigin="anonymous" format="hex" className="flex-item">
                            {({ data, loading, error }) => {
                                if (error) return false;
                                if (loading) return (<PokemonCard loading={true} />);
                                return (
                                    <PokemonCard
                                        picture={item.picture}
                                        color={data}
                                        name={item.name}
                                        id={item.id}
                                        error={error}
                                    />
                                );
                            }}
                        </Palette>
                    )
                })}
            </div>
            <Footer />
        </>
    )
}
