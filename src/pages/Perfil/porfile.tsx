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
        <div>
            
            <h1>{nome}</h1>
            <h2>
                {cpf}
            </h2>
            <h2>
                {email}

            </h2>
            <h2>
                {telefone}
            </h2>
            <h2>
                {verificaSexo()}
            </h2>

            <a href="/editporfile"> Editar Perfil</a>
            <button onClick={handleClickExclude}>excluir Perfil</button>
        </div>
    )
}

export default Porfile


