import { useEffect, useState } from "react"
import axios from "axios"

export default function CoSoPage(){

  const [coso,setCoso] = useState([])
  const [form,setForm] = useState({
    maCoSo:"",
    tenCoSo:"",
    diaChi:""
  })

  const [editing,setEditing] = useState(false)

  useEffect(()=>{
    loadData()
  },[])

  const loadData = async ()=>{
    const res = await axios.get("http://localhost:8080/api/coso")
    setCoso(res.data)
  }

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const submit = async ()=>{

    if(editing){
      await axios.put(`http://localhost:8080/api/coso/${form.maCoSo}`,form)
    }else{
      await axios.post("http://localhost:8080/api/coso",form)
    }

    setForm({maCoSo:"",tenCoSo:"",diaChi:""})
    setEditing(false)

    loadData()
  }

  const edit = (c)=>{
    setForm(c)
    setEditing(true)
  }

  const remove = async (id)=>{
    await axios.delete(`http://localhost:8080/api/coso/${id}`)
    loadData()
  }

  return(
    <div>

      <h2>Quản lý Cơ Sở</h2>

      <input name="maCoSo" placeholder="Mã cơ sở" value={form.maCoSo} onChange={handleChange}/>
      <input name="tenCoSo" placeholder="Tên cơ sở" value={form.tenCoSo} onChange={handleChange}/>
      <input name="diaChi" placeholder="Địa chỉ" value={form.diaChi} onChange={handleChange}/>

      <button onClick={submit}>
        {editing ? "Cập nhật" : "Thêm"}
      </button>

      <table border="1">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {coso.map(c=>(
            <tr key={c.maCoSo}>
              <td>{c.maCoSo}</td>
              <td>{c.tenCoSo}</td>
              <td>{c.diaChi}</td>

              <td>
                <button onClick={()=>edit(c)}>Sửa</button>
                <button onClick={()=>remove(c.maCoSo)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )
}