## API Reference

This is the long list of functions you can use. Remember that you don't need to remember all of those and that you can already make music with a small set of functions!

### absoluteOrientationAlpha

**Synonyms:** `absOriA, absOriZ, absoluteOrientationZ`

The device's absolute orientation alpha value ranges from 0 to 1.

**Example:**

```
n(absoluteOrientationAlpha.segment(4).range(0,7)).scale("C:minor")
```

### absoluteOrientationBeta

**Synonyms:** `absOriB, absOriX, absoluteOrientationX`

The device's absolute orientation beta value ranges from 0 to 1.

**Example:**

```
n(absoluteOrientationBeta.segment(4).range(0,7)).scale("C:minor")
```

### absoluteOrientationGamma

**Synonyms:** `absOriG, absOriY, absoluteOrientationY`

The device's absolute orientation gamma value ranges from 0 to 1.

**Example:**

```
n(absoluteOrientationGamma.segment(4).range(0,7)).scale("C:minor")
```

### absoluteOrientationX

**Synonyms:** `absoluteOrientationBeta, absOriB, absOriX`

The device's absolute orientation beta value ranges from 0 to 1.

**Example:**

```
n(absoluteOrientationBeta.segment(4).range(0,7)).scale("C:minor")
```

### absoluteOrientationY

**Synonyms:** `absoluteOrientationGamma, absOriG, absOriY`

The device's absolute orientation gamma value ranges from 0 to 1.

**Example:**

```
n(absoluteOrientationGamma.segment(4).range(0,7)).scale("C:minor")
```

### absoluteOrientationZ

**Synonyms:** `absoluteOrientationAlpha, absOriA, absOriZ`

The device's absolute orientation alpha value ranges from 0 to 1.

**Example:**

```
n(absoluteOrientationAlpha.segment(4).range(0,7)).scale("C:minor")
```

### absOriA

**Synonyms:** `absoluteOrientationAlpha, absOriZ, absoluteOrientationZ`

The device's absolute orientation alpha value ranges from 0 to 1.

**Example:**

```
n(absoluteOrientationAlpha.segment(4).range(0,7)).scale("C:minor")
```

### absOriB

**Synonyms:** `absoluteOrientationBeta, absOriX, absoluteOrientationX`

The device's absolute orientation beta value ranges from 0 to 1.

**Example:**

```
n(absoluteOrientationBeta.segment(4).range(0,7)).scale("C:minor")
```

### absOriG

**Synonyms:** `absoluteOrientationGamma, absOriY, absoluteOrientationY`

The device's absolute orientation gamma value ranges from 0 to 1.

**Example:**

```
n(absoluteOrientationGamma.segment(4).range(0,7)).scale("C:minor")
```

### absOriX

**Synonyms:** `absoluteOrientationBeta, absOriB, absoluteOrientationX`

The device's absolute orientation beta value ranges from 0 to 1.

**Example:**

```
n(absoluteOrientationBeta.segment(4).range(0,7)).scale("C:minor")
```

### absOriY

**Synonyms:** `absoluteOrientationGamma, absOriG, absoluteOrientationY`

The device's absolute orientation gamma value ranges from 0 to 1.

**Example:**

```
n(absoluteOrientationGamma.segment(4).range(0,7)).scale("C:minor")
```

### absOriZ

**Synonyms:** `absoluteOrientationAlpha, absOriA, absoluteOrientationZ`

The device's absolute orientation alpha value ranges from 0 to 1.

**Example:**

```
n(absoluteOrientationAlpha.segment(4).range(0,7)).scale("C:minor")
```

### accelerate

A pattern of numbers that speed up (or slow down) samples while they play. Currently only supported by osc / superdirt.

**Example:**

```
s("sax").accelerate("<0 1 2 4 8 16>").slow(2).osc()
```

### accelerationX

**Synonyms:** `accX`

The accelerometer's x-axis value ranges from 0 to 1.

**Example:**

```
n(accelerationX.segment(4).range(0,7)).scale("C:minor")
```

### accelerationY

**Synonyms:** `accY`

The accelerometer's y-axis value ranges from 0 to 1.

**Example:**

```
n(accelerationY.segment(4).range(0,7)).scale("C:minor")
```

### accelerationZ

**Synonyms:** `accZ`

The accelerometer's z-axis value ranges from 0 to 1.

**Example:**

```
n(accelerationZ.segment(4).range(0,7)).scale("C:minor")
```

### accX

**Synonyms:** `accelerationX`

The accelerometer's x-axis value ranges from 0 to 1.

**Example:**

```
n(accelerationX.segment(4).range(0,7)).scale("C:minor")
```

### accY

**Synonyms:** `accelerationY`

The accelerometer's y-axis value ranges from 0 to 1.

**Example:**

```
n(accelerationY.segment(4).range(0,7)).scale("C:minor")
```

### accZ

**Synonyms:** `accelerationZ`

The accelerometer's z-axis value ranges from 0 to 1.

**Example:**

```
n(accelerationZ.segment(4).range(0,7)).scale("C:minor")
```

### add

Assumes a pattern of numbers. Adds the given number to each item in the pattern.

**Example:**

```
// Here, the triad 0, 2, 4 is shifted by different amounts
n("0 2 4".add("<0 3 4 0>")).scale("C:major")
// Without add, the equivalent would be:
// n("<[0 2 4] [3 5 7] [4 6 8] [0 2 4]>").scale("C:major")
```

**Example:**

```
// You can also use add with notes:
note("c3 e3 g3".add("<0 5 7 0>"))
// Behind the scenes, the notes are converted to midi numbers:
// note("48 52 55".add("<0 5 7 0>"))
```

### addVoicings

Adds a new custom voicing dictionary.

**Example:**

```
addVoicings('cookie', {
  7: ['3M 7m 9M 12P 15P', '7m 10M 13M 16M 19P'],
  '^7': ['3M 6M 9M 12P 14M', '7M 10M 13M 16M 19P'],
  m7: ['8P 11P 14m 17m 19P', '5P 8P 11P 14m 17m'],
  m7b5: ['3m 5d 8P 11P 14m', '5d 8P 11P 14m 17m'],
  o7: ['3m 6M 9M 11A 15P'],
  '7alt': ['3M 7m 10m 13m 15P'],
  '7#11': ['7m 10m 13m 15P 17m'],
}, ['C3', 'C6'])
"<C^7 A7 Dm7 G7>".voicings('cookie').note()
```

### adsr

ADSR envelope: Combination of Attack, Decay, Sustain, and Release.

**Example:**

```
note("[c3 bb2 f3 eb3]*2").sound("sawtooth").lpf(600).adsr(".1:.1:.5:.2")
```

### aliasBank

Register an alias for a bank of sounds.
Optionally accepts a single argument map of bank aliases.
Optionally accepts a single argument string of a path to a JSON file containing bank aliases.

### allTransforms

### almostAlways

Shorthand for `.sometimesBy(0.9, fn)`

**Example:**

```
s("hh*8").almostAlways(x=>x.speed("0.5"))
```

### almostNever

Shorthand for `.sometimesBy(0.1, fn)`

**Example:**

```
s("hh*8").almostNever(x=>x.speed("0.5"))
```

### always

Shorthand for `.sometimesBy(1, fn)` (always calls fn)

**Example:**

```
s("hh*8").always(x=>x.speed("0.5"))
```

### amp

Like `gain`, but linear.

**Example:**

```
s("bd*8").amp(".1*2 .5 .1*2 .5 .1 .5").osc()
```

### appBoth

When this method is called on a pattern of functions, it matches its haps
with those in the given pattern of values.  A new pattern is returned, with
each matching value applied to the corresponding function.

In this `_appBoth` variant, where timespans of the function and value haps
are not the same but do intersect, the resulting hap has a timespan of the
intersection. This applies to both the part and the whole timespan.

### appLeft

As with `appBoth`, but the `whole` timespan is not the intersection,
but the timespan from the function of patterns that this method is called
on. In practice, this means that the pattern structure, including onsets,
are preserved from the pattern of functions (often referred to as the left
hand or inner pattern).

### apply

**Synonyms:** `layer`

Layers the result of the given function(s). Like `superimpose`, but without the original pattern:

**Example:**

```
"<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
  .layer(x=>x.add("0,2"))
  .scale('C minor').note()
```

### apply

Like layer, but with a single function:

**Example:**

```
"<c3 eb3 g3>".scale('C minor').apply(scaleTranspose("0,2,4")).note()
```

### applyGradualLowpass

Applies a constantly changing lowpass filter to the given sound.

### applyHannWindow

Apply Hann window in-place

### appRight

As with `appLeft`, but `whole` timespans are instead taken from the
pattern of values, i.e. structure is preserved from the right hand/outer
pattern.

### appWhole

Assumes 'this' is a pattern of functions, and given a function to
resolve wholes, applies a given pattern of values to that
pattern of functions.

### arp

Selects indices in in stacked notes.

**Example:**

```
note("<[c,eb,g]!2 [c,f,ab] [d,f,ab]>")
.arp("0 [0,2] 1 [0,2]")
```

### arpWith

Selects indices in in stacked notes.

**Example:**

```
note("<[c,eb,g]!2 [c,f,ab] [d,f,ab]>")
.arpWith(haps => haps[2])
```

### arrange

Allows to arrange multiple patterns together over multiple cycles.
Takes a variable number of arrays with two elements specifying the number of cycles and the pattern to use.

**Example:**

```
arrange(
  [4, "<c a f e>(3,8)"],
  [2, "<g a>(5,8)"]
).note()
```

### as

Sets properties in a batch.

**Example:**

```
"c:.5 a:1 f:.25 e:.8".as("note:clip")
```

**Example:**

```
"{0@2 0.25 0 0.5 .3 .5}%8".as("begin").s("sax_vib").clip(1)
```

### att

**Synonyms:** `attack`

Amplitude envelope attack time: Specifies how long it takes for the sound to reach its peak value, relative to the onset.

**Example:**

```
note("c3 e3 f3 g3").attack("<0 .1 .5>")
```

### attack

**Synonyms:** `att`

Amplitude envelope attack time: Specifies how long it takes for the sound to reach its peak value, relative to the onset.

**Example:**

```
note("c3 e3 f3 g3").attack("<0 .1 .5>")
```

### bandf

**Synonyms:** `bpf, bp`

Sets the center frequency of the **b**and-**p**ass **f**ilter. When using mininotation, you
can also optionally supply the 'bpq' parameter separated by ':'.

**Example:**

```
s("bd sd [~ bd] sd,hh*6").bpf("<1000 2000 4000 8000>")
```

### bandq

**Synonyms:** `bpq`

Sets the **b**and-**p**ass **q**-factor (resonance).

**Example:**

```
s("bd sd [~ bd] sd").bpf(500).bpq("<0 1 2 3>")
```

### bank

Select the sound bank to use. To be used together with `s`. The bank name (+ "_") will be prepended to the value of `s`.

**Example:**

```
s("bd sd [~ bd] sd").bank('RolandTR909') // = s("RolandTR909_bd RolandTR909_sd")
```

### bbexpr

**Synonyms:** `byteBeatExpression`

Create byte beats with custom expressions

**Example:**

```
s("bytebeat").bbexpr('t*(t>>15^t>>66)')
```

### bbst

**Synonyms:** `byteBeatStartTime`

Create byte beats with custom expressions

**Example:**

```
note("c3!8".add("{0 0 12 0 7 5 3}%8")).s("bytebeat:5").bbst("<3 1>".mul(10000))._scope()
```

### beat

creates a structure pattern from divisions of a cycle
especially useful for creating rhythms

**Example:**

```
s("bd").beat("0,7,10", 16)
```

**Example:**

```
s("sd").beat("4,12", 16)
```

### begin

A pattern of numbers from 0 to 1. Skips the beginning of each sample, e.g. `0.25` to cut off the first quarter from each sample.

**Example:**

```
samples({ rave: 'rave/AREUREADY.wav' }, 'github:tidalcycles/dirt-samples')
s("rave").begin("<0 .25 .5 .75>").fast(2)
```

### berlin

Generates a continuous pattern of [berlin noise](conceived by Jame Coyne and Jade Rowland as a joke but turned out to be surprisingly cool and useful,
like perlin noise but with sawtooth waves), in the range 0..1.

**Example:**

```
// ascending arpeggios
n("0!16".add(berlin.fast(4).mul(14))).scale("d:minor")
```

### binary

Creates a pattern from a binary number.

**Example:**

```
"hh".s().struct(binary(5))
// "hh".s().struct("1 0 1")
```

### binaryN

Creates a pattern from a binary number, padded to n bits long.

**Example:**

```
"hh".s().struct(binaryN(55532, 16))
// "hh".s().struct("1 1 0 1 1 0 0 0 1 1 1 0 1 1 0 0")
```

### bite

Splits a pattern into the given number of slices, and plays them according to a pattern of slice numbers.
Similar to `slice`, but slices up patterns rather than sound samples.

**Example:**

```
note("0 1 2 3 4 5 6 7".scale('c:mixolydian'))
.bite(4, "3 2 1 0")
```

**Example:**

```
sound("bd - bd bd*2, - sd:6 - sd:5 sd:1 - [- sd:2] -, hh [- cp:7]")
  .bank("RolandTR909").speed(1.2)
  .bite(4, "0 0 [1 2] <3 2> 0 0 [2 1] 3")
```

### bp

**Synonyms:** `bpf, bandf`

Sets the center frequency of the **b**and-**p**ass **f**ilter. When using mininotation, you
can also optionally supply the 'bpq' parameter separated by ':'.

**Example:**

```
s("bd sd [~ bd] sd,hh*6").bpf("<1000 2000 4000 8000>")
```

### bpa

**Synonyms:** `bpattack`

Sets the attack duration for the bandpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.bpf(500)
.bpa("<.5 .25 .1 .01>/4")
.bpenv(4)
```

### bpattack

**Synonyms:** `bpa`

Sets the attack duration for the bandpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.bpf(500)
.bpa("<.5 .25 .1 .01>/4")
.bpenv(4)
```

### bpd

**Synonyms:** `bpdecay`

Sets the decay duration for the bandpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.bpf(500)
.bpd("<.5 .25 .1 0>/4")
.bps(0.2)
.bpenv(4)
```

### bpdecay

**Synonyms:** `bpd`

Sets the decay duration for the bandpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.bpf(500)
.bpd("<.5 .25 .1 0>/4")
.bps(0.2)
.bpenv(4)
```

### bpe

**Synonyms:** `bpenv`

Sets the bandpass filter envelope modulation depth.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.bpf(500)
.bpa(.5)
.bpenv("<4 2 1 0 -1 -2 -4>/4")
```

### bpenv

**Synonyms:** `bpe`

Sets the bandpass filter envelope modulation depth.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.bpf(500)
.bpa(.5)
.bpenv("<4 2 1 0 -1 -2 -4>/4")
```

### bpf

**Synonyms:** `bandf, bp`

Sets the center frequency of the **b**and-**p**ass **f**ilter. When using mininotation, you
can also optionally supply the 'bpq' parameter separated by ':'.

**Example:**

```
s("bd sd [~ bd] sd,hh*6").bpf("<1000 2000 4000 8000>")
```

### bpq

**Synonyms:** `bandq`

Sets the **b**and-**p**ass **q**-factor (resonance).

**Example:**

```
s("bd sd [~ bd] sd").bpf(500).bpq("<0 1 2 3>")
```

### bpr

**Synonyms:** `bprelease`

Sets the release time for the bandpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.clip(.5)
.bpf(500)
.bpenv(4)
.bpr("<.5 .25 .1 0>/4")
.release(.5)
```

### bprelease

**Synonyms:** `bpr`

Sets the release time for the bandpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.clip(.5)
.bpf(500)
.bpenv(4)
.bpr("<.5 .25 .1 0>/4")
.release(.5)
```

### bps

**Synonyms:** `bpsustain`

Sets the sustain amplitude for the bandpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.bpf(500)
.bpd(.5)
.bps("<0 .25 .5 1>/4")
.bpenv(4)
```

### bpsustain

**Synonyms:** `bps`

Sets the sustain amplitude for the bandpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.bpf(500)
.bpd(.5)
.bps("<0 .25 .5 1>/4")
.bpenv(4)
```

### brak

Returns a new pattern where every other cycle is played once, twice as
fast, and offset in time by one quarter of a cycle. Creates a kind of
breakbeat feel.

### brand

A continuous pattern of 0 or 1 (binary random)

**Example:**

```
s("hh*10").pan(brand)
```

### brandBy

A continuous pattern of 0 or 1 (binary random), with a probability for the value being 1

**Example:**

```
s("hh*10").pan(brandBy(0.2))
```

### byteBeatExpression

**Synonyms:** `bbexpr`

Create byte beats with custom expressions

**Example:**

```
s("bytebeat").bbexpr('t*(t>>15^t>>66)')
```

### byteBeatStartTime

**Synonyms:** `bbst`

Create byte beats with custom expressions

**Example:**

```
note("c3!8".add("{0 0 12 0 7 5 3}%8")).s("bytebeat:5").bbst("<3 1>".mul(10000))._scope()
```

### cat

**Synonyms:** `slowcat`

Concatenation: combines a list of patterns, switching between them successively, one per cycle.

**Example:**

```
slowcat("e5", "b4", ["d5", "c5"])
```

### cat

**Synonyms:** `slowcat`

The given items are con**cat**enated, where each one takes one cycle.

**Example:**

```
cat("e5", "b4", ["d5", "c5"]).note()
// "<e5 b4 [d5 c5]>".note()
```

**Example:**

```
// As a chained function:
s("hh*4").cat(
   note("c4(5,8)")
)
```

### ccn

MIDI control number: Sends a MIDI control change message.

