interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseData: number[],
  targetDailyHours: number
): ExerciseResult => {
  const periodLength = exerciseData.length;
  const trainingDays = exerciseData.filter((hours) => hours > 0).length;

  const totalHours = exerciseData.reduce((a, b) => a + b, 0);
  const average = totalHours / periodLength;

  const success = average >= targetDailyHours;

  let rating = 1;
  let ratingDescription = "You can do better!";

  if (average >= targetDailyHours * 1.5) {
    rating = 3;
    ratingDescription = "You're doing great!";
  }

  if (average >= targetDailyHours && average < targetDailyHours * 1.5) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetDailyHours,
    average,
  };
};

interface ExerciseValues {
  exerciseData: number[];
  target: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  const exerciseData = args.slice(3).map((hours) => Number(hours));

  if (isNaN(target) || exerciseData.some((hours) => isNaN(hours))) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    exerciseData,
    target,
  };
};

try {
  const { exerciseData, target } = parseArguments(process.argv);
  console.log(calculateExercises(exerciseData, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export { calculateExercises };
