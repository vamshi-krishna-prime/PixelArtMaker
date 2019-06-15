
const canvasSize = 500; // the size of the canvas defined in style.css
const cellColor = '#f0f2f5';

let resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', resetGrid);

let chngColorBtn = document.getElementById('color-btn');
chngColorBtn.addEventListener('click', randomColor);

let gridSizeBtn = document.getElementById('gridsize-btn');
gridSizeBtn.addEventListener('click', eraseGrid);

let colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('click', changeColor);

let mouseover = document.getElementById('mouse-hover');
mouseover.addEventListener('click', function() {hoverColor(1)});

let mouseoverRandom = document.getElementById('mouse-hover-randomColor');
mouseoverRandom.addEventListener('click', function() {hoverColor(2)});

let mouseClick = document.getElementById('click-effect');
mouseClick.addEventListener('click', function() {hoverColor(3)});

let brushEffect = document.getElementById('brush-effect');
brushEffect.addEventListener('click', function() {hoverColor(4)});


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

		// cell.addEventListener("mouseover", ()=>{
		// 	cell.setAttribute("class", "colorCell");
		// }); // on mouse over, set the class of the cell div to .colorCell

    // cell.addEventListener("click", ()=>{
    //   cell.style.backgroundColor = 'black';
    //   cell.style.border = "thin solid white";
		// });

	}
}



function deleteCanvas(){
  const container = document.getElementById('canvas');
	while (container.firstChild) {
			container.firstChild.remove();
		}
}


function resetGrid(){
	const cell = document.querySelectorAll('.colorCell, .cell'); // get all cells where the class has been changed to .colorCell
	cell.forEach(cell => {
		cell.setAttribute("class", "cell"); // set the class to .cell.
		cell.style.backgroundColor = cellColor; // set background color for these cells back to the default color.
    cell.style.border = "thin solid black";

	});
}


function randomNumber(){
	//generate random number between 0 and 255, this number will later on represent an RGB value.
	return Math.floor(Math.random() * 256);
}


function randomColor(){
	const cell = document.querySelectorAll('.cell, .colorCell');
	cell.forEach(cell => {
		cell.addEventListener("click", () =>{
    let rColor = randomNumber();
  	let gColor = randomNumber();
  	let bColor = randomNumber();
		cell.style.backgroundColor = `rgb(${rColor},${gColor},${bColor})`;
		cell.style.border = "thin solid white";
		});
	});
}


function changeColor(){
  const cell = document.querySelectorAll('.cell, .colorCell');
	cell.forEach(cell => {
		cell.addEventListener("click", () =>{
      let selectedColor = colorPicker.value;
      console.log(selectedColor);
      cell.style.backgroundColor = selectedColor;
      cell.style.border = "thin solid white";
		});
	});
};



function hoverColor(effectToggle){
  const cell = document.querySelectorAll('.cell');
	cell.forEach(cell => {

    function effect(evt) {
      let selectedColor = colorPicker.value;
      console.log(selectedColor);
      cell.style.backgroundColor = selectedColor;
      cell.style.border = "thin solid white";
			// cell.removeEventListener(evt.type, this);
			// cell.removeEventListener("mouseover", effect);
			// cell.removeEventListener("click", effect);
			// this.removeEventListener("mouseover", effect);
			// this.removeEventListener("click", effect);
    }

    function colorEffect(evt) {
      let rColor = randomNumber();
    	let gColor = randomNumber();
    	let bColor = randomNumber();
  		cell.style.backgroundColor = `rgb(${rColor},${gColor},${bColor}`;
  		cell.style.border = "thin solid white";
			// cell.removeEventListener(evt.type, this);
			// cell.removeEventListener("mouseover", colorEffect);
			// cell.removeEventListener("click", colorEffect);
			// this.removeEventListener("mouseover", colorEffect);
			// this.removeEventListener("click", colorEffect);
    }

    function noColor() {
  		cell.style.backgroundColor = "";
      cell.style.border = "";
    }

    if (effectToggle == 1){
      console.log("mouseover activated");
      cell.addEventListener("mouseover", effect);
			console.log("click deactivated");
			cell.removeEventListener("click", colorEffect);
    } else if (effectToggle == 2) {
      console.log("mouseover random color");
      cell.addEventListener("mouseover", colorEffect);
			console.log("click deactivated");
			cell.removeEventListener("click", effect);
    } else if (effectToggle == 3) {
      console.log("mouse click retrived");
      cell.removeEventListener("mouseover", effect);
      cell.removeEventListener("mouseover", colorEffect);
      cell.addEventListener("click", effect);
    }

  });
};



