import React from 'react'
import pokemonLogo from '../assets/Pokemon-Logo.png'
import pokeball from '../assets/pokeball-pokemon-ball.png'
export const Header = () => {
    return (
        <>
            <div className="header">
                <img
                    src={pokemonLogo}
                    className="pokemon-logo"
                    alt="pokemon logo"
                />
                <img
                    src={pokeball}
                    className="header-pokeball"
                    alt="pokemon logo"
                />
            </div>
        </>
    )
}
