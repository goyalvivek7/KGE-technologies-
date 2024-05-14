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


// ====== Radio button input field ===========
$(document).ready(function() {
    // Add change event listener to the radio button
    $("input[name='interestedField']").change(function() {
        // Check if the "Other" option is selected
        if ($(this).is(":checked") && $(this).val() === "other") {
            // Show the input text field
            $("#otherText").show();
            $("#otherText").attr("required", "true");
            $("#otherText").attr("value", "");
        } else {
            // Hide the input text field
            $("#otherText").hide();
            $("#otherText").attr("required", "false");
            $("#otherText").attr("value", "false");
            $(".interestedField-error-message").hide();
        }
    });
});
$(document).ready(function() {
    // Add change event listener to the radio button
    $("input[name='month']").change(function() {
        // Check if the "Other" option is selected
        if ($(this).is(":checked") && $(this).val() === "others") {
            // Show the input text field
            $("#otherMonthText").show();
            $("#otherMonthText").attr("required", "true");
            $("#otherMonthText").attr("value", "");
        } else {
            // Hide the input text field
            $("#otherMonthText").hide();
            $("#otherMonthText").attr("required", "false");
            $("#otherMonthText").attr("value", "false");
            $(".month-error-message").hide();
        }
    });
});




$(document).ready(function() {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);

    $(".next").click(function() {
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        var isValid = true;

        // Find the first empty required field
        current_fs.find("input[required], select[required]").each(function() {
            var selectedRadios = $("input[type='radio']:checked").length;
            if ($(this).val() === "") {
                isValid = false;
                $(this).addClass("error"); // Add error class to highlight empty required field
                $(this).next(".error-message").text("This field is required"); // Show error message
                return false; // Exit the loop when the first empty required field is found
            } else {
                if ($(this).attr("type") === "email") { // Check if it's an email input
                    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
                    if (!emailPattern.test($(this).val())) { // Check if email format is valid
                        isValid = false;
                        $(this).addClass("error"); // Add error class to highlight invalid email
                        $(this).next(".error-message").text("Invalid email format"); // Show error message
                        return false; // Exit the loop when invalid email is found
                    }
                } else if ($(this).attr("name") === "mobilenumber") { // Check if it's a phone number input
                    var phonePattern = /^[0-9]{10}$/; // Regular expression for phone number validation (10 digits)
                    if (!phonePattern.test($(this).val())) { // Check if phone number format is valid
                        isValid = false;
                        $(this).addClass("error"); // Add error class to highlight invalid phone number
                        $(this).next(".error-message").text("Invalid phone number format"); // Show error message
                        return false; // Exit the loop when invalid phone number is found
                    }
                }
                $(this).removeClass("error"); // Remove error class if field is filled
                $(this).next(".error-message").text(""); // Hide error message if field is filled
            }
        });


        // If all required fields are filled and email/phone number is valid, proceed to the next step
        if (isValid) {
            // Add Class Active
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active filldetails");

            // Show the next fieldset
            next_fs.show();
            // Hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function(now) {
                    // For making fieldset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    next_fs.css({
                        'opacity': opacity
                    });
                },
                duration: 500
            });
            setProgressBar(++current);
        }
    });


    $(".previous").click(function() {

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({
                    'opacity': opacity
                });
            },
            duration: 500
        });
        setProgressBar(--current);
    });


    function setProgressBar(curStep) {
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar")
            .css("width", percent + "%")
    }

    $(".submit").click(function() {
        return false;
    })
});

document.getElementById("msform").addEventListener("submit", function(event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    // Redirect to the thank you page after form submission
    window.location.href = "thank-you.html";
});