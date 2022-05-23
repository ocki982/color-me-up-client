import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'

const Header = () => {
    return (
        <div className='header'>
            <Link to="/home">
                <h1 className='header__title'>Color me up!</h1>
            </Link>
            <Link to="/profile">
                <img className='header__avatar' alt="avatar"/>
            </Link>
        </div>
    );
};

export default Header;