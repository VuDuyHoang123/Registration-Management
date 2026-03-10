import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function ChangePassword() {
  const loc = useLocation()
  const navigate = useNavigate()
  const usernameFromState = loc.state?.username || ''

  const [username, setUsername] = useState(usernameFromState)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!newPassword) return setError('Nhập mật khẩu mới')
    if (newPassword !== confirmPassword) return setError('Mật khẩu không khớp')
    if (newPassword.length < 6) return setError('Mật khẩu phải có ít nhất 6 ký tự')

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': 'Bearer ' + token } : {})
        },
        body: JSON.stringify({ username, newPassword })
      })

      if (!res.ok) throw new Error(await res.text())
      const role = localStorage.getItem('role')
      if (role === 'ADMIN') navigate('/admin/dashboard')
      else navigate('/student/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card fade-in">
        <div className="logo-text">🔐</div>
        <h2>Đổi mật khẩu lần đầu</h2>
        <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: '1.5rem' }}>
          Vui lòng đổi mật khẩu để bảo mật tài khoản
        </p>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              disabled={!!usernameFromState}
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu mới</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
              placeholder="Ít nhất 6 ký tự"
            />
          </div>
          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
          <button type="submit" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Xác nhận đổi mật khẩu'}
          </button>
          {error && <div className="alert alert-error">{error}</div>}
        </form>
      </div>
    </div>
  )
}
