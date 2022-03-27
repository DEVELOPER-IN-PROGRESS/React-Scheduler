import React ,{useState} from 'react';
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
    let [daysGrid, setDaysGrid] = useState(daysArray);

    const  checkYear = ( year) => {
        if (year % 400 === 0)
            return true;

        if (year % 100 === 0)
            return false;

        if (year % 4 === 0)
            return true;
        return false;
    }

    function incMonth(){
         ++counter ;

         daysGrid = daysGrid.splice(35).includes(1) ? daysGrid.splice(35) :daysGrid.splice(28) ;
         let checkpoint = daysGrid[daysGrid.length -1];
         console.log({checkpoint});
         ++checkpoint ;

         let tempMonth = String(Object.keys(months[counter]))
         let curr =  months[counter][tempMonth]
         ++curr;
         for(;checkpoint< curr;checkpoint++){
          daysGrid.push(checkpoint);
         }

         console.log(daysGrid.length);

        //debugger;

         checkpoint = 1;

         while(daysGrid.length<42){
                daysGrid.push(checkpoint);
                checkpoint ++;
             //   debugger;
         }


         if(counter>11){
             counter = 0;
             ++yCounter;

            months[1].February = checkYear(yCounter) ? 29 :28 ;
             setYCounter(yCounter);
         }
         setCounter(counter);
         setCurrentMonth(String(Object.keys(months[counter])));
         setDaysGrid(daysGrid);
         daysArray = daysGrid ;
     }

     function decMonth(){
        --counter ;
        if(counter<0){
            counter = 11;
            --yCounter;
            months[1].February = checkYear(yCounter) ? 29 :28 ;
            setYCounter(yCounter);
        }
         setCounter(counter);
         setCurrentMonth(String(Object.keys(months[counter])));
     }

     const populateDays = () => {
         const row = [] ;
         for(let i =0 ; i<42 ;i++){
            row.push(
                <div className="day-col" key={i} onClick={openPopup}>
                <p  className="day__number">{daysGrid[i]}</p>
               </div>
             );
         }
         return row;
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
         <div id="dayGrid" className="dayGrid">
             {
                 populateDays()
             }
         </div>

    </div>

    );

}

export default Calendar ;
