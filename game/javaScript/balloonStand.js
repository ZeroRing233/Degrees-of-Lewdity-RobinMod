// 气球摊相关代码
statDisplay.create("gCompStage", () => statDisplay.statChange("柠檬水摊人气", 1, "green"));

// 达成合作条件
function could_coop() {
    const robinStatus = C.npc.Robin.dom >= 90 && C.npc.Robin.trauma == 0;
    const robinIncome = V.robinFightTalked || V.robinPayBothTalked;
    const upgraded = V.lemonadeUpgraded || V.chocolateUpgraded;
    const pcStatus = V.trauma <= 1000;
    const other = V.fame.business >= 200 && V.money >= 1000;
    if (robinStatus && robinIncome && upgraded && pcStatus && other) {
        return true;
    }
    return false;
}
window.could_coop = could_coop;

// 达成竞争条件
function could_comp() {
    const robinStatus = C.npc.Robin.dom >= 90 && C.npc.Robin.trauma == 0;
    const robinIncome = V.robinFightTalked || V.robinPayBothTalked;
    const upgraded = V.lemonadeUpgraded || V.chocolateUpgraded;
    const pcStatus = V.trauma <= 1000;
    const other = V.fame.business >= 400 && V.fame.social >= 200 && V.fame.good >= 100;
    if (robinStatus && robinIncome && upgraded && pcStatus && other) {
        return true;
    }
    return false;
}
window.could_comp = could_comp;

function meet_warning_condition() {
    if (!V.balloonStandWarning && Time.season !== "winter") {
        if (could_coop() || could_comp()) {
            $(document).one(":passageend", () => {
                SugarCube.Engine.play("balloon Stand Warning");
            })
        }
    }
}
window.meet_warning_condition = meet_warning_condition;

function initLemonadeStallShop() {
    setup.clothes.handheld.forEach(clothes => {
        if (clothes.shop.includes("stall")) {
            // 两加店均售卖原气球摊的商品，给pc半价
            clothes.shop.pushUnique("lemonade");
            clothes.shop.pushUnique("lemonadeStall");
            clothes.cost = 250;
        }
    });
}
window.initLemonadeStallShop = initLemonadeStallShop;

function is_comping() {
    // 没合作就卖气球，意味着是竞争线
    const notCoop = V.balloonStand.comp && V.lemonadeNewGoodsList.includes("balloon") && V.balloonStand.robin.status !== "unaffected" && V.balloonStand.robin.status !== "helped";
    const present = V.openinghours === 1 && V.balloonStand.open;
    if (notCoop && present) {
        return true;
    }
    return false;
}
window.is_comping = is_comping;