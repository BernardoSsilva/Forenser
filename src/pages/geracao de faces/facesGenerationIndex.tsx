import React, { useRef, useState } from "react";
import axios from "axios";

const FacesGenerationIndex = () => {
  const [imageUrl, setImageUrl] = useState("");
  const inputRef = useRef(null);

  const imageGenerate = async () => {
    const prompt = "a stupid black cat";
    if (!prompt) {
      alert("Por favor, insira uma descrição.");
      return;
    }

    const apiKey = "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"; 
    const endpoint = "http://localhost:3001/v1/images";
    const model = "dall-e-3";

    try {
      const response = await axios.post(
        endpoint,
        {
          prompt,
          model,
          n: 1,
          size: "256x256",
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      setImageUrl(response.data.data[0].url);
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
    }
  };

  return (
    <div>
      <p>O que você deseja ver?</p>
      <input type="text" ref={inputRef} />
      <button onClick={imageGenerate}>Gerar</button>
      {imageUrl && <img src={imageUrl} alt="Imagem gerada" />}
    </div>
  );
};

export default FacesGenerationIndex;
