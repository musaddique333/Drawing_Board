document.addEventListener('DOMContentLoaded', function() {
    const colorPicker = document.getElementById("colorPicker");
    const rainbowBtn = document.getElementById("rainbowBtn");
    const eraserBtn = document.getElementById("eraserBtn");
    const clearBtn = document.getElementById("clearBtn");
    const colorBtn = document.getElementById("colorBtn");
    const showPixels = document.getElementById("showPixels");
    const totalPixels = document.getElementById("totalPixels");
    const container = document.getElementById("container");
    const pixel = document.getElementsByClassName("pixel");
    let body = document.getElementsByTagName("body")[0];


    let color = colorPicker.value;
    let pixels = totalPixels.value;
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
    }

    colorPicker.addEventListener("input", updateColor, false);

    function updateColor(event) {
        color = event.target.value;
        colorBtn.style.backgroundColor = color;
        rainbow = false;
        eraser = false;
        updateBtnColor(event)
        updateCanvas();
    }

    colorBtn.addEventListener("click", function(event) {
        updateBtnColor(event);
        rainbow = false;
        eraser = false;
        updateCanvas();
    });

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
        colorBtn.style.cssText = `border: solid 0.15vmax #005b96;; color: #005b96;`;
        rainbowBtn.style.cssText = "background-color: #b3cde0; border: solid 0.15vmax #005b96;; color: #005b96;";
        eraserBtn.style.cssText = "background-color: #b3cde0; border: solid 0.15vmax #005b96;; color: #005b96;";
        clearBtn.style.cssText = "background-color: #b3cde0; border: solid 0.15vmax #005b96;; color: #005b96;";
        if(event.target.id !== "colorPicker"){
            event.target.style.cssText = "background-color: #005b96; border: solid 0.15vmax #011f4b; color: #b3cde0;";
        }
        colorBtn.style.backgroundColor = color;
    }

    function updateCanvas() {
        Array.from(pixel).forEach(element => {
            element.addEventListener("mouseover", draw, false);
        });
    }

    let isDrawing = false;
    document.body.addEventListener('mousedown', () => {isDrawing = true});
    document.body.addEventListener('mouseup', () => {isDrawing = false});

    function draw(event) {
        event.preventDefault();
        if (event.type === 'mouseover' && !isDrawing) return;
        if (rainbow) {
            let colorR = `${Math.floor(Math.random() * 255)}`;
            let colorG = `${Math.floor(Math.random() * 255)}`;
            let colorB = `${Math.floor(Math.random() * 255)}`;
            let colorA = `1`;
            event.target.style.backgroundColor = `rgba(${colorR}, ${colorG}, ${colorB}, ${colorA})`;
        } else if (eraser) {
            event.target.style.backgroundColor = "#ffffff";
        } else {
            event.target.style.backgroundColor = color;
        }
    }

    function createGrid() {
        container.innerHTML = "";
        for (let i = 0; i < pixels * pixels; i++) {
            let element = document.createElement("div");
            element.classList.add("pixel");
            element.style.width = `${(700 / pixels)}px`;
            element.style.height = `${(700 / pixels)}px`;
            container.appendChild(element);
        }
        updateCanvas();
    }

    createGrid();
    colorBtn.style.backgroundColor = color;

    let sizeOfScreen = window.matchMedia("(max-width: 400px)");
    if (sizeOfScreen.matches) {
        body.innerHTML = "";
        let mobile = document.createElement("div");
        mobile.classList.add("mobile");
        mobile.innerHTML = `Please use a desktop or laptop to view this page.`;
        body.appendChild(mobile);
    }

});
