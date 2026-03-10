import { Link } from "react-router-dom"

export default function AdminDashboard(){
  const username = localStorage.getItem('username')
  
  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h2>🎓 Admin Dashboard</h2>
        <p>Xin chào <strong>{username}</strong>! Quản lý hệ thống đăng ký học phần.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Tổng sinh viên</h3>
          <div className="value">--</div>
        </div>
        <div className="stat-card">
          <h3>Lớp học phần</h3>
          <div className="value">--</div>
        </div>
        <div className="stat-card">
          <h3>Đăng ký hôm nay</h3>
          <div className="value">--</div>
        </div>
        <div className="stat-card">
          <h3>Môn học</h3>
          <div className="value">--</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3>⚡ Thao tác nhanh</h3>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <Link to="/admin/add-student" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            👤 Thêm sinh viên
          </Link>
          <button className="btn-outline" disabled>📋 Quản lý lớp HP</button>
          <button className="btn-outline" disabled>📊 Báo cáo</button>
        </div>
      </div>
    </div>
  )
}
