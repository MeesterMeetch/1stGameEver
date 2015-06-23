var fish = null, board = null;
var dimObs = { width:60, height:420 }, cPos = { x: 400, y:100, h:80, w:100 };
var gravity = 0.5, initialSpeed = -7, curSpeed = 0;
var score = 0, noClr = 0, tmStep = 0, state = 0; 		// 0-not started,1-play,2-over;
// var dimSharks = { width:100, hieght:60 }, cPos = { x: 1000 y:100, h:60, w:100};
// var activeShark = $(activeShark);

$(document).ready(function() {
	fish = $("#fish");
  var evt = "mousedown";
	board = $("#board").bind(evt, onTap);
	start();
});



function gameOver() {
	state = 2;
	$(":animated").stop();
	if (tmStep) tmStep = window.clearInterval(tmStep);
	fish.animate({ top:board.height()-cPos.h}, 1000)
		.animate({ top:board.height()-cPos.h}, 500, function() {
			$("#score").text(" Score: " + score);
			start();
		});
}



function fishStep() {
	curSpeed += gravity;
	cPos.y = Math.max(cPos.y + curSpeed, 0);
	maxHeight = board.height()-cPos.h, m = -12, lo = 0, activeShark = $('.obs');
	fish.css({top: cPos.y});
//height max
	if (cPos.y > maxHeight)
		return gameOver();
// Objects, Appends, & Collisions here//

}



//mousedown
function onTap() {
	if (state > 1) return;
	if (state === 0) {
		state = 1;
		$("#score").text(" Score: " + (score = 0));

		$(function moveBG(){
			var x = 0;
			setInterval(function(){
					x-=1;
					$("#bGrnd").css("background-position", x + "px 0");
					$("#fGrnd").css("background-position", x + "px 0");
			}, 10);
	})


		$("#instr").hide();
		tmStep = window.setInterval(fishStep, 30);

	}
	curSpeed = initialSpeed;
}

//1st click
function start() {
	state = 0;
  noClr = 0;
  score = 0;
	cPos = { x: 80, y:100, h:40, w:50 };
	fish.css({ left:cPos.x, top:cPos.y, width:cPos.w, height:cPos.h});
	$(".obs").remove();
	$("#instr").show();
}
