import React from 'react';
import './boletimindex.css';




const BoletimIndex = () => {
    return(
        <div>
            <div className="containerBol">
            <nav className='sideMenuBol'>
                <ul className='list'>
                    <li className='listField'>
                        <a className="LinkBol" href="http://Localhost:5173/sesstrue">Retornar ao inicio</a>
                    </li>
                </ul>
            </nav>

            <p className='caixaTexto'>
                Este serviço oferece quantidade limitada de boletins registraveis e é voltado a realizar o registro de ocorrencias e direciona-las para delegacias na area do ocorrido. Este serviço é prestado e disponibilizado ao cidadão 24 horas por dia e busca oferecer praticidade, eficiencia e velocidade no registro de ocorrencia via internet para evitar locomoções desnescessarias.
            </p>

            <ul className='boletimOpt'>
            <li>
            <div className='linkButton'>
                <a href="/acidente">
                    <h1>
                        Acidente automotivo sem vitima
                    </h1>
                    <p>
                        Acidente envolvendo veiculo automotor sem vitima
                    </p>
                </a>
                </div>
            </li>

            <li >
                <div className='linkButton'>
                    <a href="/roubo">
                    <h1>
                        Roubo ou furto                    
                    </h1>
                    <p>
                    Furto é tirar algo pertencente a outra pessoa sem permissão, sem violência.  Roubo é tirar algo pertencente a outra pessoa usando de violência ou grave ameaça contra aquela.  Para registro de furto ou roubo de veículo, procure a Delegacia de Polícia mais próxima.
                    </p>
                    </a>
                </div>
                
            </li>


            <li>
            <div className='linkButton'>
                <a href="/violencia">
                    <h1>
                        Violencia domestica                   
                    </h1>
                    <p>
                    É qualquer tipo de ação ou omissão no âmbito do ambiente doméstico de convívio permanente ou não, onde o agressor conviva ou tenha convivido com a ofendida. Pode acontecer entre pessoas com laços de sangue (como pais e filhos), ou unidas de forma civil (como marido e esposa ou genro e sogra).
                    </p>
                </a>
                </div>
            </li>
            </ul>
            
        </div>
        </div>
    )
}

export default BoletimIndex