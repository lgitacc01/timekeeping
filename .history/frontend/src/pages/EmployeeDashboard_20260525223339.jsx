import { useEffect, useState } from "react"
import axios from "axios"

function EmployeeDashboard() {
  const user = JSON.parse(localStorage.getItem("user"))

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
      const res = await axios.post("http://localhost:5000/checkin", {
        username: user.username,
      })

      alert(res.data.display)

      fetchAttendance()
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
          boxShadow: "0px 10px 30px rgba(102, 126, 234, 0.2)",
          color: "white",
          maxWidth: "1200px",
          margin: "0 auto 30px auto",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginBottom: "8px",
            fontSize: "28px",
            fontWeight: "600",
          }}
        >
          Dashboard Nhân Viên
        </h1>

        <p
          style={{
            margin: 0,
            marginBottom: "15px",
            fontSize: "16px",
            opacity: 0.95,
          }}
        >
          Xin chào, <strong>{user.full_name}</strong>
        </p>

        <p
          style={{
            margin: 0,
            fontSize: "14px",
            opacity: 0.85,
          }}
        >
          {new Date().toLocaleString("vi-VN")}
        </p>
      </div>

      {/* MAIN CONTAINER */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* CHECKIN CARD */}

        <div
          style={{
            background: "white",
            color: "#1a202c",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "30px",
            boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.08)",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "10px",
              fontSize: "22px",
              fontWeight: "600",
              color: "#2d3748",
            }}
          >
            Chấm công hôm nay
          </h2>

          <p
            style={{
              color: "#718096",
              marginBottom: "25px",
              fontSize: "15px",
            }}
          >
            Nhấn nút bên dưới để ghi nhận giờ vào làm việc.
          </p>

          <button
            onClick={handleCheckin}
            style={{
              padding: "14px 32px",
              background:
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0px 4px 15px rgba(102, 126, 234, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)"
              e.target.style.boxShadow =
                "0px 6px 20px rgba(102, 126, 234, 0.4)"
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)"
              e.target.style.boxShadow =
                "0px 4px 15px rgba(102, 126, 234, 0.3)"
            }}
          >
            ✓ Chấm công
          </button>
        </div>

        {/* HISTORY */}

        <div
          style={{
            background: "white",
            color: "#1a202c",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.08)",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "25px",
              fontSize: "22px",
              fontWeight: "600",
              color: "#2d3748",
            }}
          >
            Lịch sử chấm công
          </h2>

          {records.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                color: "#a0aec0",
              }}
            >
              <p style={{ fontSize: "16px" }}>📋 Chưa có dữ liệu chấm công</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "12px",
              }}
            >
              {records.map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    padding: "16px",
                    background: "#f7fafc",
                    transition: "all 0.2s ease",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#edf2f7"
                    e.currentTarget.style.boxShadow =
                      "0px 2px 8px rgba(0, 0, 0, 0.05)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f7fafc"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        marginBottom: "6px",
                        fontWeight: "600",
                        color: "#2d3748",
                        fontSize: "15px",
                      }}
                    >
                      📅 {item.date}
                    </p>

                    <p
                      style={{
                        margin: 0,
                        color: "#718096",
                        fontSize: "14px",
                      }}
                    >
                      🕐 Giờ check-in: <strong>{item.time}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard