
const canvasSize = 500; // the size of the canvas defined in style.css
const cellColor = '#f0f2f5';

let resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', resetGrid);

let randomColorBtn = document.getElementById('randomColor-btn');
randomColorBtn.addEventListener('click', eventHandler);

let eraseBtn = document.getElementById('erase-btn');
eraseBtn.addEventListener('click', eventHandler);

let colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('click', eventHandler);

let mouseHover = document.getElementById('mouse-hover');
mouseHover.addEventListener('click', eventHandler);

let mouseHoverRandom = document.getElementById('mouse-hover-randomColor');
mouseHoverRandom.addEventListener('click', eventHandler);

let mouseClick = document.getElementById('click-effect');
mouseClick.addEventListener('click', eventHandler);


function eventHandler(e){
	if (e.target == mouseHover){
		hoverColor('mouseHover');
	} else if (e.target == mouseHoverRandom){
		hoverColor('mouseHoverRandom');
	} else if (e.target == mouseClick){
		hoverColor('colorPicked');
	} else if (e.target == colorPicker){
		hoverColor('colorPicked');
	} else if (e.target == eraseBtn){
		hoverColor('eraser');
	} else if (e.target == randomColorBtn){
		hoverColor('randomColor');
	}
}


function createCanvas(){
	const container = document.getElementById('canvas');
	const canvas = document.createElement('div');
	canvas.classList.add('canvas');
  canvas.setAttribute('id','canvasID');
	container.appendChild(canvas);
  const gridHeight = document.getElementById("inputHeight").value;
  const gridWidth = document.getElementById("inputWidth").value;
  const submitButton = document.querySelector('input[type=submit]');
  submitButton.addEventListener('click', function () {
    console.log('The submit was clicked!');
    console.log(gridHeight);
    console.log(gridWidth);
  });

	for (let i=0; i<(gridHeight*gridWidth); i++){
		const cellHeight = canvasSize / gridHeight; // define the height and width of each individual cell, based on the number of cells and canvasSize.
    const cellWidth = canvasSize / gridWidth; // define the height and width of each individual cell, based on the number of cells and canvasSize.
		const cell = document.createElement('div');
		cell.style.height = cellHeight.toString() + 'px'; // create element cell and set the cell height in px
		cell.style.width = cellWidth.toString() + 'px'; // set the cell width in px
		// console.log(cell.style.height);
    // console.log(cell.style.width);
		cell.classList.add('cell'); // add the .cell class to the cell div
		canvas.appendChild(cell); // add the cell div to the canvas div
	}
}




//generate random number between 0 and 255, this number will later on represent an RGB value.
function randomNumber(){
	return Math.floor(Math.random() * 256);
}


let effects = {
	color: function(cell){
		let selectedColor = colorPicker.value;
		console.log(selectedColor);
		cell.style.backgroundColor = selectedColor;
		cell.style.border = "thin solid white";
	},

	randomColor: function(cell){
		let rColor = randomNumber();
  	let gColor = randomNumber();
  	let bColor = randomNumber();
		cell.style.backgroundColor = `rgb(${rColor},${gColor},${bColor})`;
		cell.style.border = "thin solid white";
	},

	erase: function(cell){
		cell.style.backgroundColor = cellColor;
		cell.style.border = "thin solid grey";
	}
};


function colorEventHandler(e) {
	if (e.target.matches('.cell')){
		if (e.type == 'click'){
			effects.color(e.target);
		}else if (e.type == 'mouseover'){
			effects.color(e.target);
		}
	}
}

function hoverEventHandler(e) {
	if (e.target.matches('.cell')){
		if (e.type == 'click'){
			effects.randomColor(e.target);
		}else if (e.type == 'mouseover'){
			effects.randomColor(e.target);
		}
	}
}

function eraseEventHandler(e) {
	if (e.target.matches('.cell')){
		if (e.type == 'click'){
			effects.erase(e.target);
		}
	}
}


function hoverColor(currentEvent){
	const CANVAS = document.querySelector('#canvasID');

	if (CANVAS != null){
		if (currentEvent == 'mouseHover'){
			CANVAS.removeEventListener('click', colorEventHandler);
			CANVAS.removeEventListener('click', hoverEventHandler);
			CANVAS.removeEventListener('click', eraseEventHandler);
			CANVAS.removeEventListener('mouseover', hoverEventHandler);
			CANVAS.addEventListener('mouseover', colorEventHandler);
		} else if (currentEvent == 'colorPicked'){
			CANVAS.removeEventListener('click', eraseEventHandler);
			CANVAS.removeEventListener('click', hoverEventHandler);
			CANVAS.removeEventListener('mouseover', hoverEventHandler);
			CANVAS.removeEventListener('mouseover', colorEventHandler);
			CANVAS.addEventListener('click', colorEventHandler);
		} else if (currentEvent == 'eraser'){
			CANVAS.removeEventListener('click', colorEventHandler);
			CANVAS.removeEventListener('click', hoverEventHandler);
			CANVAS.removeEventListener('mouseover', hoverEventHandler);
			CANVAS.removeEventListener('mouseover', colorEventHandler);
			CANVAS.addEventListener('click', eraseEventHandler);
		} else if (currentEvent == 'randomColor'){
			CANVAS.removeEventListener('click', colorEventHandler);
			CANVAS.removeEventListener('click', eraseEventHandler);
			CANVAS.removeEventListener('mouseover', hoverEventHandler);
			CANVAS.removeEventListener('mouseover', colorEventHandler);
			CANVAS.addEventListener('click', hoverEventHandler);
		} else if (currentEvent == 'mouseHoverRandom'){
			CANVAS.removeEventListener('click', colorEventHandler);
			CANVAS.removeEventListener('click', hoverEventHandler);
			CANVAS.removeEventListener('click', eraseEventHandler);
			CANVAS.removeEventListener('mouseover', colorEventHandler);
			CANVAS.addEventListener('mouseover', hoverEventHandler);
		}
	}
}

///////////////////////////////

// reset the canvas to initial style
function resetGrid(){
	const cell = document.querySelectorAll('.cell'); // get all cells where the class has been changed to .colorCell
	cell.forEach(cell => {
		cell.style.backgroundColor = cellColor; // set background color for these cells back to the default color.
    cell.style.border = "thin solid grey";
	});
}


// delete the canvas
function deleteCanvas(){
  const container = document.getElementById('canvas');
	while (container.firstChild) {
			container.firstChild.remove();
		}
}

// initialize the canvas creation
document.addEventListener('DOMContentLoaded', function () {
    console.log('the DOM is ready to be interacted with!');
		const submitBttn = document.querySelector('#sizePicker');
		submitBttn.addEventListener('click', function(event) {
		  console.log('hello');
			deleteCanvas();
		  createCanvas();
			event.preventDefault();
		});
});
