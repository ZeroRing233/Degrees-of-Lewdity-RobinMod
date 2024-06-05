function getLastWord(str) {
    var spaceIndex = str.lastIndexOf(' ');
    if (spaceIndex === -1) {
        // 如果没有空格，整个字符串就是一个单词  
        return str;
    }
    return str.substring(spaceIndex + 1);
}
window.getLastWord = getLastWord;

function getRandomValueFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
window.getRandomValueFromArray = getRandomValueFromArray;

// 当前衣柜里是否有泳装，先判断上装和内衣上装，再判断下装和内衣下装，不要吐槽写法
function hasSwimmingSuit() {
    let hasUpper, hasUnderUpper = false;
    for (let upper of V.wardrobe['upper']) {
        if (upper.type.includes("swim") && typeof upper.outfitPrimary != 'undefined') {
            return true;
        }
        if (upper.type.includes("swim") && typeof upper.outfitPrimary === 'undefined') {
            hasUpper = true;
        }
    }
    for (let under_upper of V.wardrobe['under_upper']) {
        if (under_upper.type.includes("swim") && typeof under_upper.outfitPrimary != 'undefined') {
            return true;
        }
        if (under_upper.type.includes("swim") && typeof under_upper.outfitPrimary === 'undefined') {
            hasUnderUpper = true;
        }
    }
    if (hasUpper) {
        for (let lower of V.wardrobe['lower']) {
            if (lower.type.includes("swim")) {
                return true;
            }
        }
    }
    if (hasUnderUpper) {
        for (let under_lower of V.wardrobe['under_lower']) {
            if (under_lower.type.includes("swim")) {
                return true;
            }
        }
    }
    return false;
}
window.hasSwimmingSuit = hasSwimmingSuit;