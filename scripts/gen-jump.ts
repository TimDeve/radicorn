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

let codeJumping = " (defn jumping [y]\n   (case y\n"

for (let i = steps.length - 1; i > 0; i--) {
  if (i != 0 && (steps[i] != steps[i-1])) {
    codeJumping += `    ${steps[i]} ${steps[i-1]}\n`
  }
}

codeJumping += `    ${steps[steps.length - 1]}))\n`

let codeFalling = " (defn falling [y]\n   (case y\n"

for (let i = 0; i < steps.length; i++) {
  if (i != 0 && (steps[i] != steps[i-1])) {
    codeFalling += `    ${steps[i-1]} ${steps[i]}\n`
  }
}

codeFalling += `    ${steps[0]}))`

const code = `(defmodule JumpMap\n${codeJumping}\n${codeFalling})\n`

console.log(code)

await Deno.writeTextFile("src/jump.carp", code + "\n")

