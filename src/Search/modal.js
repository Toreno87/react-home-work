import React from 'react';
import Tilt from 'react-tilt';

export const getModal = (country, setModalOpen, setFilter) => {
    const languages = country.languages.map((language) => {
        return language.native;
    });

    const closeModal = () => {
        setModalOpen(false);
        setFilter('');
    };

    return (
        <div className = 'modal'>
            <Tilt
                className = 'tilt'
                options = {{
                    max: 25,
                    perspective: 1000
                }}>
                <div className = 'content'>
                    <h1>{ country.capital } { country.emoji }</h1>
                    <ul>
                        <li><span>Столица:</span> <span>{country.capital}</span></li>
                        <li><span>Континет:</span> <span>{country.continent}</span></li>
                        <li><span>Народное имя страны</span> <span>{country.native}</span></li>
                        <li><span>Языки:</span> <span>{languages.join(', ')}</span></li>
                        <li><span>Валюты:</span> <span>{ country.currencies.join(', ')}</span></li>
                    </ul>
                </div>
                <div
                    className = 'close'
                    onClick = { () => closeModal() }
                />
            </Tilt>
        </div>
    );
};
