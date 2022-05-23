import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import Avatar from '../../assets/images/user.png';
import Help from '../../assets/images/question_icon.svg';

const Header = () => {
    return (
        <div className='header'>
            <Link className='header__link' to="/home">
                <h1 className='header__title'>Color me up!</h1>
            </Link>
            <div>
            <img className='header__help' alt='help' src={Help}/>
            <Link className='header__link' to="/profile">
                <img className='header__avatar' alt="avatar" src={Avatar}/>
            </Link>
            </div>
        </div>
    );
};

export default Header;