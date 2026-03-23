import { useState } from "react"
import API from "../services/api"

function NhapDiemPage(){

  const [maSV,setMaSV] = useState("")
  const [maLop,setMaLop] = useState("")
  const [cc,setCC] = useState("")
  const [gk,setGK] = useState("")
  const [ck,setCK] = useState("")

  const handleSubmit = async ()=>{

    try{

      await API.post("/ketqua/nhapdiem",{
        maSV: maSV,
        maLopHP: maLop,
        diemCC: parseFloat(cc),
        diemGK: parseFloat(gk),
        diemCK: parseFloat(ck)
      })

      alert("✅ Nhập điểm thành công")

    }catch(err){

      console.log(err)
      alert("❌ Lỗi nhập điểm")

    }

  }

  return(

    <div>

      <h2>Nhập điểm</h2>

      <input placeholder="Mã SV" onChange={e=>setMaSV(e.target.value)} />
      <input placeholder="Mã lớp HP" onChange={e=>setMaLop(e.target.value)} />
      <input placeholder="Điểm CC" onChange={e=>setCC(e.target.value)} />
      <input placeholder="Điểm GK" onChange={e=>setGK(e.target.value)} />
      <input placeholder="Điểm CK" onChange={e=>setCK(e.target.value)} />

      <button onClick={handleSubmit}>Nhập điểm</button>

    </div>

  )

}

export default NhapDiemPage