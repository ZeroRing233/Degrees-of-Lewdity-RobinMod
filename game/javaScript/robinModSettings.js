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
    let size = file.size;
    let size_limit = 512 * 1024;
    if (size > size_limit) {
        window.modSweetAlert2Mod.fire(
            // do anything the ``Swal.fire()`` can do
            {
                icon: 'warning',
                text: '上传图片的大小不能超过0.5mb（512kb)',
                showCancelButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            }
        );
        file_input.value = '';
        return;
    }
    let reader = new FileReader();
    reader.onload = function(e) {
        show_img.src = e.target.result;
        show_img.style.display = 'block';
        img_delete.style.display = 'block';
        V.robinPhotography[type] = e.target.result;
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
    delete V.robinPhotography[type];
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

// 点击勾选，原先的图片被替换为默认图片，不展示删除按钮，上传图片按钮无法点击；取消勾选，则清空当前图片，上传图片按钮恢复为可点击，再次上传回复删除按钮。
// 目前只有一张，所以简化了图片获取逻辑。
async function enable_default_photo(id, checked) {
    let type = id.split("_").slice(-1)[0];
    let file_input = document.getElementById("file_input_" + type);
    let show_img = document.getElementById("show_img_" + type);
    let img_delete = document.getElementById("img_delete_" + type);
    if (checked) {
        let imageData = "";
        if (C.npc.Robin.pronoun === "m") {
            imageData = await window.modSC2DataManager.getHtmlTagSrcHook().requestImageBySrc("img/photography/default-robin-m.jpg");
        } else {
            imageData = await window.modSC2DataManager.getHtmlTagSrcHook().requestImageBySrc("img/photography/default-robin-f.jpg");
        }
        show_img.style.display = 'block';
        show_img.src = imageData;
        V.robinPhotography[type] = imageData;
        img_delete.style.display = 'none';
        file_input.disabled = true;
        V.enableDefaultPhotography.photographyImgRobin = true;
    } else {
        show_img.style.display = 'none';
        show_img.src = "";
        V.robinPhotography[type] = "";
        img_delete.style.display = 'none';
        file_input.disabled = false;
        V.enableDefaultPhotography.photographyImgRobin = false;
    }
}
window.enable_default_photo = enable_default_photo;

// 偷个懒，页面加载完先手动执行一遍
async function enable_default_photo_onload() {
    $(function() {
        enable_default_photo("enable_default_photo_photographyImgRobin", V.enableDefaultPhotography.photographyImgRobin);
    });
}
window.enable_default_photo_onload = enable_default_photo_onload;

function tutorParentGenderClicked() {
    let value = $('input[name="tutorParentGender"]:checked').val();
    if (value === "f") {
        V.tutor.parentGender = "f";
        $('.tutorParentDescFemale').show();
        $('.tutorParentDescMale').hide();
    } else {
        V.tutor.parentGender = "m";
        $('.tutorParentDescFemale').hide();
        $('.tutorParentDescMale').show();
    }
}
window.tutorParentGenderClicked = tutorParentGenderClicked;