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
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
        >

            <div
                style={{
                    width: 420,
                    background: "white",
                    padding: 40,
                    borderRadius: 20,
                    boxShadow: "0px 20px 60px rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
            >

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: 40
                    }}
                >

                    <h1
                        style={{
                            fontSize: 32,
                            fontWeight: 700,
                            margin: 0,
                            marginBottom: 8,
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        Timekeeping
                    </h1>

                    <p
                        style={{
                            margin: 0,
                            color: "#718096",
                            fontSize: 14
                        }}
                    >
                        Hệ thống quản lý chấm công
                    </p>

                </div>

                <input
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                    style={{
                        width: "100%",
                        padding: 14,
                        marginBottom: 16,
                        borderRadius: 12,
                        border: "2px solid #e2e8f0",
                        fontSize: 15,
                        boxSizing: "border-box",
                        transition: "all 0.3s ease",
                        outline: "none"
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = "#667eea"
                        e.target.style.boxShadow = "0px 0px 0px 3px rgba(102, 126, 234, 0.1)"
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0"
                        e.target.style.boxShadow = "none"
                    }}
                />

                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                    style={{
                        width: "100%",
                        padding: 14,
                        marginBottom: 24,
                        borderRadius: 12,
                        border: "2px solid #e2e8f0",
                        fontSize: 15,
                        boxSizing: "border-box",
                        transition: "all 0.3s ease",
                        outline: "none"
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = "#667eea"
                        e.target.style.boxShadow = "0px 0px 0px 3px rgba(102, 126, 234, 0.1)"
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0"
                        e.target.style.boxShadow = "none"
                    }}
                />

                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: 14,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: 12,
                        fontSize: 16,
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0px 4px 15px rgba(102, 126, 234, 0.3)"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)"
                        e.target.style.boxShadow = "0px 6px 25px rgba(102, 126, 234, 0.4)"
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)"
                        e.target.style.boxShadow = "0px 4px 15px rgba(102, 126, 234, 0.3)"
                    }}
                >
                    Đăng nhập
                </button>

                <div
                    style={{
                        marginTop: 30,
                        paddingTop: 30,
                        borderTop: "1px solid #e2e8f0"
                    }}
                >

                    <p
                        style={{
                            margin: 0,
                            fontWeight: 700,
                            marginBottom: 14,
                            color: "#2d3748",
                            fontSize: 14
                        }}
                    >
                        📝 Tài khoản demo:
                    </p>

                    <div
                        style={{
                            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                            padding: 16,
                            borderRadius: 10,
                            marginBottom: 10
                        }}
                    >

                        <p
                            style={{
                                margin: 0,
                                color: "#2d3748",
                                fontSize: 14,
                                fontWeight: 600
                            }}
                        >
                            👔 Sếp: <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 4, color: "#667eea" }}>boss / 123</code>
                        </p>

                    </div>

                    <div
                        style={{
                            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                            padding: 16,
                            borderRadius: 10
                        }}
                    >

                        <p
                            style={{
                                margin: 0,
                                color: "#2d3748",
                                fontSize: 14,
                                fontWeight: 600
                            }}
                        >
                            👨‍💼 Nhân viên: <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 4, color: "#667eea" }}>long / 123</code>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login