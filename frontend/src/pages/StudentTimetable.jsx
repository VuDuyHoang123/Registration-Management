import { useEffect, useState } from "react"
import axios from "axios"

function formatDate(d){
  const dd = String(d.getDate()).padStart(2,'0')
  const mm = String(d.getMonth()+1).padStart(2,'0')
  const yy = d.getFullYear()
  return `${dd}/${mm}/${yy}`
}

function getMonday(date){
  const d = new Date(date)
  const day = d.getDay()
  const diff = (day === 0 ? -6 : 1) - day // shift so Monday is start
  d.setDate(d.getDate() + diff)
  d.setHours(0,0,0,0)
  return d
}

export default function StudentTimetable(){
  const [weekStart,setWeekStart] = useState(getMonday(new Date()))
  const [entries,setEntries] = useState([])
  const [loading,setLoading] = useState(false)

  const maSV = localStorage.getItem('username')

  useEffect(()=>{ load() },[weekStart])

  async function load(){
    setLoading(true)
    try{
      // load registrations
      const dkRes = await axios.get(`http://localhost:8080/api/dangky/student/${maSV}`)
      const dkList = dkRes.data || [] // array of [maDK, maLopHP]
      const registered = new Set(dkList.map(d=> Array.isArray(d)?d[1]:null).filter(Boolean))

      // load all view schedule
      const v = await axios.get('http://localhost:8080/api/lichhoc/view')
      const view = v.data || []

      // compute week range
      const monday = new Date(weekStart)
      const sunday = new Date(monday)
      sunday.setDate(monday.getDate()+6)

      // filter view for registered classes and dates within week
      const filtered = view.filter(item=>{
        if(!registered.has(item.maLopHP)) return false
        if(!item.ngay) return false
        const d = new Date(item.ngay)
        d.setHours(0,0,0,0)
        return d >= monday && d <= sunday
      }).map(item=>({
        ...item,
        dateObj: new Date(item.ngay)
      }))

      setEntries(filtered)
    }catch(err){
      console.error(err)
      setEntries([])
    }finally{ setLoading(false) }
  }

  function prevWeek(){
    const d = new Date(weekStart)
    d.setDate(d.getDate()-7)
    setWeekStart(getMonday(d))
  }

  function nextWeek(){
    const d = new Date(weekStart)
    d.setDate(d.getDate()+7)
    setWeekStart(getMonday(d))
  }

  function thisWeek(){ setWeekStart(getMonday(new Date())) }

  // render matrix rows 1..15
  const rows = []
  const monday = new Date(weekStart)
  const weekDates = [...Array(7)].map((_,i)=>{ const d=new Date(monday); d.setDate(monday.getDate()+i); return d })

  // helper to get entries starting on given day index and period
  function findEntry(dayIndex, period){
    return entries.find(e=>{
      const d = e.dateObj
      const di = Math.floor((d - monday)/(24*3600*1000))
      return di===dayIndex && e.tietBatDau === period
    })
  }

  // occupied map to avoid double rendering of rowspan cells
  const occupied = Array.from({length:7},()=>Array(16).fill(false))

  for(let period=1; period<=15; period++){
    const cells = []
    for(let day=0; day<7; day++){
      if(occupied[day][period]){ cells.push(null); continue }

      const entry = findEntry(day, period)
      if(entry){
        const span = entry.soTiet || 1
        for(let k=0;k<span;k++) occupied[day][period+k]=true
        cells.push(<td key={day} rowSpan={span} style={{background:'#f9e290',verticalAlign:'top',padding:'8px'}}>
          <div style={{fontWeight:700}}>{entry.tenLop}</div>
          <div style={{marginTop:6}}>{entry.tenMon}</div>
          <div style={{marginTop:6,fontStyle:'italic'}}>{entry.tenGiangVien}</div>
          <div style={{marginTop:6,color:'#333'}}>{entry.phongHoc}</div>
        </td>)
      } else {
        cells.push(<td key={day}></td>)
      }
    }
    rows.push(<tr key={period}><td style={{background:'#2f6fb3',color:'#fff',width:120,padding:8}}>Tiết {period}</td>{cells}</tr>)
  }

  return (
    <div style={{padding:16}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div>
          <button onClick={thisWeek}>Tuần hiện tại</button>
          <button onClick={prevWeek} style={{marginLeft:8}}>&lt;</button>
          <button onClick={nextWeek} style={{marginLeft:8}}>&gt;</button>
        </div>
        <div style={{fontWeight:700}}>Tuần: {formatDate(weekDates[0])} - {formatDate(weekDates[6])}</div>
      </div>

      {loading ? <div>Loading...</div> : (
        <table style={{width:'100%',borderCollapse:'collapse'}} border="1">
          <thead>
            <tr>
              <th style={{width:120}}></th>
              {weekDates.map((d,i)=>(
                <th key={i} style={{textAlign:'center',background:'#2f6fb3',color:'#fff'}}>
                  {['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','Chủ nhật'][i]}
                  <div style={{fontSize:12}}>{formatDate(d)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      )}
    </div>
  )
}
