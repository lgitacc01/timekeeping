import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);

  const checkin = () => {
    // Thêm logic chấm công ở đây
    console.log("Checked in");
  };

  useEffect(() => {
    // Thêm logic lấy dữ liệu ban đầu ở đây
  }, []);

  // Kiểm tra nếu chưa đăng nhập
  if (!user) {
    return (
      <div>
        <p>long / 123</p>
        <p>nam / 123</p>
      </div>
    );
  }

  // =========================
  // DASHBOARD
  // =========================

  return (
    <div style={{ padding: 30 }}>
      <h1>Dashboard</h1>
      <h2>Xin chào: {user.name}</h2>
      <h3>Role: {user.role}</h3>
      <h3>Hôm nay: {new Date().toLocaleDateString()}</h3>

      {
        status?.checked
          ? (
            <div>
              <h2>Đã chấm công lúc: {status.time}</h2>
            </div>
          )
          : (
            <button onClick={checkin}>Chấm công</button>
          )
      }

      <br /><br />

      <button onClick={() => setUser(null)}>Logout</button>

      {
        user.role === "boss" && (
          <div>
            <hr />
            <h2>Danh sách chấm công</h2>

            {
              attendanceList.map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid gray",
                    padding: 10,
                    marginBottom: 10
                  }}
                >
                  <p>Tên: {item.name}</p>
                  <p>Role: {item.role}</p>
                  <p>Ngày: {item.date}</p>
                  <p>Giờ: {item.time}</p>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
}

export default App;