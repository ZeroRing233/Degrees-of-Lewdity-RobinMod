const Sortable = require('sortablejs');

function getPhotographyImageList() {
    $(function() {
        const gallery = document.getElementById("gallery");
        V.photographyImageList.forEach((image, index) => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");
            const imgElement = document.createElement("img");
            imgElement.id = "image-" + index;
            imgElement.src = image;
            imgElement.alt = "相册图片 " + (index + 1);
            Sortable.create(imageContainer);
            //拖动相关，只能拖动框不能拖图片
            // imgElement.draggable = false;
            // imageContainer.draggable = true;
            // imageContainer.addEventListener('dragstart', handleDragStart_photo);
            // imageContainer.addEventListener('dragover', handleDragOver_photo);
            // imageContainer.addEventListener('drop', handleDrop_photo);
            imgElement.onclick = function() {
                // 点击图片时执行的代码
                // 例如：放大图片、显示图片信息等
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

// 原因：要拖动的是框，不是图片
function handleDragStart_photo(event) {
    if (event.target.classList.contains('image-container')) {
        window.draggedImage = event.target;
    }
}

function handleDragOver_photo(event) {
    event.preventDefault(); // 必须阻止默认行为才能触发 drop 事件
}

function handleDrop_photo(event) {
    if (!window.draggedImage) {
        alert("无法获取拖动位置！取消排序");
        return;
    }
    event.preventDefault();
    const gallery = document.getElementById("gallery");
    const images = document.querySelectorAll('.image-container');
    const targetImage = event.target;
    console.log("targetImage是" + targetImage);

    // 获取拖拽元素和目标元素的索引
    const draggedIndex = Array.from(images).indexOf(window.draggedImage);
    const targetIndex = Array.from(images).indexOf(targetImage);

    // 在目标元素之前插入拖拽元素
    if (draggedIndex < targetIndex) {
        gallery.insertBefore(window.draggedImage, targetImage.nextSibling);
    } else {
        gallery.insertBefore(window.draggedImage, targetImage);
    }
}