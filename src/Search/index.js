// Core
import React, { useState, useEffect } from 'react';

// Instruments
import './styles.css';
import { api } from '../API';
import { delay } from '../instruments';
import { useDebounce } from './useDebounce';
import { getModal } from './modal';


export const Search = () => {
    const [ filter, setFilter ] = useState('');
    const [ countries, setCountries ] = useState([]);
    const [ isFetching, setIsFetching ] = useState(false);
    const [ isModalOpend, setModalOpen ] = useState(false);
    const [ currentCountry, setCurrentCountry ] = useState({});

    const showModal = (country) => {
        setFilter(country.name);
        setModalOpen(true);

        setCurrentCountry(country);
    };

    const getCountries = async () => {
        setIsFetching(true);
        const filteredCountries = await api.getCountries(filter.trim());
        await delay(200);
        setCountries(filteredCountries);
        setIsFetching(false);
    };

    const regexp = new RegExp(filter, 'g');
    const countriesJSX = countries.map((country) => {
        const name = country.name.replace(
            regexp,
            `<span class='highlight'>${filter}</span>`,
        );

        const continent = country.continent.replace(
            regexp,
            `<span class='highlight'>${filter}</span>`,
        );

        return (
            <li
                key = { country.emoji }
                onClick = { () => showModal(country) } >
                <span
                    className = 'country'
                    dangerouslySetInnerHTML = {{
                        __html: `${name}, ${continent}`,
                    }}
                />
                <span className = 'flag'>{country.emoji}</span>
            </li>
        );
    });

    const debouncedFilter = useDebounce(filter);

    useEffect(() => {
        getCountries();
    }, [ debouncedFilter ]);

    return (
        <section className = 'strange-search'>
            <span className = 'strange'>Странный</span>
            <input
                placeholder = 'странна или континент'
                style = {{
                    '--inputBorderStyle': isFetching ?  'dashed' : 'solid',
                }}
                type = 'text'
                value = { filter }
                onChange = { (event) => setFilter(event.target.value) }
            />
            <span className = 'search'>поиск</span>
            <ul>{ countriesJSX }</ul>
            <b />
            { isModalOpend ? getModal(currentCountry, setModalOpen, setFilter) : null}
        </section>
    );
};
