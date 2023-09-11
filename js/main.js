let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

// imagenes
let selectorImagen = document.getElementById("imagen");
let buttonDescargar = document.getElementById("descargar");
let buttonRespaldo = document.getElementById("respaldo-btn");
let buttonGris = document.getElementById("gris-btn");
let buttonSepia = document.getElementById("sepia-btn");
let buttonNegativo = document.getElementById("negativo-btn");
let buttonBinario = document.getElementById("binario-btn");
let buttonBlur =document.getElementById('blur-btn');
let inputContraste = document.getElementById('rangoContraste');
let inputBrillo = document.getElementById("rangoBrillo");

// lapiz
let selectorColor = document.getElementById("color");
let selectorGrosor = document.getElementById("grosor");
let buttonReset = document.getElementById("reset");
let buttonLapiz = document.getElementById("lapiz");
let buttonGoma = document.getElementById("goma");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

//variables
let mouseDown = false;
let color = "black";
let grosor = 1;
let lapizActual = null;
let miImagen = null;


function main() {
    miImagen = new imagen(ctx, canvasWidth, canvasHeight);
    miImagen.inic();

}
canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    lapizActual = new lapiz(e.clientX, e.clientY, color, grosor, ctx);
});

canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;
    lapizActual = null;
});

canvas.addEventListener("mousemove", (e) => {
    if (mouseDown) {
        lapizActual.moveTo(e.clientX, e.clientY);
        lapizActual.draw();
    }
});

function borrar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

buttonDescargar.addEventListener("click", (e) => {
    let enlace = document.createElement('a');
    // El título
    enlace.download = "imagen.jpg";
    // Convertir la imagen a Base64 y ponerlo en el enlace
    enlace.href = canvas.toDataURL("image/jpeg", 1);
    // Hacer click en él
    enlace.click();
    
});

buttonReset.addEventListener("mouseup", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

//eventlistener relacionados del lapiz
selectorColor.addEventListener("change", (e) => {
    color = e.target.value;
});
selectorGrosor.addEventListener("change", (e) => {
    grosor = e.target.value;
});
buttonGoma.addEventListener("click", (e) => { color = "white"; });
buttonLapiz.addEventListener("click", (e) => { color = "black"; });


// relacionado con la imagen
selectorImagen.addEventListener("change", (e) => {
    miImagen.cargarImagen(e.target.files[0]);
});
buttonRespaldo.addEventListener("mousedown", () => {
    miImagen.resetImagen();
});
/////////////////FILTROS/////////////
buttonGris.addEventListener("click", (e) => {
    miImagen.escalaGris();
});

// presiona el boton [Negativo]
buttonNegativo.addEventListener("click", (e) => {
    miImagen.negativo();
})

// presiona el boton [Monocromo]
buttonBinario.addEventListener("click", (e) => {
    miImagen.binario();
})

//presiona el boton [Sepia]

buttonSepia.addEventListener("click", (e) => {
    miImagen.sepia();
}
 )
//presiona el boton [blur]
 buttonBlur.addEventListener("click", (e) => {
    miImagen.blur();
}
 )
//presiona el input brillo
inputBrillo.addEventListener("change", () => {
    miImagen.brillo(inputBrillo.value * 30);
});
//presiona el input contraste
rangoContraste.addEventListener("change", () => {
    miImagen.contraste(rangoContraste.value * 30);
});