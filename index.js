document.getElementById("browse").onclick = () => { document.getElementById('img-input').click(); };
document.getElementById("img-input").onchange = () => {
    var image = document.getElementById("img-input").files[0];
    document.getElementById("selected-file").innerText = image.name;
};

function doIt() {
    var image = document.getElementById("img-input").files[0];
    alert("ya!");
}