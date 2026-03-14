import { useEffect, useState } from "react"
import API from "../services/api"

function MonHocPage() {

  const [monHoc, setMonHoc] = useState([])
  const [editing, setEditing] = useState(false)

  const [form, setForm] = useState({
    maMon: "",
    tenMon: "",
    soTinChi: ""
  })

  const loadData = async () => {
    const res = await API.get("/monhoc")
    setMonHoc(res.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSubmit = async () => {

    if(editing){
      await API.put(`/monhoc/${form.maMon}`, form)
    } else {
      await API.post("/monhoc", form)
    }

    setForm({
      maMon:"",
      tenMon:"",
      soTinChi:""
    })

    setEditing(false)

    loadData()
  }

  const editMon = (m) => {
    setForm(m)
    setEditing(true)
  }

  const deleteMon = async (id) => {

    if(!window.confirm("Bạn chắc chắn muốn xóa?")) return

    await API.delete(`/monhoc/${id}`)

    loadData()
  }

  return (
    <div>

      <h2>Quản lý Môn Học</h2>

      <input
        placeholder="Mã môn"
        value={form.maMon}
        onChange={(e)=>setForm({...form,maMon:e.target.value})}
      />

      <input
        placeholder="Tên môn"
        value={form.tenMon}
        onChange={(e)=>setForm({...form,tenMon:e.target.value})}
      />

      <input
        placeholder="Số tín chỉ"
        type="number"
        value={form.soTinChi}
        onChange={(e)=>setForm({...form,soTinChi:e.target.value})}
      />

      <button onClick={handleSubmit}>
        {editing ? "Cập nhật" : "Thêm"}
      </button>

      <table border="1">

        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên môn</th>
            <th>Số tín chỉ</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {monHoc.map(m => (
            <tr key={m.maMon}>

              <td>{m.maMon}</td>
              <td>{m.tenMon}</td>
              <td>{m.soTinChi}</td>

              <td>
                <button onClick={()=>editMon(m)}>Sửa</button>
                <button onClick={()=>deleteMon(m.maMon)}>Xóa</button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default MonHocPage