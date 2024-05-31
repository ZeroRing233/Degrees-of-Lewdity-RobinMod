function dailyRobinTraitEffects() {
    if (V.robinPayBothTalked) {
        // 减压力上限的五分之一
        statChange.stress(-2000, 1);
        // 创伤的计算：V.trauma += Math.trunc((amount * 3) + ((amount * 1.5) * (V.control / V.controlmax)));
        // 满自控其实是112
        statChange.trauma(-25);
        // 罗宾每日创伤额外减一
        if (C.npc.Robin.trauma > 0) fragment.append(wikifier("npcincr", "Robin", "trauma", -1));
        // 不用交房租
        V.renttime = 999;
        V.robinpaid = -1;
    } else if (V.robinPaySelfTalked) {
        // 减压力上限的二十分之一
        statChange.stress(-500, 1);
        statChange.trauma(-25);
        V.robinpaid = -1;
    }
}

function needLowerDom() {
    if (V.robinPayBothTalked) {
        return false;
    } else if (C.npc.Robin.dom <= 50 && V.robinPaySelfTalked) {
        return false;
    }
    return true;
}