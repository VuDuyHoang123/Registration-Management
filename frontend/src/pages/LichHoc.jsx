import { useEffect, useState } from "react"
import axios from "axios"

function LichHoc(){

const [data,setData] = useState([])

const [form,setForm] = useState({
    id:"",
    maLopHP:"",
    ngay:"",
    tietBatDau:"",
    phongHoc:"",
    soTiet:""
})

const [registered,setRegistered] = useState([])
const [showRegistered,setShowRegistered] = useState(false)
const [selectedLop,setSelectedLop] = useState("")
const [results,setResults] = useState({})

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
    ngay:form.ngay,
    tietBatDau:form.tietBatDau,
    phongHoc:form.phongHoc,
    soTiet:form.soTiet
})

setForm({maLopHP:"",ngay:"",tietBatDau:"",phongHoc:"",soTiet:""})
loadData()

}


// ======================
// sửa lịch học
// ======================

const update = async () =>{

await axios.put(`http://localhost:8080/api/lichhoc/${form.id}`,{
    id:form.id,
    lopHocPhan:{maLopHP:form.maLopHP},
    ngay:form.ngay,
    tietBatDau:form.tietBatDau,
    phongHoc:form.phongHoc,
    soTiet:form.soTiet
})

setForm({id:"",maLopHP:"",ngay:"",tietBatDau:"",phongHoc:"",soTiet:""})
loadData()

}


// ======================
// xóa lịch học
// ======================

const remove = async (id) =>{

await axios.delete(`http://localhost:8080/api/lichhoc/${id}`)
loadData()

}


// xem sinh viên đã đăng ký
const viewStudents = async (maLopHP) =>{
    const res = await axios.get(`http://localhost:8080/api/dangky/lop/${maLopHP}`)
    setRegistered(res.data)
    setShowRegistered(true)
    setSelectedLop(maLopHP)
    // init results map
    const init = {}
    res.data.forEach(dk=>{
        if(dk.sinhVien) init[dk.sinhVien.maSV] = {diemCC:'',diemGiuaKy:'',diemCuoiKy:''}
    })
    // try to load existing results for class
    try{
        const r = await axios.get(`http://localhost:8080/api/ketqua/lop/${maLopHP}`)
        r.data.forEach(kq=>{
            if(kq.sinhVien && init[kq.sinhVien.maSV] !== undefined){
                init[kq.sinhVien.maSV] = {
                    diemCC: kq.diemCC ?? '',
                    diemGiuaKy: kq.diemGiuaKy ?? '',
                    diemCuoiKy: kq.diemCuoiKy ?? ''
                }
            }
        })
    }catch(e){
        // ignore
    }

    setResults(init)
}

const handleResultChange = (maSV,field,value)=>{
    setResults(prev=>({
        ...prev,
        [maSV]:{
            ...prev[maSV],
            [field]:value
        }
    }))
}

const saveResult = async (maSV)=>{
    const r = results[maSV]
    const toNum = (v)=> v === '' || v == null ? null : parseFloat(v)
    const diemCC = toNum(r.diemCC)
    const diemGiuaKy = toNum(r.diemGiuaKy)
    const diemCuoiKy = toNum(r.diemCuoiKy)
    let diemTong = null
    if(diemCC != null || diemGiuaKy != null || diemCuoiKy != null){
        const vals = [diemCC,diemGiuaKy,diemCuoiKy].filter(x=>x!=null)
        diemTong = vals.reduce((a,b)=>a+b,0)/vals.length
    }

    await axios.post("http://localhost:8080/api/ketqua",{
        sinhVien:{maSV:maSV},
        lopHocPhan:{maLopHP:selectedLop},
        diemCC:diemCC,
        diemGiuaKy:diemGiuaKy,
        diemCuoiKy:diemCuoiKy,
        diemTongKet:diemTong
    })

    alert('Lưu kết quả cho ' + maSV)
}


// ======================
// chọn dữ liệu để sửa
// ======================

const edit = (item) =>{

setForm({
    id:item.id,
    maLopHP:item.maLopHP,
    ngay:item.ngay,
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
type="date"
placeholder="Ngày"
value={form.ngay}
onChange={(e)=>setForm({...form,ngay:e.target.value})}
/
>

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
<th>Ngày</th>
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
<td>{item.ngay}</td>
<td>{item.tietBatDau}</td>
<td>{item.phongHoc}</td>
<td>{item.soTiet}</td>

<td>

<button onClick={()=>edit(item)}>Sửa</button>

<button onClick={()=>remove(item.id)}>Xóa</button>

<button onClick={()=>viewStudents(item.maLopHP)}>Xem SV</button>

</td>

</tr>

))}

</tbody>

</table>

{showRegistered && (

<div style={{marginTop:20}}>
    <h3>Danh sách sinh viên đã đăng ký: {selectedLop}</h3>

    <table border="1">
        <thead>
            <tr>
                <th>Mã SV</th>
                <th>Họ tên</th>
                <th>Điểm CC</th>
                <th>Điểm giữa kỳ</th>
                <th>Điểm cuối kỳ</th>
                <th>Hành động</th>
            </tr>
        </thead>
        <tbody>
            {registered.map(dk=>{
                const sv = dk.sinhVien
                if(!sv) return null
                return (
                    <tr key={sv.maSV}>
                        <td>{sv.maSV}</td>
                        <td>{sv.hoTen}</td>
                        <td>
                            <input value={results[sv.maSV]?.diemCC || ''} onChange={(e)=>handleResultChange(sv.maSV,'diemCC',e.target.value)} />
                        </td>
                        <td>
                            <input value={results[sv.maSV]?.diemGiuaKy || ''} onChange={(e)=>handleResultChange(sv.maSV,'diemGiuaKy',e.target.value)} />
                        </td>
                        <td>
                            <input value={results[sv.maSV]?.diemCuoiKy || ''} onChange={(e)=>handleResultChange(sv.maSV,'diemCuoiKy',e.target.value)} />
                        </td>
                        <td>
                            <button onClick={()=>saveResult(sv.maSV)}>Lưu</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>

    <button onClick={()=>setShowRegistered(false)}>Đóng</button>

</div>

)}

</div>

)

}

export default LichHoc