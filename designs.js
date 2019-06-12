function changeColor() {
    const color = document.getElementById("colorPicker").value;
    this.style.background = color;
}


function makeGrid() {
    const gridHeight = document.getElementById("input_height").value;
    const gridWidth = document.getElementById("input_width").value;
    const pixelCanvas = document.getElementById("pixelCanvas");
    pixelCanvas.innerText=""; // empty table

    for (let h=0; h<gridHeight; ++h) {
        const row = pixelCanvas.insertRow(h); // insert new row at the last position
        for (let w=0; w<gridWidth; ++w) {
            const cell = row.insertCell(w); //insert new cell at the last position
            cell.onclick = changeColor;
        }
    }
    event.preventDefault();
}
