import { useEffect, useState } from "react"

import axios from "axios"

function ManagerDashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    )

    const [employees, setEmployees] = useState([])

    const fetchData = async () => {

        const res = await axios.get(
            "http://localhost:5000/manager-dashboard"
        )

        setEmployees(res.data)
    }

    useEffect(() => {
        fetchData()
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

            fetchData()

        }
        catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div style={{ padding: 30 }}>

            <h1>Dashboard Sếp</h1>

            <button onClick={handleCheckin}>
                Chấm công
            </button>

            <hr />

            {
                employees.map((item, index) => (

                    <div
                        key={index}
                        style={{
                            border: "1px solid gray",
                            padding: 10,
                            marginBottom: 10
                        }}
                    >
                        <p>Tên: {item.full_name}</p>

                        <p>Role: {item.role}</p>

                        {
                            item.checked_in
                                ? (
                                    <p>
                                        Đã chấm lúc {item.time}
                                    </p>
                                )
                                : (
                                    <p>Chưa chấm công</p>
                                )
                        }

                    </div>

                ))
            }

        </div>
    )
}

export default ManagerDashboard