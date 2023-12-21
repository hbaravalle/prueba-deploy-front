import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./App.module.css";

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
      <div className={styles.container}>
        <h1>Proyecto de prueba</h1>
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
                <img
                  src={import.meta.env.VITE_BUCKET_URL + user.avatar}
                  alt=""
                />
                {user.firstname} {user.lastname}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
