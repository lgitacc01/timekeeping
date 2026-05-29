import { useEffect, useState } from "react"

import axios from "axios"

function ManagerDashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    )

    const [employees, setEmployees] = useState([])

    const fetchData = async () => {

        const res = await axios.get(
            "/api/manager-dashboard"
        )

        setEmployees(res.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleCheckin = async () => {

        try {

            const res = await axios.post(
                "/api/checkin",
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

        <div>
            Manager Dashboard
        </div>
    )
}

export default ManagerDashboard