### ccv

MIDI control value: Sends a MIDI control change message.

### ceil

Assumes a numerical pattern. Returns a new pattern with all values set to
their mathematical ceiling. E.g. `3.2` replaced with `4`, and `-4.2`
replaced with `-4`.

**Example:**

```
note("42 42.1 42.5 43".ceil())
```

### ch

**Synonyms:** `channels`

Allows you to set the output channels on the interface

**Example:**

```
note("e a d b g").channels("3:4")
```

### channel

Choose the channel the pattern is sent to in superdirt

### channels

**Synonyms:** `ch`

Allows you to set the output channels on the interface

**Example:**

```
note("e a d b g").channels("3:4")
```

### choose

Chooses randomly from the given list of elements.

**Example:**

```
note("c2 g2!2 d2 f1").s(choose("sine", "triangle", "bd:6"))
```

### choose

Chooses from the given list of values (or patterns of values), according
to the pattern that the method is called on. The pattern should be in
the range 0 .. 1.

### choose2

As with choose, but the pattern that this method is called on should be
in the range -1 .. 1

### chooseCycles

**Synonyms:** `randcat`

Picks one of the elements at random each cycle.

**Example:**

```
chooseCycles("bd", "hh", "sd").s().fast(8)
```

**Example:**

```
s("bd | hh | sd").fast(8)
```

### chooseInWith

As with {chooseWith}, but the structure comes from the chosen values, rather
than the pattern you're using to choose with.

### chooseWith

Choose from the list of values (or patterns of values) using the given
pattern of numbers, which should be in the range of 0..1

**Example:**

```
note("c2 g2!2 d2 f1").s(chooseWith(sine.fast(2), ["sawtooth", "triangle", "bd:6"]))
```

### chop

Cuts each sample into the given number of parts, allowing you to explore a technique known as 'granular synthesis'.
It turns a pattern of samples into a pattern of parts of samples.

**Example:**

```
samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })
s("rhodes")
 .chop(4)
 .rev() // reverse order of chops
 .loopAt(2) // fit sample into 2 cycles
```

### chorus

mix control for the chorus effect

**Example:**

```
note("d d a# a").s("sawtooth").chorus(.5)
```

### chunk

**Synonyms:** `slowChunk, slowchunk`

Divides a pattern into a given number of parts, then cycles through those parts in turn, applying the given function to each part in turn (one part per cycle).

**Example:**

```
"0 1 2 3".chunk(4, x=>x.add(7))
.scale("A:minor").note()
```

### chunkback

**Synonyms:** `chunkBack`

Like `chunk`, but cycles through the parts in reverse order. Known as chunk' in tidalcycles

**Example:**

```
"0 1 2 3".chunkBack(4, x=>x.add(7))
.scale("A:minor").note()
```

### chunkBack

**Synonyms:** `chunkback`

Like `chunk`, but cycles through the parts in reverse order. Known as chunk' in tidalcycles

**Example:**

```
"0 1 2 3".chunkBack(4, x=>x.add(7))
.scale("A:minor").note()
```

### chunkbackinto

**Synonyms:** `chunkBackInto`

Like `chunkInto`, but moves backwards through the chunks.

**Example:**

```
sound("bd sd ht lt bd - cp lt").chunkInto(4, hurry(2))
  .bank("tr909")
```

### chunkBackInto

**Synonyms:** `chunkbackinto`

Like `chunkInto`, but moves backwards through the chunks.

**Example:**

```
sound("bd sd ht lt bd - cp lt").chunkInto(4, hurry(2))
  .bank("tr909")
```

### chunkinto

**Synonyms:** `chunkInto`

Like `chunk`, but the function is applied to a looped subcycle of the source pattern.

**Example:**

```
sound("bd sd ht lt bd - cp lt").chunkInto(4, hurry(2))
  .bank("tr909")
```

### chunkInto

**Synonyms:** `chunkinto`

Like `chunk`, but the function is applied to a looped subcycle of the source pattern.

**Example:**

```
sound("bd sd ht lt bd - cp lt").chunkInto(4, hurry(2))
  .bank("tr909")
```

### chyx

BYTE BEATS

### clip

**Synonyms:** `legato`

Multiplies the duration with the given number. Also cuts samples off at the end if they exceed the duration.

**Example:**

```
note("c a f e").s("piano").clip("<.5 1 2>")
```

### coarse

Fake-resampling for lowering the sample rate. Caution: This effect seems to only work in chromium based browsers

**Example:**

```
s("bd sd [~ bd] sd,hh*8").coarse("<1 4 8 16 32>")
```

### color

**Synonyms:** `colour`

Sets the color of the hap in visualizations like pianoroll or highlighting.

### colour

**Synonyms:** `color`

Sets the color of the hap in visualizations like pianoroll or highlighting.

### compress

Compress each cycle into the given timespan, leaving a gap

**Example:**

```
cat(
  s("bd sd").compress(.25,.75),
  s("~ bd sd ~")
)
```

### compressor

Dynamics Compressor. The params are `compressor("threshold:ratio:knee:attack:release")`
More info here

**Example:**

```
s("bd sd [~ bd] sd,hh*8")
.compressor("-20:20:10:.002:.02")
```

### computeMagnitudes

Compute squared magnitudes for peak finding

### contract

*Experimental*

Contracts the step size of the pattern by the given factor. See also `expand`.

**Example:**

```
sound("tha dhi thom nam").bank("mridangam").contract("3 2 1 1 2 3").pace(8)
```

### control

MIDI control: Sends a MIDI control change message.

### cosine

A cosine signal between 0 and 1.

**Example:**

```
n(stack(sine,cosine).segment(16).range(0,15))
.scale("C:minor")
```

### cosine2

A cosine signal between -1 and 1 (like `cosine`, but bipolar).

### cpm

Plays the pattern at the given cycles per minute.

**Example:**

```
s("<bd sd>,hh*2").cpm(90) // = 90 bpm
```

### crossfade

Equal Power Crossfade function.
Smoothly transitions between signals A and B, maintaining consistent perceived loudness.

### crush

Bit crusher effect.

**Example:**

```
s("<bd sd>,hh*3").fast(2).crush("<16 8 7 6 5 4 3 2>")
```

### csoundm

Sends notes to Csound for rendering with MIDI semantics. The hap value is
translated to these Csound pfields:

p1 -- Csound instrument either as a number (1-based, can be a fraction),
or as a string name.
p2 -- time in beats (usually seconds) from start of performance.
p3 -- duration in beats (usually seconds).
p4 -- MIDI key number (as a real number, not an integer but in [0, 127].
p5 -- MIDI velocity (as a real number, not an integer but in [0, 127].
p6 -- Strudel controls, as a string.

### ctf

**Synonyms:** `lpf, cutoff, lp`

Applies the cutoff frequency of the **l**ow-**p**ass **f**ilter.

When using mininotation, you can also optionally add the 'lpq' parameter, separated by ':'.

**Example:**

```
s("bd sd [~ bd] sd,hh*6").lpf("<4000 2000 1000 500 200 100>")
```

**Example:**

```
s("bd*16").lpf("1000:0 1000:10 1000:20 1000:30")
```

### cut

In the style of classic drum-machines, `cut` will stop a playing sample as soon as another samples with in same cutgroup is to be played. An example would be an open hi-hat followed by a closed one, essentially muting the open.

**Example:**

```
s("[oh hh]*4").cut(1)
```

### cutoff

**Synonyms:** `lpf, ctf, lp`

Applies the cutoff frequency of the **l**ow-**p**ass **f**ilter.

When using mininotation, you can also optionally add the 'lpq' parameter, separated by ':'.

**Example:**

```
s("bd sd [~ bd] sd,hh*6").lpf("<4000 2000 1000 500 200 100>")
```

**Example:**

```
s("bd*16").lpf("1000:0 1000:10 1000:20 1000:30")
```

### dec

**Synonyms:** `decay`

Amplitude envelope decay time: the time it takes after the attack time to reach the sustain level.
Note that the decay is only audible if the sustain value is lower than 1.

**Example:**

```
note("c3 e3 f3 g3").decay("<.1 .2 .3 .4>").sustain(0)
```

### decay

**Synonyms:** `dec`

Amplitude envelope decay time: the time it takes after the attack time to reach the sustain level.
Note that the decay is only audible if the sustain value is lower than 1.

**Example:**

```
note("c3 e3 f3 g3").decay("<.1 .2 .3 .4>").sustain(0)
```

### defaultmidimap

configures the default midimap, which is used when no "midimap" port is set

**Example:**

```
defaultmidimap({ lpf: 74 })
$: note("c a f e").midi();
$: lpf(sine.slow(4).segment(16)).midi();
```

### defragmentHaps

Combines adjacent haps with the same value and whole.  Only
intended for use in tests.

### degrade

Randomly removes 50% of events from the pattern. Shorthand for `.degradeBy(0.5)`

**Example:**

```
s("hh*8").degrade()
```

**Example:**

```
s("[hh?]*8")
```

### degradeBy

Randomly removes events from the pattern by a given amount.
0 = 0% chance of removal
1 = 100% chance of removal

**Example:**

```
s("hh*8").degradeBy(0.2)
```

**Example:**

```
s("[hh?0.2]*8")
```

**Example:**

```
//beat generator
s("bd").segment(16).degradeBy(.5).ribbon(16,1)
```

### delay

Sets the level of the delay signal.

When using mininotation, you can also optionally add the 'delaytime' and 'delayfeedback' parameter,
separated by ':'.

**Example:**

```
s("bd bd").delay("<0 .25 .5 1>")
```

**Example:**

```
s("bd bd").delay("0.65:0.25:0.9 0.65:0.125:0.7")
```

### delayfb

**Synonyms:** `delayfeedback, dfb`

Sets the level of the signal that is fed back into the delay.
Caution: Values >= 1 will result in a signal that gets louder and louder! Don't do it

**Example:**

```
s("bd").delay(.25).delayfeedback("<.25 .5 .75 1>")
```

### delayfeedback

**Synonyms:** `delayfb, dfb`

Sets the level of the signal that is fed back into the delay.
Caution: Values >= 1 will result in a signal that gets louder and louder! Don't do it

**Example:**

```
s("bd").delay(.25).delayfeedback("<.25 .5 .75 1>")
```

### delayfeedback

**Synonyms:** `delayfb, dfb`

Sets the level of the signal that is fed back into the delay.
Caution: Values >= 1 will result in a signal that gets louder and louder! Don't do it

**Example:**

```
s("bd").delay(.25).delayfeedback("<.25 .5 .75 1>")
```

### delayspeed

**Synonyms:** `delayt, dt`

Sets the time of the delay effect.

**Example:**

```
note("d d a# a".fast(2)).s("sawtooth").delay(.8).delaytime(1/2).delayspeed("<2 .5 -1 -2>")
```

### delaysync

**Synonyms:** `delayt, dt`

Sets the time of the delay effect in cycles.

**Example:**

```
s("bd bd").delay(.25).delaysync("<1 2 3 5>".div(8))
```

### delayt

**Synonyms:** `delayspeed, dt`

Sets the time of the delay effect.

**Example:**

```
note("d d a# a".fast(2)).s("sawtooth").delay(.8).delaytime(1/2).delayspeed("<2 .5 -1 -2>")
```

### density

Noise crackle density

**Example:**

```
s("crackle*4").density("<0.01 0.04 0.2 0.5>".slow(4))
```

### density

**Synonyms:** `fast`

Speed up a pattern by the given factor. Used by "*" in mini notation.

**Example:**

```
s("bd hh sd hh").fast(2) // s("[bd hh sd hh]*2")
```

### det

**Synonyms:** `detune`

Set detune for stacked voices of supported oscillators

**Example:**

```
note("d f a a# a d3").fast(2).s("supersaw").detune("<.1 .2 .5 24.1>")
```

### detune

**Synonyms:** `det`

Set detune for stacked voices of supported oscillators

**Example:**

```
note("d f a a# a d3").fast(2).s("supersaw").detune("<.1 .2 .5 24.1>")
```

### dfb

**Synonyms:** `delayfeedback, delayfb`

Sets the level of the signal that is fed back into the delay.
Caution: Values >= 1 will result in a signal that gets louder and louder! Don't do it

**Example:**

```
s("bd").delay(.25).delayfeedback("<.25 .5 .75 1>")
```

### discreteOnly

Returns a new pattern, with 'continuous' haps (those without 'whole'
timespans) removed from query results.

### dist

**Synonyms:** `distort`

Wave shaping distortion. CAUTION: it can get loud.
Second option in optional array syntax (ex: ".9:.5") applies a postgain to the output.
Most useful values are usually between 0 and 10 (depending on source gain). If you are feeling adventurous, you can turn it up to 11 and beyond ;)

**Example:**

```
s("bd sd [~ bd] sd,hh*8").distort("<0 2 3 10:.5>")
```

**Example:**

```
note("d1!8").s("sine").penv(36).pdecay(.12).decay(.23).distort("8:.4")
```

### distort

**Synonyms:** `dist`

Wave shaping distortion. CAUTION: it can get loud.
Second option in optional array syntax (ex: ".9:.5") applies a postgain to the output.
Most useful values are usually between 0 and 10 (depending on source gain). If you are feeling adventurous, you can turn it up to 11 and beyond ;)

**Example:**

```
s("bd sd [~ bd] sd,hh*8").distort("<0 2 3 10:.5>")
```

**Example:**

```
note("d1!8").s("sine").penv(36).pdecay(.12).decay(.23).distort("8:.4")
```

### div

Divides each number by the given factor.

### djf

DJ filter, below 0.5 is low pass filter, above is high pass filter.

**Example:**

```
n(irand(16).seg(8)).scale("d:phrygian").s("supersaw").djf("<.5 .3 .2 .75>")
```

### drawLine

**Example:**

```
const line = drawLine("0 [1 2 3]", 10); // |0--123|0--123
console.log(line);
silence;
```

### drive

Filter overdrive for supported filter types

**Example:**

```
note("{f g g c d a a#}%16".sub(17)).s("supersaw").lpenv(8).lpf(150).lpq(.8).ftype('ladder').drive("<.5 4>")
```

### drop

*Experimental*

Drops the given number of steps from a pattern.
A positive number will drop steps from the start of a pattern, and a negative number from the end.

**Example:**

```
"tha dhi thom nam".drop("1").sound().bank("mridangam")
```

**Example:**

```
"tha dhi thom nam".drop("-1").sound().bank("mridangam")
```

**Example:**

```
"tha dhi thom nam".drop("0 1 2 3").sound().bank("mridangam")
```

**Example:**

```
"tha dhi thom nam".drop("0 -1 -2 -3").sound().bank("mridangam")
```

### dry

Set dryness of reverb. See `room` and `size` for more information about reverb.

**Example:**

```
n("[0,3,7](3,8)").s("superpiano").room(.7).dry("<0 .5 .75 1>").osc()
```

### dt

**Synonyms:** `delayspeed, delayt`

Sets the time of the delay effect.

**Example:**

```
note("d d a# a".fast(2)).s("sawtooth").delay(.8).delaytime(1/2).delayspeed("<2 .5 -1 -2>")
```

### duck

**Synonyms:** `duckorbit`

Modulate the amplitude of an orbit to create a "sidechain" like effect.

Can be applied to multiple orbits with the ':' mininotation, e.g. `duckorbit("2:3")`

**Example:**

```
$: n(run(16)).scale("c:minor:pentatonic").s("sawtooth").delay(.7).orbit(2)
$: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit(2).duckattack(0.2).duckdepth(1)
```

**Example:**

```
$: n(run(16)).scale("c:minor:pentatonic").s("sawtooth").delay(.7).orbit(2)
$: s("hh*16").orbit(3)
$: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit("2:3").duckattack(0.2).duckdepth(1)
```

### duckatt

**Synonyms:** `duckattack`

The time required for the ducked signal(s) to return to their normal volume.

Can vary across orbits with the ':' mininotation, e.g. `duckonset("0:0.003")`.
Note: this requires first applying the effect to multiple orbits with e.g. `duckorbit("2:3")`.

**Example:**

```
sound: n(run(8)).scale("c:minor").s("sawtooth").delay(.7).orbit(2)
ducker: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit(2).duckattack("<0.2 0 0.4>").duckdepth(1)
```

**Example:**

```
moreduck: n(run(8)).scale("c:minor").s("sawtooth").delay(.7).orbit(2)
lessduck: s("hh*16").orbit(5)
ducker: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit("2:5").duckattack("0.4:0.1")
```

### duckattack

**Synonyms:** `duckatt`

The time required for the ducked signal(s) to return to their normal volume.

Can vary across orbits with the ':' mininotation, e.g. `duckonset("0:0.003")`.
Note: this requires first applying the effect to multiple orbits with e.g. `duckorbit("2:3")`.

**Example:**

```
sound: n(run(8)).scale("c:minor").s("sawtooth").delay(.7).orbit(2)
ducker: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit(2).duckattack("<0.2 0 0.4>").duckdepth(1)
```

**Example:**

```
moreduck: n(run(8)).scale("c:minor").s("sawtooth").delay(.7).orbit(2)
lessduck: s("hh*16").orbit(5)
ducker: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit("2:5").duckattack("0.4:0.1")
```

### duckdepth

The amount of ducking applied to target orbit

Can vary across orbits with the ':' mininotation, e.g. `duckdepth("0.3:0.1")`.
Note: this requires first applying the effect to multiple orbits with e.g. `duckorbit("2:3")`.

**Example:**

```
stack( n(run(8)).scale("c:minor").s("sawtooth").delay(.7).orbit(2), s("bd:4!4").beat("0,4,8,11,14",16).duckorbit(2).duckattack(0.2).duckdepth("<1 .9 .6 0>"))
```

