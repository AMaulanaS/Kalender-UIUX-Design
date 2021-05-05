
alert("May Not look good in smaller devices!");


let monthView ;
let yearView ;
let dateViewRows ;
let currentDate ;
let selectedMonth ;
let selectedYear ;
let calendarView ;
let weekNames ;
let dayMarker ;
const minYear = 1990 ;
const maxYear = 2050 ;

window.onload = () => {
    monthView = document.querySelector(".month-control .option-list");
    yearView  = document.querySelector(".year-control  .option-list");
    calendarView = document.getElementById("calendarView");
    dateViewRows = document.querySelectorAll(".date-row");
    weekNames = document.querySelectorAll(".week-name");
    dayMarker = document.querySelector(".bottom-marker");

    // Generate Options for Year Select View
    generateYear();
    
    // Get Current Date
    getCurrentDate();

    // Update Calendar
    selectedMonth = currentDate.month ;
    selectedYear  = currentDate.year ;
    updateCalendarView();

    // display calendar
    setTimeout(()=>{calendarView.classList.add("visible")},320)
};

function getCurrentDate(){
    var dateObject = new Date() ;
    currentDate = {} ;
    currentDate.date  = dateObject.getDate() ;
    currentDate.month = dateObject.getMonth();
    currentDate.year  = dateObject.getFullYear() ;
    currentDate.day   = dateObject.getDay() - 1 ;
    if(currentDate.day < 0) currentDate.day = 6 ;
    return currentDate ;
}

function updateCalendarView(){
    // Update Current Year
    let index = selectedYear - minYear ;
    yearView.style.setProperty("--index",index);

    // Update Current Month
    monthView.style.setProperty("--index",selectedMonth);
    var lastDate = daysInMonth(selectedMonth+1,selectedYear);
    calendarView.classList.remove("hide-d29");
    calendarView.classList.remove("hide-d30");
    calendarView.classList.remove("hide-d31");
    if(lastDate == 28){
        calendarView.classList.add("hide-d29");
    } else if(lastDate == 29){
        calendarView.classList.add("hide-d30");
    } else if(lastDate == 30){
        calendarView.classList.add("hide-d31");
    }

    // Update Dates
    let firstDay = (new Date(selectedYear,selectedMonth,1)).getDay() - 1 ;
    if(firstDay<0) firstDay = 6 ;
    dateViewRows[0].style.setProperty("--index",firstDay);
    dateViewRows[1].style.setProperty("--index",firstDay - 6);
    dateViewRows[2].style.setProperty("--index",firstDay - 6);
    dateViewRows[3].style.setProperty("--index",firstDay - 6);
    dateViewRows[4].style.setProperty("--index",firstDay - 6);
    dateViewRows[5].style.setProperty("--index",firstDay - 6);

    // Highlight current day
    dayMarker.style.setProperty("--index",currentDate.day);
    weekNames.forEach(weekName => {
        weekName.classList.remove("active");
    });
    weekNames[currentDate.day].classList.add("active");

    var date = currentDate.date ;
    for(var i=0;i<6;i++){
        var dateList = dateViewRows[i].querySelectorAll(".date") ;
        dateList.forEach(d => {
            d.classList.remove("active");
            d.removeEventListener("click",setCurrentDate);
            if(d.innerHTML == date) {
                d.classList.add("active");
                d.setAttribute("date",date);
                d.addEventListener("click",setCurrentDate);
            }
        });
    }
 

    // Highlight current date


    calendarView.classList.remove("not-current");
    if(selectedYear != currentDate.year || selectedMonth != currentDate.month)
        calendarView.classList.add("not-current");
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function generateYear(){
    yearView.innerHTML = "" ;
    for(var i=minYear;i<maxYear;i++){
        yearView.innerHTML += `<div class="option">${i}</div>`;
    }
}

function prevMonth(){
    selectedMonth -- ;
    if(selectedMonth < 0) selectedMonth = 11 ;
    updateCalendarView();
}

function nextMonth(){
    selectedMonth ++ ;
    selectedMonth %= 12 ;
    updateCalendarView();
}

function prevYear(){
    selectedYear--;
    if(selectedYear < minYear) selectedYear = maxYear ;
    updateCalendarView();

}

function nextYear(){
    selectedYear++;
    selectedYear%= maxYear ;
    updateCalendarView();
}

function setCurrentDate(){
    selectedYear = currentDate.year ;
    selectedMonth = currentDate.month ;
    updateCalendarView();
}