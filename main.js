var gameSize = 4;
var depth = 3;

function getRandomPosition(maxValue){
	return Math.ceil(Math.random() * 10 * gameSize) % (maxValue);
}

function getRandomCellValue(){
	return (Math.ceil(Math.random()*10) <= 9) ? 2 : 4;
}

function generateHTML(){
	var html = "<table>\n";
	for (var i = 0; i < gameSize; i++) {
		html += "<tr id=\"row"+i+"\">\n";
		for (var j = 0; j < gameSize; j++) {
			html += "<td id=\"col"+j+"\">\n";
			html += "</td>";
		}
		html += "</tr>";
	}

	return $(html);
}

function initializeGame(isFirstStep){
	isFirstStep = (isFirstStep == undefined)? false : isFirstStep;
	var a = new Array(gameSize);
	for (var i = 0; i < gameSize; i++) {
		a[i] = new Array(gameSize);
	}

	if(isFirstStep){
		var pos1, pos2;
		pos1 = getRandomPosition(gameSize*gameSize);
		pos2 = getRandomPosition(gameSize*gameSize);

		while(pos2 == pos1){
			pos2 = getRandomPosition(gameSize*gameSize); 
		}

		for (var i = 0; i < gameSize; i++) {
			for (var j = 0; j < gameSize; j++) {
				if((Math.floor(pos1 / gameSize) == i && (pos1 % gameSize ) == j) || (Math.floor(pos2 / gameSize) == i && (pos2 % gameSize ) == j)){
					a[i][j] = getRandomCellValue();
				}
				else{
					a[i][j] = 0;
				}
			}
		}		
	}
	return a;
}

function bgColor(value){
	if(value == 0)
		return "#d2c3b4";
	if(value == 2)
		return "#eee4da";
	if(value == 4)
		return "#ede0c8";
	if(value == 8)
		return "#f2b179";
	if(value == 16)
		return "#f59563";
	if(value == 32)
		return "#f67c5f";
	if(value == 64)
		return "#f65e3b";
	if(value == 128)
		return "#edcf72";
	if(value == 256)
		return "#edcc61";
	if(value == 512)
		return "#edc850";
	if(value == 1024)
		return "#edc53f";
	if(value >= 2048)
		return "#3c3a32";
}

function renderGame(gameView){
	for (var i = 0; i < gameSize; i++) {
		for (var j = 0; j < gameSize; j++) {
			$("#row" + i + " #col" + j)[0].style.backgroundColor = bgColor(gameView[i][j]);
			$("#row" + i + " #col" + j).text(gameView[i][j]?gameView[i][j]:"");

			$("#row" + i + " #col" + j)[0].style.color = gameView[i][j] >= 8?"#f9f6f2":"#000000";

		}
	}
}


function canMove(gameView,where){
	var lastValue = -1;
	where = where.toUpperCase();

	var zeroAt;
	var lastValue;

	for(var i = 0; i < gameSize; i++){
		zeroAt = -1;
		lastValue = -1;
		for (var j = 0; j < gameSize; j++){

			if(where == "UP"){
				a1 = j;
				a2 = i;
			}
			else if(where == "DOWN"){
				a1 = gameSize - 1 - j;
				a2 = i;
			}
			else if(where == "RIGHT"){
				a1 = i;
				a2 = gameSize - 1 - j;
			}
			else if(where == "LEFT"){
				a1 = i;
				a2 = j;
			}

			if(zeroAt == -1 && gameView[a1][a2] == 0){
				if(where == "UP" || "DOWN")
					zeroAt = a1; 
				else
					zeroAt = a2; 
			}
			else{
				if(zeroAt != -1 && gameView[a1][a2] != 0){
					return true;
				}
				else{
					if(gameView[a1][a2] == lastValue){
						return true;
					} 
					if(gameView[a1][a2] != 0) lastValue = gameView[a1][a2];
				}
			}
		}
	}

	return false;
}