**Example:**

```
$: n(run(16)).scale("c:minor:pentatonic").s("sawtooth").delay(.7).orbit(2)
$: s("hh*16").orbit(3)
$: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit("2:3").duckattack(0.2).duckdepth("1:0.5")
```

### duckons

**Synonyms:** `duckonset`

The time required for the ducked signal(s) to reach their lowest volume.
Can be used to prevent clicking or for creative rhythmic effects.

Can vary across orbits with the ':' mininotation, e.g. `duckonset("0:0.003")`.
Note: this requires first applying the effect to multiple orbits with e.g. `duckorbit("2:3")`.

**Example:**

```
// Clicks
sound: freq("63.2388").s("sine").orbit(2).gain(4)
duckerWithClick: s("bd*4").duckorbit(2).duckattack(0.3).duckonset(0).postgain(0)
```

**Example:**

```
// No clicks
sound: freq("63.2388").s("sine").orbit(2).gain(4)
duckerWithoutClick: s("bd*4").duckorbit(2).duckattack(0.3).duckonset(0.01).postgain(0)
```

**Example:**

```
// Rhythmic
noise: s("pink").distort("2:1").orbit(4) // used rhythmically with 0.3 onset below
hhat: s("hh*16").orbit(7)
ducker: s("bd*4").bank("tr909").duckorbit("4:7").duckonset("0.3:0.003").duckattack(0.25)
```

### duckonset

**Synonyms:** `duckons`

The time required for the ducked signal(s) to reach their lowest volume.
Can be used to prevent clicking or for creative rhythmic effects.

Can vary across orbits with the ':' mininotation, e.g. `duckonset("0:0.003")`.
Note: this requires first applying the effect to multiple orbits with e.g. `duckorbit("2:3")`.

**Example:**

```
// Clicks
sound: freq("63.2388").s("sine").orbit(2).gain(4)
duckerWithClick: s("bd*4").duckorbit(2).duckattack(0.3).duckonset(0).postgain(0)
```

**Example:**

```
// No clicks
sound: freq("63.2388").s("sine").orbit(2).gain(4)
duckerWithoutClick: s("bd*4").duckorbit(2).duckattack(0.3).duckonset(0.01).postgain(0)
```

**Example:**

```
// Rhythmic
noise: s("pink").distort("2:1").orbit(4) // used rhythmically with 0.3 onset below
hhat: s("hh*16").orbit(7)
ducker: s("bd*4").bank("tr909").duckorbit("4:7").duckonset("0.3:0.003").duckattack(0.25)
```

### duckorbit

**Synonyms:** `duck`

Modulate the amplitude of an orbit to create a "sidechain" like effect.

Can be applied to multiple orbits with the ':' mininotation, e.g. `duckorbit("2:3")`

**Example:**

```
$: n(run(16)).scale("c:minor:pentatonic").s("sawtooth").delay(.7).orbit(2)
$: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit(2).duckattack(0.2).duckdepth(1)
```

**Example:**

```
$: n(run(16)).scale("c:minor:pentatonic").s("sawtooth").delay(.7).orbit(2)
$: s("hh*16").orbit(3)
$: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit("2:3").duckattack(0.2).duckdepth(1)
```

### dur

**Synonyms:** `duration`

Sets the duration of the event in cycles. Similar to clip / legato, it also cuts samples off at the end if they exceed the duration.

**Example:**

```
note("c a f e").s("piano").dur("<.5 1 2>")
```

### duration

**Synonyms:** `dur`

Sets the duration of the event in cycles. Similar to clip / legato, it also cuts samples off at the end if they exceed the duration.

**Example:**

```
note("c a f e").s("piano").dur("<.5 1 2>")
```

### each

### early

Nudge a pattern to start earlier in time. Equivalent of Tidal's <~ operator

**Example:**

```
"bd ~".stack("hh ~".early(.1)).s()
```

### echo

Superimpose and offset multiple times, gradually decreasing the velocity

**Example:**

```
s("bd sd").echo(3, 1/6, .8)
```

### echowith

**Synonyms:** `echoWith, stutWith, stutwith`

Superimpose and offset multiple times, applying the given function each time.

**Example:**

```
"<0 [2 4]>"
.echoWith(4, 1/8, (p,n) => p.add(n*2))
.scale("C:minor").note()
```

### echoWith

**Synonyms:** `echowith, stutWith, stutwith`

Superimpose and offset multiple times, applying the given function each time.

**Example:**

```
"<0 [2 4]>"
.echoWith(4, 1/8, (p,n) => p.add(n*2))
.scale("C:minor").note()
```

### eish

**Synonyms:** `euclidish`

A 'euclid' variant with an additional parameter that morphs the resulting
rhythm from 0 (no morphing) to 1 (completely 'even'). For example
`sound("bd").euclidish(3,8,0)` would be the same as
`sound("bd").euclid(3,8)`, and `sound("bd").euclidish(3,8,1)` would be the
same as `sound("bd bd bd")`. `sound("bd").euclidish(3,8,0.5)` would have a
groove somewhere between.
Inspired by the work of Malcom Braff.

**Example:**

```
sound("hh").euclidish(7,12,sine.slow(8))
.pan(sine.slow(8))
```

### end

The same as .begin, but cuts off the end off each sample.

**Example:**

```
s("bd*2,oh*4").end("<.1 .2 .5 1>").fast(2)
```

### euclid

Changes the structure of the pattern to form an Euclidean rhythm.
Euclidean rhythms are rhythms obtained using the greatest common
divisor of two numbers.  They were described in 2004 by Godfried
Toussaint, a Canadian computer scientist.  Euclidean rhythms are
really useful for computer/algorithmic music because they can
describe a large number of rhythms with a couple of numbers.

**Example:**

```
// The Cuban tresillo pattern.
note("c3").euclid(3,8)
```

### euclidish

**Synonyms:** `eish`

A 'euclid' variant with an additional parameter that morphs the resulting
rhythm from 0 (no morphing) to 1 (completely 'even'). For example
`sound("bd").euclidish(3,8,0)` would be the same as
`sound("bd").euclid(3,8)`, and `sound("bd").euclidish(3,8,1)` would be the
same as `sound("bd bd bd")`. `sound("bd").euclidish(3,8,0.5)` would have a
groove somewhere between.
Inspired by the work of Malcom Braff.

**Example:**

```
sound("hh").euclidish(7,12,sine.slow(8))
.pan(sine.slow(8))
```

### euclidLegato

Similar to `euclid`, but each pulse is held until the next pulse,
so there will be no gaps.

**Example:**

```
note("c3").euclidLegato(3,8)
```

### euclidLegatoRot

Similar to `euclid`, but each pulse is held until the next pulse,
so there will be no gaps, and has an additional parameter for 'rotating'
the resulting sequence

**Example:**

```
note("c3").euclidLegatoRot(3,5,2)
```

### euclidRot

Like `euclid`, but has an additional parameter for 'rotating' the resulting sequence.

**Example:**

```
// A Samba rhythm necklace from Brazil
note("c3").euclidRot(3,16,14)
```

### every

An alias for `firstOf`

**Example:**

```
note("c3 d3 e3 g3").every(4, x=>x.rev())
```

### expand

*Experimental*

Expands the step size of the pattern by the given factor.

**Example:**

```
sound("tha dhi thom nam").bank("mridangam").expand("3 2 1 1 2 3").pace(8)
```

### extend

*Experimental*

`extend` is similar to `fast` in that it increases its density, but it also increases the step count
accordingly. So `stepcat("a b".extend(2), "c d")` would be the same as `"a b a b c d"`, whereas
`stepcat("a b".fast(2), "c d")` would be the same as `"[a b] [a b] c d"`.

**Example:**

```
stepcat(
  sound("bd bd - cp").extend(2),
  sound("bd - sd -")
).pace(8)
```

### fanchor

controls the center of the filter envelope. 0 is unipolar positive, .5 is bipolar, 1 is unipolar negative

**Example:**

```
note("{f g g c d a a#}%8").s("sawtooth").lpf("{1000}%2")
.lpenv(8).fanchor("<0 .5 1>")
```

### fast

**Synonyms:** `density`

Speed up a pattern by the given factor. Used by "*" in mini notation.

**Example:**

```
s("bd hh sd hh").fast(2) // s("[bd hh sd hh]*2")
```

### fastcat

**Synonyms:** `seq, sequence`

Like **cat**, but the items are crammed into one cycle.

**Example:**

```
seq("e5", "b4", ["d5", "c5"]).note()
// "e5 b4 [d5 c5]".note()
```

**Example:**

```
// As a chained function:
s("hh*4").seq(
  note("c4(5,8)")
)
```

### fastchunk

**Synonyms:** `fastChunk`

Like `chunk`, but the cycles of the source pattern aren't repeated
for each set of chunks.

**Example:**

```
"<0 8> 1 2 3 4 5 6 7"
.fastChunk(4, x => x.color('red')).slow(2)
.scale("C2:major").note()
```

### fastChunk

**Synonyms:** `fastchunk`

Like `chunk`, but the cycles of the source pattern aren't repeated
for each set of chunks.

**Example:**

```
"<0 8> 1 2 3 4 5 6 7"
.fastChunk(4, x => x.color('red')).slow(2)
.scale("C2:major").note()
```

### fastgap

**Synonyms:** `fastGap`

speeds up a pattern like fast, but rather than it playing multiple times as fast would it instead leaves a gap in the remaining space of the cycle. For example, the following will play the sound pattern "bd sn" only once but compressed into the first half of the cycle, i.e. twice as fast.

**Example:**

```
s("bd sd").fastGap(2)
```

### fastGap

**Synonyms:** `fastgap`

speeds up a pattern like fast, but rather than it playing multiple times as fast would it instead leaves a gap in the remaining space of the cycle. For example, the following will play the sound pattern "bd sn" only once but compressed into the first half of the cycle, i.e. twice as fast.

**Example:**

```
s("bd sd").fastGap(2)
```

### filter

Filters haps using the given function

**Example:**

```
s("hh!7 oh").filter(hap => hap.value.s==='hh')
```

### filterHaps

Returns a new Pattern, which only returns haps that meet the given test.

### filterValues

As with `filterHaps`, but the function is applied to values
inside haps.

### filterWhen

Filters haps by their begin time

### findPeaks

Find peaks in spectrum magnitudes

### firstCycle

Queries the pattern for the first cycle, returning Haps. Mainly of use when
debugging a pattern.

### firstCycleValues

Accessor for a list of values returned by querying the first cycle.

### firstOf

Applies the given function every n cycles, starting from the first cycle.

**Example:**

```
note("c3 d3 e3 g3").firstOf(4, x=>x.rev())
```

### fit

Makes the sample fit its event duration. Good for rhythmical loops like drum breaks.
Similar to `loopAt`.

**Example:**

```
samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })
s("rhodes/2").fit()
```

### floor

Assumes a numerical pattern. Returns a new pattern with all values set to
their mathematical floor. E.g. `3.7` replaced with to `3`, and `-4.2`
replaced with `-5`.

**Example:**

```
note("42 42.1 42.5 43".floor())
```

### fm

**Synonyms:** `fmi`

Sets the Frequency Modulation of the synth.
Controls the modulation index, which defines the brightness of the sound.

**Example:**

```
note("c e g b g e")
.fm("<0 1 2 8 32>")
._scope()
```

### fmap

**Synonyms:** `withValue`

Returns a new pattern, with the function applied to the value of
each hap. It has the alias `fmap`.

**Example:**

```
"0 1 2".withValue(v => v + 10).log()
```

### fmap

see `withValue`

### fmattack

Attack time for the FM envelope: time it takes to reach maximum modulation

**Example:**

```
note("c e g b g e")
.fm(4)
.fmattack("<0 .05 .1 .2>")
._scope()
```

### fmdecay

Decay time for the FM envelope: seconds until the sustain level is reached after the attack phase.

**Example:**

```
note("c e g b g e")
.fm(4)
.fmdecay("<.01 .05 .1 .2>")
.fmsustain(.4)
._scope()
```

### fmenv

Ramp type of fm envelope. Exp might be a bit broken..

**Example:**

```
note("c e g b g e")
.fm(4)
.fmdecay(.2)
.fmsustain(0)
.fmenv("<exp lin>")
._scope()
```

### fmh

Sets the Frequency Modulation Harmonicity Ratio.
Controls the timbre of the sound.
Whole numbers and simple ratios sound more natural,
while decimal numbers and complex ratios sound metallic.

**Example:**

```
note("c e g b g e")
.fm(4)
.fmh("<1 2 1.5 1.61>")
._scope()
```

### fmi

**Synonyms:** `fm`

Sets the Frequency Modulation of the synth.
Controls the modulation index, which defines the brightness of the sound.

**Example:**

```
note("c e g b g e")
.fm("<0 1 2 8 32>")
._scope()
```

### fmsustain

Sustain level for the FM envelope: how much modulation is applied after the decay phase

**Example:**

```
note("c e g b g e")
.fm(4)
.fmdecay(.1)
.fmsustain("<1 .75 .5 0>")
._scope()
```

### fmwave

Waveform of the fm modulator

**Example:**

```
n("0 1 2 3".fast(4)).scale("d:minor").s("sine").fmwave("<sine square sawtooth crackle>").fm(4).fmh(2.01)
```

**Example:**

```
n("0 1 2 3".fast(4)).chord("<Dm Am F G>").voicing().s("sawtooth").fmwave("brown").fm(.6)
```

### focus

Similar to `compress`, but doesn't leave gaps, and the 'focus' can be bigger than a cycle

**Example:**

```
s("bd hh sd hh").focus(1/4, 3/4)
```

### freq

Set frequency of sound.

**Example:**

```
freq("220 110 440 110").s("superzow").osc()
```

**Example:**

```
freq("110".mul.out(".5 1.5 .6 [2 3]")).s("superzow").osc()
```

### fromBipolar

Assumes a numerical pattern, containing bipolar values in the range -1 .. 1
Returns a new pattern with values scaled to the unipolar range 0 .. 1

### fscope

Renders an oscilloscope for the frequency domain of the audio signal.

**Example:**

```
s("sawtooth").fscope()
```

### ftype

Sets the filter type. The ladder filter is more aggressive. More types might be added in the future.

**Example:**

```
note("{f g g c d a a#}%8").s("sawtooth").lpenv(4).lpf(500).ftype("<0 1 2>").lpq(1)
```

**Example:**

```
note("c f g g a c d4").fast(2)
.sound('sawtooth')
.lpf(200).fanchor(0)
.lpenv(3).lpq(1)
.ftype("<ladder 12db 24db>")
```

### gain

Controls the gain by an exponential amount.

**Example:**

```
s("hh*8").gain(".4!2 1 .4!2 1 .4 1").fast(2)
```

### gap

Does absolutely nothing, but with a given metrical 'steps'

**Example:**

```
gap(3) // "~@3"
```

### generateGraph

Creates a canvas element showing a graph of the given data.

### generateReverb

Generates a reverb impulse response.

### gravityX

**Synonyms:** `gravX`

The device's gravity x-axis value ranges from 0 to 1.

**Example:**

```
n(gravityX.segment(4).range(0,7)).scale("C:minor")
```

### gravityY

**Synonyms:** `gravY`

The device's gravity y-axis value ranges from 0 to 1.

**Example:**

```
n(gravityY.segment(4).range(0,7)).scale("C:minor")
```

### gravityZ

**Synonyms:** `gravZ`

The device's gravity z-axis value ranges from 0 to 1.

**Example:**

```
n(gravityZ.segment(4).range(0,7)).scale("C:minor")
```

### gravX

**Synonyms:** `gravityX`

The device's gravity x-axis value ranges from 0 to 1.

**Example:**

```
n(gravityX.segment(4).range(0,7)).scale("C:minor")
```

### gravY

**Synonyms:** `gravityY`

The device's gravity y-axis value ranges from 0 to 1.

**Example:**

```
n(gravityY.segment(4).range(0,7)).scale("C:minor")
```

### gravZ

**Synonyms:** `gravityZ`

The device's gravity z-axis value ranges from 0 to 1.

**Example:**

```
n(gravityZ.segment(4).range(0,7)).scale("C:minor")
```

### grow

*Experimental*

Progressively grows the pattern by 'n' steps until the full pattern is played, or if a second value is given (using mininotation list syntax with `:`),
that number of times.
A positive number will progressively grow steps from the start of a pattern, and a negative number from the end.

**Example:**

```
"tha dhi thom nam".grow("1").sound()
.bank("mridangam")
```

**Example:**

```
"tha dhi thom nam".grow("-1").sound()
.bank("mridangam")
```

**Example:**

```
"tha dhi thom nam".grow("1 -1").sound().bank("mridangam").pace(4)
```

**Example:**

```
note("0 1 2 3 4 5 6 7".scale("C:ritusen")).sound("folkharp")
   .grow("1 -1").pace(8)
```

### handleOutputBuffersToRetrieve

Add contents of output buffers just processed to output buffers

### hcutoff

**Synonyms:** `hpf, hp`

Applies the cutoff frequency of the **h**igh-**p**ass **f**ilter.

When using mininotation, you can also optionally add the 'hpq' parameter, separated by ':'.

**Example:**

```
s("bd sd [~ bd] sd,hh*8").hpf("<4000 2000 1000 500 200 100>")
```

**Example:**

```
s("bd sd [~ bd] sd,hh*8").hpf("<2000 2000:25>")
```

### hp

**Synonyms:** `hpf, hcutoff`

Applies the cutoff frequency of the **h**igh-**p**ass **f**ilter.

When using mininotation, you can also optionally add the 'hpq' parameter, separated by ':'.

**Example:**

