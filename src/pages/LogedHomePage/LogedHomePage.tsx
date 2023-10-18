import React, { useEffect, useState } from 'react';
import './LogedHomePage.css';
import jwt from 'jsonwebtoken';


const LogedHomePage = () => {

    const [nomeUsuario, setNomeUsuario] = useState('');

    useEffect(() => {
        // Obtenha o token do localStorage
        const token = localStorage.getItem('jwtToken');

        if (token) {
            // Decodifique o token para acessar o payload
            const decodedToken = jwt.decode(token);

            if (decodedToken && decodedToken.nome) {
                // Extraia o nome do payload
                setNomeUsuario(decodedToken.nome);
            }
        }
    }, []);

    return(
        <div className ="container">
            <header className='header'>
                <h1>
                    Bem-vindo {nomeUsuario}
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