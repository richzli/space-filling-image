# space-filling-image

This is my final project for Purdue's MA 440 (Honors Real Analysis) class. Inspired by discussions of cardinality, this script takes a image, resizes it to 32x32, then follows the path of a few space-filling curves along the pixels of the image. I wrote the algorithms for these space-filling curves myself by analyzing the behavior of these fractals.

## z-order curves

Z-order curves are the most related to discussions of cardinality. An easy way to create a bijective mapping between R<sup>2</sup> and R is by just interleaving the digits of two numbers. That's basically how the Z-order curve works, too: by interleaving bits of the two coordinates. This produces a Z-like fractal pattern.

![](https://github.com/richzli/space-filling-image/blob/master/z-img.png)

<sup>(diagram courtesy of [Wikipedia](https://en.wikipedia.org/wiki/Z-order_curve))</sup>

This makes Z-order curves the easiest to implement by far; all that's required to change from line to image is just a little bitshifting.

The main drawback to z-order curves is that it's not very continuous; it quickly jumps from one part of an image to the next. You can see the effects when you test out the program on the sample image; there is a clear jump in color in the middle of the resulting image, and less clear, yet still visible, jumps at the one-fourths and three-fourths marks. Unrolling the z-order curve still does preserve locality within smaller regions.

## hilbert curves

Hilbert curves are probably the most well-known of space-filling curves. It uses recursion with a U-shaped base case to "fold" a line around the shape.

![](https://github.com/richzli/space-filling-image/blob/master/h-img.png)

<sup>(diagrams courtesy of [Wikipedia](https://en.wikipedia.org/wiki/Hilbert_curve))</sup>

In contrast to the Z-order curve, the Hilbert curve does a pretty good job of keeping similar colors together. You can clearly see the path the Hilbert curve takes on the sample image: orange-yellow regions lead relatively smoothly into the pink region, then blue, then green.

However, actually implementing this recursion was more difficult than expected. I not only had to account for the recursive substructure, but also the direction the curve travels in, as well as dealing with the rotation of the smaller-order fractals. It took me a while until I got my algorithm working correctly.

## peano curves

Peano curves (or Hilbert II curves) are a third type of space-filling curve I found while doing some reading. Its fractal structure is a repeated "S" shape.

![](https://github.com/richzli/space-filling-image/blob/master/p-img.png)

<sup>(diagrams courtesy of [Wikipedia](https://en.wikipedia.org/wiki/Peano_curve) and [Cut the Knot](https://www.cut-the-knot.org/Curriculum/Geometry/PeanoComplete.shtml))</sup>

Unlike the other two curves, Peano curves split the space up into powers of three, not two! This means that the image being 32x32 cannot fit a Peano curve perfectly. To account for this, I actually pretend the image is 27x27, and unroll the image using the approximate location of each pixel.

The Peano curve code was also tricky in the sense that the recursive function took some time to work out. I think it produces the nicest image of the three, though. There's a clear movement from left-side colors to right-side colors of the sample image, and the white part in the middle of the original image is pretty much in the center of the unrolled image, as well.

Of course, the Peano curve doesn't see as many applications probably because it works in powers of 3, not 2, which is not ideal for binary-based systems like computers. However, it's still a pretty neat visualization.

## the reverse direction, and some math

Because space-filling curves are functions from the line onto the plane, we can easily apply the same function in the reverse direction. In this case, the image is resized to 1024x1 (but stretched out to a 512x50 display for viewing convenience) and then drawn in on a 32x32 square (or 27x27 square, for the Peano curve).

Note that this "inverse" only works because we are working with a finite amount of pixels! It can be easily proven that there is no continuous bijection between the unit segment and the unit line due to properties of continuity and connectedness.

For example, the midpoint (1/2, 1/2) of the unit square is approached by three points from the Hilbert curve (1/8, 1/2, and 7/8) and four points from the Z-order curve (1/4, 7/16, 9/16, and 3/4)! You can see this very clearly by looking at the white areas in the decomposition of the sample image. So while these space-filling curves (in the limiting case) are surjective, they are not injective.

## conclusion

Overall this was a pretty fun visualization to work on, seeing how different fractal curves behave on images. The math, while annoying to implement and debug, was actually pretty fun to work out. You can find a ton of Hilbert curve visualizers online, but being able to compare and contrast different types of space-filling curves is not something you see everywhere.