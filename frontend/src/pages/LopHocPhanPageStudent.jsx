import { useEffect, useState } from "react"
import API from "../services/api"

function LopHocPhanPageStudent(){

  const [lopHP,setLopHP] = useState([])

  const loadData = async ()=>{

    try{

      const res = await API.get("/lophp")
      setLopHP(res.data)

    }catch(err){

      console.log("Lỗi load lớp học phần",err)

    }

  }

  useEffect(()=>{
    loadData()
  },[])

  return(

    <div>

      <h2>Danh sách lớp học phần</h2>

      <table border="1">

        <thead>

          <tr>
            <th>Mã lớp</th>
            <th>Tên lớp</th>
            <th>Môn học</th>
            <th>Giảng viên</th>
            <th>Sĩ số</th>
          </tr>

        </thead>

        <tbody>

          {lopHP.map((l)=>(

            <tr key={l.maLopHP}>

              <td>{l.maLopHP}</td>
              <td>{l.tenLop}</td>
              <td>{l.monHoc}</td>
              <td>{l.giangVien}</td>
              <td>{l.siSoDaDK} / {l.siSoToiDa}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}

export default LopHocPhanPageStudent