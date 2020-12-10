#!/usr/bin/env -S deno run --allow-write

function jump(x: number) {
  return Math.floor(Math.sin((x - 25) / 16) * (44)) + 88
}

const steps = []

for (let i = 0; i <= 100; i++) {
  let y = jump(i)
  steps.push(y)
  if (y >= 88) { break }
}

let codeJumpFalling = "(defn jump-falling [y]\n  (case y\n"

for (let i = 0; i < steps.length; i++) {
  if (i != 0 && (steps[i] != steps[i-1])) {
    codeJumpFalling += `    ${steps[i-1]} ${steps[i]}\n`
  }
}

codeJumpFalling += `    ${steps[0]}))\n`

console.log(codeJumpFalling)

let codeJumpJumping = "(defn jump-jumping [y]\n  (case y\n"

for (let i = steps.length - 1; i > 0; i--) {
  if (i != 0 && (steps[i] != steps[i-1])) {
    codeJumpJumping += `    ${steps[i]} ${steps[i-1]}\n`
  }
}

codeJumpJumping += `    ${steps[steps.length - 1]}))\n`

console.log(codeJumpJumping)

await Deno.writeTextFile("src/jump.carp", codeJumpJumping + "\n\n" + codeJumpFalling)

