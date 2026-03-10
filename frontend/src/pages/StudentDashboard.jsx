export default function StudentDashboard(){
  const username = localStorage.getItem('username')

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h2>📚 Student Dashboard</h2>
        <p>Xin chào <strong>{username}</strong>! Chào mừng bạn đến hệ thống đăng ký học phần.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Tín chỉ đã ĐK</h3>
          <div className="value">--</div>
        </div>
        <div className="stat-card">
          <h3>Lớp HP đã ĐK</h3>
          <div className="value">--</div>
        </div>
        <div className="stat-card">
          <h3>Học phí còn nợ</h3>
          <div className="value">--</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3>⚡ Thao tác nhanh</h3>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" disabled>📝 Đăng ký học phần</button>
          <button className="btn-outline" disabled>📅 Xem lịch học</button>
          <button className="btn-outline" disabled>📊 Kết quả học tập</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3>📋 Lớp học phần đã đăng ký</h3>
        <p style={{ color: '#6b7280' }}>Chưa có lớp học phần nào được đăng ký.</p>
      </div>
    </div>
  )
}
