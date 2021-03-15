export const throwDice = (max = 6) => Math.floor(Math.random() * max) + 1

export const generateDices = () => Array.from({ length: 5 }, (x, index) =>
  ({ index, value: 0, fixed: false, blocked: false }))
