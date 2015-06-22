var tictactoe = (function() {
// variables
	var X = 'X',
		O = 'O',
		board = ['', '', '', '', '', '', '', '', ''];
		curPlayer = X,
		otherPlayer = O,
		turnCount = 0;

//methods
	var switchPlayer,
		isValidMove,
		makeMove,
		isGameOver,
		endGame,
		play,
		newGame;

// player starts out default X
	switchPlayer = function() {
		curPlayer = (curPlayer === X ) ? O : X;
		otherPlayer = (otherPlayer === O) ? X : O;
	};

// checks if square is blank
	isValidMove = function(index) {
		if(board[index] === '') {
		return true;
		} else {
			alert('but it\'s war');
			return false;
		}
	};

	makeMove = function($square, index) {
		board[index] = curPlayer;
		$square.html(curPlayer);
		turnCount++;
	};

// checks if there is a winner or tie. if not, game continues
	isGameOver = function(){
		var i,
			winningCombos = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
		for(i=0; i<winningCombos.length; i++) {
			if(board[winningCombos[i][0]] === curPlayer && board[winningCombos[i][1]] === curPlayer && board[winningCombos[i][2]] === curPlayer) {
				return curPlayer;
			} 
		}
		if(turnCount === 9) {
				return true;
			} else {
				return false;
			}
	};

// dictates what to do in case of winner or tie
	endGame = function (endState) {
		if(typeof endState == 'string') {
			alert(curPlayer + ' smeared ' + otherPlayer + '\'s heart across the floor');
			newGame();
		} else {
			alert('nobody wins when nothing\'s at stake');
			newGame();
		}
	};

	newGame = function() {
		board = ['', '', '', '', '', '', '', '', ''];
		$('.square').empty();
		turnCount = 0;
	}

// run game
	play = function($square) {
		var index = +$square.attr('id');
		if(isValidMove(index)) {
			makeMove($square, index);
			var winningState = isGameOver();
			winningState ? endGame(winningState) : switchPlayer();
		}
	};

	return {play : play};

})();

// load game after html. game starts when board is clicked
$(document).ready(function(){
	$('#board').find('td').on('click', function(){
		tictactoe.play($(this));
	});
});