function showPostClicked() {
    let value = $('input[name="showPoster"]:checked').val();
    if (value === "showPoster") {
        V.options.showPoster = true;
        $('.orphanagePosterSetting').show();
    } else {
        V.options.showPoster = false;
        $('.orphanagePosterSetting').hide();
    }
}
window.showPostClicked = showPostClicked;