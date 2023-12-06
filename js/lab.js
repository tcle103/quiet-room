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

$("#switch").click(function(){
    console.log("clicked");
    $(".under").toggleClass("clipped");
    if ($(".under").hasClass("clipped")) {
        $("#switch").attr("src", "img/LightSwitchOff.png");
    }
    else {
        $("#switch").attr("src", "img/LightSwitchOn.png");
    }
})

$("#phone-bottom").click(function() {
    console.log("phone bottom clicked");
    $("#dark").removeClass("hidden");
    $("#phone-text-popup").removeClass("hidden");
})

$(".exit_button").click(function() {
    console.log("popup closed");
    $("#dark").addClass("hidden");
    $(this).parent().addClass("hidden");
})