function moveUp(gameView){
	for(var i = 0; i < gameSize; i++){
		for (var j = 1; j < gameSize; j++) {
			if(gameView[j][i] != 0){
				
				var moveTo;
				for (moveTo = j; moveTo > 0; moveTo--) {

					if(moveTo - 1 >= 0 && gameView[moveTo - 1][i] == gameView[j][i]){
						moveTo--;
						break;
					}
					else if(moveTo - 1 >= 0 && gameView[moveTo - 1][i] != 0) break;

				}
				if(j != moveTo){
						gameView[moveTo][i] += gameView[j][i];
						gameView[j][i] = 0;
				}

			}
		}
	}

	return gameView;
}

function moveDown(gameView){
	for(var i = 0; i < gameSize; i++){
		for (var j = gameSize - 2; j >= 0; j--) {
			if(gameView[j][i] != 0){
				
				var moveTo;
				for (moveTo = j; moveTo < gameSize - 1; moveTo++) {

					if(moveTo + 1 < gameSize && gameView[moveTo + 1][i] == gameView[j][i]){
						moveTo++;
						break;
					}
					else if(moveTo + 1 < gameSize && gameView[moveTo + 1][i] != 0) break;

				}
				if(j != moveTo){
						gameView[moveTo][i] += gameView[j][i];
						gameView[j][i] = 0;
				}

			}
		}
	}

	return gameView;
}

function moveLeft(gameView){
	for(var i = 0; i < gameSize; i++){
		for (var j = 1; j < gameSize; j++) {
			if(gameView[i][j] != 0){
				
				var moveTo;
				for (moveTo = j; moveTo > 0; moveTo--) {

					if(moveTo - 1 >= 0 && gameView[i][moveTo - 1] == gameView[i][j]){
						moveTo--;
						break;
					}
					else if(moveTo - 1 >= 0 && gameView[i][moveTo - 1] != 0) break;

				}
				if(j != moveTo){
						gameView[i][moveTo] += gameView[i][j];
						gameView[i][j] = 0;
				}

			}
		}
	}

	return gameView;
}

function moveRight(gameView){
	for(var i = 0; i < gameSize; i++){
		for (var j = gameSize - 2; j >= 0; j--) {
			if(gameView[i][j] != 0){
				
				var moveTo;
				for (moveTo = j; moveTo < gameSize - 1; moveTo++) {

					if(moveTo + 1 < gameSize && gameView[i][moveTo + 1] == gameView[i][j]){
						moveTo++;
						break;
					}
					else if(moveTo + 1 < gameSize && gameView[i][moveTo + 1] != 0) break;

				}
				if(j != moveTo){
						gameView[i][moveTo] += gameView[i][j];
						gameView[i][j] = 0;
				}

			}
		}
	}

	return gameView;
}


function addRandomValue(gameView){
	var availablePos = [];

	for(var i = 0; i < gameSize; i++) {
		for (var j = 0; j < gameSize; j++) {
			if(gameView[i][j] == 0)
				availablePos.push(i*gameSize + j);
		}
	}

	var pos = availablePos[ getRandomPosition(availablePos.length) ];

	gameView[Math.floor(pos / gameSize)][pos % gameSize] = getRandomCellValue();
	
	return gameView;
}

function countEmptyCells(gameView){
	var count = 0;	
	for (var i = 0; i < gameSize; i++) {
		for (var j = 0; j < gameSize; j++) {
			if(gameView[i][j] == 0) count++;
		}
	}
	return count;
}

function analizeBoard(gameView,nEmptyCellsAnt){
	var points = 0;

	var biggest = 0;

	for (var i = 0; i < gameSize; i++) {
		for (var j = 0; j < gameSize; j++) {
			if(gameView[i][j] > biggest) biggest = gameView;
		}
	}

	for (var i = 0; i < gameSize; i++) {
		for (var j = 0; j < gameSize; j++) {
			if(gameView[i][j] == biggest && (i == 0 && j == 0 || i == gameSize - 1 && j == gameSize - 1 || i == 0 && j == gameSize - 1 || i == gameSize - 1 && j == 0))
				points += gameView[i][j] * 100;
			else
				points += gameView[i][j];
				
		}
	}

	var nEmptyCells = countEmptyCells(gameView);
	if(nEmptyCells > nEmptyCellsAnt){
		points *= 10;
	}

	return points;
}

