import React, { useState } from "react";
import OpenAI from "openai";

const FacesGenerationIndex = () => {
  const [imageUrl, setImageUrl] = useState("");
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

  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true
  });

  const imageGenerate = async () => {
    try {
      const prompt = generatePrompt(formValues);
      const image = await openai.images.generate({ model: "dall-e-3", prompt: `A realistic ${prompt}` });

      console.log(image.data);
      const imageUrl = image.data[0].url;
      setImageUrl(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const generatePrompt = (values) => {
    const { sex, age, skinColor, faceShape, hairHeight, beard, hairColor, eyeShape, mouthShape, noseShape, hairType } = values;
    return `${age} ${skinColor} ${sex} with ${hairColor} ${hairHeight} hair, ${eyeShape} eyes, ${faceShape} face, ${mouthShape} mouth, ${noseShape} nose, ${beard} beard, and ${hairType} hair type.`;
  };

  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  return (
    <div>
      <p>O que você deseja ver?</p>

      <label htmlFor="sex" onChange={handleSelectChange} value={formValues.sex}>Sex:</label>
  <select id="sex">
    <option value="man">Male</option>
    <option value="woman">Female</option>
  </select>

  <label htmlFor="age" onChange={handleSelectChange} value={formValues.age}>Age Group:</label>
  <select id="age">
    <option value="young">Young</option>
    <option value="middle-aged">Middle-Aged</option>
    <option value="elderly">Elderly</option>
  </select>

  <label htmlFor="skinColor" onChange={handleSelectChange} value={formValues.skinColor}>Skin Color:</label>
  <select id="skinColor">
    <option value="light">Light</option>
    <option value="medium">Medium</option>
    <option value="dark">Dark</option>
  </select>

  <label htmlFor="faceShape" onChange={handleSelectChange} value={formValues.faceShape}>Face Shape:</label>
  <select id="faceShape">
    <option value="oval">Oval</option>
    <option value="round">Round</option>
    <option value="square">Square</option>
  </select>

  <label htmlFor="hairHeight" onChange={handleSelectChange} value={formValues.hairHeight}>Hair Height:</label>
  <select id="hairHeight">
    <option value="short">Short</option>
    <option value="medium">Medium</option>
    <option value="long">Long</option>
  </select>

  <label htmlFor="hairType" onChange={handleSelectChange} value={formValues.hairType}>Hair Type:</label>
  <select id="hairType">
    <option value="straight">Straight</option>
    <option value="wavy">Wavy</option>
    <option value="curly">Curly</option>
  </select>

  <label htmlFor="hairColor" onChange={handleSelectChange} value={formValues.hairColor}>Hair Color:</label>
  <select id="hairColor">
    <option value="black">Black</option>
    <option value="brown">Brown</option>
    <option value="blonde">Blonde</option>
    <option value="red">Red</option>
  </select>

  <label htmlFor="beard" onChange={handleSelectChange} value={formValues.beard}>Beard:</label>
  <select id="beard">
    <option value="none">None</option>
    <option value="stubble">Stubble</option>
    <option value="full">Full</option>
  </select>

  <label htmlFor="eyeShape" onChange={handleSelectChange} value={formValues.eyeShape}>Eye Shape:</label>
  <select id="eyeShape">
    <option value="round">Round</option>
    <option value="almond">Almond</option>
  </select>

  <label htmlFor="mouthShape" onChange={handleSelectChange} value={formValues.mouthShape}>Mouth Shape:</label>
  <select id="mouthShape">
    <option value="small">Small</option>
    <option value="medium">Medium</option>
    <option value="large">Large</option>
  </select>

  <label htmlFor="noseShape" onChange={handleSelectChange} value={formValues.noseShape}>Nose Shape:</label>
  <select id="noseShape">
    <option value="pointed">Pointed</option>
    <option value="flat">Flat</option>
    <option value="wide">Wide</option>
  </select>

      <button onClick={imageGenerate}>Gerar</button>
      {imageUrl && <img src={imageUrl} alt="Imagem gerada" />}
    </div>
  );
};

export default FacesGenerationIndex;
