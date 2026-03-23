import { useEffect, useState } from "react"
import API from "../services/api"

export default function StudentGrades(){
  const [grades, setGrades] = useState([])
  const [loading, setLoading] = useState(false)
  const maSV = localStorage.getItem('username') || ''

  const load = async ()=>{
    if(!maSV) return
    setLoading(true)
    try{
      const res = await API.get(`/ketqua/student/${maSV}`)
      setGrades(res.data)
    }catch(e){
      console.error(e)
      setGrades([])
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{ load() }, [])

  return (
    <div>
      <h2>Xem điểm sinh viên</h2>
      <div style={{marginBottom:12}}>
        <strong>MSSV:</strong> {maSV || 'Chưa đăng nhập'}
        <button style={{marginLeft:12}} onClick={load}>Làm mới</button>
      </div>

      {loading && <div>Đang tải...</div>}

      {!loading && grades.length === 0 && (
        <div>Không có kết quả học tập nào.</div>
      )}

      {!loading && grades.length > 0 && (
        <table border="1" style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th>Mã Lớp HP</th>
              <th>Tên Lớp</th>
              <th>Môn học</th>
              <th>Giảng viên</th>
              <th>Điểm CC</th>
              <th>Điểm giữa kỳ</th>
              <th>Điểm cuối kỳ</th>
              <th>Điểm tổng kết</th>
            </tr>
          </thead>
          <tbody>
            {grades.map(g=>{
              const lhp = g.lopHocPhan || {}
              const mon = lhp.monHoc || {}
              const gv = lhp.giangVien || {}
              return (
                <tr key={g.maKQ}>
                  <td>{lhp.maLopHP}</td>
                  <td>{lhp.tenLop}</td>
                  <td>{mon.tenMon}</td>
                  <td>{gv.tenGiangVien}</td>
                  <td>{g.diemCC ?? ''}</td>
                  <td>{g.diemGiuaKy ?? ''}</td>
                  <td>{g.diemCuoiKy ?? ''}</td>
                  <td>{g.diemTongKet ?? ''}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
