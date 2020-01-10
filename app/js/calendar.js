
function calendarHtml(now) {
    let html = '<thead><tr class="calendar__days"><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Нд</th></tr></thead><tbody>';
    let day = new Date(now);
    day.setDate(1);
    let Day = day.getDay();
    if (Day === 0) Day = 7;
    day.setDate(day.getDate()-Day+1);
    do { 
        html += '<tr class="calendar__numbers">';
        for(let i = 0; i < 7 ; i++){
            let className = day.getMonth() !== now.getMonth() ? ' class="unactive"' : '';
            let currentDate = add0(day.getDate()) + '.' + add0(day.getMonth() + 1) + '.' + day.getFullYear();
            html += '<td data-date="' + currentDate + '"' + className + '><span>' + day.getDate() + '</span></td>';
            day.setDate(day.getDate()+1);
        }
        html += '</tr>';
    } while (day.getMonth() === now.getMonth());
    return html + '</tbody>';
}

function calendarButtons() {
    document.querySelector('.calendar__btn-prev').addEventListener('click', changeCalendar);
    document.querySelector('.calendar__btn-next').addEventListener('click', changeCalendar);
    function changeCalendar(){
        now.setMonth(now.getMonth() + +this.dataset.m);
        calendarTable.innerHTML = calendarHtml(now);
        span.innerText = months[now.getMonth()] + ', ' + now.getFullYear();
        tdClicks();
    }
}
function tdClicks() {
    let td = calendarTable.querySelectorAll('td:not(.unactive)');
    td.forEach(td => {
        td.removeEventListener('click', tdClick);
        td.addEventListener('click', tdClick);
    });
    function tdClick() {
       let calendar;
       let elem = this;
        do {
            if (elem.classList.contains('calendar')) {
                calendar = elem;
                break;
            }
        } while (elem = elem.parentElement);
        if (!calendar) return;
        calendar.targetButton.innerText = this.dataset.date;
    }
}
function add0(n) {
    return n > 9 ? n : '0' + n;
}

let now = new Date();
let calendarTable = document.querySelector('.calendar table');
calendarTable.innerHTML = calendarHtml(now);
let span = document.querySelector('.calendar__title-text');
let months  = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
span.innerText = months[now.getMonth()] + ', ' + now.getFullYear();
tdClicks();
calendarButtons();
let today = new Date();
today = add0(today.getDate()) + '.' + add0(today.getMonth() + 1) + '.' + today.getFullYear();
document.querySelectorAll('.header__bottom-calendar').forEach(e => e.innerHTML = today);
