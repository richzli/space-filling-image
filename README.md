# space-filling-image

This is my final project for Purdue's MA 440 (Honors Real Analysis) class. Inspired by discussions of cardinality, this script takes a image, resizes it to 32x32, then follows the path of a few space-filling curves along the pixels of the image.

## z-order curves

Z-order curves are the most related to discussions of cardinality. An easy way to create a bijective mapping between R<sup>2</sup> and R is by just interleaving the digits of two numbers. That's basically how the Z-order curve works, too: by interleaving bits of the two coordinates. This makes Z-order curves the easiest to implement by far; all that's required to change from line to image is just a little bitshifting.

The main drawback to z-order curves is that it's not very continuous; it quickly jumps from one part of an image to the next. You can see the effects when you test out the program on the sample image; there are different patches of color everywhere.

## hilbert curves

Hilbert curves are probably the most well-known of space-filling curves. It uses recursion with a U-shaped base case to "fold" a line around the shape.

## peano curves

Peano curves (or Hilbert II curves) are a third type of space-filling curve I found while doing some reading. Unlike the other two covers, Peano curves split the space up into powers of three, not two! This means that the image being 32x32 cannot fit a Peano curve perfectly. To account for this, I actually pretend the image is 27x27, and just find the nearest neighbor for each power-of-three pixel that corresponds.