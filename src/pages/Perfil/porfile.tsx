import { useEffect, useState } from 'react';
import './porfile.css';
import jwtDecode from 'jwt-decode';
import { api } from '../../service';
import { Navigate, useNavigate } from 'react-router-dom';



const token = localStorage.getItem("jwtToken");
const Porfile = () =>{

    function verificaSexo() {
        if(sexo == 'M'){
            return "Masculino"
        } else {
            return "Feminino"
        }
    }

    const[nome, setNome] = useState();
    const[email, setEmail] = useState();
    const[telefone, setTelefone] = useState();
    const[cpf, setCpf] = useState();
    const[sexo, setSexo] = useState();

    useEffect(() =>{
        setNome(jwtDecode(token).nome);
        setEmail(jwtDecode(token).email);
        setTelefone(jwtDecode(token).telefone);
        setCpf(jwtDecode(token).cpf);
        setSexo(jwtDecode(token).sexo);
    }, [])

    const navigate = useNavigate();
    const handleClickExclude = () => {
        try {
          api.delete(`/exclude_porfile/${email}`).then((response) => {
            if (response) {
             console.log(response)
             navigate("/")
            }
          });
        } catch (err) {
          console.log(err);
        }
    }

    return(
        <div className="porfile-body">
            <a className="porfile-a" href='/sesstrue'>Retornar</a>
            <div className="porfile-container">
            
            <h1 className="porfile-h1">{nome}</h1>
            <h2 className="porfile-h2">
            <span className='porfile-sp'>Cpf: </span>{cpf}
            </h2>
            <h2 className="porfile-h2">
            <span className='porfile-sp'>E-mail: </span>{email}

            </h2>
            <h2 className="porfile-h2">
            <span className='porfile-sp'>Telefone: </span>{telefone}
            </h2>

            
            <h2 className="porfile-h2">
                <span className='porfile-sp'>Sexo: </span>{verificaSexo()}
            </h2>
            
            <a className="editLinkP" href="/editporfile"> Editar Perfil</a>
            <button className="porfile-button" onClick={handleClickExclude}>excluir Perfil</button>
            </div>
            
        </div>
    )
}

export default Porfile


