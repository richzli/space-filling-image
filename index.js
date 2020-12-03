document.getElementById("browse").onclick = () => { document.getElementById('img-input').click(); };
document.getElementById("img-input").onchange = () => {
    var input = document.getElementById("img-input").files[0];
    document.getElementById("selected-file").innerText = input.name;

    var img = new Image();
    img.src = URL.createObjectURL(input);
    img.onload = () => {
        var cvs = document.getElementById("original");
        var ctx = cvs.getContext("2d");
        ctx.drawImage(img, 0, 0, 32, 32);
    };
};

function doIt() {
    alert("ya!");
}