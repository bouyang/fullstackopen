function calculateBmi(height: number, weight: number): string {
  height /= 100;
  let result: number = weight / (height * height);
  if (result >= 18.5 && result <= 24.9) {
    return `Normal (healthy weight)`;
  } else {
    return 'something else'
  }
}

// console.log(calculateBmi(180, 74))

export default calculateBmi;