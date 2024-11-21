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
                if (evt.to === document.getElementById('delete-zone')) {
                    evt.item.remove();
                }
            },
            onMove: function(evt) {
                // Check if the item was dropped into the delete zone
                let deleteZone = document.getElementById('delete-zone');
                if (evt.to === deleteZone) {
                    console.log("移到了deleteZone");
                    deleteZone.style.content = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNkM2QzZDMiIGQ9Im0yMC4zNyA4LjkxbC0xIDEuNzNsLTEyLjEzLTdsMS0xLjczbDMuMDQgMS43NWwxLjM2LS4zN2w0LjMzIDIuNWwuMzcgMS4zN3pNNiAxOVY3aDUuMDdMMTggMTF2OGEyIDIgMCAwIDEtMiAySDhhMiAyIDAgMCAxLTItMiIvPjwvc3ZnPg==')";
                } else {
                    console.log("移到了其他区域");
                    deleteZone.style.content = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNkM2QzZDMiIGQ9Ik0xOSA0aC0zLjVsLTEtMWgtNWwtMSAxSDV2MmgxNE02IDE5YTIgMiAwIDAgMCAyIDJoOGEyIDIgMCAwIDAgMi0yVjdINnoiLz48L3N2Zz4=')";
                }
            }
        });

        // 防止用户不做任何操作就保存
        window.order = sortable.toArray();

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
            zoom(V.options.zoom);
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
            savePhotographyResult();
            zoom(V.options.zoom);
            SugarCube.Engine.play("Bedroom");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // 用户点击了取消按钮
            console.log("用户击取消，应当无事发生");
        }
    });
}
window.photograhyConfirmClicked = photograhyConfirmClicked;

function savePhotographyResult() {
    let tempImg = [];
    for (let dataId of window.order) {
        let imgElement = document.querySelector(`div[data-id='${dataId}'] > img`);
        tempImg.pushUnique(imgElement.src);
    }
    V.photographyImageList = tempImg;
}
window.savePhotographyResult = savePhotographyResult;