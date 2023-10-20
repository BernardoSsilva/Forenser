import React from 'react';
import './boletimindex.css';




const BoletimIndex = () => {
    return(
        <div>
            <div className="container">
            <nav className='sideMenu'>
                <ul className='list'>
                    <li className='listField'>
                        <a href="http://Localhost:5173/sesstrue">Retornar ao inicio</a>
                    </li>
                    <li className='listField'>
                        <a href="/boletimocc">Boletim de ocorrência</a>
                    </li>
                </ul>
            </nav>

            <div className='bol_buttons'>
                <p><a href="/cadastroboletim">Cadastrar boletim de ocorrencia</a></p>
                <p><a href="/consultaboletim">Consultar situação do boletim de ocorrencia</a></p>
            </div>
        </div>
        </div>
    )
}

export default BoletimIndex