// tryout method 2://

// function hoverColor(effectToggle){
// 	const cell = document.querySelectorAll('.cell');
//
// 	if (effectToggle == 1){
// 		console.log("mouseover activated");
// 		cell.forEach(cell => {
// 			cell.addEventListener("mouseover", function handler1() {
// 				let selectedColor = colorPicker.value;
// 				console.log(selectedColor);
// 		    cell.style.backgroundColor = selectedColor;
// 		    cell.style.border = "thin solid white";
// 				// cell.removeEventListener(evt.type, this);
// 				this.removeEventListener("mouseover", handler1);
// 			});
// 		});
//
// 	} else if (effectToggle == 2) {
// 		console.log("mouseover random color");
// 		cell.forEach(cell => {
// 			cell.addEventListener("mouseover", function handler2() {
// 				let rColor = randomNumber();
// 	    	let gColor = randomNumber();
// 	    	let bColor = randomNumber();
// 	  		cell.style.backgroundColor = `rgb(${rColor},${gColor},${bColor}`;
// 	  		cell.style.border = "thin solid white";
// 				// cell.removeEventListener(evt.type, this);
// 				this.removeEventListener("mouseover", handler2);
// 			});
// 		});
//
// 	} else if (effectToggle == 3) {
// 		console.log("mouse click retrived");
// 		cell.forEach(cell => {
// 			cell.addEventListener("click", function handler3() {
// 				let selectedColor = colorPicker.value;
// 				console.log(selectedColor);
// 		    cell.style.backgroundColor = selectedColor;
// 		    cell.style.border = "thin solid white";
// 				// cell.removeEventListener(evt.type, this);
// 				this.removeEventListener("click", handler3);
// 			});
// 		});
// 	}
// 	// } else if (effectToggle == 4){
// 	// 	console.log("mouseover activated");
// 	// 	cell.forEach(cell => {
// 	// 		cell.addEventListener("mouseover", function handler4() {
// 	// 			let selectedColor = colorPicker.value;
// 	// 			console.log(selectedColor);
// 	// 	    // cell.style.backgroundColor = selectedColor;
// 	// 			cell.style.backgroundColor = "black";
// 	// 			console.log(cell.style.opacity);
// 	// 			var opacity = Number(cell.style.opacity);
// 	// 			console.log(cell.style.opacity);
// 	// 			console.log(opacity);
//   //       opacity += 0.1;
//   //       cell.style.opacity = opacity;
// 	// 	    cell.style.border = "thin solid white";
// 	// 			// cell.removeEventListener(evt.type, this);
// 	// 			this.removeEventListener("mouseover", handler4);
// 	// 		});
// 	// 	});
// 	// }
//
// }
//
//
//


// currently not implemented in this code:
var toggleButtons = function(toggleVal) {
  var activateColor = function(cell){
    let selectedColor = colorPicker.value;
    console.log(selectedColor);
    cell.style.backgroundColor = selectedColor;
    cell.style.border = "thin solid white";
  }

  const cell = document.querySelectorAll('.cell, .colorCell');
  if (toggleVal === 1) {
    cell.forEach(cell => {
      cell.addEventListener("mouseover", activateColor(cell));
    });
  } else {
    cell.forEach(cell => {
      cell.removeEventListener("mouseover", activateColor(cell));
      cell.addEventListener("mouseover", activateColor(cell));
    });
  }
}

///////////////////////////////

// reset the canvas to initial style
function eraseGrid(){
  const cell = document.querySelectorAll('.cell, .colorCell');
	cell.forEach(cell => {
		cell.addEventListener("click", () =>{
      cell.style.backgroundColor = cellColor;
      cell.style.border = "thin solid black";
		});
	});
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
