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

            alert(res.data.message)

            fetchAttendance()

        }
        catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div style={{ padding: 30 }}>

            <h1>Dashboard Nhân Viên</h1>

            <h2>{user.full_name}</h2>

            <button onClick={handleCheckin}>
                Chấm công
            </button>

            <hr />

            <h2>Lịch sử chấm công</h2>

            {
                records.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid gray",
                            padding: 10,
                            marginBottom: 10
                        }}
                    >
                        <p>Ngày: {item.date}</p>
                        <p>Giờ: {item.time}</p>
                    </div>
                ))
            }

        </div>
    )
}

export default EmployeeDashboard