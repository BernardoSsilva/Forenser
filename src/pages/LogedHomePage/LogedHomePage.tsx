import React, { useEffect, useState } from 'react';
import './LogedHomePage.css';
const LogedHomePage = () => {

    return (
        <div className="container">
            <header className='header'>
                <h1>
                    Bem-vindo 
                </h1>
            </header>
            <nav className='sideMenu'>
                <ul className='list'>
                    <li className='listField'>
                        <a href="#">Boletim de ocorrência</a>
                    </li>
                    <li className='listField'>
                        <a href="#">Reconhecimento facial</a>
                    </li>
                    <li className='listField'>
                        <a href="#">Sobre nós</a>
                    </li>
                    <li className='listField'>
                        <a href="#">Como utilizar</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default LogedHomePage
