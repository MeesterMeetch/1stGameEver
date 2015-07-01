
var fish = null, board = null;
var dimShark = { width:40, height:420 }, cPos = { x: 80, y:100, h:40, w:50 };
var gravity = 0.5, iniSpeed = -7, curSpeed = 0;
var score = 0, noClr = 0, tmStep = 0, state = 0; 		// 0-not started,1-play,2-over;

// (function($) {
// 	$.cssNumber.rotate = true;
// 	$.cssHooks.rotate = {
// 		set : function(el, v) {
// 			if (typeof v === 'string')
// 				v = (v.indexOf("rad") != -1) ? parseInt(v) * 180 / Math.PI : parseInt(v);
// 			v = (~~v);
// 			if (v == ($.data(el, 'rotate') || 0)) return;
// 			el.style["MozTransform"] = el.style["MozTransform"] = el.style["-webkit-transform"]
// 				= el.style["transform"] = " rotate(" + (v % 360) + "deg)";
// 			$.data(el, 'rotate', v);
// 		},
// 		get : function(el, computed) {
// 			return $.data(el, 'rotate') || 0;
// 		}
// 	};
// })(jQuery);

function gameOver() {
	state = 2;
	$(":animated").stop();
	if (tmStep) tmStep = window.clearInterval(tmStep);
	fish.animate({ top:board.height()-cPos.h, rotate:540}, 1000)
		.animate({ top:board.height()-cPos.h}, 500, function() {
			$('#score').text(' Score: ' + score);
			start();
		});
}
 function Parallax(elm, tmo) {
 	elm.css('left', 0).animate({left:-15360}, {
 			duration:tmo*1000, easing:'linear', //step : PrlxStep,
 			complete : function() { Parallax(elm, tmo); }
 	});
 }

function fishStep() {
	curSpeed += gravity;
	cPos.y = Math.max(cPos.y + curSpeed, 0);
	var ang = curSpeed * 5, mh = board.height()-cPos.h, m = -12, lo = 0, actShark = $('.obs');
	fish.css({top: cPos.y, rotate:(ang < -20) ? -20 : (ang > 90) ? 90 : ang});
	if (cPos.y > mh)
		return gameOver();
	for (var i = actShark.length-1; i >= 0; i--) {
		var s = actShark[i].style, x = parseInt(s.left), y = parseInt(s.top);
		lo = Math.max(lo, x);
		if (x+dimShark.width +m < cPos.x || x > cPos.x+cPos.w+m)	continue;
		if (y+dimShark.height+m < cPos.y || y > cPos.y+cPos.h+m) continue;
		return gameOver();
	}
	if (actShark.length > 3 || lo > 300 || Math.random() >= 0.05 * (1+noClr))
		return;
    //.obs gap height * 2 ... double the height of the fish = the gap between the nets
	var og = cPos.h * 5;
    //.obs height = .obs gap + round down of: the math.random() * (maximum height-.obs gap +1)
	var oh = og + Math.floor(Math.random() * (mh-og+1));
    // .obs = 2 vines with added class of position absolute and .obs .  the css zIndex of 3 480 from the left.  with css of dimensions of the pipe with the attributes of vine image.
	var obs = $("<img/><img/>").addClass('c obs').css({left:480, zIndex:3}).css(dimShark).attr('src', 'images/fishNet.png')
      //appendTo the board and animate it left -50.  linear
		.appendTo(board).animate({left:-50}, Math.max(2000,3500-noClr*50), 'linear', function() {
			$('#score').text(' Score: ' + (score += 1 + Math.floor(++noClr/10)));
			this.remove();
		});
    //bottom net
	obs[0].style.top = oh + 'px';
    //top net
	obs[1].style.top = (oh - og - dimShark.height) + "px";
}
function onTap() {
	if (state > 1) return;
	if (state == 0) {
		state = 1;
		$('#score').text(' Score: ' + (score = 0));
		Parallax($('#bGrnd'), 240);
		Parallax($('#fGrnd'), 80);
		$('#instr').hide();
		tmStep = window.setInterval(fishStep, 30);
	}
	curSpeed = iniSpeed;
}
$(document).ready(function() {
	fish = $('#fish');
	var evt = (typeof(fish[0].ontouchend) == "function") ? "touchstart" : "mousedown";
	board = $('#board').bind(evt, onTap);
	start();
});
