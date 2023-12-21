import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputNombre, setInputNombre] = useState("");
  const [inputApellido, setInputApellido] = useState("");
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const users = await axios({
      method: "GET",
      url: import.meta.env.VITE_API_URL + "/users",
    });
    setUsers(users.data.reverse());
  };

  const handleSubmit = async (e) => {
    const formData = new FormData(e.target);
    await axios({
      method: "POST",
      url: import.meta.env.VITE_API_URL + "/users",
      data: formData,
      headers: { "Content-type": "multipart/form-data" },
    });

    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h1>Sarasa</h1>
      <img src={import.meta.env.VITE_BUCKET_URL + "hello.jpeg"} alt="" />
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
      <h2>Listado de usuarios</h2>
      <ul>
        {users.map((user) => {
          return (
            <li>
              {user.firstname} {user.lastname}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
