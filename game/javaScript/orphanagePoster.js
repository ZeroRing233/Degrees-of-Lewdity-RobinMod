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

// 别问我为什么写在这
function robinModHintClicked() {
    $.wiki("<<overlayReplace \"robinModHint\">>");
}
window.robinModHintClicked = robinModHintClicked;

function robinModSearchButtonClicked() {
    // 点击搜索前，先清空之前的文本高亮
    robinModClearButtonClicked();
    let value = T.robinModHintTextbox;
    if (!value || value.trim() === "") {
        return;
    }
    value = value.trim();
    let regex = new RegExp(value, 'g');
    let prehtml = document.getElementById("robinModHintContent").innerHTML;
    let newHtml = prehtml.replace(regex, "<span class='gold searchResult'>" + value + '</span>');
    document.getElementById("robinModHintContent").innerHTML = newHtml;
    let el = document.getElementsByClassName('searchResult');
    if (el.length > 0) {
        el[0].scrollIntoView();
    } else {
        let newElement = document.createElement('span');
        newElement.style.color = "gold";
        newElement.id = "noSearchResult";
        let newContent = document.createTextNode("无结果");
        // 添加文本节点 到这个新的 div 元素
        newElement.appendChild(newContent);
        let targetElement = document.getElementById('robinModHintContent');
        insertBefore(newElement, targetElement);
    }

}
window.robinModSearchButtonClicked = robinModSearchButtonClicked;

// 清空文本高亮
function robinModClearButtonClicked() {
    if (document.getElementById("noSearchResult")) {
        $("#noSearchResult").hide();
    }
    let prehtml = document.getElementById("robinModHintContent").innerHTML;
    let newHtml = prehtml.replace(/(<\/?span.*?>)/gi, '');
    document.getElementById("robinModHintContent").innerHTML = newHtml;
}
window.robinModClearButtonClicked = robinModClearButtonClicked;

// 在目标元素前面插入新元素
function insertBefore(newElement, targetElement) {
    targetElement.parentNode.insertBefore(newElement, targetElement);
}