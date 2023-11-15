import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LogedHomePage.css';
import jwtDecode from 'jwt-decode';
import { api } from '../../service';

const LogedHomePage = () => {
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const storedImageUrl = localStorage.getItem('generatedImage');
  if(!token){
    navigate('/');
  }

  const [boletim, setBoletim] = useState([]);
  const [nome, setNome] = useState(decodedToken.nome);

  const handleLogout = () => {

    localStorage.removeItem('jwtToken');
    navigate('/');
  };

  useEffect(() => {

    api.get(`/sesstrue/${userId}`)
      .then((response) => {
        const boletinsFromSesstrue = response.data;
  
        
        if (boletinsFromSesstrue && boletinsFromSesstrue.length > 0) {
          
          setBoletim(boletinsFromSesstrue);
        } else {
          
          api.get(`/${userId}`)
            .then((secondResponse) => {
              const boletinsFromSecondApi = secondResponse.data;
              setBoletim(boletinsFromSecondApi);
            })
            .catch((secondError) => {
              console.error('Erro ao obter boletins na segunda chamada:', secondError);
            });
        }
      })
      .catch((error) => {
        console.error('Erro ao obter boletins na primeira chamada:', error);
      });
  }, [userId]);
  

  return (
    <div className="containerLog">
    <header className='header'>
        <h1>
            Bem-vindo(a) {nome}
        </h1>
    </header>
    <body>
        <ul className='ListaBoletins'>
            <li> <h1>Boletins de ocorrência registrados por você</h1></li>
            <li>
                <table>
                    <thead>
                        <tr>
                            <td>Tipo de ocorrencia</td>
                            <td>Data</td>
                            <td>Comunicante</td>
                            <td>Endereços</td>
                            <td>Relato</td>
                            <td>imagem</td>
                        </tr>
                    </thead>
                    <tbody>
                    {boletim && boletim.length > 0 ? (
                        boletim.map((item:any, i:any) => (
                        <tr key={i}>
                            <td>{item.tipo}</td>
                            <td>{item.data_fato}</td>
                            <td>{item.comunicante}</td>
                            <td>{item.endereco}</td>
                            <td>{item.relato_fato}</td>
                            <td ><img className="imagem_boletim" src={item.imagem} alt="" /></td>
                        </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan="6">Nenhum boletim disponível</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </li>

        </ul>
        <img className="imageMainMenu" src="https://cdn.testonoticias.com.br/wp-content/uploads/2022/05/WhatsApp_Image_2022-05-06_at_19.27.18-768x482.jpeg" alt="" />
    </body>
    <nav className='sideMenu'>
        <ul className='list'>
            <li>
                <a href="/porfile">Perfil</a>
            </li>
            <li className='listField'>
                <a href="/boletimocc">Boletim de ocorrência</a>
            </li>
            <li className='listField'>
                <a href="/faces">Reconhecimento facial</a>
            </li>
            <li>
                <a href="/denuncia">Denuncia Anonima</a>
            </li>

            <li>
                <a href="/agendamento">Agendar atendimento</a>
            </li>
            <li>
                <a href="/" onClick={handleLogout}>Logout</a>
            </li>
        </ul>
    </nav>
</div>
);
};

export default LogedHomePage;