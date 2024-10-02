const express = require('express');
const { createCanvas } = require('canvas');
const app = express();
const port = 3000;

// Middleware para procesar formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Ruta para generar el avatar personalizado
app.post('/avatar', (req, res) => {
  const { bgColor, eyeColor, faceShape } = req.body;

  // Crear un canvas de 200x200 píxeles
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');

  // Dibujar el fondo (color personalizado)
  ctx.fillStyle = bgColor || 'lightblue';
  ctx.fillRect(0, 0, 200, 200);

  // Dibujar la cara según la opción seleccionada
  ctx.fillStyle = 'white';
  if (faceShape === 'circle') {
    ctx.beginPath();
    ctx.arc(100, 100, 80, 0, Math.PI * 2);
    ctx.fill();
  } else if (faceShape === 'square') {
    ctx.fillRect(50, 50, 100, 100);
  }

  // Dibujar los ojos (con el color seleccionado)
  ctx.fillStyle = eyeColor || 'black';
  ctx.beginPath();
  ctx.arc(70, 80, 10, 0, Math.PI * 2); // Ojo izquierdo
  ctx.arc(130, 80, 10, 0, Math.PI * 2); // Ojo derecho
  ctx.fill();

  // Convertir la imagen a formato PNG y devolverla
  const buffer = canvas.toBuffer('image/png');
  res.setHeader('Content-Type', 'image/png');
  res.send(buffer);
});

app.listen(port, () => {
  console.log(`Servidor de avatares en funcionamiento en http://localhost:${port}`);
});
