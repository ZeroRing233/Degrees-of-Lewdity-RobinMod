function getPhotographyImageList() {
    $(function() {
        const gallery = document.getElementById("gallery");
        V.photographyImageList.forEach(image => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");

            const imgElement = document.createElement("img");
            imgElement.src = image;
            imgElement.alt = "相册图片";

            imageContainer.appendChild(imgElement);
            gallery.appendChild(imageContainer);
        });
    });
}
window.getPhotographyImageList = getPhotographyImageList;