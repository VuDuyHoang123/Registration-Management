import { useEffect, useState } from "react"
import API from "../services/api"

function StudentRegisterPage(){

const [lichHoc,setLichHoc] = useState([])
const [dangKyList,setDangKyList] = useState([])

const maSV = localStorage.getItem("username")

// load dữ liệu
const loadData = async ()=>{

try{

const lich = await API.get("/lichhoc/view")
setLichHoc(lich.data)

}catch(err){
console.log("Lỗi load lịch học",err)
}

try{

const dk = await API.get(`/dangky/student/${maSV}`)
setDangKyList(dk.data)

}catch(err){
console.log("Lỗi load đăng ký",err)
setDangKyList([])
}

}

useEffect(()=>{
loadData()
},[])


// đăng ký
const handleDangKy = async (maLopHP)=>{

try{

await API.post("/dangky",{
sinhVien:{maSV:maSV},
lopHocPhan:{maLopHP:maLopHP}
})

alert("Đăng ký thành công")

loadData()

}catch(err){

console.log(err)
alert("Đăng ký thất bại")

}

}


// hủy đăng ký
const handleHuy = async (maDK)=>{

if(!window.confirm("Bạn có chắc muốn hủy đăng ký?")) return

try{

await API.delete(`/dangky/${maDK}`)

alert("Hủy đăng ký thành công")

loadData()

}catch(err){

console.log(err)
alert("Hủy đăng ký thất bại")

}

}

return(

<div>

<h2>Danh sách lớp học</h2>

<table border="1">

<thead>
<tr>
<th>Lớp</th>
<th>Môn</th>
<th>Giảng viên</th>
<th>Ngày</th>
<th>Tiết</th>
<th>Phòng</th>
<th></th>
</tr>
</thead>

<tbody>

{lichHoc.map((item)=>{

const dk = dangKyList.find(
d => d?.lopHocPhan?.maLopHP === item.maLopHP
)

return(

<tr key={item.id}>

<td>{item.tenLop}</td>
<td>{item.tenMon}</td>
<td>{item.tenGiangVien}</td>
<td>{item.ngay}</td>
<td>{item.tietBatDau}</td>
<td>{item.phongHoc}</td>

<td>

{dk ?

<span style={{color:"green"}}>Đã đăng ký</span>

:

<button onClick={()=>handleDangKy(item.maLopHP)}>
Đăng ký
</button>

}

</td>

</tr>

)

})}

</tbody>

</table>

<br/>
<br/>

<h2>Các lớp đã đăng ký</h2>

{/* Build a map of registered classId -> registrationId so we can cancel by id */}
{(() => {
	const dkMap = {}
	dangKyList.forEach(d => {
		// API returns [maDK, maLopHP]
		if (Array.isArray(d) && d.length >= 2) dkMap[d[1]] = d[0]
	})

	const registeredClasses = lichHoc.filter(item => dkMap[item.maLopHP])

	return (
		<table border="1">
			<thead>
				<tr>
					<th>Lớp</th>
					<th>Môn</th>
					<th>Giảng viên</th>
					<th>Ngày</th>
					<th>Tiết</th>
					<th>Phòng</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{registeredClasses.map(item => (
					<tr key={item.id}>
						<td>{item.tenLop}</td>
						<td>{item.tenMon}</td>
						<td>{item.tenGiangVien}</td>
						<td>{item.ngay}</td>
						<td>{item.tietBatDau}</td>
						<td>{item.phongHoc}</td>
						<td>
							<button onClick={() => handleHuy(dkMap[item.maLopHP])}>
								Hủy đăng ký
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
})()}

</div>

)

}

export default StudentRegisterPage