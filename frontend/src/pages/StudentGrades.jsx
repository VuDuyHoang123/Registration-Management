import { useEffect, useState, useCallback } from "react";
import API from "../services/api";

export default function StudentGrades() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  // Lấy mã sinh viên từ localStorage
  const maSV = localStorage.getItem('username') || '';

  const load = useCallback(async () => {
    if (!maSV) return;
    setLoading(true);
    try {
      // Đảm bảo URL này khớp với @GetMapping("/student/{maSV}") ở Backend
      const res = await API.get(`/ketqua/student/${maSV}`);
      setGrades(res.data);
    } catch (e) {
      console.error("Lỗi khi tải điểm:", e);
      setGrades([]);
    } finally {
      setLoading(false);
    }
  }, [maSV]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Kết Quả Học Tập</h2>
      
      <div style={{ marginBottom: 20, padding: 10, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
        <strong>Mã số sinh viên:</strong> <span style={{ color: '#007bff' }}>{maSV || 'Chưa đăng nhập'}</span>
        <button 
          style={{ marginLeft: 15, cursor: 'pointer', padding: '5px 10px' }} 
          onClick={load}
          disabled={loading}
        >
          {loading ? 'Đang tải...' : 'Làm mới'}
        </button>
      </div>

      {loading ? (
        <div>Đang tải dữ liệu...</div>
      ) : grades.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
          Không có kết quả học tập nào cho sinh viên này.
        </div>
      ) : (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              <th style={{ padding: 10 }}>Mã Lớp HP</th>
              <th>Tên Lớp</th>
              <th>Môn học</th>
              <th>Giảng viên</th>
              <th>Điểm CC</th>
              <th>Giữa kỳ</th>
              <th>Cuối kỳ</th>
              <th>Tổng kết</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, index) => {
              // Sử dụng optional chaining (?.) để tránh lỗi nếu dữ liệu lồng nhau bị null
              const lhp = g.lopHocPhan || {};
              const mon = lhp.monHoc || {};
              const gv = lhp.giangVien || {};

              return (
                <tr key={g.id || index} style={{ textAlign: 'center' }}>
                  <td style={{ padding: 8 }}>{lhp.maLopHP || '-'}</td>
                  <td>{lhp.tenLop || '-'}</td>
                  <td>{mon.tenMon || 'Chưa cập nhật'}</td>
                  <td>{gv.tenGiangVien || 'Chưa phân công'}</td>
                  <td style={{ fontWeight: 'bold' }}>{g.diemCC ?? '-'}</td>
                  <td style={{ fontWeight: 'bold' }}>{g.diemGiuaKy ?? '-'}</td>
                  <td style={{ fontWeight: 'bold' }}>{g.diemCuoiKy ?? '-'}</td>
                  <td style={{ color: 'red', fontWeight: 'bold' }}>
                    {g.diemTongKet ?? '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}