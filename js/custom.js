// =====sticky header ===========
$(window).scroll(function() {
    if ($(this).scrollTop() > 10) {
        $('header').addClass("sticky");
    } else {
        $('header').removeClass("sticky");
    }
});
// ====== Responsive Header ===========
$(document).ready(function() {
    $(document).on("click", ".mobile-toggle-btn", function() {
        if ($(this).hasClass('active')) {
            $(this).addClass("active");
            $("#mySidenav").css("width", "0");
        } else {
            $(this).removeClass("active");
            $("#mySidenav").css("width", "100vw");
        }
    });
});



$(document).ready(function(){

var current_fs, next_fs, previous_fs; //fieldsets
var opacity;
var current = 1;
var steps = $("fieldset").length;

setProgressBar(current);

$(".next").click(function(){

current_fs = $(this).parent();
next_fs = $(this).parent().next();

//Add Class Active
$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active filldetails");

//show the next fieldset
next_fs.show();
//hide the current fieldset with style
current_fs.animate({opacity: 0}, {
step: function(now) {
// for making fielset appear animation
opacity = 1 - now;

current_fs.css({
'display': 'none',
'position': 'relative'
});
next_fs.css({'opacity': opacity});
},
duration: 500
});
setProgressBar(++current);
});

$(".previous").click(function(){

current_fs = $(this).parent();
previous_fs = $(this).parent().prev();

//Remove class active
$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

//show the previous fieldset
previous_fs.show();

//hide the current fieldset with style
current_fs.animate({opacity: 0}, {
step: function(now) {
// for making fielset appear animation
opacity = 1 - now;

current_fs.css({
'display': 'none',
'position': 'relative'
});
previous_fs.css({'opacity': opacity});
},
duration: 500
});
setProgressBar(--current);
});

function setProgressBar(curStep){
var percent = parseFloat(100 / steps) * curStep;
percent = percent.toFixed();
$(".progress-bar")
.css("width",percent+"%")
}

$(".submit").click(function(){
return false;
})

});

document.getElementById("msform").addEventListener("submit", function(event) {
  // Prevent the form from submitting normally
  event.preventDefault();
  
  // Redirect to the thank you page after form submission
  window.location.href = "thank-you.html";
});