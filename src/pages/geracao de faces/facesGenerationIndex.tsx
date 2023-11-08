import React, { useRef, useState } from "react";
import axios from "axios";

const FacesGenerationIndex = () => {
  const [imageUrl, setImageUrl] = useState("");
  const inputRef = useRef(null);

  const imageGenerate = async () => {
    try {
      const response = await axios.post("https://api.openai.com/v1/engines/dall-e-2/completions", {
        // prompt: inputRef.current.value,
        prompt: "Cat",
        n: 1,
        size: "1024x1024",
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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",
        }
      });

      setImageUrl(response.data.choices[0].text.trim());
    } catch (error) {
      console.error(error);
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
