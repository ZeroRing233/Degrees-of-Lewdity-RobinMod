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