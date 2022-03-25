import React ,{useState,useEffect} from 'react';
import Popup from '../popup/popup';

import './calendar.css';

const Calendar = () => {

    const months =[{January:31},{February:28},{March:31},{April:30},{May:31},{June:30},{July:31},{August:31},{September:30},{October:31},{November:30},{December:31},] ;

    const days = ["S" ,"M", "T", "W" ,"T","F" ,"S"] ;

    let daysArray = [27,28,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9];

    const d = new Date();
    let currentMonth = String(Object.keys(months[d.getMonth()])) ;

    const [monthNow ,setCurrentMonth]= useState(currentMonth) ;
    let [counter , setCounter] = useState(d.getMonth())
    let [yCounter , setYCounter] = useState(d.getFullYear())

    function incMonth(){
        console.log(daysArray);
         ++counter ;
         if(counter>11){
             counter = 0;
             ++yCounter;
             setYCounter(yCounter);
         }
         setCounter(counter);
         setCurrentMonth(String(Object.keys(months[counter])));
     }

     function decMonth(){
        --counter ;
        if(counter<0){
            counter = 11;
            --yCounter;
            setYCounter(yCounter);
        }
         setCounter(counter);
         setCurrentMonth(String(Object.keys(months[counter])));
     }

     function openPopup(){
        document.getElementById('popupcontrol').style.display = 'block'
     }
        // useEffect(() => {
        //         console.log("start");
        // }, []);

    return(
     <div className='calendar-wrapper'>
         <div>
            <Popup />
         </div>
         <div className="month-wrapper">
             <div>
                <span onClick={decMonth} id="leftArrow">&#9664;</span>
             </div>

              <div>
               <p id='currentMonth' className='currentMonth'>{monthNow} {yCounter}</p>
              </div>

              <div>
                <span onClick={incMonth} id="rightArrow">&#9654;</span>
              </div>
         </div>
         <div className="day-wrapper">
             {
                 days.map( (day,id)=>{
                     return (
                        <div className='day__shortcode' key={id}><span >{day}</span></div>
                     );
                 })
             }
         </div>
         <div className="dayGrid">
             {
                daysArray.map( (date,id) =>{
                    return(
                    <div className="day-col" key={id} onClick={openPopup}>
                        <p  className="day__number">{date}</p>
                     </div>);
                 }
                )
             }

         </div>

    </div>

    );

}

export default Calendar ;
