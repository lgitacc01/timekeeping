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

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#0f172a"
            }}
        >

            <div
                style={{
                    width: 350,
                    background: "white",
                    padding: 30,
                    borderRadius: 20,
                    boxShadow: "0px 0px 20px rgba(0,0,0,0.3)"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: 0,
                        color: "#111827"
                    }}
                >
                    Timekeeping
                </h1>

               
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 12,
                        marginBottom: 15,
                        borderRadius: 10,
                        border: "1px solid #ccc",
                        fontSize: 16,
                        boxSizing: "border-box"
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 12,
                        marginBottom: 20,
                        borderRadius: 10,
                        border: "1px solid #ccc",
                        fontSize: 16,
                        boxSizing: "border-box"
                    }}
                />

                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: 12,
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: 10,
                        fontSize: 16,
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Đăng nhập
                </button>

                <div
                    style={{
                        marginTop: 25,
                        background: "#f3f4f6",
                        padding: 15,
                        borderRadius: 10
                    }}
                >

                    <p
                        style={{
                            margin: 0,
                            fontWeight: "bold",
                            marginBottom: 10
                        }}
                    >
                        Tài khoản demo
                    </p>

                    <p style={{ margin: 0 }}>
                        Sếp: boss / 123
                    </p>

                    <p style={{ margin: 0 }}>
                        Nhân viên: long / 123
                    </p>

                </div>

            </div>

        </div>
    )
}

export default Login