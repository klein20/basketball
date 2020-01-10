(function (){
    
    let SliderTeamUl = document.querySelector('.slider-team ul');
    teamSliderButtons();

    document.querySelector('.header__bottom-calendar').addEventListener('click',showCalendar);

    window.addEventListener('resize', function(){
        setPositionCalendar(document.querySelector('.header__bottom-calendar'));
    });

    function teamSliderButtons() {
        let btnPrev = document.querySelector('.slider-team__prev');
        let btnNext = document.querySelector('.slider-team__next');
        btnPrev.addEventListener('click', teamSliderPrev);
        btnNext.addEventListener('click', teamSliderNext);
        
        function teamSliderPrev() {
            if (SliderTeamUl.classList.contains('animate')) return;
            SliderTeamUl.classList.add('animate');
            setTimeout(() => SliderTeamUl.classList.remove('animate'), 210);
            let wrapWidth = SliderTeamUl.parentElement.clientWidth;
            let sliderWidth = SliderTeamUl.children.length*59;
            let left = parseInt(getComputedStyle(SliderTeamUl).left);
            left -= 59;
            if (wrapWidth-left>sliderWidth) { 
                this.classList.add('unactive');
                return; 
            }
            btnNext.classList.remove('unactive');
            SliderTeamUl.style.left = left + 'px';
        }
    
        function teamSliderNext() {
            if (SliderTeamUl.classList.contains('animate')) return;
            SliderTeamUl.classList.add('animate');
            setTimeout(() => SliderTeamUl.classList.remove('animate'), 210);
            let left = parseInt(getComputedStyle(SliderTeamUl).left);
            left += 59; 
            if (left>0) {
                this.classList.add('unactive');
                return; 
            }
            btnPrev.classList.remove('unactive');
            SliderTeamUl.style.left = left + 'px';
        }
    }
    function showCalendar(e) {
        // this - button
        e.stopPropagation();
        setPositionCalendar(this);
        let calendar = document.querySelector('.calendar');
        calendar.style.display = 'block';
        calendar.targetButton = this;
        window.addEventListener('click', windowClick);
    }
    function setPositionCalendar(button){
        let calendar = document.querySelector('.calendar');
        let rect = button.getBoundingClientRect();
        let left = rect.x + window.scrollX;
        let top = rect.y + window.scrollY + button.clientHeight + 9;
        calendar.style.left = left + 'px';
        calendar.style.top = top + 'px';
    }
    function hideCalendar() {
        let button = this;
        let calendar = document.querySelector('.calendar');
        calendar.style.display = 'none';
        window.removeEventListener('click', windowClick);
    }
    function isCalendar(elem) {
        do {
            if (elem.classList.contains('calendar')) return true;
        } while (elem = elem.parentElement);
        return false;
    }
    function windowClick(event) {
        if (!isCalendar(event.target)) hideCalendar();
    }


    let inputEmail = document.querySelector('[name="email"]');

    (function (){

        let form = document.querySelector('form');
        let inputEmail = document.querySelector('[name="email"]');
    
        form.onsubmit = function() {
            let validEmail = validatorEmail(inputEmail);
            if (!validEmail) {
                form.querySelector('.error').focus();
            }
            return validEmail;
        }
    
        inputEmail.oninput = removeErrorClass;
    
        function validatorEmail(input) {
            let re = /^[a-z0-9_\.-]+@[a-z0-9\.]+\.[a-z0-9]{2,10}$/i;
            let res = re.test(input.value);
            if (!res) input.classList.add('error');
            return res;
        }
        function removeErrorClass() {
            this.classList.remove('error');
        }
    
    })();

    window.oldWidth = window.innerWidth;

    window.addEventListener('resize', function() {
        if ((window.oldWidth > 1200 && window.innerWidth <= 1200) ||
            window.oldWidth <= 1200 && window.innerWidth > 1200 )
            window.dispatchEvent(new Event('stopPoint'));
        window.oldWidth = window.innerWidth;
    });
    window.addEventListener('stopPoint', function() {
        console.log('dsfdsf');
    });

})();
