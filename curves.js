function z_order_coords(index) {
    var x_digits = index & 0b0101010101;
    var y_digits = index & 0b1010101010;
    
    var reduce = num => {
        var r = 0;
        for (i = 0; i < 5; ++i) {
            r += (1 << i) * (num & 1);
            num >>= 2;
        }
        return r;
    }

    return [reduce(x_digits), reduce(y_digits >> 1)];
}

function hilbert_coords(index) {
    
    function h_recurse(idx, size, rot, flip) {
        if (size == 1) return [0, 0];

        var halfsize = size / 2;
        var quadrant = Math.floor(idx / (halfsize * halfsize));
        var position = idx % (halfsize * halfsize);
        var x = 0, y = 0;

        switch (quadrant) {
            case 0:
                [x, y] = h_recurse(position, halfsize, 1, true);
                break;
            case 1:
                [x, y] = h_recurse(position, halfsize, 0, false);
                y += halfsize;
                break;
            case 2:
                [x, y] = h_recurse(position, halfsize, 0, false);
                x += halfsize;
                y += halfsize;
                break;
            case 3:
                [x, y] = h_recurse(position, halfsize, 3, true);
                x += halfsize;
                break;
        }

        if (flip) {
            x = size - 1 - x;
        }

        switch (rot) {
            case 0:
                return [x, y];
            case 1:
                return [y, size - 1 - x];
            case 3:
                return [size - 1 - y, x];
        }
    }

    return h_recurse(index, 32, 0);
}

function peano_coords(index) {
    
    function p_recurse(idx, size, dir) {
        if (size == 1) return [0, 0];

        var thirdsize = size / 3;
        var nonant = Math.floor(idx / (thirdsize * thirdsize));
        var position = idx % (thirdsize * thirdsize);
        var x_delta = 0, y_delta = 0, dir_delta = 0;

        switch (nonant) {
            case 0:
                break;
            case 1:
                dir_delta = 1;
                y_delta = thirdsize;
                break;
            case 2:
                y_delta = thirdsize * 2;
                break;
            case 3:
                dir_delta = 3;
                x_delta = thirdsize;
                y_delta = thirdsize * 2;
                break;
            case 4:
                dir_delta = 2;
                x_delta = thirdsize;
                y_delta = thirdsize;
                break;
            case 5:
                dir_delta = 3;
                x_delta = thirdsize;
                break;
            case 6:
                dir_delta = 0;
                x_delta = thirdsize * 2;
                break;
            case 7:
                dir_delta = 1;
                x_delta = thirdsize * 2;
                y_delta = thirdsize;
                break;
            case 8:
                dir_delta = 0;
                x_delta = thirdsize * 2;
                y_delta = thirdsize * 2;
                break;
        }

        var [x, y] = p_recurse(position, thirdsize, dir_delta);
        x += x_delta;
        y += y_delta;

        switch (dir) {
            case 0:
                return [x, y];
            case 1:
                return [size - 1 - x, y];
            case 2:
                return [size - 1 - x, size - 1 - y];
            case 3:
                return [x, size - 1 - y];
        }
    }

    return p_recurse(index, 27, 0);
}