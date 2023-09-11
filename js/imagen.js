class imagen {
    constructor(context, width, height) {
        this.ctx = context;
        this.width = width;
        this.height = height;
        this.imagenRespaldo = null;
    }

    inic() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    setRespaldo(respaldo) {
        this.imagenRespaldo = respaldo;
    }

    resetImagen() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.drawImage(this.imagenRespaldo, 0, 0, this.width, this.height);
    }

    cargarImagen(file) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        let img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            this.setRespaldo(img);
            this.ctx.drawImage(img, 0, 0, this.width, this.height);
        };
    };
    getCopia(){
        this.ctx.drawImage(this.imagenRespaldo, 0, 0 , canvasHeight,canvasWidth);
        return this.ctx.getImageData(0,0,this.height, this.width);
    }


    ////////////////FILTROS///////////////
   escalaGris() {
    const imageData = this.getCopia();
        for (let i = 0; i < imageData.data.length; i += 4) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];

            const new_r = (r + g + b) / 3;
            const new_g = (r + g + b) / 3;
            const new_b = (r + g + b) / 3;

            imageData.data[i] = new_r;
            imageData.data[i + 1] = new_g;
            imageData.data[i + 2] = new_b;
        }
          // Muestro la imagen con el filtro en el canvas
          ctx.putImageData(imageData, 0, 0);
    }

    sepia() {
        // Obtener los datos de la imagen del canvas
        const imageData = this.getCopia();
        const pixels = imageData.data;

       // Recorre cada píxel de los datos de la imagen
        for (let i = 0; i < pixels.length; i += 4) {
            //rojo
            const r = pixels[i];
            //verde
            const g = pixels[i + 1];
            //azul
            const b = pixels[i + 2];

            //  Calcular los nuevos valores RGB basados ​​en la fórmula del filtro sepia
            const newR = Math.min(0.393 * r + 0.769 * g + 0.189 * b, 255);
            const newG = Math.min(0.349 * r + 0.686 * g + 0.168 * b, 255);
            const newB = Math.min(0.272 * r + 0.534 * g + 0.131 * b, 255);

            //Establece los nuevos valores RGB en el píxel
            pixels[i] = newR;
            pixels[i + 1] = newG;
            pixels[i + 2] = newB;
        }

        // Muestro la imagen con el filtro en el canvas
        ctx.putImageData(imageData, 0, 0);
    };


   
    brillo(cantidad) {
        let cant = Number(cantidad);
        // Obtener los datos de la imagen del canvas
        const originalImageData = this.getCopia();
        const imageData = originalImageData;
        const pixels = imageData.data;

        // Calcula el factor de brillo en función de la entrada
        const brightness = cant;
        // Aplico el filtro de brillo a los píxeles
        for (let i = 0; i < pixels.length; i += 4) {
            // Obtener los valores de R, G y B del píxel actual
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

               //Aumenta o disminuye los valores RGB en función del factor de brillo
            pixels[i] = r + brightness;
            pixels[i + 1] = g + brightness;
            pixels[i + 2] = b + brightness;
        }


        // Escribir los datos de píxeles modificados en el canvas
        ctx.putImageData(imageData, 0, 0);

    }

    contraste(cantidad) {

        let cant = Number(cantidad);

        const imageData = this.getCopia();
        const pixels = imageData.data;
        //Calcula el factor de contraste basado en la entrada
        const contrast = cant; 
        //Recorre cada píxel de los datos de la imagen
        for (let i = 0; i < pixels.length; i += 4) {
            // Obtener el píxel actual
            const pixel = [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]];

            // Ajustar el contraste del píxel
            const ajustePixel = this.ajustarContrastePixel(pixel, cant);

            // Escribir los valores de los componentes RGB en la imagen
            pixels[i] = ajustePixel[0];
            pixels[i + 1] = ajustePixel[1];
            pixels[i + 2] = ajustePixel[2];
            pixels[i + 3] = ajustePixel[3];
        }
        ctx.putImageData(imageData, 0, 0);
    }

    
    ajustarContrastePixel(pixel, contraste) {
        // Calculo el factor de contraste
        const factor = (259 * (contraste + 255)) / (255 * (259 - contraste));

        // Vuelve a establecer los valores RGBA ajustados en el píxel
        pixel[0] = Math.max(0, Math.min(255, factor * (pixel[0] - 128) + 128));
        pixel[1] = Math.max(0, Math.min(255, factor * (pixel[1] - 128) + 128));
        pixel[2] = Math.max(0, Math.min(255, factor * (pixel[2] - 128) + 128));

        // Devolver el píxel modificado
        return pixel;
    }

   
    negativo() {

        // Obtener la imagen del canvas
        let imagen = this.getCopia();

        //Recorre todos los píxeles de la imagen y cambia su valor para invertir los colores
        for (let i = 0; i < imagen.data.length; i += 4) {
            imagen.data[i] = 255 - imagen.data[i]; // Componente rojo
        imagen.data[i + 1] = 255 - imagen.data[i + 1]; // Componente verde
        imagen.data[i + 2] = 255 - imagen.data[i + 2]; // Componente azul
            
        }

        // Colocar la imagen de nuevo en el canvas con el filtro aplicado
        ctx.putImageData(imagen, 0, 0);
    }

    binario() {
        // Obtener la imagen del canvas
        let imagen = this.getCopia();

// Define el umbral a partir del cual se considera un pixel blanco o negro
        let umbral = 128; 

            // Recorre todos los píxeles de la imagen y los convierte a blanco o negro según su valor
        for (let i = 0; i < imagen.data.length; i += 4) {
            // Calcular el valor promedio de los componentes RGB del píxel
            let valorPromedio = (imagen.data[i] + imagen.data[i + 1] + imagen.data[i + 2]) / 3;
            // Si el valor promedio supera el umbral, el pixel se convierte a blanco, sino a negro
            if (valorPromedio > umbral) {
                imagen.data[i] = 255; // rojo
                imagen.data[i + 1] = 255; // verde
                imagen.data[i + 2] = 255; // azul
            } else {
                imagen.data[i] = 0; // rojo
                imagen.data[i + 1] = 0; // verde
                imagen.data[i + 2] = 0; // azul
            }
        }

        // Colocar la imagen de nuevo en el canvas con el filtro aplicado
        ctx.putImageData(imagen, 0, 0);
    }

    blur() {
        const imageData = ctx.getImageData(0, 0, this.width, this.height);

        
     // Define la matriz de convolución y el factor de normalización para aplicar el desenfoque
        const matrix = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
         // Factor de normalización para la matriz de convolución
        const factor = 1 / 49; // La matriz tiene un total de 7x7 = 49 elementos


        // Aplicar el filtro de desenfoque
        const filteredData = desenfoque(imageData, matrix, factor);

        // Dibujar la imagen filtrada en el canvas
        ctx.putImageData(filteredData, 0, 0);
    }

}
//Función para aplicar la matriz de convolución y el factor de normalización en los datos de imagen
function desenfoque(imageData, matrix, factor) {
    // Crear una copia de los datos de la imagen original
    const pixels = imageData.data.slice();

    // Obtener el tamaño de la matriz de convolución
    const m = matrix.length; // Número de filas de la matriz
    const n = matrix[0].length; // Número de columnas de la matriz


     // Recorre cada píxel de la imagen
     for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            // Calcular la posición del píxel actual en el array de datos
            const pos = (y * imageData.width + x) * 4;

            // Verifico si el píxel está dentro del área de la imagen 
            if (x >= Math.floor(m / 2) && y >= Math.floor(n / 2) && x < imageData.width - Math.floor(m / 2) && y < imageData.height - Math.floor(n / 2)) {
                // Inicializar los valores rojo, verde y azul a 0
                let r = 0;
                let g = 0;
                let b = 0;

                // Recorre cada valor en la matriz
                for (let j = 0; j < n; j++) {
                    for (let i = 0; i < m; i++) {
                    
                       // Calcula la posición del píxel en la matriz de datos de píxeles para el valor actual en la matriz
                        const x1 = x + i - Math.floor(m / 2);
                        const y1 = y + j - Math.floor(n / 2);
                        const pos1 = (y1 * imageData.width + x1) * 4;

                        
                         // Obtengo los valores de los componentes RGB del píxel correspondiente
                        const r1 = pixels[pos1];
                        const g1 = pixels[pos1 + 1];
                        const b1 = pixels[pos1 + 2];

                        // Sume el producto del valor de la matriz y el valor del píxel a los valores rojo, verde y azul
                        r += r1 * matrix[j][i];
                        g += g1 * matrix[j][i];
                        b += b1 * matrix[j][i];
                    }
                }

                // Aplico el factor de normalización a los valores de los componentes RGB
                r *= factor;
                g *= factor;
                b *= factor;

                // Establece los valores rojo, verde y azul del píxel actual en la matriz de datos de píxeles a los nuevos valores
                pixels[pos] = r;
                pixels[pos + 1] = g;
                pixels[pos + 2] = b;
            }
        }
    }

    //Crea y devolver un nuevo objeto ImageData con los datos de píxeles modificados
    return new ImageData(new Uint8ClampedArray(pixels), imageData.width, imageData.height);
}
