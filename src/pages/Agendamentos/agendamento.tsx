import React, { useState, useEffect } from 'react';
import { api } from "../../service";
import { Field, Form, Formik } from "formik";
import jwtDecode from "jwt-decode";
import "./agendamento.css"

const Agendamento = () => {
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [agendamentos, setAgendamentos] = useState([]);
  const [editingAgendamento, setEditingAgendamento] = useState(null);

  useEffect(() => {
    // Carregar agendamentos do usuário ao montar o componente
    loadAgendamentos();
  }, []);

  const loadAgendamentos = async () => {
    try {
      const response = await api.get(`/agendamentos/${userId}`);
      setAgendamentos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openPopup = () => {
    setPopupOpen(true);
    setEditPopupOpen(false);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setEditPopupOpen(false);
    // Recarregar agendamentos ao fechar o popup (pode ser otimizado para recarregar apenas se houver alterações)
    loadAgendamentos();
  };

  const openEditPopup = (agendamento) => {
    setEditingAgendamento(agendamento);
    setEditPopupOpen(true);
    setPopupOpen(false);
  };

  const closeEditPopup = () => {
    setEditingAgendamento(null);
    setEditPopupOpen(false);
    // Recarregar agendamentos ao fechar o popup (pode ser otimizado para recarregar apenas se houver alterações)
    loadAgendamentos();
  };

  const handleAgendar = async (values) => {
    try {
      await api.post(`/agendar/${userId}`, values);
      alert("Agendamento concluído");
      closePopup();
    } catch (error) {
      console.log(error);
    }
  };

  const handleExcluir = async (agendamento) => {
    console.log("chegou aqui")
    try {
      await api.delete(`/exclude/${agendamento.id_agendamento}`).then((response) =>{
        alert("Agendamento excluído");
        console.log(response)
      // Recarregar agendamentos após exclusão
      loadAgendamentos();
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditar = (agendamento) => {
    openEditPopup(agendamento);
  };

  return (
    <div className='body'>
      <div className="operations">
      <a href="/sesstrue">Retornar ao início</a>
      <button onClick={openPopup} className='ag-button'>Agendar Atendimento</button>
      </div>
      
      <div className="containerAg">
      <table className='table'>
        <thead className='tableHead'>
          <tr className='tr'>
          <th className='th'><span>Id</span></th>
            <th className='th'><span>Nome</span></th>
            <th className='th'><span>Data</span></th>
            <th className='th'><span>Hora</span></th>
            <th className='th'><span>Ações</span></th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((agendamento) => (
            <tr key={agendamento.id_agendamento}>
              <td>{agendamento.id_agendamento}</td>
              <td className='td'>{agendamento.nome}</td>
              <td className='td'>{agendamento.data}</td>
              <td className='td'>{agendamento.hora}</td>

              <td className='td'>
                <button  className="ex-button" onClick={() => handleExcluir(agendamento)}>Excluir</button>
                <button  className="ed-button" onClick={() => handleEditar(agendamento)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <div className="overlay" onClick={closePopup}>
          <div className="popup-form" onClick={(e) => e.stopPropagation()}>
            <h2>Agendamento de Atendimento na Polícia Civil</h2>
            <Formik
              initialValues={{
                nome: "",
                data: "",
                hora: ""
              }}
              onSubmit={handleAgendar}
            >
              <Form>
                <div className='fields'>
                <p>
                  <label htmlFor=""> Nome: </label>
                  <Field className="agfield" name="nome" type="text" placeholder="Nome" />
                </p>
                
                <p>
                  <label htmlFor=""> Data: </label>
                  <Field className="agfield" name="data" type="date" />

                </p>
                
                <p>
                  <label htmlFor=""> Hora: </label>
                  <Field className="agfield" name="hora" type="time" />
                </p>
                
                </div>
                

                <input className="agendar-button" type="submit" value="Agendar" />
                <button onClick={closePopup}>Fechar</button>
              </Form>
            </Formik>
          </div>
        </div>
      )}

{isEditPopupOpen && (
  <div className="overlay" onClick={closeEditPopup}>
    <div className="popup-form" onClick={(e) => e.stopPropagation()}>
      <h2>Editar Agendamento</h2>
      <Formik
  initialValues={{
    nome: editingAgendamento.nome,
    data: editingAgendamento.data,
    hora: editingAgendamento.hora
  }}
  onSubmit={async (values) => {
    try {
      await api.put(`/editAgend/${editingAgendamento.id_agendamento}`, values);
      alert("Agendamento alterado com sucesso");
      console.log("Editar agendamento:", values);
      closeEditPopup();
    } catch (error) {
      console.log(error);
    }
  }}
>
        <Form>
          <div className='fields'>
            <p>
              <label htmlFor=""> Nome: </label>
              <Field className="agfield" name="nome" type="text" placeholder="Nome" />
            </p>
         
            <p>
              <label htmlFor=""> Data: </label>
              <Field className="agfield" name="data" type="date" />
            </p>
          
            <p>
              <label htmlFor=""> Hora: </label>
              <Field className="agfield" name="hora" type="time" />
            </p>
          
          </div>
          

          <input className="agendar-button" type="submit" value="Salvar" />
          <button onClick={closeEditPopup}>Fechar</button>
        </Form>
      </Formik>
    </div>
  </div>
)}
      </div>

      
    </div>
  );
};

export default Agendamento;
