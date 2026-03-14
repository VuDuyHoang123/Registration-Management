import { useEffect, useState } from "react"
import API from "../services/api"

function LopHocPhanPage(){

  const [lopHP,setLopHP] = useState([])
  const [monHoc,setMonHoc] = useState([])
  const [giangVien,setGiangVien] = useState([])
  const [khoa,setKhoa] = useState([])

  const [maLop,setMaLop] = useState("")
  const [tenLop,setTenLop] = useState("")
  const [siSo,setSiSo] = useState("")
  const [maMon,setMaMon] = useState("")
  const [maGV,setMaGV] = useState("")
  const [maKhoa,setMaKhoa] = useState("")

  const loadData = async ()=>{

    const res = await API.get("/lophp")
    setLopHP(res.data)

    const mon = await API.get("/monhoc")
    setMonHoc(mon.data)

    const gv = await API.get("/giangvien")
    setGiangVien(gv.data)

    const k = await API.get("/khoa")
    setKhoa(k.data)

  }

  useEffect(()=>{
    loadData()
  },[])

  // thêm lớp
 const addLop = async ()=>{

  if(!maLop || !tenLop || !siSo || !maMon || !maGV || !maKhoa){
    alert("Nhập đầy đủ thông tin")
    return
  }

  try{

    await API.post("/lophp",{

      maLopHP: maLop,
      tenLop: tenLop,
      siSoToiDa: parseInt(siSo),

      monHoc:{ maMon: maMon },
      giangVien:{ maGiangVien: maGV },
      khoa:{ maKhoa: maKhoa }

    })

    alert("Thêm thành công")

    loadData()

  }catch(err){

    console.log(err)
    alert("Thêm thất bại")

  }

}

  // xóa lớp
  const deleteLop = async(id)=>{

    if(window.confirm("Bạn có chắc muốn xóa?")){
      await API.delete("/lophp/"+id)
      loadData()
    }

  }

  return(

    <div>

      <h2>Quản lý Lớp Học Phần</h2>

      <h3>Thêm lớp học phần</h3>

      <div style={{marginBottom:20}}>

        <input
        placeholder="Mã lớp"
        value={maLop}
        onChange={e=>setMaLop(e.target.value)}
        />

        <input
        placeholder="Tên lớp"
        value={tenLop}
        onChange={e=>setTenLop(e.target.value)}
        />

        <input
        placeholder="Sĩ số tối đa"
        value={siSo}
        onChange={e=>setSiSo(e.target.value)}
        />

        {/* chọn môn học */}
        <select
        value={maMon}
        onChange={e=>setMaMon(e.target.value)}
        >

          <option value="">Chọn môn học</option>

          {monHoc.map(m =>(

            <option key={m.maMon} value={m.maMon}>
              {m.tenMon}
            </option>

          ))}

        </select>

        {/* chọn giảng viên */}
        <select
        value={maGV}
        onChange={e=>setMaGV(e.target.value)}
        >

          <option value="">Chọn giảng viên</option>

          {giangVien.map(g =>(

            <option key={g.maGiangVien} value={g.maGiangVien}>
              {g.tenGiangVien}
            </option>

          ))}

        </select>

        {/* chọn khoa */}
        <select
        value={maKhoa}
        onChange={e=>setMaKhoa(e.target.value)}
        >

          <option value="">Chọn khoa</option>

          {khoa.map(k =>(

            <option key={k.maKhoa} value={k.maKhoa}>
              {k.tenKhoa}
            </option>

          ))}

        </select>

        <button onClick={addLop}>Thêm</button>

      </div>

      <table border="1">

        <thead>

          <tr>
            <th>Mã lớp</th>
            <th>Tên lớp</th>
            <th>Môn học</th>
            <th>Giảng viên</th>
            <th>Sĩ số</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {lopHP.map(l =>(

            <tr key={l.maLopHP}>

              <td>{l.maLopHP}</td>
              <td>{l.tenLop}</td>
              <td>{l.monHoc}</td>
              <td>{l.giangVien}</td>
              <td>{l.siSoDaDK} / {l.siSoToiDa}</td>

              <td>

                <button
                onClick={()=>deleteLop(l.maLopHP)}
                >
                  Xóa
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}

export default LopHocPhanPage