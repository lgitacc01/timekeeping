import { useEffect, useState } from "react";

function App() {

  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // =========================
  // GET USERS
  // =========================

  const fetchUsers = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/users"
      );

      const data = await response.json();

      setUsers(data);

    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // CREATE USER
  // =========================

  const createUser = async () => {

    try {

      await fetch(
        "http://localhost:5000/api/users",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            age
          })
        }
      );

      setName("");
      setAge("");

      fetchUsers();

    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // DELETE USER
  // =========================

  const deleteUser = async (id) => {

    try {

      await fetch(
        `http://localhost:5000/api/users/${id}`,
        {
          method: "DELETE"
        }
      );

      fetchUsers();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>

      <h1>React + Flask + MongoDB</h1>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20
        }}
      >

        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button onClick={createUser}>
          Add
        </button>

      </div>

      {
        users.map((user) => (

          <div
            key={user._id}
            style={{
              border: "1px solid gray",
              padding: 10,
              marginBottom: 10
            }}
          >

            <h3>{user.name}</h3>

            <p>{user.age}</p>

            <button
              onClick={() => deleteUser(user._id)}
            >
              Delete
            </button>

          </div>

        ))
      }

    </div>
  );
}

export default App;