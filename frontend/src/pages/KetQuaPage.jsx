import { useState } from "react"
import API from "../services/api"

function KetQuaPage(){

  const [top,setTop] = useState("")
  const [maLop,setMaLop] = useState("")

  const handleTop = async ()=>{

    try{
      const res = await API.get(`/ketqua/top/${maLop}`)
      setTop(res.data)
    }catch(err){
      alert("Lỗi")
    }

  }

  return(

    <div>

      <h2>Demo Function + Procedure</h2>

      <input
        placeholder="Nhập mã lớp HP"
        value={maLop}
        onChange={e=>setMaLop(e.target.value)}
      />

      <button onClick={handleTop}>
        Xem điểm cao nhất
      </button>

      <h3>Kết quả: {top}</h3>

    </div>

  )

}

export default KetQuaPage   