function copyGameView(gameView){
	var copy = Object.assign({},gameView);
	for (var i = 0; i < gameSize; i++) {
		copy[i] = Object.assign({},gameView[i]);
	}
	return copy;
}


function AI(gameView, levels, movements) {

	var bestID = -1;
	var bestMove = -1;
	var nEmptyCellsAnt = countEmptyCells(gameView);

	if(movements == undefined) movements = [];

	if(canMove(gameView,"Up")){
		var newGameViewUp = copyGameView(gameView);
		newGameViewUp = moveUp(newGameViewUp);
		var boardValue = analizeBoard(newGameViewUp,nEmptyCellsAnt);
		
		if(movements[0] == undefined) movements[0] = boardValue;
		else movements[0] += boardValue;
	}
	if(canMove(gameView,"Down")){
		var newGameViewDown = copyGameView(gameView);
		newGameViewDown = moveDown(newGameViewDown);
		var boardValue = analizeBoard(newGameViewDown,nEmptyCellsAnt);
		
		if(movements[1] == undefined) movements[1] = boardValue;
		else movements[1] += boardValue;
	}
	if(canMove(gameView,"Right")){
		var newGameViewRight = copyGameView(gameView);
		newGameViewRight = moveRight(newGameViewRight);
		var boardValue = analizeBoard(newGameViewRight,nEmptyCellsAnt);
		
		if(movements[2] == undefined) movements[2] = boardValue;
		else movements[2] += boardValue;
	}
	if(canMove(gameView,"Left")){
		var newGameViewLeft = copyGameView(gameView);
		newGameViewLeft = moveLeft(newGameViewLeft);
		var boardValue = analizeBoard(newGameViewLeft,nEmptyCellsAnt);
		
		if(movements[3] == undefined) movements[3] = boardValue;
		else movements[3] += boardValue;
	}

	for(i = 0; i < 4; i++){
		if(movements[i] != undefined && movements[i] > bestMove){
			bestMove = movements[i];
			bestID = i;
		}
	}

	console.log("BestID = " + bestID);

	return bestID;
}

jQuery(document).ready(function($){

	$('#main').html(generateHTML);

	var gameView = initializeGame(true);
	renderGame(gameView);

	function userPlay(gameView){
		jQuery(document).keydown(function(event) {
			var Up = 38;
			var Down = 40;
			var Right = 39;
			var Left = 37;

			if(event.which == Up){
				if(canMove(gameView,"Up")){
					gameView = moveUp(gameView);
					gameView = addRandomValue(gameView);
					renderGame(gameView);
				}
			}
			else if(event.which == Down){
				if(canMove(gameView,"Down")){
					gameView = moveDown(gameView);
					gameView = addRandomValue(gameView);
					renderGame(gameView);
				}
			}
			else if(event.which == Right){
				if(canMove(gameView,"Right")){
					gameView = moveRight(gameView);
					gameView = addRandomValue(gameView);
					renderGame(gameView);
				}
			}
			else if(event.which == Left){
				if(canMove(gameView,"Left")){
					gameView = moveLeft(gameView);
					gameView = addRandomValue(gameView);
					renderGame(gameView);
				}
			}
		});
	}

	function AIplay(gameView){
		jQuery(document).keydown(function(event) {

			var Enter = 13;

			if(event.which == Enter){
				//TODO
				//Vai retornar 0 - 4; Tratar movements
				var bestMove = AI(gameView,5);
				if(bestMove == 0){
					gameView = moveUp(gameView);
				}
				else if(bestMove == 1){
					gameView = moveDown(gameView);
				}
				else if(bestMove == 2){
					gameView = moveRight(gameView);
				}
				else if(bestMove == 3){
					gameView = moveLeft(gameView);
				}

				gameView = addRandomValue(gameView);
				renderGame(gameView);
			}
		});
	}

	userPlay(gameView);
	// AIplay(gameView);
});