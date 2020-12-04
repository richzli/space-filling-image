# space-filling-image

This is my final project for Purdue's MA 440 (Honors Real Analysis) class. Inspired by discussions of cardinality, this script takes a image, resizes it to 32x32, then follows the path of a few space-filling curves along the pixels of the image.

## z-order curves

Z-order curves are the most related to discussions of cardinality. An easy way to create a bijective mapping between R<sup>2</sup> and R is by just interleaving the digits of two numbers. That's basically how the Z-order curve works, too: by interleaving bits of the two coordinates. This makes Z-order curves the easiest to implement by far; all that's required to change from line to image is just a little bitshifting.

The main drawback to z-order curves is that it's not very continuous; it quickly jumps from one part of an image to the next. You can see the effects when you test out the program on the sample image; there is a clear jump in color in the middle of the resulting image, and less clear, yet still visible, jumps at the one-fourths and three-fourths marks. Unrolling the z-order curve still does preserve locality within smaller regions.

## hilbert curves

Hilbert curves are probably the most well-known of space-filling curves. It uses recursion with a U-shaped base case to "fold" a line around the shape. In contrast to the Z-order curve, the Hilbert curve does a pretty good job of keeping similar colors together. You can clearly see the path the Hilbert curve takes on the sample image: orange-yellow regions lead (sort of) smoothly into the pink region, then blue, then green.

However, actually implementing this recursion was more difficult than expected. I not only had to account for the recursive substructure, but also the direction the curve travels in, as well as accounting for changes in the algorithm when rotating subproblems.

## peano curves

Peano curves (or Hilbert II curves) are a third type of space-filling curve I found while doing some reading. Unlike the other two covers, Peano curves split the space up into powers of three, not two! This means that the image being 32x32 cannot fit a Peano curve perfectly. To account for this, I actually pretend the image is 27x27, and unroll the image using the approximate location of each pixel.

The Peano curve code was also tricky in the sense that the recursive function took some time to work out. I think it produces the nicest image of the three, though. There's a clear movement from left to right of the image, and the white part in the middle of the sample image is pretty much in the center of the unrolled image, as well.

Of course, the Peano curve doesn't see as many applications probably because it works in powers of 3, not 2, which is not ideal for binary-based systems like computers. However, it's still a pretty neat visualization.

## the reverse direction

Because space-filling curves are bijections from the line onto the plane, we can easily apply the same function in the reverse direction. In this case, the image is resized to 1024x1 (but stretched out to a 512x50 display for viewing convenience) and then drawn in on a 32x32 square (or 27x27 square, for the Peano curve).