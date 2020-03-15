import React from 'react';
import { string, func } from 'prop-types';

import logo from '../logo.svg';

Card.propTypes = {
    image: string,
    onClick: func
};

export default function Card ({
    className = "",
    image = logo,
    alt = "Card Back",
    onClick = null,
    disable = false
}) {
    if (onClick) {
        className += disable ? " disabled" : " clickable";
    }
    if (image === "logo") {
        image = logo;
    }
    return (
        <div className={"card " + className} onClick={disable ? null : onClick}>
            <div className="card-inner">
                <div className="face">
                    {image ? <img src={image} alt={alt} /> : null}
                </div>
            </div>
        </div>
    )
}