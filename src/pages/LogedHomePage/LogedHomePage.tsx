import { useEffect, useState } from 'react';
import './LogedHomePage.css';
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem("jwtToken");
const LogedHomePage = () => {

    const[nome, setNome] = useState();

    useEffect(() =>{
        setNome(jwtDecode(token).nome)
    }, [])

    return (
        
        <div className="containerLog">
            <header className='header'>
                <h1>
                    Bem-vindo {nome}
                </h1>
            </header>
            <nav className='sideMenu'>
                <ul className='list'>
                    <li>
                        <a href="/porfile">Perfil</a>
                    </li>
                    <li className='listField'>
                        <a href="/boletimocc">Boletim de ocorrência</a>
                    </li>
                    <li className='listField'>
                        <a href="#">Reconhecimento facial</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default LogedHomePage
