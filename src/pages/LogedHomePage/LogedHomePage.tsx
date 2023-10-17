import React from 'react';
import './LogedHomePage.css';

const LogedHomePage = () => {
    return(
        <div className ="container">
            <header className='header'>
                <h1>
                    Bem-vindo
                </h1>
            </header>
            <nav className='sideMenu'>
                <ul className='list'>
                    <li className='listField'>
                        <a href="#">Boletim de ocorrencia</a>
                    </li>

                    <li className='listField'>
                        <a href="#">Reconhecimento facial</a>
                    </li>

                    <li className='listField'>
                        <a href="#">Sobre nós</a>
                    </li>

                    <li className='listField'>
                        <a href="#">como utilizar</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default LogedHomePage