```
s("bd sd [~ bd] sd,hh*8").hpf("<4000 2000 1000 500 200 100>")
```

**Example:**

```
s("bd sd [~ bd] sd,hh*8").hpf("<2000 2000:25>")
```

### hpa

**Synonyms:** `hpattack`

Sets the attack duration for the highpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.hpf(500)
.hpa("<.5 .25 .1 .01>/4")
.hpenv(4)
```

### hpattack

**Synonyms:** `hpa`

Sets the attack duration for the highpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.hpf(500)
.hpa("<.5 .25 .1 .01>/4")
.hpenv(4)
```

### hpd

**Synonyms:** `hpdecay`

Sets the decay duration for the highpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.hpf(500)
.hpd("<.5 .25 .1 0>/4")
.hps(0.2)
.hpenv(4)
```

### hpdecay

**Synonyms:** `hpd`

Sets the decay duration for the highpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.hpf(500)
.hpd("<.5 .25 .1 0>/4")
.hps(0.2)
.hpenv(4)
```

### hpe

**Synonyms:** `hpenv`

Sets the highpass filter envelope modulation depth.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.hpf(500)
.hpa(.5)
.hpenv("<4 2 1 0 -1 -2 -4>/4")
```

### hpenv

**Synonyms:** `hpe`

Sets the highpass filter envelope modulation depth.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.hpf(500)
.hpa(.5)
.hpenv("<4 2 1 0 -1 -2 -4>/4")
```

### hpf

**Synonyms:** `hp, hcutoff`

Applies the cutoff frequency of the **h**igh-**p**ass **f**ilter.

When using mininotation, you can also optionally add the 'hpq' parameter, separated by ':'.

**Example:**

```
s("bd sd [~ bd] sd,hh*8").hpf("<4000 2000 1000 500 200 100>")
```

**Example:**

```
s("bd sd [~ bd] sd,hh*8").hpf("<2000 2000:25>")
```

### hpq

**Synonyms:** `hresonance`

Controls the **h**igh-**p**ass **q**-value.

**Example:**

```
s("bd sd [~ bd] sd,hh*8").hpf(2000).hpq("<0 10 20 30>")
```

### hpr

**Synonyms:** `hprelease`

Sets the release time for the highpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.clip(.5)
.hpf(500)
.hpenv(4)
.hpr("<.5 .25 .1 0>/4")
.release(.5)
```

### hprelease

**Synonyms:** `hpr`

Sets the release time for the highpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.clip(.5)
.hpf(500)
.hpenv(4)
.hpr("<.5 .25 .1 0>/4")
.release(.5)
```

### hps

**Synonyms:** `hpsustain`

Sets the sustain amplitude for the highpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.hpf(500)
.hpd(.5)
.hps("<0 .25 .5 1>/4")
.hpenv(4)
```

### hpsustain

**Synonyms:** `hps`

Sets the sustain amplitude for the highpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.hpf(500)
.hpd(.5)
.hps("<0 .25 .5 1>/4")
.hpenv(4)
```

### hresonance

**Synonyms:** `hpq`

Controls the **h**igh-**p**ass **q**-value.

**Example:**

```
s("bd sd [~ bd] sd,hh*8").hpf(2000).hpq("<0 10 20 30>")
```

### hurry

Both speeds up the pattern (like 'fast') and the sample playback (like 'speed').

**Example:**

```
s("bd sd:2").hurry("<1 2 4 3>").slow(1.5)
```

### hush

Silences a pattern.

**Example:**

```
stack(
  s("bd").hush(),
  s("hh*3")
)
```

### inhabit

**Synonyms:** `pickSqueeze`

Picks patterns (or plain values) either from a list (by index) or a lookup table (by name).
Similar to `pick`, but cycles are squeezed into the target ('inhabited') pattern.

**Example:**

```
"<a b [a,b]>".inhabit({a: s("bd(3,8)"),
                            b: s("cp sd")
                           })
```

**Example:**

```
s("a@2 [a b] a".inhabit({a: "bd(3,8)", b: "sd sd"})).slow(4)
```

### inhabitmod

**Synonyms:** `pickmodSqueeze`

The same as `inhabit`, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.
For example, if you pick the fifth pattern of a list of three, you'll get the
second one.

### inside

Carries out an operation 'inside' a cycle.

**Example:**

```
"0 1 2 3 4 3 2 1".inside(4, rev).scale('C major').note()
// "0 1 2 3 4 3 2 1".slow(4).rev().fast(4).scale('C major').note()
```

### into

Breaks a pattern into pieces according to the structure of a given pattern.
True values in the given pattern cause the corresponding subcycle of the
source pattern to be looped, and for an (optional) given function to be
applied. False values result in the corresponding part of the source pattern
to be played unchanged.

**Example:**

```
sound("bd sd ht lt").into("1 0", hurry(2))
```

### inv

**Synonyms:** `invert`

Swaps 1s and 0s in a binary pattern.

**Example:**

```
s("bd").struct("1 0 0 1 0 0 1 0".lastOf(4, invert))
```

### invert

**Synonyms:** `inv`

Swaps 1s and 0s in a binary pattern.

**Example:**

```
s("bd").struct("1 0 0 1 0 0 1 0".lastOf(4, invert))
```

### ir

**Synonyms:** `iresponse`

Sets the sample to use as an impulse response for the reverb.

**Example:**

```
s("bd sd [~ bd] sd").room(.8).ir("<shaker_large:0 shaker_large:2>")
```

### irand

A continuous pattern of random integers, between 0 and n-1.

**Example:**

```
// randomly select scale notes from 0 - 7 (= C to C)
n(irand(8)).struct("x x*2 x x*3").scale("C:minor")
```

### irbegin

**Synonyms:** `ir`

Sets the beginning of the IR response sample

**Example:**

```
samples('github:switchangel/pad')
$: s("brk/2").fit().scrub(irand(16).div(16).seg(8)).ir("swpad:4").room(.65).irspeed("-2").irbegin("<0 .5 .75>/2").roomsize(.6)
```

### iresponse

**Synonyms:** `ir`

Sets the sample to use as an impulse response for the reverb.

**Example:**

```
s("bd sd [~ bd] sd").room(.8).ir("<shaker_large:0 shaker_large:2>")
```

### irspeed

Sets speed of the sample for the impulse response.

**Example:**

```
samples('github:switchangel/pad')
$: s("brk/2").fit().scrub(irand(16).div(16).seg(8)).ir("swpad:4").room(.2).irspeed("<2 1 .5>/2").irbegin(.5).roomsize(.5)
```

### isaw

A sawtooth signal between 1 and 0 (like `saw`, but flipped).

**Example:**

```
note("<c3 [eb3,g3] g2 [g3,bb3]>*8")
.clip(isaw.slow(2))
```

**Example:**

```
n(isaw.range(0,8).segment(8))
.scale('C major')
```

### isaw2

A sawtooth signal between 1 and -1 (like `saw2`, but flipped).

### iter

Divides a pattern into a given number of subdivisions, plays the subdivisions in order, but increments the starting subdivision each cycle. The pattern wraps to the first subdivision after the last subdivision is played.

**Example:**

```
note("0 1 2 3".scale('A minor')).iter(4)
```

### iterback

**Synonyms:** `iterBack`

Like `iter`, but plays the subdivisions in reverse order. Known as iter' in tidalcycles

**Example:**

```
note("0 1 2 3".scale('A minor')).iterBack(4)
```

### iterBack

**Synonyms:** `iterback`

Like `iter`, but plays the subdivisions in reverse order. Known as iter' in tidalcycles

**Example:**

```
note("0 1 2 3".scale('A minor')).iterBack(4)
```

### itri

An inverted triangle signal between 1 and 0 (like `tri`, but flipped).

**Example:**

```
n(itri.segment(8).range(0,7)).scale("C:minor")
```

### itri2

An inverted triangle signal between -1 and 1 (like `itri`, but bipolar).

### jux

The jux function creates strange stereo effects, by applying a function to a pattern, but only in the right-hand channel.

**Example:**

```
s("bd lt [~ ht] mt cp ~ bd hh").jux(rev)
```

**Example:**

```
s("bd lt [~ ht] mt cp ~ bd hh").jux(press)
```

**Example:**

```
s("bd lt [~ ht] mt cp ~ bd hh").jux(iter(4))
```

### juxby

**Synonyms:** `juxBy`

Jux with adjustable stereo width. 0 = mono, 1 = full stereo.

**Example:**

```
s("bd lt [~ ht] mt cp ~ bd hh").juxBy("<0 .5 1>/2", rev)
```

### juxBy

**Synonyms:** `juxby`

Jux with adjustable stereo width. 0 = mono, 1 = full stereo.

**Example:**

```
s("bd lt [~ ht] mt cp ~ bd hh").juxBy("<0 .5 1>/2", rev)
```

### keyDown

returns true when a key or array of keys is held
Key name reference

**Example:**

```
keyDown("Control:j").pick([s("bd(5,8)"), s("cp(3,8)")])
```

### label

Sets the displayed text for an event on the pianoroll

### lastOf

Applies the given function every n cycles, starting from the last cycle.

**Example:**

```
note("c3 d3 e3 g3").lastOf(4, x=>x.rev())
```

### late

Nudge a pattern to start later in time. Equivalent of Tidal's ~> operator

**Example:**

```
"bd ~".stack("hh ~".late(.1)).s()
```

### layer

**Synonyms:** `apply`

Layers the result of the given function(s). Like `superimpose`, but without the original pattern:

**Example:**

```
"<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
  .layer(x=>x.add("0,2"))
  .scale('C minor').note()
```

### legato

**Synonyms:** `clip`

Multiplies the duration with the given number. Also cuts samples off at the end if they exceed the duration.

**Example:**

```
note("c a f e").s("piano").clip("<.5 1 2>")
```

### leslie

Emulation of a Leslie speaker: speakers rotating in a wooden amplified cabinet.

**Example:**

```
n("0,4,7").s("supersquare").leslie("<0 .4 .6 1>").osc()
```

### linger

Selects the given fraction of the pattern and repeats that part to fill the remainder of the cycle.

**Example:**

```
s("lt ht mt cp, [hh oh]*2").linger("<1 .5 .25 .125>")
```

### lock

Specifies whether delaytime is calculated relative to cps.

**Example:**

```
s("sd").delay().lock(1).osc()
```

### log

Writes the content of the current event to the console (visible in the side menu).

**Example:**

```
s("bd sd").log()
```

### logValues

A simplified version of `log` which writes all "values" (various configurable parameters)
within the event to the console (visible in the side menu).

**Example:**

```
s("bd sd").gain("0.25 0.5 1").n("2 1 0").logValues()
```

### loop

Loops the sample.
Note that the tempo of the loop is not synced with the cycle tempo.
To change the loop region, use loopBegin / loopEnd.

**Example:**

```
s("casio").loop(1)
```

### loopAt

Makes the sample fit the given number of cycles by changing the speed.

**Example:**

```
samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })
s("rhodes").loopAt(2)
```

### loopAtCps

Makes the sample fit the given number of cycles and cps value, by
changing the speed. Please note that at some point cps will be
given by a global clock and this function will be
deprecated/removed.

**Example:**

```
samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })
s("rhodes").loopAtCps(4,1.5).cps(1.5)
```

### loopb

**Synonyms:** `loopBegin`

Begin to loop at a specific point in the sample (inbetween `begin` and `end`).
Note that the loop point must be inbetween `begin` and `end`, and before `loopEnd`!
Note: Samples starting with wt_ will automatically loop! (wt = wavetable)

**Example:**

```
s("space").loop(1)
.loopBegin("<0 .125 .25>")._scope()
```

### loopBegin

**Synonyms:** `loopb`

Begin to loop at a specific point in the sample (inbetween `begin` and `end`).
Note that the loop point must be inbetween `begin` and `end`, and before `loopEnd`!
Note: Samples starting with wt_ will automatically loop! (wt = wavetable)

**Example:**

```
s("space").loop(1)
.loopBegin("<0 .125 .25>")._scope()
```

### loope

**Synonyms:** `loopEnd`

End the looping section at a specific point in the sample (inbetween `begin` and `end`).
Note that the loop point must be inbetween `begin` and `end`, and after `loopBegin`!

**Example:**

```
s("space").loop(1)
.loopEnd("<1 .75 .5 .25>")._scope()
```

### loopEnd

**Synonyms:** `loope`

End the looping section at a specific point in the sample (inbetween `begin` and `end`).
Note that the loop point must be inbetween `begin` and `end`, and after `loopBegin`!

**Example:**

```
s("space").loop(1)
.loopEnd("<1 .75 .5 .25>")._scope()
```

### lp

**Synonyms:** `lpf, cutoff, ctf`

Applies the cutoff frequency of the **l**ow-**p**ass **f**ilter.

When using mininotation, you can also optionally add the 'lpq' parameter, separated by ':'.

**Example:**

```
s("bd sd [~ bd] sd,hh*6").lpf("<4000 2000 1000 500 200 100>")
```

**Example:**

```
s("bd*16").lpf("1000:0 1000:10 1000:20 1000:30")
```

### lpa

**Synonyms:** `lpattack`

Sets the attack duration for the lowpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpa("<.5 .25 .1 .01>/4")
.lpenv(4)
```

### lpattack

**Synonyms:** `lpa`

Sets the attack duration for the lowpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpa("<.5 .25 .1 .01>/4")
.lpenv(4)
```

### lpd

**Synonyms:** `lpdecay`

Sets the decay duration for the lowpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpd("<.5 .25 .1 0>/4")
.lpenv(4)
```

### lpdecay

**Synonyms:** `lpd`

Sets the decay duration for the lowpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpd("<.5 .25 .1 0>/4")
.lpenv(4)
```

### lpe

**Synonyms:** `lpenv`

Sets the lowpass filter envelope modulation depth.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpa(.5)
.lpenv("<4 2 1 0 -1 -2 -4>/4")
```

### lpenv

**Synonyms:** `lpe`

Sets the lowpass filter envelope modulation depth.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpa(.5)
.lpenv("<4 2 1 0 -1 -2 -4>/4")
```

### lpf

**Synonyms:** `cutoff, ctf, lp`

Applies the cutoff frequency of the **l**ow-**p**ass **f**ilter.

When using mininotation, you can also optionally add the 'lpq' parameter, separated by ':'.

**Example:**

```
s("bd sd [~ bd] sd,hh*6").lpf("<4000 2000 1000 500 200 100>")
```

**Example:**

```
s("bd*16").lpf("1000:0 1000:10 1000:20 1000:30")
```

### lpq

**Synonyms:** `resonance`

Controls the **l**ow-**p**ass **q**-value.

**Example:**

```
s("bd sd [~ bd] sd,hh*8").lpf(2000).lpq("<0 10 20 30>")
```

### lpr

**Synonyms:** `lprelease`

Sets the release time for the lowpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.clip(.5)
.lpf(300)
.lpenv(4)
.lpr("<.5 .25 .1 0>/4")
.release(.5)
```

### lprelease

**Synonyms:** `lpr`

Sets the release time for the lowpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.clip(.5)
.lpf(300)
.lpenv(4)
.lpr("<.5 .25 .1 0>/4")
.release(.5)
```

### lps

**Synonyms:** `lpsustain`

Sets the sustain amplitude for the lowpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpd(.5)
.lps("<0 .25 .5 1>/4")
.lpenv(4)
```

### lpsustain

**Synonyms:** `lps`

Sets the sustain amplitude for the lowpass filter envelope.

**Example:**

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpd(.5)
.lps("<0 .25 .5 1>/4")
.lpenv(4)
```

### lrate

Rate of modulation / rotation for leslie effect

**Example:**

```
n("0,4,7").s("supersquare").leslie(1).lrate("<1 2 4 8>").osc()
```

### lsize

Physical size of the cabinet in meters. Be careful, it might be slightly larger than your computer. Affects the Doppler amount (pitch warble)

**Example:**

```
n("0,4,7").s("supersquare").leslie(1).lrate(2).lsize("<.1 .5 1>").osc()
```

### markcss

Overrides the css of highlighted events. Make sure to use single quotes!

**Example:**

```
note("c a f e")
.markcss('text-decoration:underline')
```

### mask

Returns silence when mask is 0 or "~"

**Example:**

```
note("c [eb,g] d [eb,g]").mask("<1 [0 1]>")
```

### midi

MIDI output: Opens a MIDI output port.

**Example:**

```
note("c4").midichan(1).midi('IAC Driver Bus 1')
```

**Example:**

```
note("c4").midichan(1).midi('IAC Driver Bus 1', { controller: true, latency: 50 })
```

### midibend

MIDI pitch bend: Sends a MIDI pitch bend message.

**Example:**

```
note("c4").midibend(sine.slow(4).range(-0.4,0.4)).midi()
```

### midichan

MIDI channel: Sets the MIDI channel for the event.

**Example:**

```
note("c4").midichan(1).midi()
```

### midicmd

MIDI command: Sends a MIDI command message.

**Example:**

```
midicmd("clock*48,<start stop>/2").midi()
```

### midimaps

Adds midimaps to the registry. Inside each midimap, control names (e.g. lpf) are mapped to cc numbers.

**Example:**

```
midimaps({ mymap: { lpf: 74 } })
$: note("c a f e")
.lpf(sine.slow(4))
.midimap('mymap')
.midi()
```

**Example:**

```
midimaps({ mymap: {
  lpf: { ccn: 74, min: 0, max: 20000, exp: 0.5 }
}})
$: note("c a f e")
.lpf(sine.slow(2).range(400,2000))
.midimap('mymap')
.midi()
```

### midin

MIDI input: Opens a MIDI input port to receive MIDI control change messages.

**Example:**

