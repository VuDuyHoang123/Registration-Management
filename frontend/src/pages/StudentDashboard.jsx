import { useNavigate } from "react-router-dom"

export default function StudentDashboard(){
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  return (
    <div style={{padding:20}}>
      <div style={{display:'flex',gap:20,alignItems:'center',background:'linear-gradient(135deg,#6b46c1 0%, #6883ff 100%)',color:'#fff',padding:20,borderRadius:8}}>
        <div style={{flex:1}}>
          <h2 style={{margin:0}}>📚 Student Dashboard</h2>
          <p style={{opacity:0.9,marginTop:8}}>Xin chào <strong>{username}</strong> — Chào mừng bạn đến hệ thống đăng ký học phần.</p>
        </div>
        <div style={{width:160,height:80,backgroundImage:'url(https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=1f5f3a3c6f3b4f8f1e0b1e3d4e6c7a9d)',backgroundSize:'cover',borderRadius:8}} />
      </div>

      <div style={{marginTop:20}}>
        <h3 style={{margin:'12px 0'}}>⚡ Thao tác nhanh</h3>
        <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
          <button className="btn-primary" onClick={() => navigate('/student/register')}>📝 Đăng ký học phần</button>
          <button className="btn-outline" onClick={() => navigate('/student/timetable')}>📅 Xem lịch học</button>
          <button className="btn-outline" onClick={() => navigate('/student/lophocphanstudent')}>📊 Kết quả học tập</button>
        </div>
      </div>
    </div>
  )
}
