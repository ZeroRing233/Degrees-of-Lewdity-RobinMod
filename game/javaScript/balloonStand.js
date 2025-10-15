// 气球摊相关代码

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