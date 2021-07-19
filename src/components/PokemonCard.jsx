import React, { useEffect, useState } from 'react'
import cardPokeball from '../assets/pokeball.png'

export const PokemonCard = React.memo(({ picture, name, color, id, loading, error }) => {

    const [types, setTypes] = useState([])
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const [initColor, endColor] = color || ['#fff', '#fff']
    const gradient = { background: `linear-gradient(142deg,  ${initColor}  50%,${endColor} 100%)`, borderColor: initColor }

    useEffect(() => {
        if (color) {
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    const { types } = json
                    setTypes(types)
                })
        }
    }, [url, color])

    return (
        <div className="card " style={gradient}>
            <div className="pokeball-card">
                <img
                    src={cardPokeball}
                    alt="pokeball"
                />
            </div>
            <div className="title">
                {
                    loading ? 'Loading...' :
                        (<>
                            {name}
                            <div className="footer-id">#{id}</div>
                        </>)
                }

            </div>

            {
                (!loading && !error) &&
                <img
                    className="img-pokemon"
                    src={picture}
                    alt={name}
                />
            }

            <div className="types-title">Types</div>
            <div className="div-types">
                {
                    types.map(item => {
                        const imgPath = require(`../assets/${item.type.name}.png`)

                        return (
                            <img
                                src={imgPath.default}
                                alt={item.type.name}
                            />

                        )
                    })
                }
            </div>
        </div>
    )
})
