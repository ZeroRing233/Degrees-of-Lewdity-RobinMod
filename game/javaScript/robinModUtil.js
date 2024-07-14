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

// 条件：反抗线打赢三次，罗宾与pc各至少帮助过一名孤儿，孤儿院的氛围"革命性"。
function meetFightTogetherCondition() {
    return V.renttime_fight <= 0 && V.robinFightChain >= 3 &&
        V.orphan_hope >= 40 && V.orphan_reb >= 40 &&
        V.orphan_rent === "paid" && findOrphanRentRobin().length >= 1;
}
window.meetFightTogetherCondition = meetFightTogetherCondition;

function findOrphanRentRobin() {
    let result = [];
    let perNpcList = Object.keys(V.per_npc);
    for (let i = 0; i < perNpcList.length; i++) {
        if (perNpcList[i].startsWith("orphan_rent_robin") && V.per_npc[perNpcList[i]].payBacked) {
            result.push(perNpcList[i]);
        }
    }
    return result;
}
window.findOrphanRentRobin = findOrphanRentRobin;

// 罗宾还钱数量(承担债务时的金钱除外，是单独剧情)
function getPayBackAmount() {
    if (!V.robinPaySelfTalked) {
        return 0;
    }
    let payBackText = "还帮助我";
    let total = 0;
    if (V.lemonadeShouldPayBack) {
        payBackText += "升级了柠檬水摊，"
        total += 600;
    }
    if (V.liveStreamShouldPayBack) {
        payBackText += "购买了直播设备，"
        total += 2000;
    }
    if (V.chocolateUpgradeShouldPayBack) {
        payBackText += "升级了巧克力摊，"
        total += 600;
    }
    if (V.chocolateReformShouldPayBack) {
        payBackText += "改造了巧克力摊，"
        total += 300;
    }
    payBackText = payBackText.replace(/\，$/, '。');
    T.payBackText = payBackText;
    T.PayBackAmount = total;
    return total;
}
window.getPayBackAmount = getPayBackAmount;

//const insulationModifier = Math.exp((-(warmth ?? getTotalWarmth()) * settings.insulationMultiplier) / settings.insulationCap);
//lowerThresholdStart:36 upperThresholdStart:38
function modifyBodyTempartureLemonade() {
    if (V.player.bodyTemperature < 38 && V.player.bodyTemperature >= 36) {
        return "noEffects";
    }
    if (Time.season === "winter" && V.player.bodyTemperature < 36) {
        V.player.bodyTemperature += 1;
        return "warmer";
    }
    if (Time.season !== "winter" && V.player.bodyTemperature >= 38) {
        V.player.bodyTemperature -= 1;
        return "colder";
    }
    return "noEffects";
}
window.modifyBodyTempartureLemonade = modifyBodyTempartureLemonade;