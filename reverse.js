var cvs = document.getElementById("original");
var ctx = cvs.getContext("2d");

var z_cvs = document.getElementById("z-order");
var z_ctx = z_cvs.getContext("2d");

var h_cvs = document.getElementById("hilbert");
var h_ctx = h_cvs.getContext("2d");

var p_cvs = document.getElementById("peano");
var p_ctx = p_cvs.getContext("2d");

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
    document.getElementById("selected-file").innerText = "sample_rev.png";

    var img = new Image();
    img.src = "./sample_rev.png";
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
        var color = ctx.getImageData(i, 0, 1, 1).data;
        draw_pixel(z_ctx, x, y, color);

        [x, y] = hilbert_coords(i);
        color = ctx.getImageData(i, 0, 1, 1).data;
        draw_pixel(h_ctx, x, y, color);
    }

    for (var i = 0; i < 729; ++i) {
        var [x, y] = peano_coords(i);
        var color = ctx.getImageData(Math.floor(i / 729 * 1024), 0, 1, 1).data;
        draw_pixel(p_ctx, x, y, color);
    }
}

function draw_pixel(ctx, x, y, color) {
    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`;
    ctx.fillRect(x, y, 1, 1);
}