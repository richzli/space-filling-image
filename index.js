var cvs = document.getElementById("original");
var ctx = cvs.getContext("2d");

var z_cvs = document.getElementById("z-order");
var z_ctx = z_cvs.getContext("2d");

var h_cvs = document.getElementById("z-order");
var h_ctx = z_cvs.getContext("2d");

var p_cvs = document.getElementById("z-order");
var p_ctx = z_cvs.getContext("2d");

document.getElementById("unroll").disabled = true;
document.getElementById("browse").onclick = () => { document.getElementById('img-input').click(); };
document.getElementById("img-input").onchange = () => {
    var input = document.getElementById("img-input").files[0];
    document.getElementById("selected-file").innerText = input.name;

    var img = new Image();
    img.src = URL.createObjectURL(input);
    img.onload = () => {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
    };

    document.getElementById("unroll").disabled = false;
};

function load_sample() {
    document.getElementById("selected-file").innerText = "sample.png";

    var img = new Image();
    img.src = "./sample.png";
    img.onload = () => {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
    };

    document.getElementById("unroll").disabled = false;
}

function do_it() {
    z_ctx.clearRect(0, 0, z_cvs.width, z_cvs.height);
    h_ctx.clearRect(0, 0, h_cvs.width, h_cvs.height);
    p_ctx.clearRect(0, 0, p_cvs.width, p_cvs.height);

    for (var i = 0; i < 1024; ++i) {
        var [x, y] = z_order_coords(i);
        var color = ctx.getImageData(x, y, 1, 1).data;
        draw_stripe(z_ctx, i, color);
    }
}

function draw_stripe(ctx, x, color) {
    ctx.lineWidth = "1";
    ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 49);
    ctx.stroke();
}

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
    return [0, 0];
}

function peano_coords(index) {
    return [0, 0];
}