```
let cc = await midin('IAC Driver Bus 1')
note("c a f e").lpf(cc(0).range(0, 1000)).lpq(cc(1).range(0, 10)).sound("sawtooth")
```

### midiport

MIDI port: Sets the MIDI port for the event.

**Example:**

```
note("c a f e").midiport("<0 1 2 3>").midi()
```

### miditouch

MIDI key after touch: Sends a MIDI key after touch message.

**Example:**

```
note("c4").miditouch(sine.slow(4).range(0,1)).midi()
```

### morph

Takes two binary rhythms represented as lists of 1s and 0s, and a number
between 0 and 1 that morphs between them. The two lists should contain the same
number of true values.

**Example:**

```
sound("hh").struct(morph([1,0,1,0,1,0,1,0], // straight rhythm
                         [1,1,0,1,0,1,0], // wonky rhythm
                         0.25 // creates a slightly wonky rhythm
                        )
                  )
```

**Example:**

```
sound("hh").struct(morph("1:0:1:0:1:0:1:0", // straight rhythm
                         "1:1:0:1:0:1:0", // wonky rhythm
                         sine.slow(8) // slowly morph between the rhythms
                        )
                  )
```

### mousex

The mouse's x position value ranges from 0 to 1.

**Example:**

```
n(mousex.segment(4).range(0,7)).scale("C:minor")
```

### mousey

The mouse's y position value ranges from 0 to 1.

**Example:**

```
n(mousey.segment(4).range(0,7)).scale("C:minor")
```

### mul

Multiplies each number by the given factor.

**Example:**

```
"<1 1.5 [1.66, <2 2.33>]>*4".mul(150).freq()
```

### n

Selects the given index from the sample map.
Numbers too high will wrap around.
`n` can also be used to play midi numbers, but it is recommended to use `note` instead.

**Example:**

```
s("bd sd [~ bd] sd,hh*6").n("<0 1>")
```

### never

Shorthand for `.sometimesBy(0, fn)` (never calls fn)

**Example:**

```
s("hh*8").never(x=>x.speed("0.5"))
```

### noise

Adds pink noise to the mix

**Example:**

```
sound("<white pink brown>/2")
```

### note

Plays the given note name or midi number. A note name consists of

