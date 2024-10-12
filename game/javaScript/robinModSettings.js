// 我也不知道会不会覆盖，总之先这样加
$(document).on(":oncloseoverlay", () => {
    if (V.robinModSetting) {
        SugarCube.State.show();
        delete V.robinModSetting;
    }
    if (!Renderer.lastModel) return;
    Renderer.refresh(Renderer.lastModel);
});

function show_image() {
    //首先获取到文件输入框和img元素
    let file_input = document.getElementById("file_input");
    let show_img = document.getElementById("show_img");
    let file = file_input.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
        // alert("我觉得我还可以抢救一下" + e.target.result);
        show_img.src = e.target.result;
        show_img.style.display = 'block';
        V.photographyImg = e.target.result;
    };
    reader.readAsDataURL(file);
}
window.show_image = show_image;

function image_click(id) {
    // 获取图片模态框，alt 属性作为图片弹出中文本描述
    if (!id) {
        return;
    }
    let img = document.getElementById(id);
    if (!img) {
        return;
    }
    let modal = document.getElementById('myModal');
    let modalImg = document.getElementById("img01");
    let captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    captionText.innerHTML = img.alt;
}
window.image_click = image_click;

function close_click() {
    let modal = document.getElementById('myModal');
    modal.style.display = "none";
}
window.close_click = close_click;