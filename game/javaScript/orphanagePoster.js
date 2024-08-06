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
        V.options.showRobinNote = false;
        $('.robinNoteSetting').hide();
    }
}
window.showRobinNoteClicked = showRobinNoteClicked;

function robinRoomNoteCondition() {
    let noteList = ['school', 'sleep', 'beach', 'park']
    return V.robinmissing === 0 && V.christmas_robin_lewd !== 1 &&
        noteList.includes(T.robin_location) && V.options.showRobinNote
}
window.robinRoomNoteCondition = robinRoomNoteCondition;