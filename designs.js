const canvasSize = 600; // the size of the canvas is defined in style.css
const cellColor = '#f0f2f5';

/* ---------------- */
// head to line 220 for continuation

/* ---------------- */
/* Event generation on button click */

let resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', resetGrid); // line 194

let colorPickerBtn = document.getElementById('colorPicker');
colorPickerBtn.addEventListener('click', eventHandler); // line 33

let mouseClickBtn = document.getElementById('click-effect');
mouseClickBtn.addEventListener('click', eventHandler); // line 35

let randomColorBtn = document.getElementById('randomColor-btn');
randomColorBtn.addEventListener('click', eventHandler); // line 37

let eraseBtn = document.getElementById('erase-btn');
eraseBtn.addEventListener('click', eventHandler); // line 39

let mouseHoverBtn = document.getElementById('mouse-hover');
mouseHoverBtn.addEventListener('click', eventHandler); // line 41

let mouseHoverRandomBtn = document.getElementById('mouse-hover-randomColor');
mouseHoverRandomBtn.addEventListener('click', eventHandler); // line 43

/* Event handler for button click */
function eventHandler(e){
	if (e.target == colorPickerBtn){
		eventManager('colorPicked');
	} else if (e.target == mouseClickBtn){
		eventManager('colorPicked');
	} else if (e.target == randomColorBtn){
		eventManager('randomColor');
	} else if (e.target == eraseBtn){
		eventManager('eraser');
	} else if (e.target == mouseHoverBtn){
		eventManager('mouseHover');
	} else if (e.target == mouseHoverRandomBtn){
		eventManager('mouseHoverRandom');
	}
}


/* ---------------- */
/* generate random number between 0 and 255,
this number will later represent an RGB value. */
function randomNumber(){
	return Math.floor(Math.random() * 256);
}


/* canvas color effects */
let effects = {
	color: function(cell){
		let selectedColor = colorPicker.value;
		console.log(selectedColor);
		cell.style.backgroundColor = selectedColor;
		cell.style.border = "thin solid white";
	},

	randomColor: function(cell){
		let rColor = randomNumber(); // line 52
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


/* Function to handle selectedColor event */
function colorEventHandler(e) {
	if (e.target.matches('.cell')){
		if (e.type == 'click'){
			effects.color(e.target); // line 59
		}else if (e.type == 'mouseover'){
			effects.color(e.target);
		}
	}
}


/* Function to handle randomColor event */
function hoverEventHandler(e) {
	if (e.target.matches('.cell')){
		if (e.type == 'click'){
			effects.randomColor(e.target); // line 66
		}else if (e.type == 'mouseover'){
			effects.randomColor(e.target);
		}
	}
}


/* Function to handle eraseColor event */
function eraseEventHandler(e) {
	if (e.target.matches('.cell')){
		if (e.type == 'click'){
			effects.erase(e.target); // line 74
		}
	}
}


/* ---------------- */
/* Multiple events manager (add/remove) */
function eventManager(currentEvent){
	const CANVAS = document.querySelector('#canvasID');

	if (CANVAS != null){
		if (currentEvent == 'mouseHover'){
			CANVAS.removeEventListener('click', colorEventHandler); // line 82
			CANVAS.removeEventListener('click', hoverEventHandler); // line 94
			CANVAS.removeEventListener('click', eraseEventHandler); // line 106
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


/* ---------------- */
/* Create CANVAS */
function createCanvas(){
	const container = document.getElementById('canvas');
	const canvas = document.createElement('div');
	canvas.classList.add('canvas'); // add the .canvas class to the canvas
  canvas.setAttribute('id','canvasID'); // add the .canvas id to the canvas div
	container.appendChild(canvas); // add the canvas div to the container div
  const gridHeight = document.getElementById("inputHeight").value;
  const gridWidth = document.getElementById("inputWidth").value;
  const submitButton = document.querySelector('input[type=submit]');
  submitButton.addEventListener('click', function () {
		// extra code to check grid height and width in cosole
    // console.log('The submit was clicked!');
		// console.log('The size of grid are:');
    // console.log(gridHeight);
    // console.log(gridWidth);
  });

	for (let i=0; i<(gridHeight*gridWidth); i++){
		/* define the height and width of each individual cell,
		based on the number of cells and canvasSize. */
		const cellHeight = canvasSize / gridHeight;
    const cellWidth = canvasSize / gridWidth;
		const cell = document.createElement('div');
		// create element cell and set the cell height and width in px
		cell.style.height = cellHeight.toString() + 'px';
		cell.style.width = cellWidth.toString() + 'px';
		// extra code to check cell height and width in cosole
		// console.log('cell height and width are:');
		// console.log(cell.style.height);
    // console.log(cell.style.width);
		cell.classList.add('cell'); // add the .cell class to the cell div
		canvas.appendChild(cell); // add the cell div to the canvas div
	}
}


/* reset the canvas to initial style */
function resetGrid(){
	const cell = document.querySelectorAll('.cell');
	cell.forEach(cell => {
		cell.style.backgroundColor = cellColor;
    cell.style.border = "thin solid grey";
	});
	// remove all events
	const CANVAS = document.querySelector('#canvasID');
	CANVAS.removeEventListener('click', colorEventHandler);
	CANVAS.removeEventListener('click', hoverEventHandler);
	CANVAS.removeEventListener('click', eraseEventHandler);
	CANVAS.removeEventListener('mouseover', colorEventHandler);
	CANVAS.removeEventListener('mouseover', hoverEventHandler);
}


/* delete the canvas */
function deleteCanvas(){
  const container = document.getElementById('canvas');
	while (container.firstChild) {
			container.firstChild.remove();
		}
}


/* ---------------- */
/* initialize the canvas creation when DOM is loaded annd ready */
document.addEventListener('DOMContentLoaded', function () {
    console.log('the DOM is ready to be interacted with!');
		// create CANVAS after CANVAS size is picked
		const submitBttn = document.querySelector('#sizePicker');
		submitBttn.addEventListener('click', function(event) {
		  console.log('hello');
			console.log('Creating new CANVAS');
			deleteCanvas(); // line 212
		  createCanvas(); // line 158
			event.preventDefault();
		});
});