- a letter (a-g or A-G)
- optional accidentals (b or #)
- optional (possibly negative) octave number (0-9). Defaults to 3

Examples of valid note names: `c`, `bb`, `Bb`, `f#`, `c3`, `A4`, `Eb2`, `c#5`

You can also use midi numbers instead of note names, where 69 is mapped to A4 440Hz in 12EDO.

**Example:**

```
note("c a f e")
```

**Example:**

```
note("c4 a4 f4 e4")
```

**Example:**

```
note("60 69 65 64")
```

**Example:**

```
note("fbb1 a#0 cbbb-1 e##-2").sound("saw")
```

### nrpnn

MIDI NRPN non-registered parameter number: Sends a MIDI NRPN non-registered parameter number message.

**Example:**

```
note("c4").nrpnn("1:8").nrpv("123").midichan(1).midi()
```

### nrpv

MIDI NRPN non-registered parameter value: Sends a MIDI NRPN non-registered parameter value message.

**Example:**

```
note("c4").nrpnn("1:8").nrpv("123").midichan(1).midi()
```

### octave

Sets the default octave of a synth.

**Example:**

```
n("0,4,7").s('supersquare').octave("<3 4 5 6>").osc()
```

### off

Superimposes the function result on top of the original pattern, delayed by the given time.

**Example:**

```
"c3 eb3 g3".off(1/8, x=>x.add(7)).note()
```

### often

Shorthand for `.sometimesBy(0.75, fn)`

**Example:**

```
s("hh*8").often(x=>x.speed("0.5"))
```

### onsetsOnly

Returns a new pattern, with all haps without onsets filtered out. A hap
with an onset is one with a `whole` timespan that begins at the same time
as its `part` timespan.

### onTriggerTime

make something happen on event time
uses browser timeout which is innacurate for audio tasks

**Example:**

```
s("bd!8").onTriggerTime((hap) => {console.log(hap)})
```

### orbit

An `orbit` is a global parameter context for patterns. Patterns with the same orbit will share the same global effects.

**Example:**

```
stack(
  s("hh*6").delay(.5).delaytime(.25).orbit(1),
  s("~ sd ~ sd").delay(.5).delaytime(.125).orbit(2)
)
```

### oriA

**Synonyms:** `orientationAlpha, oriZ, orientationZ`

The device's orientation alpha value ranges from 0 to 1.

**Example:**

```
n(orientationAlpha.segment(4).range(0,7)).scale("C:minor")
```

### oriB

**Synonyms:** `orientationBeta, oriX, orientationX`

The device's orientation beta value ranges from 0 to 1.

**Example:**

```
n(orientationBeta.segment(4).range(0,7)).scale("C:minor")
```

### orientationAlpha

**Synonyms:** `oriA, oriZ, orientationZ`

The device's orientation alpha value ranges from 0 to 1.

**Example:**

```
n(orientationAlpha.segment(4).range(0,7)).scale("C:minor")
```

### orientationBeta

**Synonyms:** `oriB, oriX, orientationX`

The device's orientation beta value ranges from 0 to 1.

**Example:**

```
n(orientationBeta.segment(4).range(0,7)).scale("C:minor")
```

### orientationGamma

**Synonyms:** `oriG, oriY, orientationY`

The device's orientation gamma value ranges from 0 to 1.

**Example:**

```
n(orientationGamma.segment(4).range(0,7)).scale("C:minor")
```

### orientationX

**Synonyms:** `orientationBeta, oriB, oriX`

The device's orientation beta value ranges from 0 to 1.

**Example:**

```
n(orientationBeta.segment(4).range(0,7)).scale("C:minor")
```

### orientationY

**Synonyms:** `orientationGamma, oriG, oriY`

The device's orientation gamma value ranges from 0 to 1.

**Example:**

```
n(orientationGamma.segment(4).range(0,7)).scale("C:minor")
```

### orientationZ

**Synonyms:** `orientationAlpha, oriA, oriZ`

The device's orientation alpha value ranges from 0 to 1.

**Example:**

```
n(orientationAlpha.segment(4).range(0,7)).scale("C:minor")
```

### oriG

**Synonyms:** `orientationGamma, oriY, orientationY`

The device's orientation gamma value ranges from 0 to 1.

**Example:**

```
n(orientationGamma.segment(4).range(0,7)).scale("C:minor")
```

### oriX

**Synonyms:** `orientationBeta, oriB, orientationX`

The device's orientation beta value ranges from 0 to 1.

**Example:**

```
n(orientationBeta.segment(4).range(0,7)).scale("C:minor")
```

### oriY

**Synonyms:** `orientationGamma, oriG, orientationY`

The device's orientation gamma value ranges from 0 to 1.

**Example:**

```
n(orientationGamma.segment(4).range(0,7)).scale("C:minor")
```

### oriZ

**Synonyms:** `orientationAlpha, oriA, orientationZ`

The device's orientation alpha value ranges from 0 to 1.

**Example:**

```
n(orientationAlpha.segment(4).range(0,7)).scale("C:minor")
```

### osc

Sends each hap as an OSC message, which can be picked up by SuperCollider or any other OSC-enabled software.
For more info, read MIDI & OSC in the docs

### outside

Carries out an operation 'outside' a cycle.

**Example:**

```
"<[0 1] 2 [3 4] 5>".outside(4, rev).scale('C major').note()
// "<[0 1] 2 [3 4] 5>".fast(4).rev().slow(4).scale('C major').note()
```

### pace

*Experimental*

Speeds a pattern up or down, to fit to the given number of steps per cycle.

**Example:**

```
sound("bd sd cp").pace(4)
// The same as sound("{bd sd cp}%4") or sound("<bd sd cp>*4")
```

### palindrome

Applies `rev` to a pattern every other cycle, so that the pattern alternates between forwards and backwards.

**Example:**

```
note("c d e g").palindrome()
```

### pan

Sets position in stereo.

**Example:**

```
s("[bd hh]*2").pan("<.5 1 .5 0>")
```

**Example:**

```
s("bd rim sd rim bd ~ cp rim").pan(sine.slow(2))
```

### panchor

**Example:**

```
note("c c4").penv(12).panchor("<0 .5 1 .5>")
```

### patt

**Synonyms:** `pattack`

Attack time of pitch envelope.

**Example:**

```
note("c eb g bb").pattack("0 .1 .25 .5").slow(2)
```

### pattack

**Synonyms:** `patt`

Attack time of pitch envelope.

**Example:**

```
note("c eb g bb").pattack("0 .1 .25 .5").slow(2)
```

### Pattern

Create a pattern. As an end user, you will most likely not create a Pattern directly.

### pcurve

Curve of envelope. Defaults to linear. exponential is good for kicks

**Example:**

```
note("g1*4")
.s("sine").pdec(.5)
.penv(32)
.pcurve("<0 1>")
```

### pdec

**Synonyms:** `pdecay`

Decay time of pitch envelope.

**Example:**

```
note("<c eb g bb>").pdecay("<0 .1 .25 .5>")
```

### pdecay

**Synonyms:** `pdec`

Decay time of pitch envelope.

**Example:**

```
note("<c eb g bb>").pdecay("<0 .1 .25 .5>")
```

### penv

Amount of pitch envelope. Negative values will flip the envelope.
If you don't set other pitch envelope controls, `pattack:.2` will be the default.

**Example:**

```
note("c")
.penv("<12 7 1 .5 0 -1 -7 -12>")
```

### perlin

Generates a continuous pattern of perlin noise, in the range 0..1.

**Example:**

```
// randomly change the cutoff
s("bd*4,hh*8").cutoff(perlin.range(500,8000))
```

### ph

**Synonyms:** `phaser`

Phaser audio effect that approximates popular guitar pedals.

**Example:**

```
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser("<1 2 4 8>")
```

### phasdp

**Synonyms:** `phaserdepth, phd`

The amount the signal is affected by the phaser effect. Defaults to 0.75

**Example:**

```
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phaserdepth("<0 .5 .75 1>")
```

### phaser

**Synonyms:** `ph`

Phaser audio effect that approximates popular guitar pedals.

**Example:**

```
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser("<1 2 4 8>")
```

### phasercenter

**Synonyms:** `phc`

The center frequency of the phaser in HZ. Defaults to 1000

**Example:**

```
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phasercenter("<800 2000 4000>")
```

### phaserdepth

**Synonyms:** `phd, phasdp`

The amount the signal is affected by the phaser effect. Defaults to 0.75

**Example:**

```
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phaserdepth("<0 .5 .75 1>")
```

### phasersweep

**Synonyms:** `phs`

The frequency sweep range of the lfo for the phaser effect. Defaults to 2000

**Example:**

```
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phasersweep("<800 2000 4000>")
```

### phc

**Synonyms:** `phasercenter`

The center frequency of the phaser in HZ. Defaults to 1000

**Example:**

```
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phasercenter("<800 2000 4000>")
```

### phd

**Synonyms:** `phaserdepth, phasdp`

The amount the signal is affected by the phaser effect. Defaults to 0.75

**Example:**

```
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phaserdepth("<0 .5 .75 1>")
```

### phs

**Synonyms:** `phasersweep`

The frequency sweep range of the lfo for the phaser effect. Defaults to 2000

**Example:**

```
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phasersweep("<800 2000 4000>")
```

### pianoroll

**Synonyms:** `punchcard`

Visualises a pattern as a scrolling 'pianoroll', displayed in the background of the editor. To show a pianoroll for all running patterns, use `all(pianoroll)`. To have a pianoroll appear below
a pattern instead, prefix with `_`, e.g.: `sound("bd sd")._pianoroll()`.

**Example:**

```
note("c2 a2 eb2")
.euclid(5,8)
.s('sawtooth')
.lpenv(4).lpf(300)
.pianoroll({ labels: 1 })
```

### pick

Picks patterns (or plain values) either from a list (by index) or a lookup table (by name).
Similar to `inhabit`, but maintains the structure of the original patterns.

**Example:**

```
note("<0 1 2!2 3>".pick(["g a", "e f", "f g f g" , "g c d"]))
```

**Example:**

```
sound("<0 1 [2,0]>".pick(["bd sd", "cp cp", "hh hh"]))
```

**Example:**

```
sound("<0!2 [0,1] 1>".pick(["bd(3,8)", "sd sd"]))
```

**Example:**

```
s("<a!2 [a,b] b>".pick({a: "bd(3,8)", b: "sd sd"}))
```

### pickF

pickF lets you use a pattern of numbers to pick which function to apply to another pattern.

**Example:**

```
s("bd [rim hh]").pickF("<0 1 2>", [rev,jux(rev),fast(2)])
```

**Example:**

```
note("<c2 d2>(3,8)").s("square")
    .pickF("<0 2> 1", [jux(rev),fast(2),x=>x.lpf(800)])
```

### pickmod

The same as `pick`, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.
For example, if you pick the fifth pattern of a list of three, you'll get the
second one.

### pickmodF

The same as `pickF`, but if you pick a number greater than the size of the functions list,
it wraps around, rather than sticking at the maximum value.

### pickmodOut

The same as `pickOut`, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.

### pickmodReset

The same as `pickReset`, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.

### pickmodRestart

The same as `pickRestart`, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.

**Example:**

```
"<a@2 b@2 c@2 d@2>".pickRestart({
        a: n("0 1 2 0"),
        b: n("2 3 4 ~"),
        c: n("[4 5] [4 3] 2 0"),
        d: n("0 -3 0 ~")
      }).scale("C:major").s("piano")
```

### pickmodSqueeze

**Synonyms:** `inhabitmod`

The same as `inhabit`, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.
For example, if you pick the fifth pattern of a list of three, you'll get the
second one.

### pickOut

Similar to `pick`, but it applies an outerJoin instead of an innerJoin.

### pickReset

Similar to `pick`, but the choosen pattern is reset when its index is triggered.

### pickRestart

Similar to `pick`, but the choosen pattern is restarted when its index is triggered.

### pickSqueeze

**Synonyms:** `inhabit`

Picks patterns (or plain values) either from a list (by index) or a lookup table (by name).
Similar to `pick`, but cycles are squeezed into the target ('inhabited') pattern.

**Example:**

```
"<a b [a,b]>".inhabit({a: s("bd(3,8)"),
                            b: s("cp sd")
                           })
```

**Example:**

```
s("a@2 [a b] a".inhabit({a: "bd(3,8)", b: "sd sd"})).slow(4)
```

### pitchwheel

Renders a pitch circle to visualize frequencies within one octave

**Example:**

```
n("0 .. 12").scale("C:chromatic")
.s("sawtooth")
.lpf(500)
._pitchwheel()
```

### ply

The ply function repeats each event the given number of times.

**Example:**

```
s("bd ~ sd cp").ply("<1 2 3>")
```

### plyforeach

**Synonyms:** `plyForEach`

The plyForEach function repeats each event the given number of times, applying the given function to each event.
This version of ply uses the iteration index as an argument to the function, similar to echoWith.

**Example:**

```
"<0 [2 4]>"
.plyForEach(4, (p,n) => p.add(n*2))
.scale("C:minor").note()
```

### plyForEach

**Synonyms:** `plyforeach`

The plyForEach function repeats each event the given number of times, applying the given function to each event.
This version of ply uses the iteration index as an argument to the function, similar to echoWith.

**Example:**

```
"<0 [2 4]>"
.plyForEach(4, (p,n) => p.add(n*2))
.scale("C:minor").note()
```

### plywith

**Synonyms:** `plyWith`

The plyWith function repeats each event the given number of times, applying the given function to each event.\n

**Example:**

```
"<0 [2 4]>"
.plyWith(4, (p) => p.add(2))
.scale("C:minor").note()
```

### plyWith

**Synonyms:** `plywith`

The plyWith function repeats each event the given number of times, applying the given function to each event.\n

**Example:**

```
"<0 [2 4]>"
.plyWith(4, (p) => p.add(2))
.scale("C:minor").note()
```

### pm

**Synonyms:** `polymeter`

*Experimental*

Aligns the steps of the patterns, creating polymeters. The patterns are repeated until they all fit the cycle. For example, in the below the first pattern is repeated twice, and the second is repeated three times, to fit the lowest common multiple of six steps.

**Example:**

```
// The same as note("{c eb g, c2 g2}%6")
polymeter("c eb g", "c2 g2").note()
```

### polymeter

**Synonyms:** `pm`

*Experimental*

Aligns the steps of the patterns, creating polymeters. The patterns are repeated until they all fit the cycle. For example, in the below the first pattern is repeated twice, and the second is repeated three times, to fit the lowest common multiple of six steps.

**Example:**

```
// The same as note("{c eb g, c2 g2}%6")
polymeter("c eb g", "c2 g2").note()
```

### polyrhythm

**Synonyms:** `stack, pr`

The given items are played at the same time at the same length.

**Example:**

```
stack("g3", "b3", ["e4", "d4"]).note()
// "g3,b3,[e4 d4]".note()
```

**Example:**

```
// As a chained function:
s("hh*4").stack(
  note("c4(5,8)")
)
```

### postgain

Gain applied after all effects have been processed.

**Example:**

```
s("bd sd [~ bd] sd,hh*8")
.compressor("-20:20:10:.002:.02").postgain(1.5)
```

### pr

**Synonyms:** `stack, polyrhythm`

The given items are played at the same time at the same length.

**Example:**

```
stack("g3", "b3", ["e4", "d4"]).note()
// "g3,b3,[e4 d4]".note()
```

**Example:**

```
// As a chained function:
s("hh*4").stack(
  note("c4(5,8)")
)
```

### prel

**Synonyms:** `prelease`

Release time of pitch envelope

**Example:**

```
note("<c eb g bb> ~")
.release(.5) // to hear the pitch release
.prelease("<0 .1 .25 .5>")
```

### prelease

**Synonyms:** `prel`

Release time of pitch envelope

**Example:**

```
note("<c eb g bb> ~")
.release(.5) // to hear the pitch release
.prelease("<0 .1 .25 .5>")
```

### prepareInputBuffersToSend

Copy contents of input buffers to buffer actually sent to process

### press

Syncopates a rhythm, by shifting each event halfway into its timespan.

**Example:**

```
stack(s("hh*4"),
      s("bd mt sd ht").every(4, press)
     ).slow(2)
```

### pressBy

Like press, but allows you to specify the amount by which each
event is shifted. pressBy(0.5) is the same as press, while
pressBy(1/3) shifts each event by a third of its timespan.

**Example:**

```
stack(s("hh*4"),
      s("bd mt sd ht").pressBy("<0 0.5 0.25>")
     ).slow(2)
```

### progNum

MIDI program number: Sends a MIDI program change message.

**Example:**

```
note("c4").progNum(10).midichan(1).midi()
```

### punchcard

**Synonyms:** `pianoroll`

Visualises a pattern as a scrolling 'pianoroll', displayed in the background of the editor. To show a pianoroll for all running patterns, use `all(pianoroll)`. To have a pianoroll appear below
a pattern instead, prefix with `_`, e.g.: `sound("bd sd")._pianoroll()`.

**Example:**

```
note("c2 a2 eb2")
.euclid(5,8)
.s('sawtooth')
.lpenv(4).lpf(300)
.pianoroll({ labels: 1 })
```

### pure

A discrete value that repeats once per cycle.

**Example:**

```
pure('e4') // "e4"
```

### pw

Controls the pulsewidth of the pulse oscillator

**Example:**

```
note("{f a c e}%16").s("pulse").pw(".8:1:.2")
```

**Example:**

```
n(run(8)).scale("D:pentatonic").s("pulse").pw("0 .75 .5 1")
```

### pwrate

Controls the lfo rate for the pulsewidth of the pulse oscillator

**Example:**

```
n(run(8)).scale("D:pentatonic").s("pulse").pw("0.5").pwrate("<5 .1 25>").pwsweep("<0.3 .8>")
```

### pwsweep

Controls the lfo sweep for the pulsewidth of the pulse oscillator

**Example:**

```
n(run(8)).scale("D:pentatonic").s("pulse").pw("0.5").pwrate("<5 .1 25>").pwsweep("<0.3 .8>")
```

### queryArc

Query haps inside the given time span.

**Example:**

```
const pattern = sequence('a', ['b', 'c'])
const haps = pattern.queryArc(0, 1)
console.log(haps)
silence
```

### rand

A continuous pattern of random numbers, between 0 and 1.

**Example:**

```
// randomly change the cutoff
s("bd*4,hh*8").cutoff(rand.range(500,8000))
```

### rand2

A continuous pattern of random numbers, between -1 and 1

### randcat

**Synonyms:** `chooseCycles`

Picks one of the elements at random each cycle.

**Example:**

```
chooseCycles("bd", "hh", "sd").s().fast(8)
```

**Example:**

```
s("bd | hh | sd").fast(8)
```

### range

Assumes a numerical pattern, containing unipolar values in the range 0 .. 1.
Returns a new pattern with values scaled to the given min/max range.
Most useful in combination with continuous patterns.

**Example:**

```
s("[bd sd]*2,hh*8")
.cutoff(sine.range(500,4000))
```

### range2

Assumes a numerical pattern, containing bipolar values in the range -1 .. 1
Returns a new pattern with values scaled to the given min/max range.

**Example:**

```
s("[bd sd]*2,hh*8")
.cutoff(sine2.range2(500,4000))
```

### rangex

Assumes a numerical pattern, containing unipolar values in the range 0 .. 1
Returns a new pattern with values scaled to the given min/max range,
following an exponential curve.

**Example:**

```
s("[bd sd]*2,hh*8")
.cutoff(sine.rangex(500,4000))
```

### rarely

Shorthand for `.sometimesBy(0.25, fn)`

**Example:**

```
s("hh*8").rarely(x=>x.speed("0.5"))
```

### ratio

Allows dividing numbers via list notation using ":".
Returns a new pattern with just numbers.

**Example:**

```
ratio("1, 5:4, 3:2").mul(110)
.freq().s("piano")
```

### rdim

**Synonyms:** `roomdim`

Reverb lowpass frequency at -60dB (in hertz).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

**Example:**

```
s("bd sd [~ bd] sd").room(0.5).rlp(10000).rdim(8000)
```

**Example:**

```
s("bd sd [~ bd] sd").room(0.5).rlp(5000).rdim(400)
```

### readInputs

Read next web audio block to input buffers

### reallocateChannelsIfNeeded

Handles dynamic reallocation of input/output channels buffer
(channel numbers may lety during lifecycle)

### ref

exposes a custom value at query time. basically allows mutating state without evaluation

### register

Registers a new pattern method. The method is added to the Pattern class + the standalone function is returned from register.

### rel

**Synonyms:** `release`

Amplitude envelope release time: The time it takes after the offset to go from sustain level to zero.

**Example:**

```
note("c3 e3 g3 c4").release("<0 .1 .4 .6 1>/2")
```

### release

**Synonyms:** `rel`

Amplitude envelope release time: The time it takes after the offset to go from sustain level to zero.

**Example:**

```
note("c3 e3 g3 c4").release("<0 .1 .4 .6 1>/2")
```

### removeUndefineds

Returns a new pattern, with haps containing undefined values removed from
query results.

### repeatCycles

Repeats each cycle the given number of times.

**Example:**

```
note(irand(12).add(34)).segment(4).repeatCycles(2).s("gm_acoustic_guitar_nylon")
```

### reset

Resets the pattern to the start of the cycle for each onset of the reset pattern.

**Example:**

```
s("[<bd lt> sd]*2, hh*8").reset("<x@3 x(5,8)>")
```

### resonance

**Synonyms:** `lpq`

Controls the **l**ow-**p**ass **q**-value.

**Example:**

```
s("bd sd [~ bd] sd,hh*8").lpf(2000).lpq("<0 10 20 30>")
```

### restart

Restarts the pattern for each onset of the restart pattern.
While reset will only reset the current cycle, restart will start from cycle 0.

**Example:**

```
s("[<bd lt> sd]*2, hh*8").restart("<x@3 x(5,8)>")
```

### rev

Reverse all haps in a pattern

**Example:**

```
note("c d e g").rev()
```

### rfade

**Synonyms:** `roomfade`

Reverb fade time (in seconds).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

**Example:**

```
s("bd sd [~ bd] sd").room(0.5).rlp(10000).rfade(0.5)
```

**Example:**

```
s("bd sd [~ bd] sd").room(0.5).rlp(5000).rfade(4)
```

### rib

**Synonyms:** `ribbon`

Loops the pattern inside an `offset` for `cycles`.
If you think of the entire span of time in cycles as a ribbon, you can cut a single piece and loop it.

**Example:**

```
note("<c d e f>").ribbon(1, 2)
```

**Example:**

```
// Looping a portion of randomness
n(irand(8).segment(4)).scale("c:pentatonic").ribbon(1337, 2)
```

**Example:**

```
// rhythm generator
s("bd!16?").ribbon(29,.5)
```

### ribbon

**Synonyms:** `rib`

Loops the pattern inside an `offset` for `cycles`.
If you think of the entire span of time in cycles as a ribbon, you can cut a single piece and loop it.

**Example:**

```
note("<c d e f>").ribbon(1, 2)
```

**Example:**

```
// Looping a portion of randomness
n(irand(8).segment(4)).scale("c:pentatonic").ribbon(1337, 2)
```

**Example:**

```
// rhythm generator
s("bd!16?").ribbon(29,.5)
```

### rlp

**Synonyms:** `roomlp`

Reverb lowpass starting frequency (in hertz).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

**Example:**

```
s("bd sd [~ bd] sd").room(0.5).rlp(10000)
```

**Example:**

```
s("bd sd [~ bd] sd").room(0.5).rlp(5000)
```

### room

Sets the level of reverb.

When using mininotation, you can also optionally add the 'size' parameter, separated by ':'.

**Example:**

```
s("bd sd [~ bd] sd").room("<0 .2 .4 .6 .8 1>")
```

**Example:**

```
s("bd sd [~ bd] sd").room("<0.9:1 0.9:4>")
```

### roomdim

**Synonyms:** `rdim`

Reverb lowpass frequency at -60dB (in hertz).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

**Example:**

```
s("bd sd [~ bd] sd").room(0.5).rlp(10000).rdim(8000)
```

**Example:**

```
s("bd sd [~ bd] sd").room(0.5).rlp(5000).rdim(400)
```

### roomfade

**Synonyms:** `rfade`

Reverb fade time (in seconds).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

**Example:**

```
s("bd sd [~ bd] sd").room(0.5).rlp(10000).rfade(0.5)
```

**Example:**

```
s("bd sd [~ bd] sd").room(0.5).rlp(5000).rfade(4)
```

### roomlp

**Synonyms:** `rlp`

Reverb lowpass starting frequency (in hertz).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

**Example:**

```
s("bd sd [~ bd] sd").room(0.5).rlp(10000)
```

**Example:**

```
s("bd sd [~ bd] sd").room(0.5).rlp(5000)
```

### roomsize

**Synonyms:** `rsize, sz, size`

Sets the room size of the reverb, see `room`.
When this property is changed, the reverb will be recaculated, so only change this sparsely..

**Example:**

```
s("bd sd [~ bd] sd").room(.8).rsize(1)
```

**Example:**

```
s("bd sd [~ bd] sd").room(.8).rsize(4)
```

### rootNotes

Maps the chords of the incoming pattern to root notes in the given octave.

**Example:**

```
"<C^7 A7 Dm7 G7>".rootNotes(2).note()
```

### rotA

**Synonyms:** `rotationAlpha, rotZ, rotationZ`

The device's rotation around the alpha-axis value ranges from 0 to 1.

**Example:**

```
n(rotationAlpha.segment(4).range(0,7)).scale("C:minor")
```

### rotationAlpha

**Synonyms:** `rotA, rotZ, rotationZ`

The device's rotation around the alpha-axis value ranges from 0 to 1.

**Example:**

```
n(rotationAlpha.segment(4).range(0,7)).scale("C:minor")
```

### rotationBeta

**Synonyms:** `rotB, rotX, rotationX`

The device's rotation around the beta-axis value ranges from 0 to 1.

**Example:**

```
n(rotationBeta.segment(4).range(0,7)).scale("C:minor")
```

### rotationGamma

**Synonyms:** `rotG, rotY, rotationY`

The device's rotation around the gamma-axis value ranges from 0 to 1.

**Example:**

```
n(rotationGamma.segment(4).range(0,7)).scale("C:minor")
```

### rotationX

**Synonyms:** `rotationBeta, rotB, rotX`

The device's rotation around the beta-axis value ranges from 0 to 1.

**Example:**

```
n(rotationBeta.segment(4).range(0,7)).scale("C:minor")
```

### rotationY

**Synonyms:** `rotationGamma, rotG, rotY`

The device's rotation around the gamma-axis value ranges from 0 to 1.

**Example:**

```
n(rotationGamma.segment(4).range(0,7)).scale("C:minor")
```

### rotationZ

**Synonyms:** `rotationAlpha, rotA, rotZ`

The device's rotation around the alpha-axis value ranges from 0 to 1.

**Example:**

```
n(rotationAlpha.segment(4).range(0,7)).scale("C:minor")
```

### rotB

**Synonyms:** `rotationBeta, rotX, rotationX`

The device's rotation around the beta-axis value ranges from 0 to 1.

**Example:**

```
n(rotationBeta.segment(4).range(0,7)).scale("C:minor")
```

### rotG

**Synonyms:** `rotationGamma, rotY, rotationY`

The device's rotation around the gamma-axis value ranges from 0 to 1.

**Example:**

```
n(rotationGamma.segment(4).range(0,7)).scale("C:minor")
```

### rotX

**Synonyms:** `rotationBeta, rotB, rotationX`

The device's rotation around the beta-axis value ranges from 0 to 1.

**Example:**

```
n(rotationBeta.segment(4).range(0,7)).scale("C:minor")
```

### rotY

**Synonyms:** `rotationGamma, rotG, rotationY`

The device's rotation around the gamma-axis value ranges from 0 to 1.

**Example:**

```
n(rotationGamma.segment(4).range(0,7)).scale("C:minor")
```

### rotZ

**Synonyms:** `rotationAlpha, rotA, rotationZ`

The device's rotation around the alpha-axis value ranges from 0 to 1.

**Example:**

```
n(rotationAlpha.segment(4).range(0,7)).scale("C:minor")
```

### round

Assumes a numerical pattern. Returns a new pattern with all values rounded
to the nearest integer.

**Example:**

```
n("0.5 1.5 2.5".round()).scale("C:major")
```

### rsize

**Synonyms:** `roomsize, sz, size`

Sets the room size of the reverb, see `room`.
When this property is changed, the reverb will be recaculated, so only change this sparsely..

**Example:**

```
s("bd sd [~ bd] sd").room(.8).rsize(1)
```

**Example:**

```
s("bd sd [~ bd] sd").room(.8).rsize(4)
```

### run

A discrete pattern of numbers from 0 to n-1

**Example:**

```
n(run(4)).scale("C4:pentatonic")
// n("0 1 2 3").scale("C4:pentatonic")
```

### s

**Synonyms:** `sound`

Select a sound / sample by name. When using mininotation, you can also optionally supply 'n' and 'gain' parameters
separated by ':'.

**Example:**

```
s("bd hh")
```

**Example:**

```
s("bd:0 bd:1 bd:0:0.3 bd:1:1.4")
```

### samples

Loads a collection of samples to use with `s`

**Example:**

```
samples('github:tidalcycles/dirt-samples');
s("[bd ~]*2, [~ hh]*2, ~ sd")
```

**Example:**

```
samples({
 bd: '808bd/BD0000.WAV',
 sd: '808sd/SD0010.WAV'
 }, 'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/');
s("[bd ~]*2, [~ hh]*2, ~ sd")
```

**Example:**

```
samples('shabda:noise,chimp:2')
s("noise <chimp:0*2 chimp:1>")
```

**Example:**

```
samples('shabda/speech/fr-FR/f:chocolat')
s("chocolat*4")
```

### saw

A sawtooth signal between 0 and 1.

**Example:**

```
note("<c3 [eb3,g3] g2 [g3,bb3]>*8")
.clip(saw.slow(2))
```

**Example:**

```
n(saw.range(0,8).segment(8))
.scale('C major')
```

### saw2

A sawtooth signal between -1 and 1 (like `saw`, but bipolar).

### scale

Turns numbers into notes in the scale (zero indexed) or quantizes notes to a scale.

When describing notes via numbers, note that negative numbers can be used to wrap backwards
in the scale as well as sharps or flats (but not both) to produce notes outside of the scale.

Also sets scale for other scale operations, like {@link Pattern#scaleTranspose}.

A scale consists of a root note (e.g. `c4`, `c`, `f#`, `bb4`) followed by semicolon (':') and then a scale type.

The root note defaults to octave 3, if no octave number is given.

**Example:**

```
n("0 2 4 6 4 2").scale("C:major")
```

**Example:**

```
n("[0,7] 4 [2,7] 4")
.scale("C:<major minor>/2")
.s("piano")
```

**Example:**

```
n(rand.range(0,12).segment(8))
.scale("C:ritusen")
.s("piano")
```

**Example:**

```
n("<[0,7b] [-4# -4] [-2,7##] 4 [0,7] [-4# -4b] [-2,7###] 4b>*4")
.scale("C:<major minor>/2")
.s("piano")
```

**Example:**

```
note("C1*16").transpose(irand(36)).scale('Cb2 major').scaleTranspose(3)
```

### scaleTrans

**Synonyms:** `scaleTranspose, strans`

Transposes notes inside the scale by the number of steps.
Expected to be called on a Pattern which already has a {@link Pattern#scale}

**Example:**

```
"-8 [2,4,6]"
.scale('C4 bebop major')
.scaleTranspose("<0 -1 -2 -3 -4 -5 -6 -4>")
.note()
```

### scaleTranspose

**Synonyms:** `scaleTrans, strans`

Transposes notes inside the scale by the number of steps.
Expected to be called on a Pattern which already has a {@link Pattern#scale}

**Example:**

```
"-8 [2,4,6]"
.scale('C4 bebop major')
.scaleTranspose("<0 -1 -2 -3 -4 -5 -6 -4>")
.note()
```

### scope

**Synonyms:** `tscope`

Renders an oscilloscope for the time domain of the audio signal.

**Example:**

```
s("sawtooth")._scope()
```

### scramble

Slices a pattern into the given number of parts, then plays those parts at random. Similar to `shuffle`,
but parts might be played more than once, or not at all, per cycle.

**Example:**

```
note("c d e f").sound("piano").scramble(4)
```

**Example:**

```
seq("c d e f".scramble(4), "g").note().sound("piano")
```

### scrub

Allows you to scrub an audio file like a tape loop by passing values that represents the position in the audio file
in the optional array syntax ex: "0.5:2", the second value controls the speed of playback

**Example:**

```
samples('github:switchangel/pad')
s("swpad:0").scrub("{0.1!2 .25@3 0.7!2 <0.8:1.5>}%8")
```

**Example:**

```
samples('github:yaxu/clean-breaks/main');
s("amen/4").fit().scrub("{0@3 0@2 4@3}%8".div(16))
```

### seg

**Synonyms:** `segment`

Samples the pattern at a rate of n events per cycle. Useful for turning a continuous pattern into a discrete one.

**Example:**

```
note(saw.range(40,52).segment(24))
```

### segment

**Synonyms:** `seg`

Samples the pattern at a rate of n events per cycle. Useful for turning a continuous pattern into a discrete one.

**Example:**

```
note(saw.range(40,52).segment(24))
```

### seq

**Synonyms:** `sequence, fastcat`

Like **cat**, but the items are crammed into one cycle.

**Example:**

```
seq("e5", "b4", ["d5", "c5"]).note()
// "e5 b4 [d5 c5]".note()
```

**Example:**

```
// As a chained function:
s("hh*4").seq(
  note("c4(5,8)")
)
```

### seqPLoop

Similarly to `arrange`, allows you to arrange multiple patterns together over multiple cycles.
Unlike `arrange`, you specify a start and stop time for each pattern rather than duration, which
means that patterns can overlap.

**Example:**

```
seqPLoop([0, 2, "bd(3,8)"],
         [1, 3, "cp(3,8)"]
        )
  .sound()
```

### sequence

See `fastcat`

### sequence

**Synonyms:** `seq, fastcat`

Like **cat**, but the items are crammed into one cycle.

**Example:**

```
seq("e5", "b4", ["d5", "c5"]).note()
// "e5 b4 [d5 c5]".note()
```

**Example:**

```
// As a chained function:
s("hh*4").seq(
  note("c4(5,8)")
)
```

### sequenceP

Takes a list of patterns, and returns a pattern of lists.

### setContext

Returns a new pattern with the context field set to every hap set to the given value.

### setcpm

Changes the global tempo to the given cycles per minute

**Example:**

```
setcpm(140/4) // =140 bpm in 4/4
$: s("bd*4,[- sd]*2").bank('tr707')
```

### shape

(Deprecated) Wave shaping distortion. WARNING: can suddenly get unpredictably loud.
Please use distort instead, which has a more predictable response curve
second option in optional array syntax (ex: ".9:.5") applies a postgain to the output

**Example:**

```
s("bd sd [~ bd] sd,hh*8").shape("<0 .2 .4 .6 .8>")
```

### shiftInputBuffers

Shift left content of input buffers to receive new web audio block

### shiftOutputBuffers

Shift left content of output buffers to receive new web audio block

### shiftPeaks

Shift peaks and regions of influence by pitchFactor into new specturm

### showFirstCycle

More human-readable version of the `firstCycleValues` accessor.

### shrink

*Experimental*

Progressively shrinks the pattern by 'n' steps until there's nothing left, or if a second value is given (using mininotation list syntax with `:`),
that number of times.
A positive number will progressively drop steps from the start of a pattern, and a negative number from the end.

**Example:**

```
"tha dhi thom nam".shrink("1").sound()
.bank("mridangam")
```

**Example:**

```
"tha dhi thom nam".shrink("-1").sound()
.bank("mridangam")
```

**Example:**

```
"tha dhi thom nam".shrink("1 -1").sound().bank("mridangam").pace(4)
```

**Example:**

```
note("0 1 2 3 4 5 6 7".scale("C:ritusen")).sound("folkharp")
   .shrink("1 -1").pace(8)
```

### shuffle

Slices a pattern into the given number of parts, then plays those parts in random order.
Each part will be played exactly once per cycle.

**Example:**

```
note("c d e f").sound("piano").shuffle(4)
```

**Example:**

```
seq("c d e f".shuffle(4), "g").note().sound("piano")
```

### silence

Does absolutely nothing..

**Example:**

```
silence // "~"
```

### sine

A sine signal between 0 and 1.

**Example:**

```
n(sine.segment(16).range(0,15))
.scale("C:minor")
```

### sine2

A sine signal between -1 and 1 (like `sine`, but bipolar).

### size

**Synonyms:** `roomsize, rsize, sz`

Sets the room size of the reverb, see `room`.
When this property is changed, the reverb will be recaculated, so only change this sparsely..

**Example:**

```
s("bd sd [~ bd] sd").room(.8).rsize(1)
```

**Example:**

```
s("bd sd [~ bd] sd").room(.8).rsize(4)
```

### slice

Chops samples into the given number of slices, triggering those slices with a given pattern of slice numbers.
Instead of a number, it also accepts a list of numbers from 0 to 1 to slice at specific points.

**Example:**

```
samples('github:tidalcycles/dirt-samples')
s("breaks165").slice(8, "0 1 <2 2*2> 3 [4 0] 5 6 7".every(3, rev)).slow(0.75)
```

**Example:**

```
samples('github:tidalcycles/dirt-samples')
s("breaks125").fit().slice([0,.25,.5,.75], "0 1 1 <2 3>")
```

### slider

Displays a slider widget to allow the user manipulate a value

### slow

**Synonyms:** `sparsity`

Slow down a pattern over the given number of cycles. Like the "/" operator in mini notation.

**Example:**

```
s("bd hh sd hh").slow(2) // s("[bd hh sd hh]/2")
```

### slowcat

**Synonyms:** `cat`

Concatenation: combines a list of patterns, switching between them successively, one per cycle.

**Example:**

```
slowcat("e5", "b4", ["d5", "c5"])
```

### slowcat

**Synonyms:** `cat`

The given items are con**cat**enated, where each one takes one cycle.

**Example:**

```
cat("e5", "b4", ["d5", "c5"]).note()
// "<e5 b4 [d5 c5]>".note()
```

**Example:**

```
// As a chained function:
s("hh*4").cat(
   note("c4(5,8)")
)
```

### slowcatPrime

Concatenation: combines a list of patterns, switching between them successively, one per cycle. Unlike slowcat, this version will skip cycles.

### slowchunk

**Synonyms:** `chunk, slowChunk`

Divides a pattern into a given number of parts, then cycles through those parts in turn, applying the given function to each part in turn (one part per cycle).

**Example:**

```
"0 1 2 3".chunk(4, x=>x.add(7))
.scale("A:minor").note()
```

### slowChunk

**Synonyms:** `chunk, slowchunk`

Divides a pattern into a given number of parts, then cycles through those parts in turn, applying the given function to each part in turn (one part per cycle).

**Example:**

```
"0 1 2 3".chunk(4, x=>x.add(7))
.scale("A:minor").note()
```

### someCycles

Shorthand for `.someCyclesBy(0.5, fn)`

**Example:**

```
s("bd,hh*8").someCycles(x=>x.speed("0.5"))
```

### someCyclesBy

Randomly applies the given function by the given probability on a cycle by cycle basis.
Similar to `sometimesBy`

**Example:**

```
s("bd,hh*8").someCyclesBy(.3, x=>x.speed("0.5"))
```

### sometimes

Applies the given function with a 50% chance

**Example:**

```
s("hh*8").sometimes(x=>x.speed("0.5"))
```

### sometimesBy

Randomly applies the given function by the given probability.
Similar to `someCyclesBy`

**Example:**

```
s("hh*8").sometimesBy(.4, x=>x.speed("0.5"))
```

### sortHapsByPart

Returns a new pattern, which returns haps sorted in temporal order. Mainly
of use when comparing two patterns for equality, in tests.

### sound

**Synonyms:** `s`

Select a sound / sample by name. When using mininotation, you can also optionally supply 'n' and 'gain' parameters
separated by ':'.

**Example:**

```
s("bd hh")
```

**Example:**

```
s("bd:0 bd:1 bd:0:0.3 bd:1:1.4")
```

### soundAlias

Register an alias for a sound.

### source

**Synonyms:** `src`

Define a custom webaudio node to use as a sound source.

### sparsity

**Synonyms:** `slow`

Slow down a pattern over the given number of cycles. Like the "/" operator in mini notation.

**Example:**

```
s("bd hh sd hh").slow(2) // s("[bd hh sd hh]/2")
```

### spectrum

Renders a spectrum analyzer for the incoming audio signal.

**Example:**

```
n("<0 4 <2 3> 1>*3")
.off(1/8, add(n(5)))
.off(1/5, add(n(7)))
.scale("d3:minor:pentatonic")
.s('sine')
.dec(.3).room(.5)
._spectrum()
```

### speed

Changes the speed of sample playback, i.e. a cheap way of changing pitch.

**Example:**

```
s("bd*6").speed("1 2 4 1 -2 -4")
```

**Example:**

```
speed("1 1.5*2 [2 1.1]").s("piano").clip(1)
```

### spiral

Displays a spiral visual.

**Example:**

```
note("c2 a2 eb2")
.euclid(5,8)
.s('sawtooth')
.lpenv(4).lpf(300)
._spiral({ steady: .96 })
```

### splice

Works the same as slice, but changes the playback speed of each slice to match the duration of its step.

**Example:**

```
samples('github:tidalcycles/dirt-samples')
s("breaks165")
.splice(8,  "0 1 [2 3 0]@2 3 0@2 7")
```

### splitQueries

Returns a new pattern, with queries split at cycle boundaries. This makes
some calculations easier to express, as all haps are then constrained to
happen within a cycle.

### spread

Set the stereo pan spread for supported oscillators

**Example:**

```
note("d f a a# a d3").fast(2).s("supersaw").spread("<0 .3 1>")
```

### square

A square signal between 0 and 1.

**Example:**

```
n(square.segment(4).range(0,7)).scale("C:minor")
```

### square2

A square signal between -1 and 1 (like `square`, but bipolar).

### squeeze

Pick from the list of values (or patterns of values) via the index using the given
pattern of integers. The selected pattern will be compressed to fit the duration of the selecting event

**Example:**

```
note(squeeze("<0@2 [1!2] 2>", ["g a", "f g f g" , "g a c d"]))
```

### squiz

Made by Calum Gunn. Reminiscent of some weird mixture of filter, ring-modulator and pitch-shifter. The SuperCollider manual defines Squiz as:

"A simplistic pitch-raising algorithm. It's not meant to sound natural; its sound is reminiscent of some weird mixture of filter, ring-modulator and pitch-shifter, depending on the input. The algorithm works by cutting the signal into fragments (delimited by upwards-going zero-crossings) and squeezing those fragments in the time domain (i.e. simply playing them back faster than they came in), leaving silences inbetween. All the parameters apart from memlen can be modulated."

**Example:**

```
squiz("2 4/2 6 [8 16]").s("bd").osc()
```

### src

**Synonyms:** `source`

Define a custom webaudio node to use as a sound source.

### stack

**Synonyms:** `polyrhythm, pr`

The given items are played at the same time at the same length.

**Example:**

```
stack("g3", "b3", ["e4", "d4"]).note()
// "g3,b3,[e4 d4]".note()
```

**Example:**

```
// As a chained function:
s("hh*4").stack(
  note("c4(5,8)")
)
```

### stepalt

*Experimental*

Concatenates patterns stepwise, according to an inferred 'steps per cycle'.
Similar to `stepcat`, but if an argument is a list, the whole pattern will alternate between the elements in the list.

**Example:**

```
stepalt(["bd cp", "mt"], "bd").sound()
// The same as "bd cp bd mt bd".sound()
```

### stepcat

**Synonyms:** `timeCat, timecat`

'Concatenates' patterns like `fastcat`, but proportional to a number of steps per cycle.
The steps can either be inferred from the pattern, or provided as a [length, pattern] pair.
Has the alias `timecat`.

**Example:**

```
stepcat([3,"e3"],[1, "g3"]).note()
// the same as "e3@3 g3".note()
```

**Example:**

```
stepcat("bd sd cp","hh hh").sound()
// the same as "bd sd cp hh hh".sound()
```

### strans

**Synonyms:** `scaleTranspose, scaleTrans`

Transposes notes inside the scale by the number of steps.
Expected to be called on a Pattern which already has a {@link Pattern#scale}

**Example:**

```
"-8 [2,4,6]"
.scale('C4 bebop major')
.scaleTranspose("<0 -1 -2 -3 -4 -5 -6 -4>")
.note()
```

### stretch

Changes the speed of sample playback, i.e. a cheap way of changing pitch.

**Example:**

```
s("gm_flute").stretch("1 2 .5")
```

### striate

Cuts each sample into the given number of parts, triggering progressive portions of each sample at each loop.

**Example:**

```
s("numbers:0 numbers:1 numbers:2").striate(6).slow(3)
```

### stripContext

Returns a new pattern with the context field of every hap set to an empty object.

### struct

Applies the given structure to the pattern:

**Example:**

```
note("c,eb,g")
  .struct("x ~ x ~ ~ x ~ x ~ ~ ~ x ~ x ~ ~")
  .slow(2)
```

### stut

Deprecated. Like echo, but the last 2 parameters are flipped.

**Example:**

```
s("bd sd").stut(3, .8, 1/6)
```

### stutwith

**Synonyms:** `echoWith, echowith, stutWith`

Superimpose and offset multiple times, applying the given function each time.

**Example:**

```
"<0 [2 4]>"
.echoWith(4, 1/8, (p,n) => p.add(n*2))
.scale("C:minor").note()
```

### stutWith

**Synonyms:** `echoWith, echowith, stutwith`

Superimpose and offset multiple times, applying the given function each time.

**Example:**

```
"<0 [2 4]>"
.echoWith(4, 1/8, (p,n) => p.add(n*2))
.scale("C:minor").note()
```

### sub

Like add, but the given numbers are subtracted.

**Example:**

```
n("0 2 4".sub("<0 1 2 3>")).scale("C4:minor")
// See add for more information.
```

### superimpose

Superimposes the result of the given function(s) on top of the original pattern:

**Example:**

```
"<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
  .superimpose(x=>x.add(2))
  .scale('C minor').note()
```

### sus

**Synonyms:** `sustain`

Amplitude envelope sustain level: The level which is reached after attack / decay, being sustained until the offset.

**Example:**

```
note("c3 e3 f3 g3").decay(.2).sustain("<0 .1 .4 .6 1>")
```

### sustain

**Synonyms:** `sus`

Amplitude envelope sustain level: The level which is reached after attack / decay, being sustained until the offset.

**Example:**

```
note("c3 e3 f3 g3").decay(.2).sustain("<0 .1 .4 .6 1>")
```

### swing

Shorthand for swingBy with 1/3:

**Example:**

```
s("hh*8").swing(4)
// s("hh*8").swingBy(1/3, 4)
```

### swingBy

The function `swingBy x n` breaks each cycle into `n` slices, and then delays events in the second half of each slice by the amount `x`, which is relative to the size of the (half) slice. So if `x` is 0 it does nothing, `0.5` delays for half the note duration, and 1 will wrap around to doing nothing again. The end result is a shuffle or swing-like rhythm

**Example:**

```
s("hh*8").swingBy(1/3, 4)
```

### sysex

MIDI sysex: Sends a MIDI sysex message.

**Example:**

```
note("c4").sysex(["0x77", "0x01:0x02:0x03:0x04"]).midichan(1).midi()
```

### sysexdata

MIDI sysex data: Sends a MIDI sysex message.

**Example:**

```
note("c4").sysexid("0x77").sysexdata("0x01:0x02:0x03:0x04").midichan(1).midi()
```

### sysexid

MIDI sysex ID: Sends a MIDI sysex identifier message.

**Example:**

```
note("c4").sysexid("0x77").sysexdata("0x01:0x02:0x03:0x04").midichan(1).midi()
```

### sz

**Synonyms:** `roomsize, rsize, size`

Sets the room size of the reverb, see `room`.
When this property is changed, the reverb will be recaculated, so only change this sparsely..

**Example:**

```
s("bd sd [~ bd] sd").room(.8).rsize(1)
```

**Example:**

```
s("bd sd [~ bd] sd").room(.8).rsize(4)
```

### tables

Loads a collection of wavetables to use with `s`

### tag

Tags each Hap with an identifier. Good for filtering. The function populates Hap.context.tags (Array).

### take

*Experimental*

Takes the given number of steps from a pattern (dropping the rest).
A positive number will take steps from the start of a pattern, and a negative number from the end.

**Example:**

```
"bd cp ht mt".take("2").sound()
// The same as "bd cp".sound()
```

**Example:**

```
"bd cp ht mt".take("1 2 3").sound()
// The same as "bd bd cp bd cp ht".sound()
```

**Example:**

```
"bd cp ht mt".take("-1 -2 -3").sound()
// The same as "mt ht mt cp ht mt".sound()
```

### time

A signal representing the cycle time.

### timecat

**Synonyms:** `stepcat, timeCat`

'Concatenates' patterns like `fastcat`, but proportional to a number of steps per cycle.
The steps can either be inferred from the pattern, or provided as a [length, pattern] pair.
Has the alias `timecat`.

**Example:**

```
stepcat([3,"e3"],[1, "g3"]).note()
// the same as "e3@3 g3".note()
```

**Example:**

```
stepcat("bd sd cp","hh hh").sound()
// the same as "bd sd cp hh hh".sound()
```

### timecat

Aliases for `stepcat`

### timeCat

**Synonyms:** `stepcat, timecat`

'Concatenates' patterns like `fastcat`, but proportional to a number of steps per cycle.
The steps can either be inferred from the pattern, or provided as a [length, pattern] pair.
Has the alias `timecat`.

**Example:**

```
stepcat([3,"e3"],[1, "g3"]).note()
// the same as "e3@3 g3".note()
```

**Example:**

```
stepcat("bd sd cp","hh hh").sound()
// the same as "bd sd cp hh hh".sound()
```

### toBipolar

### tour

*Experimental*

Inserts a pattern into a list of patterns. On the first repetition it will be inserted at the end of the list, then moved backwards through the list
on successive repetitions. The patterns are added together stepwise, with all repetitions taking place over a single cycle. Using `pace` to set the
number of steps per cycle is therefore usually recommended.

**Example:**

```
"[c g]".tour("e f", "e f g", "g f e c").note()
   .sound("folkharp")
   .pace(8)
```

### trans

**Synonyms:** `transpose`

**Example:**

```
"c2 c3".fast(2).transpose("<0 -2 5 3>".slow(2)).note()
```

**Example:**

```
"c2 c3".fast(2).transpose("<1P -2M 4P 3m>".slow(2)).note()
```

### transpose

**Synonyms:** `trans`

**Example:**

```
"c2 c3".fast(2).transpose("<0 -2 5 3>".slow(2)).note()
```

**Example:**

```
"c2 c3".fast(2).transpose("<1P -2M 4P 3m>".slow(2)).note()
```

### trem

**Synonyms:** `tremolo`

Modulate the amplitude of a sound with a continuous waveform

**Example:**

```
note("d d d# d".fast(4)).s("supersaw").tremolo("<3 2 100> ").tremoloskew("<.5>")
```

### tremdepth

**Synonyms:** `tremolodepth`

Depth of amplitude modulation

**Example:**

```
note("a1 a1 a#1 a1".fast(4)).s("pulse").tremsync(4).tremolodepth("<1 2 .7>")
```

### tremolo

**Synonyms:** `trem`

Modulate the amplitude of a sound with a continuous waveform

**Example:**

```
note("d d d# d".fast(4)).s("supersaw").tremolo("<3 2 100> ").tremoloskew("<.5>")
```

### tremolodepth

**Synonyms:** `tremdepth`

Depth of amplitude modulation

**Example:**

```
note("a1 a1 a#1 a1".fast(4)).s("pulse").tremsync(4).tremolodepth("<1 2 .7>")
```

### tremolophase

**Synonyms:** `tremphase`

Alter the phase of the modulation waveform

**Example:**

```
note("{f a c e}%16").s("sawtooth").tremsync(4).tremolophase("<0 .25 .66>")
```

### tremoloshape

**Synonyms:** `tremshape`

Shape of amplitude modulation

**Example:**

```
note("{f g c d}%16").tremsync(4).tremoloshape("<sine tri square>").s("sawtooth")
```

### tremoloskew

**Synonyms:** `tremskew`

Alter the shape of the modulation waveform

**Example:**

```
note("{f a c e}%16").s("sawtooth").tremsync(4).tremoloskew("<.5 0 1>")
```

### tremolosync

**Synonyms:** `tremsync`

Modulate the amplitude of a sound with a continuous waveform

**Example:**

```
note("d d d# d".fast(4)).s("supersaw").tremolosync("4").tremoloskew("<1 .5 0>")
```

### tremphase

**Synonyms:** `tremolophase`

Alter the phase of the modulation waveform

**Example:**

```
note("{f a c e}%16").s("sawtooth").tremsync(4).tremolophase("<0 .25 .66>")
```

### tremshape

**Synonyms:** `tremoloshape`

Shape of amplitude modulation

**Example:**

```
note("{f g c d}%16").tremsync(4).tremoloshape("<sine tri square>").s("sawtooth")
```

### tremskew

**Synonyms:** `tremoloskew`

Alter the shape of the modulation waveform

**Example:**

```
note("{f a c e}%16").s("sawtooth").tremsync(4).tremoloskew("<.5 0 1>")
```

### tremsync

**Synonyms:** `tremolosync`

Modulate the amplitude of a sound with a continuous waveform

**Example:**

```
note("d d d# d".fast(4)).s("supersaw").tremolosync("4").tremoloskew("<1 .5 0>")
```

### tri

A triangle signal between 0 and 1.

**Example:**

```
n(tri.segment(8).range(0,7)).scale("C:minor")
```

### tri2

A triangle signal between -1 and 1 (like `tri`, but bipolar).

### tscope

**Synonyms:** `scope`

Renders an oscilloscope for the time domain of the audio signal.

**Example:**

```
s("sawtooth")._scope()
```

### undegrade

Inverse of `degrade`: Randomly removes 50% of events from the pattern. Shorthand for `.undegradeBy(0.5)`
Events that would be removed by degrade are let through by undegrade and vice versa (see second example).

**Example:**

```
s("hh*8").undegrade()
```

**Example:**

```
s("hh*10").layer(
  x => x.degrade().pan(0),
  x => x.undegrade().pan(1)
)
```

### undegradeBy

Inverse of `degradeBy`: Randomly removes events from the pattern by a given amount.
0 = 100% chance of removal
1 = 0% chance of removal
Events that would be removed by degradeBy are let through by undegradeBy and vice versa (see second example).

**Example:**

```
s("hh*8").undegradeBy(0.2)
```

**Example:**

```
s("hh*10").layer(
  x => x.degradeBy(0.2).pan(0),
  x => x.undegradeBy(0.8).pan(1)
)
```

### unison

Set number of stacked voices for supported oscillators

**Example:**

```
note("d f a a# a d3").fast(2).s("supersaw").unison("<1 2 7>")
```

### unit

Used in conjunction with `speed`, accepts values of "r" (rate, default behavior), "c" (cycles), or "s" (seconds). Using `unit "c"` means `speed` will be interpreted in units of cycles, e.g. `speed "1"` means samples will be stretched to fill a cycle. Using `unit "s"` means the playback speed will be adjusted so that the duration is the number of seconds specified by `speed`.

**Example:**

```
speed("1 2 .5 3").s("bd").unit("c").osc()
```

### v

**Synonyms:** `vib, vibrato`

Applies a vibrato to the frequency of the oscillator.

**Example:**

```
note("a e")
.vib("<.5 1 2 4 8 16>")
._scope()
```

**Example:**

```
// change the modulation depth with ":"
note("a e")
.vib("<.5 1 2 4 8 16>:12")
._scope()
```

### velocity

Sets the velocity from 0 to 1. Is multiplied together with gain.

**Example:**

```
s("hh*8")
.gain(".4!2 1 .4!2 1 .4 1")
.velocity(".4 1")
```

### vib

**Synonyms:** `vibrato, v`

Applies a vibrato to the frequency of the oscillator.

**Example:**

```
note("a e")
.vib("<.5 1 2 4 8 16>")
._scope()
```

**Example:**

```
// change the modulation depth with ":"
note("a e")
.vib("<.5 1 2 4 8 16>:12")
._scope()
```

### vibmod

**Synonyms:** `vmod`

Sets the vibrato depth in semitones. Only has an effect if `vibrato` | `vib` | `v` is is also set

**Example:**

```
note("a e").vib(4)
.vibmod("<.25 .5 1 2 12>")
._scope()
```

**Example:**

```
// change the vibrato frequency with ":"
note("a e")
.vibmod("<.25 .5 1 2 12>:8")
._scope()
```

### vibrato

**Synonyms:** `vib, v`

Applies a vibrato to the frequency of the oscillator.

**Example:**

```
note("a e")
.vib("<.5 1 2 4 8 16>")
._scope()
```

**Example:**

```
// change the modulation depth with ":"
note("a e")
.vib("<.5 1 2 4 8 16>:12")
._scope()
```

### vmod

**Synonyms:** `vibmod`

Sets the vibrato depth in semitones. Only has an effect if `vibrato` | `vib` | `v` is is also set

**Example:**

```
note("a e").vib(4)
.vibmod("<.25 .5 1 2 12>")
._scope()
```

**Example:**

```
// change the vibrato frequency with ":"
note("a e")
.vibmod("<.25 .5 1 2 12>:8")
._scope()
```

### voicing

Turns chord symbols into voicings. You can use the following control params:

- `chord`: Note, followed by chord symbol, e.g. C Am G7 Bb^7
- `dict`: voicing dictionary to use, falls back to default dictionary
- `anchor`: the note that is used to align the chord
- `mode`: how the voicing is aligned to the anchor
<ul>
<li>`below`: top note <= anchor
- `duck`: top note <= anchor, anchor excluded
- `above`: bottom note >= anchor
</li>
- `offset`: whole number that shifts the voicing up or down to the next voicing
- `n`: if set, the voicing is played like a scale. Overshooting numbers will be octaved
</ul>

All of the above controls are optional, except `chord`.
If you pass a pattern of strings to voicing, they will be interpreted as chords.

**Example:**

```
n("0 1 2 3").chord("<C Am F G>").voicing()
```

### voicings

DEPRECATED: still works, but it is recommended you use .voicing instead (without s).
Turns chord symbols into voicings, using the smoothest voice leading possible.
Uses chord-voicings package.

**Example:**

```
stack("<C^7 A7 Dm7 G7>".voicings('lefthand'), "<C3 A2 D3 G2>").note()
```

### vowel

Formant filter to make things sound like vowels.

**Example:**

```
note("[c2 <eb2 <g2 g1>>]*2").s('sawtooth')
.vowel("<a e i <o u>>")
```

**Example:**

```
s("bd sd mt ht bd [~ cp] ht lt").vowel("[a|e|i|o|u]")
```

### warp

**Synonyms:** `wavetableWarp`

Amount of warp (alteration of the waveform) to apply to the wavetable oscillator

**Example:**

```
s("basique").bank("wt_digital").seg(8).note("F1").warp("0 0.25 0.5 0.75 1")
  .warpmode("spin")
```

### warpatt

**Synonyms:** `warpattack`

Attack time of the wavetable oscillator's warp envelope

### warpattack

**Synonyms:** `warpatt`

Attack time of the wavetable oscillator's warp envelope

### warpdc

DC offset of the LFO for the wavetable oscillator's warp

### warpdec

**Synonyms:** `warpdecay`

Decay time of the wavetable oscillator's warp envelope

### warpdecay

**Synonyms:** `warpdec`

Decay time of the wavetable oscillator's warp envelope

### warpdepth

Depth of the LFO for the wavetable oscillator's warp

### warpenv

Amount of envelope applied wavetable oscillator's position envelope

### warpmode

**Synonyms:** `wavetableWarpMode`

Type of warp (alteration of the waveform) to apply to the wavetable oscillator.

The current options are: none, asym, bendp, bendm, bendmp, sync, quant, fold, pwm, orbit,
spin, chaos, primes, binary, brownian, reciprocal, wormhole, logistic, sigmoid, fractal, flip

**Example:**

```
s("morgana").bank("wt_digital").seg(8).note("F1").warp("0 0.25 0.5 0.75 1")
  .warpmode("<asym bendp spin logistic sync wormhole brownian>*2")
```

### warprate

Rate of the LFO for the wavetable oscillator's warp

### warprel

**Synonyms:** `warprelease`

Release time of the wavetable oscillator's warp envelope

### warprelease

**Synonyms:** `warprel`

Release time of the wavetable oscillator's warp envelope

### warpshape

Shape of the LFO for the wavetable oscillator's warp

### warpskew

Skew of the LFO for the wavetable oscillator's warp

### warpsus

**Synonyms:** `warpsustain`

Sustain time of the wavetable oscillator's warp envelope

### warpsustain

**Synonyms:** `warpsus`

Sustain time of the wavetable oscillator's warp envelope

### warpsync

cycle synced rate of the LFO for the wavetable warp position

### wavetablePhaseRand

**Synonyms:** `wtphaserand`

Amount of randomness of the initial phase of the wavetable oscillator.

**Example:**

```
s("basique").bank("wt_digital").seg(16).wtphaserand("<0 1>")
```

### wavetablePosition

**Synonyms:** `wt`

Position in the wavetable of the wavetable oscillator

**Example:**

```
s("squelch").bank("wt_digital").seg(8).note("F1").wt("0 0.25 0.5 0.75 1")
```

### wavetableWarp

**Synonyms:** `warp`

Amount of warp (alteration of the waveform) to apply to the wavetable oscillator

**Example:**

```
s("basique").bank("wt_digital").seg(8).note("F1").warp("0 0.25 0.5 0.75 1")
  .warpmode("spin")
```

### wavetableWarpMode

**Synonyms:** `warpmode`

Type of warp (alteration of the waveform) to apply to the wavetable oscillator.

The current options are: none, asym, bendp, bendm, bendmp, sync, quant, fold, pwm, orbit,
spin, chaos, primes, binary, brownian, reciprocal, wormhole, logistic, sigmoid, fractal, flip

**Example:**

```
s("morgana").bank("wt_digital").seg(8).note("F1").warp("0 0.25 0.5 0.75 1")
  .warpmode("<asym bendp spin logistic sync wormhole brownian>*2")
```

### wchoose

Chooses randomly from the given list of elements by giving a probability to each element

**Example:**

```
note("c2 g2!2 d2 f1").s(wchoose(["sine",10], ["triangle",1], ["bd:6",1]))
```

### wchooseCycles

**Synonyms:** `wrandcat`

Picks one of the elements at random each cycle by giving a probability to each element

**Example:**

```
wchooseCycles(["bd",10], ["hh",1], ["sd",1]).s().fast(8)
```

**Example:**

```
wchooseCycles(["bd bd bd",5], ["hh hh hh",3], ["sd sd sd",1]).fast(4).s()
```

**Example:**

```
// The probability can itself be a pattern
wchooseCycles(["bd(3,8)","<5 0>"], ["hh hh hh",3]).fast(4).s()
```

### when

Applies the given function whenever the given pattern is in a true state.

**Example:**

```
"c3 eb3 g3".when("<0 1>/2", x=>x.sub("5")).note()
```

### whenKey

Do something on a keypress, or array of keypresses
Key name reference

**Example:**

```
s("bd(5,8)").whenKey("Control:j", x => x.segment(16).color("red")).whenKey("Control:i", x => x.fast(2).color("blue"))
```

### withContext

Returns a new pattern with the given function applied to the context field of every hap.

### withHap

As with `withHaps`, but applies the function to every hap, rather than every list of haps.

### withHaps

Returns a new pattern with the given function applied to the list of haps returned by every query.

### withHapSpan

Similar to `withQuerySpan`, but the function is applied to the timespans
of all haps returned by pattern queries (both `part` timespans, and where
present, `whole` timespans).

### withHapTime

As with `withHapSpan`, but the function is applied to both the
begin and end time of the hap timespans.

### within

Use within to apply a function to only a part of a pattern.

### withLoc

Returns a new pattern with the given location information added to the
context of every hap.

### withQuerySpan

Returns a new pattern, where the given function is applied to the query
timespan before passing it to the original pattern.

### withQueryTime

As with `withQuerySpan`, but the function is applied to both the
begin and end time of the query timespan.

### withValue

**Synonyms:** `fmap`

Returns a new pattern, with the function applied to the value of
each hap. It has the alias `fmap`.

**Example:**

```
"0 1 2".withValue(v => v + 10).log()
```

### wordfall

Displays a vertical pianoroll with event labels.
Supports all the same options as pianoroll.

### wrandcat

**Synonyms:** `wchooseCycles`

Picks one of the elements at random each cycle by giving a probability to each element

**Example:**

```
wchooseCycles(["bd",10], ["hh",1], ["sd",1]).s().fast(8)
```

**Example:**

```
wchooseCycles(["bd bd bd",5], ["hh hh hh",3], ["sd sd sd",1]).fast(4).s()
```

**Example:**

```
// The probability can itself be a pattern
wchooseCycles(["bd(3,8)","<5 0>"], ["hh hh hh",3]).fast(4).s()
```

### writeOutputs

Write next web audio block from output buffers

### wt

**Synonyms:** `wavetablePosition`

Position in the wavetable of the wavetable oscillator

**Example:**

```
s("squelch").bank("wt_digital").seg(8).note("F1").wt("0 0.25 0.5 0.75 1")
```

### wtatt

**Synonyms:** `wtattack`

Attack time of the wavetable oscillator's position envelope

### wtattack

**Synonyms:** `wtatt`

Attack time of the wavetable oscillator's position envelope

### wtdc

DC offset of the LFO for the wavetable oscillator's position

### wtdec

**Synonyms:** `wtdecay`

Decay time of the wavetable oscillator's position envelope

### wtdecay

**Synonyms:** `wtdec`

Decay time of the wavetable oscillator's position envelope

### wtdepth

Depth of the LFO for the wavetable oscillator's position

### wtenv

Amount of envelope applied wavetable oscillator's position envelope

### wtphaserand

**Synonyms:** `wavetablePhaseRand`

Amount of randomness of the initial phase of the wavetable oscillator.

**Example:**

```
s("basique").bank("wt_digital").seg(16).wtphaserand("<0 1>")
```

### wtrate

Rate of the LFO for the wavetable oscillator's position

### wtrel

**Synonyms:** `wtrelease`

Release time of the wavetable oscillator's position envelope

### wtrelease

**Synonyms:** `wtrel`

Release time of the wavetable oscillator's position envelope

### wtshape

Shape of the LFO for the wavetable oscillator's position

### wtskew

Skew of the LFO for the wavetable oscillator's position

### wtsus

**Synonyms:** `wtsustain`

Sustain time of the wavetable oscillator's position envelope

### wtsustain

**Synonyms:** `wtsus`

Sustain time of the wavetable oscillator's position envelope

### wtsync

cycle synced rate of the LFO for the wavetable oscillator's position

### xfade

**Example:**

```
xfade(s("bd*2"), "<0 .25 .5 .75 1>", s("hh*8"))
```

### zip

*Experimental*

'zips' together the steps of the provided patterns. This can create a long repetition, taking place over a single, dense cycle.
Using `pace` to set the number of steps per cycle is therefore usually recommended.

**Example:**

```
zip("e f", "e f g", "g [f e] a f4 c").note()
   .sound("folkharp")
   .pace(8)
```

### zoom

Plays a portion of a pattern, specified by the beginning and end of a time span. The new resulting pattern is played over the time period of the original pattern:

**Example:**

```
s("bd*2 hh*3 [sd bd]*2 perc").zoom(0.25, 0.75)
// s("hh*3 [sd bd]*2") // equivalent
```

