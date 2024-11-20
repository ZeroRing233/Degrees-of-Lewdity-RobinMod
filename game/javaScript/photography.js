import Sortable from 'sortablejs'
console.log("sortable导入成功")

function getPhotographyImageList() {
    $(function() {
        let gallery = document.getElementById("gallery");
        V.photographyImageList.forEach((image, index) => {
            let imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");
            imageContainer.id = "item" + index;
            let imgElement = document.createElement("img");
            imgElement.id = "image-" + index;
            imgElement.src = image;
            imgElement.alt = "相册图片 " + (index + 1);
            imgElement.onclick = function() {
                let modal = document.getElementById('myModal');
                let modalImg = document.getElementById("img01");
                modal.style.display = "block";
                modalImg.src = this.src;
                modalImg.alt = this.alt;
            };
            imageContainer.appendChild(imgElement);
            gallery.appendChild(imageContainer);
        });
    });
}
window.getPhotographyImageList = getPhotographyImageList;

function managePhotographyImageList() {
    $(function() {
        let gallery = document.getElementById("gallery2");
        V.photographyImageList.forEach((image, index) => {
            let imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");
            imageContainer.setAttribute("data-id", "item" + index);
            imageContainer.id = "item" + index;
            let imgElement = document.createElement("img");
            imgElement.id = "image-" + index;
            imgElement.src = image;
            imgElement.alt = "相册图片 " + (index + 1);
            imageContainer.appendChild(imgElement);
            gallery.appendChild(imageContainer);
        });

        let sortable = new Sortable(gallery, {
            dataIdAttr: 'data-id',
            animation: 150,
            group: 'shared',
            draggable: '.image-container',
            onEnd: function(evt) {
                // 获取排序后的元素顺序
                window.order = sortable.toArray();
                // 将排序结果发送到服务器或本地存储
                console.log("当前item是" + evt.item.outerHTML)
                console.log("当前oldIndex是" + evt.oldIndex)
                console.log("当前newIndex是" + evt.newIndex)
                console.log("当前数组元素的顺序是" + window.order);
                console.log("当前evt.to是" + evt.to.outerHTML);
                if (evt.to === document.getElementById('delete-zone')) {
                    evt.item.remove();
                }
            }
        });

        Sortable.create(document.getElementById('delete-zone'), {
            animation: 150,
            group: 'shared',
            sort: false // Disable sorting within the delete zone
        });
    });
}
window.managePhotographyImageList = managePhotographyImageList;

function photograhyCancelClicked() {
    window.modSweetAlert2Mod.fire({
        title: '确定要取消更改吗?',
        text: '取消后，所有未保存的更改将丢失。',
        icon: 'warning',
        showCancelButton: true, // 显示取消按钮
        confirmButtonText: '确定取消', // 确定按钮文字
        cancelButtonText: '我再想想', // 取消按钮文字
        reverseButtons: true // 将按钮顺序反转，确保取消按钮在前
    }).then((result) => {
        if (result.isConfirmed) {
            // 用户点击了确认按钮
            window.modSweetAlert2Mod.fire('已取消', '操作被取消', 'info');
            SugarCube.Engine.play("Bedroom");
            //  window.modSweetAlert2Mod.fire('已确认', '操作已执行！', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // 用户点击了取消按钮
            console.log("用户击取消，应当无事发生");
        }
    });
}
window.photograhyCancelClicked = photograhyCancelClicked;

function photograhyConfirmClicked() {
    window.modSweetAlert2Mod.fire({
        title: '确定要保存更改吗?',
        text: '确定后，已经删除的照片将无法找回。（当然，可以回档）',
        icon: 'warning',
        showCancelButton: true, // 显示取消按钮
        confirmButtonText: '确定', // 确定按钮文字
        cancelButtonText: '我再想想', // 取消按钮文字
        reverseButtons: true // 将按钮顺序反转，确保取消按钮在前
    }).then((result) => {
        if (result.isConfirmed) {
            // 用户点击了确认按钮
            window.modSweetAlert2Mod.fire('已确认', '操作已执行！', 'success');
            SugarCube.Engine.play("Bedroom");
            //  window.modSweetAlert2Mod.fire('已确认', '操作已执行！', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // 用户点击了取消按钮
            console.log("用户击取消，应当无事发生");
        }
    });
}
window.photograhyConfirmClicked = photograhyConfirmClicked;

function savePhotographyResult() {
    let tempImg = [];
    for (dataId in window.order) {
        let imgElement = document.querySelector(`[data-id="${dataId}"] img`);
        console.log("获取到的imgElement是" + imgElement);
        tempImg.pushUnique(imgElement.src);
    }
    V.photographyImageList = tempImg;
}
window.savePhotographyResult = savePhotographyResult;