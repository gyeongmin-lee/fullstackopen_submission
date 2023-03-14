import bodyParser from "body-parser";
import express from "express";
import { calculateBmi } from "./src/bmiCalculator";
import { calculateExercises } from "./src/exerciseCalculator";
const app = express();

app.use(bodyParser.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const bmiResult = calculateBmi(height, weight);
    res.json(bmiResult);
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  const exercises = daily_exercises as number[];

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (isNaN(Number(target)) || exercises.some((hours) => isNaN(hours))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(exercises, Number(target));
  return res.json(result);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
