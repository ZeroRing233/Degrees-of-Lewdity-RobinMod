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

// 随机挑选服装店内一款符合pc当前外表性别的泳衣, 不判断罗宾能否承担（反正不扣钱）
function chooseOneSwimmingSuit() {
    // let SwimUpperList = setup.clothes["upper"].filter(clothes => rightSwimmingSuitCondition(clothes));
    let SwimUnderUpperList = setup.clothes["under_upper"].filter(clothes => rightSwimmingSuitCondition(clothes));
    let chosen1 = getRandomValueFromArray(SwimUnderUpperList);
    if (typeof chosen1.outfitPrimary != 'undefined') {
        return [chosen1];
    }
    // let SwimLowerList = setup.clothes["lower"].filter(clothes => rightSwimmingSuitCondition(clothes) &&
    //    typeof clothes.outfitSecondary === "undefined");
    let SwimUnderLowerList = setup.clothes["under_lower"].filter(clothes => rightSwimmingSuitCondition(clothes) &&
        typeof clothes.outfitSecondary === "undefined");
    let chosen2 = getRandomValueFromArray(SwimUnderLowerList);
    return [chosen1, chosen2];
}
window.chooseOneSwimmingSuit = chooseOneSwimmingSuit;

function rightSwimmingSuitCondition(clothes) {
    return clothes.shop.includes("clothing") && !clothes.shop.includes("adult") &&
        clothes.type.includes("swim") &&
        (clothes.gender === V.player.gender_appearance || clothes.gender === "n");
}