import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputNombre, setInputNombre] = useState("");
  const [inputApellido, setInputApellido] = useState("");

  const handleSubmit = async (e) => {
    const formData = new FormData(e.target);
    await axios({
      method: "POST",
      url: "http://localhost:3000/users",
      data: formData,
      headers: { "Content-type": "multipart/form-data" },
    });
  };

  return (
    <>
      <h1>Sarasa</h1>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
          setInputNombre("");
          setInputApellido("");
        }}
      >
        <div>
          <label htmlFor="">Nombre</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={inputNombre}
            onChange={(e) => setInputNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Apellido</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={inputApellido}
            onChange={(e) => setInputApellido(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Avatar</label>
          <input type="file" name="avatar" id="avatar" />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  );
}

export default App;
