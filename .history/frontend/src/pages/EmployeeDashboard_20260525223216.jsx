import { useEffect, useState } from "react"

import axios from "axios"

function EmployeeDashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    )

    const [records, setRecords] = useState([])

    const fetchAttendance = async () => {

        const res = await axios.get(
            `http://localhost:5000/attendance/${user.username}`
        )

        setRecords(res.data)
    }

    useEffect(() => {
        fetchAttendance()
    }, [])

    const handleCheckin = async () => {

        try {

            const res = await axios.post(
                "http://localhost:5000/checkin",
                {
                    username: user.username
                }
            )

            alert(res.data.display)

            fetchAttendance()

        }
        catch (err) {
            alert(err.response.data.message)
        }
    }

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#0f172a",
                padding: 30,
                color: "white"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    background: "#1e293b",
                    padding: 25,
                    borderRadius: 20,
                    marginBottom: 25,
                    boxShadow: "0px 0px 15px rgba(0,0,0,0.3)"
                }}
            >

                <h1
                    style={{
                        margin: 0,
                        marginBottom: 10
                    }}
                >
                    Dashboard Nhân Viên
                </h1>

                <p
                    style={{
                        margin: 0,
                        color: "#cbd5e1"
                    }}
                >
                    Xin chào, {user.full_name}
                </p>

                <p
                    style={{
                        marginTop: 10,
                        color: "#94a3b8"
                    }}
                >
                    {new Date().toLocaleString("vi-VN")}
                </p>

            </div>

            {/* CHECKIN CARD */}

            <div
                style={{
                    background: "white",
                    color: "#111827",
                    padding: 25,
                    borderRadius: 20,
                    marginBottom: 30
                }}
            >

                <h2
                    style={{
                        marginTop: 0
                    }}
                >
                    Chấm công hôm nay
                </h2>

                <p
                    style={{
                        color: "gray"
                    }}
                >
                    Nhấn nút bên dưới để chấm công.
                </p>

                <button
                    onClick={handleCheckin}
                    style={{
                        padding: "12px 20px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: 10,
                        fontSize: 16,
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Chấm công
                </button>

            </div>

            {/* HISTORY */}

            <div
                style={{
                    background: "white",
                    color: "#111827",
                    padding: 25,
                    borderRadius: 20
                }}
            >

                <h2
                    style={{
                        marginTop: 0,
                        marginBottom: 20
                    }}
                >
                    Lịch sử chấm công
                </h2>

                {
                    records.length === 0
                        ? (
                            <p>
                                Chưa có dữ liệu chấm công
                            </p>
                        )
                        : (
                            records.map((item, index) => (

                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #e5e7eb",
                                        borderRadius: 12,
                                        padding: 15,
                                        marginBottom: 15,
                                        background: "#f8fafc"
                                    }}
                                >

                                    <p
                                        style={{
                                            margin: 0,
                                            marginBottom: 8,
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Ngày: {item.date}
                                    </p>

                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#475569"
                                        }}
                                    >
                                        Giờ check-in: {item.time}
                                    </p>

                                </div>

                            ))
                        )
                }

            </div>

        </div>
    )
}

export default EmployeeDashboard