document.addEventListener('DOMContentLoaded', function() {
    const colorPicker = document.getElementById("colorPicker");
    const rainbowBtn = document.getElementById("rainbowBtn");
    const eraserBtn = document.getElementById("eraserBtn");
    const clearBtn = document.getElementById("clearBtn");
    const showPixels = document.getElementById("showPixels");
    const totalPixels = document.getElementById("totalPixels");
    const container = document.getElementById("container");
    const pixel = document.getElementsByClassName("pixel");

    let mouseDown = false
    document.body.onmousedown = () => {mouseDown = true}
    document.body.onmouseup = () => {mouseDown = false}
    document.body.ontouchstart = () => {mouseDown = true}
    document.body.ontouchend = () => {mouseDown = false}

    let defaultColor = "#000000";
    let defaultPixels = 32;

    let color = defaultColor;
    let pixels = defaultPixels;
    let rainbow = false;
    let eraser = false;

    totalPixels.addEventListener("input", updatePixelScreen, false);
    totalPixels.addEventListener("change", updatePixels, false);


    function updatePixelScreen(event) {
        pixels = event.target.value;
        showPixels.innerHTML = `${pixels} x ${pixels}`;
    }

    function updatePixels() {
        pixels = totalPixels.value;
        container.innerHTML = "";
        clearGrid();
    }

    function clearGrid() {
        container.innerHTML = "";
        createGrid();
    };

    colorPicker.addEventListener("input", updateColor, false);
    
    function updateColor(event) {
        color = event.target.value;
        rainbow = false;
        updateCanvas();
    }

    rainbowBtn.addEventListener("click", function(event) {
        updateBtnColor(event);
        rainbow = true;
        eraser = false;
        updateCanvas();
    });

    eraserBtn.addEventListener("click", function(event) {
        updateBtnColor(event);
        eraser = true;
        rainbow = false;
        updateCanvas();
    });

    clearBtn.addEventListener("click", function(event) {
        clearGrid();
    });

    function updateBtnColor(event) {
        rainbowBtn.style.cssText = "background-color: #b3cde0; border: solid 0.15vmax #005b96;; color: #005b96;";
        eraserBtn.style.cssText = "background-color: #b3cde0; border: solid 0.15vmax #005b96;; color: #005b96;";
        clearBtn.style.cssText = "background-color: #b3cde0; border: solid 0.15vmax #005b96;; color: #005b96;";
        event.target.style.cssText = "background-color: #005b96; border: solid 0.15vmax #011f4b; color: #b3cde0;";
    }

    function updateCanvas() {
        Array.from(pixel).forEach(element => {
            element.addEventListener("mouseover", draw, false);
            element.addEventListener("mousedown", draw, false);
            element.addEventListener("touchstart", draw, false);
            element.addEventListener("touchmove", draw, false);
            element.addEventListener("touchend", draw, false);
        });
    }

    function draw(event) {
        event.preventDefault();
        if (event.type === 'mouseover' && !mouseDown) return
        if(rainbow){
            let colorR = `${Math.floor(Math.random() * 255)}`;
            let colorG = `${Math.floor(Math.random() * 255)}`;
            let colorB = `${Math.floor(Math.random() * 255)}`;
            let colorA = `1`;
            event.target.style.backgroundColor = `rgba(${colorR}, ${colorG}, ${colorB}, ${colorA})`;
        }
        else if(eraser){
            event.target.style.backgroundColor = "#ffffff";
        }
        else{
            event.target.style.backgroundColor = color;
            rainbow = false;
        }
    }


    function createGrid(){
        container.innerHTML = "";
        for(let i= 0; i < pixels * pixels; i++){
            let element = document.createElement("div");
            element.classList.add("pixel");
            element.style.width = `${(500 / pixels)}px`;
            element.style.height = `${(500 / pixels)}px`;
            container.appendChild(element);
        }
        updateCanvas();
    }

    createGrid();
});