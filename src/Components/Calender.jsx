import React , {useState} from 'react'
import './Calender.css'

const Calender = () => {
  const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const monthsOfYear = ['January', 'February',"March",'April','May','June','July','August',"September",'October','November','December'];


  const currentDate = new Date();

  const [currentMonth,setCurrentMonth] = useState(currentDate.getMonth()); 

  const [currYear,setCurrYear] = useState(currentDate.getFullYear());

  const DaysInMonth = new Date(currYear,currentMonth+1,0).getDate();

  const FirstDayOfMonth = new Date(currYear,currentMonth,1).getDay();

  console.log(currentMonth, currYear,DaysInMonth);

  const PrevMonth=()=>{
    setCurrentMonth((PrevMonth)=>(PrevMonth===0?11:PrevMonth-1));
    setCurrYear((PrevYear)=>(currentMonth===0?PrevYear-1:PrevYear));
  }

  const nextMonth=()=>{
    setCurrentMonth((nextMonth)=>(nextMonth===11?0:nextMonth+1));
    setCurrYear((nextYear)=>(currentMonth===11?currYear+1:nextYear));
  }

  return (
    <div className='calender' >
      <div className="navigate-date">
        <h2 className="month">{monthsOfYear[currentMonth]},</h2>
        <h2 className="year">{currYear}</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={PrevMonth}></i>
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>

      <div className="weekdays">
        {daysOfWeek.map((day)=>(
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="days">
        {[...Array(FirstDayOfMonth).keys()].map((_,index)=>(
          <span key={`empty-${index}`}></span>
        ))}

        {[...Array(DaysInMonth).keys()].map((_,index)=>(
          <span key={index+1} className={index+1===currentDate.getDate() && currentMonth===currentDate.getMonth() && currYear===currentDate.getFullYear() ?'current-day':''}>{index+1}</span>
        ))}

      </div>
    </div>
  )
}

export default Calender