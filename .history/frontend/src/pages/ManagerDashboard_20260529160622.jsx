import { useEffect, useState } from "react"

import axios from "axios"

function ManagerDashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    )

    const [employees, setEmployees] = useState([])

    const fetchData = async () => {

        const res = await axios.get(
            "http://165.245.178.80:5000/manager-dashboard"
        )

        setEmployees(res.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleCheckin = async () => {

        try {

            const res = await axios.post(
                "http://165.245.178.80:5000/checkin",
                {
                    username: user.username
                }
            )

            alert(res.data.message)

            fetchData()

        }
        catch (err) {
            alert(err.response.data.message)
        }
    }

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                padding: "40px 20px",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    padding: "30px",
                    borderRadius: "15px",
                    marginBottom: "30px",
                    boxShadow: "0px 10px 30px rgba(102, 126, 234, 0.2)",
                    color: "white",
                    maxWidth: "1200px",
                    margin: "0 auto 30px auto"
                }}
            >

                <h1
                    style={{
                        margin: 0,
                        marginBottom: "8px",
                        fontSize: "28px",
                        fontWeight: "600"
                    }}
                >
                    Dashboard Quản Lý
                </h1>

                <p
                    style={{
                        margin: 0,
                        marginBottom: "15px",
                        fontSize: "16px",
                        opacity: 0.95
                    }}
                >
                    Xin chào, <strong>{user.full_name}</strong>
                </p>

                <p
                    style={{
                        margin: 0,
                        fontSize: "14px",
                        opacity: 0.85
                    }}
                >
                    {new Date().toLocaleString("vi-VN")}
                </p>

            </div>

            {/* MAIN CONTAINER */}

            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}
            >

                {/* CHECKIN BUTTON */}

                <div
                    style={{
                        background: "white",
                        padding: "30px",
                        borderRadius: "15px",
                        marginBottom: "30px",
                        boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.08)",
                        border: "1px solid #e2e8f0"
                    }}
                >

                    <h2
                        style={{
                            marginTop: 0,
                            marginBottom: "20px",
                            fontSize: "22px",
                            fontWeight: "600",
                            color: "#2d3748"
                        }}
                    >
                        Chấm công của bạn
                    </h2>

                    <button
                        onClick={handleCheckin}
                        style={{
                            padding: "14px 32px",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "16px",
                            cursor: "pointer",
                            fontWeight: "600",
                            transition: "all 0.3s ease",
                            boxShadow: "0px 4px 15px rgba(102, 126, 234, 0.3)"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-2px)"
                            e.target.style.boxShadow = "0px 6px 20px rgba(102, 126, 234, 0.4)"
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)"
                            e.target.style.boxShadow = "0px 4px 15px rgba(102, 126, 234, 0.3)"
                        }}
                    >
                        ✓ Chấm công
                    </button>

                </div>

                {/* EMPLOYEES LIST */}

                <div
                    style={{
                        background: "white",
                        padding: "30px",
                        borderRadius: "15px",
                        boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.08)",
                        border: "1px solid #e2e8f0"
                    }}
                >

                    <h2
                        style={{
                            marginTop: 0,
                            marginBottom: "25px",
                            fontSize: "22px",
                            fontWeight: "600",
                            color: "#2d3748"
                        }}
                    >
                        Danh sách nhân viên
                    </h2>

                    {
                        employees.length === 0
                            ? (
                                <div
                                    style={{
                                        textAlign: "center",
                                        padding: "40px 20px",
                                        color: "#a0aec0"
                                    }}
                                >
                                    <p style={{ fontSize: "16px" }}>
                                        👥 Không có dữ liệu nhân viên
                                    </p>
                                </div>
                            )
                            : (
                                <div
                                    style={{
                                        display: "grid",
                                        gap: "16px"
                                    }}
                                >

                                    {
                                        employees.map((item, index) => (

                                            <div
                                                key={index}
                                                style={{
                                                    border: "1px solid #e2e8f0",
                                                    borderRadius: "12px",
                                                    padding: "20px",
                                                    background: "#f7fafc",
                                                    transition: "all 0.2s ease",
                                                    borderLeft: item.checked_in ? "4px solid #48bb78" : "4px solid #f56565"
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = "#edf2f7"
                                                    e.currentTarget.style.boxShadow = "0px 2px 8px rgba(0, 0, 0, 0.05)"
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = "#f7fafc"
                                                    e.currentTarget.style.boxShadow = "none"
                                                }}
                                            >

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center"
                                                    }}
                                                >

                                                    <div>

                                                        <p
                                                            style={{
                                                                margin: 0,
                                                                marginBottom: "8px",
                                                                fontWeight: "600",
                                                                color: "#2d3748",
                                                                fontSize: "16px"
                                                            }}
                                                        >
                                                            👤 {item.full_name}
                                                        </p>

                                                        <p
                                                            style={{
                                                                margin: 0,
                                                                color: "#718096",
                                                                fontSize: "14px",
                                                                marginBottom: "12px"
                                                            }}
                                                        >
                                                            Vị trí: <strong>{item.role === "manager" ? "Quản lý" : "Nhân viên"}</strong>
                                                        </p>

                                                        {
                                                            item.checked_in
                                                                ? (
                                                                    <div
                                                                        style={{
                                                                            background: "#f0fff4",
                                                                            padding: "12px",
                                                                            borderRadius: "8px",
                                                                            border: "1px solid #9ae6b4"
                                                                        }}
                                                                    >

                                                                        <p
                                                                            style={{
                                                                                margin: 0,
                                                                                color: "#22543d",
                                                                                fontSize: "14px",
                                                                                marginBottom: "6px"
                                                                            }}
                                                                        >
                                                                            ✅ Đã chấm công
                                                                        </p>

                                                                        <p
                                                                            style={{
                                                                                margin: 0,
                                                                                color: "#22543d",
                                                                                fontSize: "13px",
                                                                                marginBottom: "4px"
                                                                            }}
                                                                        >
                                                                            📅 Ngày: <strong>{item.date}</strong>
                                                                        </p>

                                                                        <p
                                                                            style={{
                                                                                margin: 0,
                                                                                color: "#22543d",
                                                                                fontSize: "13px"
                                                                            }}
                                                                        >
                                                                            🕐 Giờ: <strong>{item.time}</strong>
                                                                        </p>

                                                                    </div>
                                                                )
                                                                : (
                                                                    <div
                                                                        style={{
                                                                            background: "#fff5f5",
                                                                            padding: "12px",
                                                                            borderRadius: "8px",
                                                                            border: "1px solid #fc8181"
                                                                        }}
                                                                    >

                                                                        <p
                                                                            style={{
                                                                                margin: 0,
                                                                                color: "#742a2a",
                                                                                fontSize: "14px",
                                                                                fontWeight: "600"
                                                                            }}
                                                                        >
                                                                            ❌ Chưa chấm công
                                                                        </p>

                                                                    </div>
                                                                )
                                                        }

                                                    </div>

                                                </div>

                                            </div>

                                        ))
                                    }

                                </div>
                            )
                    }

                </div>

            </div>

        </div>
    )
}

export default ManagerDashboard