import express from 'express';
const app = express();
import calculateBmi from './bmiCalculator'

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  let height: number = Number(req.query.height);
  let weight: number = Number(req.query.weight);

  res.send(calculateBmi(height, weight));
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});