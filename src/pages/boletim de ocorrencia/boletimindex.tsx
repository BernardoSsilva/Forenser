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
                </ul>
            </nav>
            <ul>
            <li>
                <a href="/acidente">
                    <h1>
                        Acidente automotivo sem vitima
                    </h1>
                    <p>
                        Acidente envolvendo veiculo automotor sem vitima
                    </p>
                </a>
            </li>

            <li>
                <a href="/roubo">
                    <h1>
                        Roubo ou furto                    
                    </h1>
                    <p>
                        
                    </p>
                </a>
            </li>


            <li>
                <a href="/violencia">
                    <h1>
                        Violencia domestica                   
                    </h1>
                    <p>
                        
                    </p>
                </a>
            </li>
            </ul>
            
        </div>
        </div>
    )
}

export default BoletimIndex