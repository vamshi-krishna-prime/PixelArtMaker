// function that builds a grid in the "container"
function createGrid() {
  const gridHeight = document.getElementById("input_height").value;
  const gridWidth = document.getElementById("input_width").value;
  const pixelCanvas = document.getElementById("pixelCanvas");
  const container = document.getElementById("container");
  pixelCanvas.innerText=""; // empty table

  for (var rows = 0; rows < gridHeight; rows++) {
      for (var columns = 0; columns < gridWidth; columns++) {
          container.append("<div class='grid'></div>");
      };
  };
  const grid = document.querySelector(".grid");
  grid.width(960/gridWidth);
  grid.height(960/gridHeight);
};


// function that clears the grid
function clearGrid(){
    $(".grid").remove();
};

// function that prompts the user to select the number of boxes in a new grid
// the function then also creates that new grid
function refreshGrid(){
    // var z = prompt("How many boxes per side?");
    clearGrid();
    createGrid();
};

// create a 16x16 grid when the page loads
// creates a hover effect that changes the color of a square to black when the mouse passes over it, leaving a (pixel) trail through the grid
// allows the click of a button to prompt the user to create a new grid

document.addEventListener('DOMContentLoaded', function () {
  console.log('The heading was clicked!')
//returns
// $(document).ready(function() {
    createGrid(16);

    grid.mouseover(function() {
        $(this).css("background-color", "black");
        });

    const submitButton = document.querySelector('input[type=submit]');
    submitButton.addEventListener('click', function () {
      console.log('The heading was clicked!');
      refreshGrid();
      $(".grid").mouseover(function() {
        $(this).css("background-color", "black");
        });
    });
});
