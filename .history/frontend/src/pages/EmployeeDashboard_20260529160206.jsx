import { useEffect, useState } from "react"
import axios from "axios"

function EmployeeDashboard() {

  const user = JSON.parse(localStorage.getItem("user"))

  const [records, setRecords] = useState([])

  const fetchAttendance = async () => {

    const res = await axios.get(
      `/api/attendance/${user.username}`
    )

    setRecords(res.data)
  }

  useEffect(() => {
    fetchAttendance()
  }, [])

  const handleCheckin = async () => {

    try {

      const res = await axios.post("/api/checkin", {
        username: user.username,
      })

      alert(res.data.display)

      fetchAttendance()

    } catch (err) {

      alert(err.response.data.message)
    }
  }

  return (
    <div>
      Employee Dashboard
    </div>
  )
}

export default EmployeeDashboard