type BmiValues = {
  height: number;
  weight: number;
};

interface BmiResult {
  weight: number;
  height: number;
  bmi: "Normal (healthy weight)" | "Underweight" | "Overweight" | "Obese";
}

const calculateBmi = (height: number, weight: number): BmiResult => {
  const bmi = weight / ((height / 100) * (height / 100));

  let bmiResult = "";
  if (bmi < 18.5) {
    bmiResult = "Underweight";
  } else if (bmi < 25) {
    bmiResult = "Normal (healthy weight)";
  } else if (bmi < 30) {
    bmiResult = "Overweight";
  } else {
    bmiResult = "Obese";
  }

  return {
    weight,
    height,
    bmi: bmiResult as BmiResult["bmi"],
  };
};

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export { calculateBmi };
