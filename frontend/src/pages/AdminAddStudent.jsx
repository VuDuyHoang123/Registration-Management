import { useState } from "react"

export default function AdminAddStudent(){
  const [maSV, setMaSV] = useState("")
  const [hoTen, setHoTen] = useState("")
  const [lop, setLop] = useState("")
  const [maKhoa, setMaKhoa] = useState("")
  const [soTaiKhoan, setSoTaiKhoan] = useState("")
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)
    try{
      const token = localStorage.getItem('token')
      const body = { maSV, hoTen, lopSinhHoat: lop, maKhoa, soTaiKhoan }
      const res = await fetch('/api/admin/add-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': 'Bearer ' + token } : {})
        },
        body: JSON.stringify(body)
      })

      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setMessage(`Sinh viên ${maSV} đã được thêm thành công!`)
      setMaSV('')
      setHoTen('')
      setLop('')
      setMaKhoa('')
      setSoTaiKhoan('')
    }catch(err){
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card fade-in" style={{ maxWidth: 600 }}>
      <div className="card-header">
        <h3>👤 Thêm Sinh Viên Mới</h3>
        <p style={{ color: '#6b7280', margin: 0 }}>MSSV sẽ được dùng làm username và mật khẩu mặc định</p>
      </div>
      <form onSubmit={submit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>MSSV *</label>
            <input value={maSV} onChange={e => setMaSV(e.target.value)} placeholder="VD: 20210001" required />
          </div>
          <div className="form-group">
            <label>Họ tên *</label>
            <input value={hoTen} onChange={e => setHoTen(e.target.value)} placeholder="Nguyễn Văn A" required />
          </div>
          <div className="form-group">
            <label>Lớp sinh hoạt</label>
            <input value={lop} onChange={e => setLop(e.target.value)} placeholder="VD: K66-CNTT" />
          </div>
          <div className="form-group">
            <label>Mã Khoa</label>
            <input value={maKhoa} onChange={e => setMaKhoa(e.target.value)} placeholder="VD: CNTT" />
          </div>
        </div>
        <div className="form-group">
          <label>Số tài khoản ngân hàng</label>
          <input value={soTaiKhoan} onChange={e => setSoTaiKhoan(e.target.value)} placeholder="Để trống nếu chưa có" />
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: 8 }}>
          {loading ? 'Đang xử lý...' : '+ Thêm Sinh Viên'}
        </button>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}
      </form>
    </div>
  )
}
