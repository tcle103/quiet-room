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
$("#switch").click(function(){
    // play light switch sound here
    switchSound.play();
    console.log("clicked");
    $(".under").toggleClass("clipped");
    if ($(".under").hasClass("clipped")) {
        $("#switch").attr("src", "img/LightSwitchOff.png");
    }
    else {
        $("#switch").attr("src", "img/LightSwitchOn.png");
    }
})

// alarm clock
var alarm = document.getElementById("alarm");
alarm.loop = true;
setTimeout(function() {
    // play alarm sound here
    alarm.play();
    console.log("ringing");
}, 5000); // 5000 ms is 5 seconds but we will probably want to make this longer

$("#clock").click(function(){
    // pause alarm sound here
    alarm.pause();
    // reset alarm to start of sound, if this breaks it just remove later
    alarm.currentTime = 0;
    console.log("alarm stopped");
    // comment or remove this part to stop it from ringing again
    // can also make it only ring a certain amount of times before stop w/ a global var
    setTimeout(function() {
        // play alarm sound here
        alarm.play();
        console.log("ringing");
    }, 5000);
})

// bed 
var snore = document.getElementById("snore");
$("#bed").click(function() {
    // play snore sound here
    snore.play();
    console.log("bed clicked");
})


// popups

// overall exit button functionality
$(".exit_button").click(function() {
    console.log("popup closed");
    $("#dark").addClass("hidden");
    $(this).parent().addClass("hidden");
})

// phone text popup
$("#phone-bottom").click(function() {
    console.log("phone bottom clicked");
    $("#dark").removeClass("hidden");
    $("#phone-text-popup").removeClass("hidden");
})

// card popup
$("#card-closed").click(function() {
    console.log("card clicked");
    $("#dark").removeClass("hidden");
    $("#card-popup").removeClass("hidden");
})

// diary popup
$("#diary-spine").click(function() {
    console.log("diary clicked");
    $("#dark").removeClass("hidden");
    $("#diary-popup").removeClass("hidden");
})

$("#diary-button").click(function() {
    console.log("diary reset");
    $("#right-arrow").removeClass("hidden");
    $("#left-arrow").addClass("hidden");
    $("#diary-open").addClass("hidden");
    $("#diary-cover").removeClass('hidden');
    $("#diary-button").css("top", "50px");
    $("#diary-button").css("left", "63%");
})

$("#left-arrow").click(function() {
    console.log("diary close");
    $("#right-arrow").removeClass("hidden");
    $("#left-arrow").addClass("hidden");
    $("#diary-open").addClass("hidden");
    $("#diary-cover").removeClass('hidden');
    $("#diary-button").css("top", "50px");
    $("#diary-button").css("left", "63%");
})

$("#right-arrow").click(function() {
    console.log("diary open");
    $("#left-arrow").removeClass("hidden");
    $("#right-arrow").addClass("hidden");
    $("#diary-open").removeClass("hidden");
    $("#diary-cover").addClass("hidden");
    $("#diary-button").css("top", "50px");
    $("#diary-button").css("left", "86%");
})


//adding an api that randomly generates a compliment every time you load it.
ENDPOINT = "https://8768zwfurd.execute-api.us-east-1.amazonaws.com/v1/compliments";
  
  // add button event listener
  $("#get-em").click(function(){
    
    // construct ajax object
    const ajaxParams = {
      url: ENDPOINT,
      data: {},
      type: "GET",
      dataType: "json",
        success: ajaxSuccess,
        error: ajaxError
    }
      $.ajax(ajaxParams)
  })
  //success function
  function ajaxSuccess(data){
      console.log("Here's what I got:", data)
      //we'll put like an append here to append data to the stickynote.

        
  }
  //error function
  function ajaxError(request,error){
      console.log("Oops:", request, error)
  }