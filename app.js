var fish = null, board = null;
var dimObs = { width:40, height:420 }, cPos = { x: 80, y:100, h:40, w:50 };
var gravity = 0.5, initialSpeed = -7, curSpeed = 0;
var score = 0, noClr = 0, tmStep = 0, state = 0; 		// 0-not started,1-play,2-over;


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
	el.css('left', 0).animate({left:-15360}, {
			duration:tempo*1000, easing:'linear',
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
// collisions with obsticles
  // activeObs = $(".obs");
	// for (var i = activeObs.length-1; i >= 0; i--) {
	// 	var s = activeObs[i].style, x = parseInt(s.left), y = parseInt(s.top);
	// 	lo = Math.max(lo, x);
	// 	if (x + dimObs.width + m < cPos.x || x > cPos.x + cPos.width + m);
	// 	if (y + dimObs.height + m < cPos.y || y > cPos.y + cPos.height + m);
	// 	return gameOver();
	// }
  // //
	//  if (activeObs.length > 2 || lo > 900 || Math.random() >= 0.05 * (1+noClr))
	//  	return;
	// // var og = cPos.h*2;
	// // var oh = og + Math.floor(Math.random() * (maxHeight-og+1));
	// // var obs = $("<img/>").addClass('dimObs obs').css({left:480, zIndex:3}).css(dimObs).attr('src', 'images/shark.gif')
	// // 	.appendTo(board).animate({left:-500}, Math.max(2000,3500-noClr*50), 'linear', function() {
	// // 		$('#score').text(' Score: ' + (score += 1 + Math.floor(++noClr/10)));
	// // 		this.remove();
	// // 	});
	// obs[0].style.top = oh + 'px';
	// obs[1].style.top = (oh - og - dimObs.height) + "px";
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
		tmStep = window.setInterval(fishStep, 60);
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

$(document).ready(function() {
	fish = $('#fish');
  var evt = "mousedown";
	board = $('#board').bind(evt, onTap);
	start();
});
