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

function getWineType() {
    if (Time.season === "winter") {
        return "冬酿麦酒";
    }
    if (Time.season === "spring") {
        return "水果麦芽酒";
    }
    if (Time.season === "summer") {
        return "鲜啤酒";
    }
    if (Time.season === "autumn") {
        return "秋艾酒";
    }
}
window.getWineType = getWineType;


function meetOrphangePayBackCondition() {
    if (!["orphanage", "bath", "sleep", "liveStream"].includes(getRobinLocation())) {
        return false;
    }
    for (let key in V.per_npc) {
        let npc = V.per_npc[key];
        if (key.startsWith("orphan_rent_robin") && !npc.payBacked &&
            npc.willPayBack && (Time.days - npc.rentPaidDay) >= npc.couldPayBackDay) {
            T.npcSelected = key;
            return true;
        }
    }
    return false;
}
window.meetOrphangePayBackCondition = meetOrphangePayBackCondition;

function initLemonadeShop() {
    let goodsList = [];
    if (V.flowerCrownTalked) {
        goodsList.pushUnique("flower crown");
    }
    if (V.lemonadeNewGoodsList.includes("balloon")) {
        goodsList.pushUnique("heart balloon");
        goodsList.pushUnique("balloon");
    }
    setup.clothes.handheld.forEach(clothes => {
        if (goodsList.includes(clothes.name)) {
            clothes.shop.pushUnique("lemonade");
        }
        if (clothes.name === 'balloon') {
            clothes.cost = 200; //pc价
        }
        if (clothes.name === 'heart balloon') {
            clothes.cost = 300; //pc价
        }
    });
    setup.clothes.head.forEach(clothes => {
        if (goodsList.includes(clothes.name)) {
            clothes.shop.pushUnique("lemonade");
        }
    });
    setup.clothes.all.forEach(clothes => {
        if (goodsList.includes(clothes.name)) {
            clothes.shop.pushUnique("lemonade");
        }
    });
}
window.initLemonadeShop = initLemonadeShop;

// 总之，不要吐槽
function recoverLemonadeShop() {
    let goodsList = ['balloon', 'heart balloon', 'flower crown'];
    setup.clothes.handheld.forEach(clothes => {
        if (goodsList.includes(clothes.name)) {
            clothes.shop.delete("lemonade");
        }
        if (clothes.name === 'balloon') {
            clothes.cost = 500; //原价
        }
        if (clothes.name === 'heart balloon') {
            clothes.cost = 500; //原价
        }
    });
    setup.clothes.head.forEach(clothes => {
        if (goodsList.includes(clothes.name)) {
            clothes.shop.delete("lemonade");
        }
    });
    setup.clothes.all.forEach(clothes => {
        if (goodsList.includes(clothes.name)) {
            clothes.shop.delete("lemonade");
        }
    });
}
window.recoverLemonadeShop = recoverLemonadeShop;

// 获取当前身上拥有的鲜花
function getCurrentFlowerList() {
    let currentFlowerList = "";
    let noSellFlower = ["poppy", "strange_flower"];
    for (let plant in V.plants) {
        if (setup.plants[plant].type === "flower" &&
            !noSellFlower.includes(plant) && V.plants[plant].amount > 0) {
            currentFlowerList += (setup.plants[plant].plural + "，");
        }
    }
    currentFlowerList = currentFlowerList.replace(/\，$/, '');
    T.currentFlowerList = currentFlowerList;
}
window.getCurrentFlowerList = getCurrentFlowerList;

// 获取离开罗宾房间时pc的衣物状况
function getRobinLeaveRoomCondition() {
    if (V.store.upper.find(item => item.location == "Robin's Room") && V.store.lower.find(item => item.location === "Robin's Room")) {
        return "Robin's Room";
    }
    if (V.store.upper.find(item => item.location == "Robin's Room Photography") && V.store.lower.find(item => item.location === "Robin's Room Photography")) {
        return "Robin's Room Photography";
    }
    if (V.exposed >= 1) {
        return "needClothes";
    }
    return "normal";
}
window.getRobinLeaveRoomCondition = getRobinLeaveRoomCondition;

// 一起上学时PC的衣物状况
function getRobinWalkSchoolCondition() {
    if (V.store.upper.find(item => item.location == "Robin's Room" && item.type.includes("school")) && V.store.lower.find(item => item.location === "Robin's Room" && item.type.includes("school"))) {
        return "Robin's Room";
    }
    if (V.store.upper.find(item => item.location == "Robin's Room Photography" && item.type.includes("school")) && V.store.lower.find(item => item.location === "Robin's Room Photography" && item.type.includes("school"))) {
        return "Robin's Room Photography";
    }
    return "none";
}
window.getRobinWalkSchoolCondition = getRobinWalkSchoolCondition;

// 获取罗宾房间内是否有内衣，注意摄影时只会脱上下装，所以不用判断
function getUnderUpperOrUnderLower() {
    let under_upper = V.store["under_upper"].find(item => item.location === "Robin's Room");
    let under_lower = V.store["under_lower"].find(item => item.location === "Robin's Room");
    return under_upper || under_lower;
}
window.getUnderUpperOrUnderLower = getUnderUpperOrUnderLower;

function getUpperOrLower() {
    let condition = getRobinLeaveRoomCondition();
    let upper = V.store["upper"].find(item => item.location === condition);
    let lower = V.store["lower"].find(item => item.location === condition);
    return upper || lower;
}
window.getUpperOrLower = getUpperOrLower;

// 罗宾送pc的日常服装
function peekNormalClothes() {
    let normalClothesUpperList = setup.clothes["upper"].filter(clothes => rightNormalClothesCondition(clothes));
    let chosen1 = normalClothesUpperList.random();
    if (typeof chosen1.outfitPrimary != 'undefined') {
        return [chosen1];
    }
    let normalClothesLowerList = setup.clothes["lower"].filter(clothes => rightNormalClothesCondition(clothes) &&
        typeof clothes.outfitSecondary === "undefined");
    let chosen2 = normalClothesLowerList.random();
    return [chosen1, chosen2];
}
window.peekNormalClothes = peekNormalClothes;

function rightNormalClothesCondition(clothes) {
    return !clothes.shop.includes("adult") && clothes.type.includes("normal") &&
        (clothes.gender === V.player.gender_appearance || clothes.gender === "n");
}