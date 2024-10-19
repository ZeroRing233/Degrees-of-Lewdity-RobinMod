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