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

function showRobinNoteClicked() {
    let value = $('input[name="showRobinNote"]:checked').val();
    if (value === "showRobinNote") {
        V.options.showRobinNote = true;
        $('.robinNoteSetting').show();
    } else {
        V.options.showPoster = false;
        $('.robinNoteSetting').hide();
    }
}
window.showRobinNoteClicked = showRobinNoteClicked;