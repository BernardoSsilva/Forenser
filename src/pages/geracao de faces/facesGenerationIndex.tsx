import React, { useEffect, useState } from "react";
import OpenAI from "openai";
import "./facesGeneration.css";
import "./without.jpg"
import axios from "axios";
import jwtDecode from "jwt-decode";
import { api } from "../../service";

const FacesGenerationIndex = () => {
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const [boletim, setBoletim] = useState([]);
  const [selectedBoletim, setSelectedBoletim] = useState(null);
  const [imageUrl, setImageUrl] = useState(); 
  const [formValues, setFormValues] = useState({
    sex: "",
    age: "",
    skinColor: "",
    faceShape: "",
    hairHeight: "",
    beard: "",
    hairColor: "",
    eyeShape: "",
    mouthShape: "",
    noseShape: "",
    hairType: ""
  });

  useEffect(() => {
    api.get(`/${userId}`)
      .then((response) => {
        console.log(response.data); // Adicione esta linha
        setBoletim(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter boletins:', error);
      });
  }, [userId]);

  const handleBoletimSelect = (event) => {
    const selectedBoletimId = event.target.value;
    console.log("selectedBoletimId:", selectedBoletimId);

    const boletimNumber = selectedBoletimId;


    const selectedBoletim = boletim.find((item) => item.id_fato == boletimNumber);
    console.log("selectedBoletim:", selectedBoletim);

    setSelectedBoletim(selectedBoletim);
};

  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const openai = new OpenAI({
    apiKey: sua-chave-api,
    dangerouslyAllowBrowser: true
  });

  const imageGenerate = async () => {
    try {
      const prompt = `a highly realistic portrayal of a ${formValues.age} ${formValues.skinColor} ${formValues.sex} with ${formValues.hairColor} ${formValues.hairHeight} hair, ${formValues.eyeShape} eyes, ${formValues.faceShape} face, ${formValues.mouthShape} mouth, ${formValues.noseShape} nose, ${formValues.beard} beard, and ${formValues.hairType} hair type.`;
      const image = await openai.images.generate({ model: "dall-e-3", prompt:`${prompt}` });
      const imageUrl = image.data[0].url;
      setImageUrl(imageUrl);
    } catch (error) {
      console.error(error);
    } 
  };

  const handleClickSave = async () => {
    try {
      // Verifica se há uma imagem gerada antes de prosseguir
      if (!imageUrl) {
        console.error('Nenhuma imagem gerada.');
        return;
      }
  
      // Verifica se há um boletim selecionado antes de prosseguir
      if (!selectedBoletim) {
        console.error('Nenhum boletim selecionado.');
        return;
      }
  
      const description =  `a highly realistic portrayal of a ${formValues.age} ${formValues.skinColor} ${formValues.sex} with ${formValues.hairColor} ${formValues.hairHeight} hair, ${formValues.eyeShape} eyes, ${formValues.faceShape} face, ${formValues.mouthShape} mouth, ${formValues.noseShape} nose, ${formValues.beard} beard, and ${formValues.hairType} hair type.`; 
      const tipoBoletim = selectedBoletim.tipo; 
      const boletimId = selectedBoletim.id_fato;
  
      const data = {
        imageUrl: imageUrl,
        description,
        tipoBoletim,
        boletimId,
      };
  
      console.log(data);
  
      const response = await api.post(`/salvaFace/${userId}`, data);
  
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao salvar face:', error);
      // Adicione tratamento de erro adicional, se necessário
    }
  };

  return (
    <div className="container">
      <div className="image-container">
        <a href="/sesstrue" className="return">Retornar</a>
        <img className="image" src={imageUrl} alt="Imagem gerada" />
      </div>

      <p className='caixaTextoFaces'>
          <span>Atenção</span><br></br>
          Nenhuma das imagens aqui geradas são 100% condizentes com a realidade, são apenas imagens aproximadas para que possa ser iniciado o procsso de reconhecimento facial
        </p>
      
      
      <div className="data-container">
      <p>O que você deseja ver?</p>
      <label htmlFor="sex" className="select-label">Sex:</label>
      <select id="sex" onChange={handleSelectChange} value={formValues.sex} className="select-dropdown">
        <option value="man">Male</option>
        <option value="woman">Female</option>
      </select>

      <label htmlFor="age" className="select-label">Age Group:</label>
      <select id="age" onChange={handleSelectChange} value={formValues.age} className="select-dropdown">
        <option value="young">Young</option>
        <option value="middle-aged">Middle-Aged</option>
        <option value="elderly">Elderly</option>
      </select>

      <label htmlFor="skinColor" className="select-label">Skin Color:</label>
      <select id="skinColor" onChange={handleSelectChange} value={formValues.skinColor} className="select-dropdown">
        <option value="light">Light</option>
        <option value="medium">Medium</option>
        <option value="dark">Dark</option>
      </select>

      <label htmlFor="faceShape"className="select-label">Face Shape:</label>
      <select id="faceShape" onChange={handleSelectChange} value={formValues.faceShape} className="select-dropdown">
        <option value="oval">Oval</option>
        <option value="round">Round</option>
        <option value="square">Square</option>
      </select>

      <label htmlFor="hairHeight"className="select-label">Hair Height:</label>
      <select id="hairHeight" onChange={handleSelectChange} value={formValues.hairHeight} className="select-dropdown">
        <option value="short">Short</option>
        <option value="medium">Medium</option>
        <option value="long">Long</option>
      </select>

      <label htmlFor="hairType"className="select-label">Hair Type:</label>
      <select id="hairType" onChange={handleSelectChange} value={formValues.hairType} className="select-dropdown">
        <option value="straight">Straight</option>
        <option value="wavy">Wavy</option>
        <option value="curly">Curly</option>
      </select>

      <label htmlFor="hairColor" className="select-label">Hair Color:</label>
      <select id="hairColor" onChange={handleSelectChange} value={formValues.hairColor} className="select-dropdown">
        <option value="black">Black</option>
        <option value="brown">Brown</option>
        <option value="blonde">Blonde</option>
        <option value="red">Red</option>
      </select>

      <label htmlFor="beard" className="select-label">Beard:</label>
      <select id="beard" onChange={handleSelectChange} value={formValues.beard} className="select-dropdown">
        <option value="none">None</option>
        <option value="stubble">Stubble</option>
        <option value="full">Full</option>
      </select>

        <label htmlFor="eyeShape" className="select-label">Eye Shape:</label>
        <select id="eyeShape" onChange={handleSelectChange} value={formValues.eyeShape} className="select-dropdown">
          <option value="round">Round</option>
          <option value="almond">Almond</option>
        </select>

        <label htmlFor="mouthShape"  className="select-label">Mouth Shape:</label>
        <select id="mouthShape" onChange={handleSelectChange} value={formValues.mouthShape} className="select-dropdown">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <label htmlFor="noseShape" className="select-label">Nose Shape:</label>
        <select id="noseShape" onChange={handleSelectChange} value={formValues.noseShape} className="select-dropdown">
          <option value="pointed">Pointed</option>
          <option value="flat">Flat</option>
          <option value="wide">Wide</option>
        </select>

        <label htmlFor='boletimSelect' className="select-label">Selecione um Boletim de Ocorrência:</label>
        <select id='boletimSelect' onChange={handleBoletimSelect} className="select-dropdown">
          <option value={null}>Selecione um boletim</option>
          {boletim.map((item) => (
            <option key={item.id_fato} value={item.id_fato}>
              Boletim #{item.id_fato} - {item.tipo} - {item.relato_fato}
            </option>
          ))}
        </select>

        <button onClick={imageGenerate} className="button-container">Gerar</button>

        <button onClick={handleClickSave} className="button-container">Salvar</button>
      </div>

      
    </div>
  );
};

export default FacesGenerationIndex;
