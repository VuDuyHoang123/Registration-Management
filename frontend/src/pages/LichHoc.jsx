import { useEffect, useState } from "react"
import axios from "axios"

function LichHoc(){

const [data,setData] = useState([])

const [form,setForm] = useState({
    id:"",
    maLopHP:"",
    thu:"",
    tietBatDau:"",
    phongHoc:"",
    soTiet:""
})

const loadData = async () =>{
    const res = await axios.get("http://localhost:8080/api/lichhoc/view")
    setData(res.data)
}

useEffect(()=>{
    loadData()
},[])


// ======================
// thêm lịch học
// ======================

const add = async () =>{

await axios.post("http://localhost:8080/api/lichhoc",{
    lopHocPhan:{maLopHP:form.maLopHP},
    thu:form.thu,
    tietBatDau:form.tietBatDau,
    phongHoc:form.phongHoc,
    soTiet:form.soTiet
})

setForm({maLopHP:"",thu:"",tietBatDau:"",phongHoc:"",soTiet:""})
loadData()

}


// ======================
// sửa lịch học
// ======================

const update = async () =>{

await axios.put(`http://localhost:8080/api/lichhoc/${form.id}`,{
    id:form.id,
    lopHocPhan:{maLopHP:form.maLopHP},
    thu:form.thu,
    tietBatDau:form.tietBatDau,
    phongHoc:form.phongHoc,
    soTiet:form.soTiet
})

setForm({id:"",maLopHP:"",thu:"",tietBatDau:"",phongHoc:"",soTiet:""})
loadData()

}


// ======================
// xóa lịch học
// ======================

const remove = async (id) =>{

await axios.delete(`http://localhost:8080/api/lichhoc/${id}`)
loadData()

}


// ======================
// chọn dữ liệu để sửa
// ======================

const edit = (item) =>{

setForm({
    id:item.id,
    maLopHP:item.maLopHP,
    thu:item.thu,
    tietBatDau:item.tietBatDau,
    phongHoc:item.phongHoc,
    soTiet:item.soTiet
})

}

return(

<div>

<h2>Quản lý lịch học</h2>


{/* FORM */}

<div>

<input
placeholder="Mã lớp HP"
value={form.maLopHP}
onChange={(e)=>setForm({...form,maLopHP:e.target.value})}
/>

<input
placeholder="Thứ"
value={form.thu}
onChange={(e)=>setForm({...form,thu:e.target.value})}
/>

<input
placeholder="Tiết bắt đầu"
value={form.tietBatDau}
onChange={(e)=>setForm({...form,tietBatDau:e.target.value})}
/>

<input
placeholder="Phòng học"
value={form.phongHoc}
onChange={(e)=>setForm({...form,phongHoc:e.target.value})}
/>

<input
placeholder="Số tiết"
value={form.soTiet}
onChange={(e)=>setForm({...form,soTiet:e.target.value})}
/>

<button onClick={add}>Thêm</button>
<button onClick={update}>Sửa</button>

</div>


{/* BẢNG */}

<table border="1">

<thead>
<tr>
<th>Mã lớp HP</th>
<th>Tên lớp</th>
<th>Môn học</th>
<th>Giảng viên</th>
<th>Thứ</th>
<th>Tiết</th>
<th>Phòng</th>
<th>Số tiết</th>
<th>Hành động</th>
</tr>
</thead>

<tbody>

{data.map((item)=>(

<tr key={item.id}>

<td>{item.maLopHP}</td>
<td>{item.tenLop}</td>
<td>{item.tenMon}</td>
<td>{item.tenGiangVien}</td>
<td>{item.thu}</td>
<td>{item.tietBatDau}</td>
<td>{item.phongHoc}</td>
<td>{item.soTiet}</td>

<td>

<button onClick={()=>edit(item)}>Sửa</button>

<button onClick={()=>remove(item.id)}>Xóa</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default LichHoc