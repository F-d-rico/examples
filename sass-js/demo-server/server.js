import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3003;

app.use(bodyParser.json());

app.post('/sendEmail', (req, res) => {
  // Endpoint que recibe lo que envía el FE
  const { nombre, apellido } = req.body;

  console.log(nombre);
  console.log(apellido);

  // Aquí debería de procesar la info, validarla e enviarla por email
  //  nodemailer
  // Si todo sale bien, podés enviar un mensaje al FE de que todo está ok
  return res.json('Ok!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
