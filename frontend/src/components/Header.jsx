import { Link, useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')

  const logout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    navigate('/')
  }

  if (!username) return null

  return (
    <header className="header">
      <nav className="header-nav">
        {role === 'ADMIN' && (
          <>
            <Link to="/admin/dashboard">🏠 Dashboard</Link>
            <Link to="/admin/add-student">👤 Thêm SV</Link>
            <Link to="/admin/coso">🏫 Cơ sở</Link>
            <Link to="/admin/khoa">🎓 Khoa</Link>
          </>
        )}
        {role === 'STUDENT' && (
          <Link to="/student/dashboard">🏠 Dashboard</Link>
        )}
      </nav>

      <div className="header-user">
        <span>{username}</span>
        <span className="user-badge">{role}</span>
        <button className="btn-danger" onClick={logout}>Đăng xuất</button>
      </div>
    </header>
  )
}
