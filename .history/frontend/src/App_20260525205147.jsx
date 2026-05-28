import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then(res => res.json())
      .then(data => setMsg(data.status));
  }, []);

  return (
    <div>
      <h1>React + Flask Docker1</h1>
      <p>{msg}</p>
    </div>
  );
}

export default App;