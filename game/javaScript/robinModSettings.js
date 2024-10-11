// 我也不知道会不会覆盖，总之先这样加
$(document).on(":oncloseoverlay", () => {
    if (V.robinModSetting) {
        SugarCube.State.show();
        delete V.robinModSetting;
    }
    if (!Renderer.lastModel) return;
    Renderer.refresh(Renderer.lastModel);
});

function loadImg_test() {
    var files = $('#imgs')[0].files;

    var readFile = function(file) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function(e) {
                resolve(e.target.result);
            }
            reader.readAsDataURL(file);
        })
    }

    var gen = async function() {
        var f, img;
        for (var i = 0, l = files.length; i < l; i++) {
            f = await readFile(files[i]);
            img = document.createElement('img');
            img.src = f;
            $('#imgDiv').append(img);
        }
    }
    gen();
}

async function show_image() {
    //首先获取到文件输入框和img元素
    let file_input = document.getElementById("file_input");
    let show_img = document.getElementById("show_img");
    let file = file_input.files[0];
    let readFile = function(file) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function(e) {
                alert("我觉得我还可以抢救一下" + e.target.result);
                resolve(e.target.result);
            }
            reader.readAsDataURL(file);
        })
    }
    let gen = async function() {
        // alert('这个能执行，真的能')
        f = await readFile(file);
        alert("获取到的f是" + f);
        show_img.src = f;
        show_img.style.display = 'block';
    }
    gen();
    //创建URL对象
    //show_img.src = window.URL.createObjectURL(file_input.files[0]);
    //显示图片
    //show_img.style.display = 'block';
}
window.show_image = show_image;