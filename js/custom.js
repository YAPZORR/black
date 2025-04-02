var myday, myhour, myminute, mysecond;
var previousDay = "", previousHour = "", previousMinute = "", previousSecond = "";

function flipNumber(el, newnumber) {
    el.addClass("flipping"); // Add a flipping class for animation (if any)
    el.text(newnumber); // Update the number directly

    setTimeout(function () {
        el.removeClass("flipping"); // Remove the flipping class after animation
    }, 500);
}

// (year, month - 1, day, hour, minute, second) 
const targetDate = new Date(Date.UTC(2024, 11, 1, 23, 59, 0)); // December is month 11 in JavaScript Date

function calculateRemainingTime() {  
    const now = new Date();
    const difference = targetDate - now; // Time difference in milliseconds  

    if (difference <= 0) {
        // Timer has reached the target
        return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24)); // Calculate full days
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24); // Remaining hours
    const minutes = Math.floor((difference / (1000 * 60)) % 60); // Remaining minutes
    const seconds = Math.floor((difference / 1000) % 60); // Remaining seconds

    return {
        days: days < 10 ? "0" + days : days,
        hours: hours < 10 ? "0" + hours : hours,
        minutes: minutes < 10 ? "0" + minutes : minutes,
        seconds: seconds < 10 ? "0" + seconds : seconds
    };
} 

function setTime() {
    const { days, hours, minutes, seconds } = calculateRemainingTime();

    // Only update the day, hour, minute, and second if they have changed
    if (days !== previousDay) {
        flipNumber(myday, days);
        previousDay = days;
    }
    if (hours !== previousHour) {
        flipNumber(myhour, hours);
        previousHour = hours;
    }
    if (minutes !== previousMinute) {
        flipNumber(myminute, minutes);
        previousMinute = minutes;
    }
    if (seconds !== previousSecond) {
        flipNumber(mysecond, seconds);
        previousSecond = seconds;
    }

    setTimeout(setTime, 1000); // Recur every second
}

jQuery(document).ready(function($) {

    $(function () {
        // Cache the elements to avoid selecting them every second
        myday = $(".countdown .days");
        myhour = $(".countdown .hours");
        myminute = $(".countdown .mins");
        mysecond = $(".countdown .secs");
        
        // Initialize the previous values to the current display
        previousDay = myday.text();
        previousHour = myhour.text();
        previousMinute = myminute.text();
        previousSecond = mysecond.text();

        setTime(); // Start the countdown
    });
});


$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
 
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

jQuery(document).ready(function($) {

    $('.slider-big').slick({
        infinite: true,
        prevArrow: $('.slider-big-prev-btn'),
        nextArrow: $('.slider-big-next-btn'),
        asNavFor: '.slider-small',
    });

    $('.slider-small').slick({ 
        asNavFor: '.slider-big', 
        dots: false, 
        arrows: false,
        infinite: true,
        focusOnSelect: true,
        variableWidth: true,
    }); 

    $('label input').on('change', function() { 
        $('label').removeClass('selected');
        $(this).closest('label').addClass('selected');
    });

    var $page = $('html, body'); 
    $('a[href*="#"]').click(function() {
        $('video').each(function() {   
                $(this).get(0).pause();
            }); 
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 60 
        }, 1200); 
        return false;
    });

    $('.faq-content .col').accordionjs();

    $('.reviews-item video').on('click', function() {
        if($(this).get(0).paused) {
            $('video').each(function() {
                $(this).get(0).pause(); 
            });
 
            $(this).get(0).play();
        } else { 
            $(this).get(0).pause();
        }
    });

    $('.items .item input').on('change', function() {
        let exit = $(this).val();
        let link = `/links-f40/${exit}.php`;

        $('.info .cta').attr('href', link);
    });


});
