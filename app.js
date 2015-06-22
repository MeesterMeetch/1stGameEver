var fish = null, board = null;
var dimObs = { width:40, height:420 }, cPos = { x: 80, y:100, h:40, w:50 };
var gravity = 0.5, initialSpeed = -7, curSpeed = 0;
var score = 0, noClr = 0, tmStep = 0, state = 0; 		// 0-not started,1-play,2-over;

$(document).ready(function() {
	fish = $('#fish');
  var evt = "mousedown";
	board = $('#board').bind(evt, onTap);
	start();
});



function gameOver() {
	state = 2;
	$(":animated").stop();
	if (tmStep) tmStep = window.clearInterval(tmStep);
	fish.animate({ top:board.height()-cPos.h}, 1000)
		.animate({ top:board.height()-cPos.h}, 500, function() {
			$('#score').text(' Score: ' + score);
			start();
		});
}
function Parallax(el, tempo) {
	el.css('left', 0).animate({left:-20000}, {
			duration:tempo*500, easing:'linear',
			complete : function() { Parallax(el, tempo); }
	});
}

function fishStep() {
	curSpeed += gravity;
	cPos.y = Math.max(cPos.y + curSpeed, 0);
	maxHeight = board.height()-cPos.h;
  m = -10;
  lo = 0;
  obs = $('.obs');
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
		$('#score').text(' Score: ' + (score = 0));
		Parallax($('#bGrnd'), 240);
		Parallax($('#fGrnd'), 80);
		$('#instr').hide();
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
	$('.obs').remove();
	$('#instr').show();
}
