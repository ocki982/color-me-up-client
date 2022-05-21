import React from 'react';
import './Header.scss'

const Header = () => {
    return (
        <div className='header'>
            <h1 className='header__title'>Color me up!</h1>
            <img className='header__avatar' alt="avatar"></img>
        </div>
    );
};

export default Header;