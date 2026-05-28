import { useState } from "react"

import axios from "axios"

import { useNavigate } from "react-router-dom"

function Login() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {

        try {

            const res = await axios.post(
                "http://localhost:5000/login",
                {
                    username,
                    password
                }
            )

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            )

            if (res.data.user.role === "manager") {
                navigate("/manager")
            }
            else {
                navigate("/employee")
            }

        }
        catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div style={{ padding: 30 }}>

            <h1>Login</h1>

            <input
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>
    )
}

export default Login