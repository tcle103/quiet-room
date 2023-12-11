// quiet room javascript yahoo
// Group 12 - Joey Longo, Phoebe Rettberg, Cho Wing Koon, Tien Le and Nicole Van Fleet Kingery

// variables

var clickedObj = {
    clockClicked: false,
    bedClicked: false,
    phoneClicked: false,
    cardClicked: false,
    diaryClicked: false,
    stickyClicked: false
}

var allDone = false;

// flashlight functionality

// HEAVILY based on this except using DOMPoints https://codepen.io/noeldelgado/pen/ByxQjL

var svgPoint = new DOMPoint();
var svgElement = document.querySelector('svg');
var maskedCircle = document.getElementById("maskedCircle")

console.log(svgElement);

// pretty much turn mouse location based on a mouse event (mousemove)
// into a coordinate in the svg element (so can move the mask there)
function getCursorPoint(event, svg) {
    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;
    return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
    // this is some weird messy stuff having to do with SVG units differing from DOM coords
}

// this is gonna change where the clip shape is based on mousemove when we write the event listener
function update(svgCoords) {
    maskedCircle.setAttribute('cx', svgCoords.x);
    maskedCircle.setAttribute('cy', svgCoords.y);
}

window.addEventListener('mousemove', function (e) {
    update(getCursorPoint(e, svgElement));
    console.log("im moving!")
}, false);


// item interactivity

// light switch
var switchSound = document.getElementById("switchSound");
var noSwitch = document.getElementById("noSwitch");
$("#switch").click(function () {
    allDone = true;
    for (key in clickedObj) {
        if (clickedObj[key] === false) {
            allDone = false;
        }
    }
    if (allDone === true) {
        // play light switch sound here
        switchSound.play();
        console.log("all done, lights on!");
        $(".under").toggleClass("clipped");
        if ($(".under").hasClass("clipped")) {
            $("#switch").attr("src", "img/LightSwitchOff.png");
        }
        else {
            $("#switch").attr("src", "img/LightSwitchOn.png");
        }
    }
    else {
        noSwitch.play();
        console.log("not yet!");
        console.log(clickedObj);
    }

})

// alarm clock
var alarm = document.getElementById("alarm");
alarm.loop = true;
setTimeout(function () {
    $("#clock").addClass("clickable");
    $("#clock").removeClass("unclickable");
    // play alarm sound here
    alarm.play();
    console.log("ringing");
}, 300000);

$("#clock").click(function () {
    if ($("#clock").hasClass("clickable") === true) {
        clickedObj.clockClicked = true;
        // pause alarm sound here
        alarm.pause();
        switchSound.play();
        // reset alarm to start of sound, if this breaks it just remove later
        alarm.currentTime = 0;
        console.log("alarm stopped");
        // comment or remove this part to stop it from ringing again
        // can also make it only ring a certain amount of times before stop w/ a global var
        setTimeout(function () {
            $("#clock").addClass("clickable");
            $("#clock").removeClass("unclickable");
            // play alarm sound here
            alarm.play();
            console.log("ringing");
        }, 300000);
        $("#clock").removeClass("clickable");
        $("#clock").addClass("unclickable");
    }
})

// bed 
var snore = document.getElementById("snore");
$("#bed").click(function () {
    clickedObj.bedClicked = true;
    // play snore sound here
    snore.play();
    console.log("bed clicked");
})


// popups

// overall exit button functionality
$(".exit_button").click(function () {
    console.log("popup closed");
    $("#dark").addClass("hidden");
    $(this).parent().addClass("hidden");
})

// phone text popup
$("#phone-bottom").click(function () {
    clickedObj.phoneClicked = true;
    console.log("phone bottom clicked");
    $("#dark").removeClass("hidden");
    $("#phone-text-popup").removeClass("hidden");
})

// card popup
$("#card-closed").click(function () {
    clickedObj.cardClicked = true;
    console.log("card clicked");
    $("#dark").removeClass("hidden");
    $("#card-popup").removeClass("hidden");
})

// diary popup
$("#diary-spine").click(function () {
    clickedObj.diaryClicked = true;
    console.log("diary clicked");
    $("#dark").removeClass("hidden");
    $("#diary-popup").removeClass("hidden");
})

$("#diary-button").click(function () {
    console.log("diary reset");
    $("#right-arrow").removeClass("hidden");
    $("#left-arrow").addClass("hidden");
    $("#diary-open").addClass("hidden");
    $("#diary-cover").removeClass('hidden');
    $("#diary-button").css("top", "50px");
    $("#diary-button").css("left", "63%");
})

$("#left-arrow").click(function () {
    console.log("diary close");
    $("#right-arrow").removeClass("hidden");
    $("#left-arrow").addClass("hidden");
    $("#diary-open").addClass("hidden");
    $("#diary-cover").removeClass('hidden');
    $("#diary-button").css("top", "50px");
    $("#diary-button").css("left", "63%");
})

$("#right-arrow").click(function () {
    console.log("diary open");
    $("#left-arrow").removeClass("hidden");
    $("#right-arrow").addClass("hidden");
    $("#diary-open").removeClass("hidden");
    $("#diary-cover").addClass("hidden");
    $("#diary-button").css("top", "50px");
    $("#diary-button").css("left", "86%");
})

//stickynote popup


//adding an api that randomly generates a compliment every time you load it.
ENDPOINT = "https://8768zwfurd.execute-api.us-east-1.amazonaws.com/v1/compliments";

// add button event listener, will change the button to the sticky note
$("#sticky-note-small").click(function () {
    clickedObj.stickyClicked = true;

    // construct ajax object
    const ajaxParams = {
        url: ENDPOINT,
        data: {},
        type: "GET",
        dataType: "json",
        success: ajaxSuccess,
        error: ajaxError
    }
    $.when($.ajax(ajaxParams)).then(function () {
        $("#sticky-note-popup").removeClass("hidden");
        $("#dark").removeClass("hidden");
    })
})

//success function
function ajaxSuccess(data) {
    console.log("Here's what I got:", data)
    //we'll put like an append here to append data to the stickynote.
    $("#compliment").empty();
    $("#compliment").append(data);


}
//error function
function ajaxError(request, error) {
    console.log("Oops:", request, error)
}

