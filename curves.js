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
    
    function h_recurse(idx, size, rot) {
        if (size == 1) return [0, 0];

        var quadrant = Math.floor(idx / (size * size / 4));
        var position = idx % (size * size / 4);
        var [x, y] = [0, 0];

        switch (quadrant) {
            case 0:
                [x, y] = h_recurse(position, size / 2, (rot + 1 + (rot % 2) * 2) % 4);
                break;
            case 1:
                [x, y] = h_recurse(position, size / 2, rot);
                y += size / 2;
                break;
            case 2:
                [x, y] = h_recurse(position, size / 2, rot);
                x += size / 2;
                y += size / 2;
                break;
            case 3:
                [x, y] = h_recurse(position, size / 2, (rot + 3 + (rot % 2) * 2) % 4);
                x += size / 2;
                break;
        }

        switch (rot) {
            case 0:
                return [x, y];
            case 1:
                return [y, x];
            case 2:
                return [size - 1 - x, size - 1 - y];
            case 3:
                return [size - 1 - y, size - 1 - x];
        }
    }

    return h_recurse(index, 32, 0);
}

function peano_coords(index) {
    return [0, 0];
}