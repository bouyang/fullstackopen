interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  // rating: number,
  // ratingDescription: string,
  // target: number,
  average: number,
}

function calculateExercises(input: number[], target: number): Result {
  return {
    periodLength: input.length,
    trainingDays: input.filter(days => days > 0).length,
    success: (input.reduce((days, total) => total + days)) / input.length >= target,
    average: (input.reduce((days, total) => total + days)) / input.length
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))