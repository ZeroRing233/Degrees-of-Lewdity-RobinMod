// 我也不知道会不会覆盖，总之先这样加
$(document).on(":oncloseoverlay", () => {
    if (V.robinModSetting) {
        SugarCube.State.show();
        delete V.robinModSetting;
    }
    if (!Renderer.lastModel) return;
    Renderer.refresh(Renderer.lastModel);
});

function show_image(id) {
    //首先获取到文件输入框和img元素
    //alert('show_iamge_id是' + id)
    if (!id) {
        return;
    }
    let file_input = document.getElementById(id);
    let type = id.split("_").slice(-1)[0];
    let show_img = document.getElementById("show_img_" + type);
    let img_delete = document.getElementById("img_delete_" + type);
    let file = file_input.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
        show_img.src = e.target.result;
        show_img.style.display = 'block';
        img_delete.style.display = 'block';
        V.robinPhotography[id] = e.target.result;
    };
    reader.readAsDataURL(file);
}
window.show_image = show_image;

function img_delete_click(id) {
    if (!id) {
        return;
    }
    let type = id.split("_").slice(-1)[0];
    let file_input = document.getElementById("file_input_" + type);
    let show_img = document.getElementById("show_img_" + type);
    let img_delete = document.getElementById("img_delete_" + type);
    show_img.src = '';
    file_input.value = '';
    show_img.style.display = 'none';
    img_delete.style.display = 'none';
    delete V.robinPhotography[id];
}
window.img_delete_click = img_delete_click;

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
    let captionText = document.getElementById("modal-caption");
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