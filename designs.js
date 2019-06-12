function changeColor() {
    const color = document.getElementById("colorPicker").value;
    this.style.background = color;
}


const canvasSize = 400; // the size of the canvas defined in style.css
const cellColor = '#f0f2f5';

let resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', resetGrid);

let chngColorBtn = document.getElementById('color-btn');
chngColorBtn.addEventListener('click', randomColor);

let gridSizeBtn = document.getElementById('gridsize-btn');
gridSizeBtn.addEventListener('click', eraseGrid);



function createCanvas(){
	const container = document.getElementById('canvas');
	const canvas = document.createElement('div');
	canvas.classList.add('canvas');
	container.appendChild(canvas);
  // const gridHeight = document.getElementById("input_height").value;
  // const gridWidth = document.getElementById("input_width").value;


  const gridHeight = $("#input_height").val();
  const gridWidth = $("#input_width").val();


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
		cell.style.height = `${cellHeight}px`; // create element cell and set the cell height in px
		cell.style.width = `${cellWidth}px`; // set the cell width in px

		cell.classList.add('cell'); // add the .cell class to the cell div
		canvas.appendChild(cell); // add the cell div to the canvas div

		// cell.addEventListener("mouseover", ()=>{
		// 	cell.setAttribute("class", "colorCell");
		// }); // on mouse over, set the class of the cell div to .colorCell

    cell.addEventListener("click", ()=>{
      const colorPicker = document.getElementById("colorPicker");
      let selectedColor = colorPicker.value;
      cell.style.backgroundColor = selectedColor;
      cell.style.border = "thin solid white";
		});

	}
}



function deleteCanvas(){
	canvas =  document.querySelector('.canvas');
	canvas.parentNode.removeChild(canvas);

	// createCanvas();
}

function resetGrid(){
	const cell = document.querySelectorAll('.colorCell, .cell'); // get all cells where the class has been changed to .colorCell
	cell.forEach(cell => {
		cell.setAttribute("class", "cell"); // set the class to .cell.
		cell.style.backgroundColor = cellColor; // set background color for these cells back to the default color.
    cell.style.border = "thin solid black";

	});
}

function eraseGrid(){
  const cell = document.querySelectorAll('.colorCell, .cell'); // get all cells where the class has been changed to .colorCell
	cell.addEventListener('click', cell => {
		cell.setAttribute("class", "emptycell"); // set the class to .cell.
	});
}


function randomNumber(){
	//generate random number between 0 and 255, this number will later on represent an RGB value.
	return Math.floor(Math.random() * 256);
}

function randomColor(){
	// assign a number between 0 and 255 to each RGB value.
	let rColor = randomNumber();
	let gColor = randomNumber();
	let bColor = randomNumber();

	const cell = document.querySelectorAll('.cell, .colorCell');

	cell.forEach(cell => {
		cell.addEventListener("mouseover", () =>{
		cell.style.backgroundColor = `rgb(${rColor},${gColor},${bColor}`;
		cell.setAttribute("class", "colorCell");
		});
	});
}

function changeGridSize(){
	cellNumbers = prompt('Enter new grid size (1 to 100):');

	// Check for valid input.
	if (cellNumbers < 1 || cellNumbers > 100) {
		alert('Please enter a positive value smaller or equal to 100.')
		return;
	} else {
		//remove existing canvas and create new canvas.
		deleteCanvas();
	}
}
// createCanvas();

$("#sizePicker").submit(function(event) {
  event.preventDefault();
  // const height = $("#input_height").val();
  // const width = $("#input_width").val();
  // createCanvas(height, width);
  deleteCanvas();
  createCanvas();
});
