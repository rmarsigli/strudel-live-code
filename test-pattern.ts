note('c e g b').sound('sawtooth').lpf(2000)

stack(
  note('c2').sound('square'),
  note('e3 g3').sound('triangle')
)

note('<c e g b>(3,8)').sound('sine').room(0.5)

s('bd sd hh cp').fast(2)

stack(
  s('bd*2'),
  s('~ sd'),
  s('hh*4')
).slow(2)
