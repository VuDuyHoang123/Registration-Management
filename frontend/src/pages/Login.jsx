import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      })

      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || res.statusText)
      }

      const data = await res.json()
      localStorage.setItem('username', username)
      localStorage.setItem('role', data.role || '')
      if (data.token) localStorage.setItem("token", data.token)

      if (data.firstLogin) {
        navigate('/change-password', { state: { username } })
      } else {
        if (data.role === 'ADMIN') navigate('/admin/dashboard')
        else navigate('/student/dashboard')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card fade-in">
        <div className="logo-text">📚 QLDK</div>
        <h2>Đăng nhập hệ thống</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Nhập username hoặc MSSV"
              required
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <button type="submit" style={{ width: '100%', marginTop: 8 }} disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
          {error && <div className="alert alert-error">{error}</div>}
        </form>
      </div>
    </div>
  )
}
