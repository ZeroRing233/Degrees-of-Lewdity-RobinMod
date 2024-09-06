// 三文鱼，鲈鱼，金枪鱼，红鲷鱼，鳟鱼, 装甲洞穴鱼, 镜面鱼，偏口鱼, 蜂蜜鱼，双鳍鳕鱼，斑驳油鱼，霓虹脂鲤，雀鲷, 岩石龙虾，绿波泥鳅
setup.eatableFish = {
    "Salmon": {
        name: "Salmon",
        cn_name: "三文鱼",
        type: "fish",
        price: 7,
        amount: V.Salmon || 0,
        icon: "fishing/fish/Salmon.png"
    },
    "Bass": {
        name: "Bass",
        cn_name: "鲈鱼",
        type: "fish",
        price: 4,
        amount: V.Bass || 0,
        icon: "fishing/fish/Bass.png"
    },
    "Tuna": {
        name: "Tuna",
        cn_name: "金枪鱼",
        type: "fish",
        price: 10,
        amount: V.Tuna || 0,
        icon: "fishing/fish/Tuna.png"
    },
    "Red_Snapper": {
        name: "Red_Snapper",
        cn_name: "红鲷鱼",
        type: "fish",
        price: 7,
        amount: V.Red_Snapper || 0,
        icon: "fishing/fish/Red_Snapper.png"
    },
    "Trout": {
        name: "Trout",
        cn_name: "鳟鱼",
        type: "fish",
        price: 4,
        amount: V.Trout || 0,
        icon: "fishing/fish/Trout.png"
    },
    "Armored_Cavefish": {
        name: "Trout",
        cn_name: "装甲洞穴鱼",
        type: "fish",
        price: 10,
        amount: V.Armored_Cavefish || 0,
        icon: "fishing/fish/Armored_Cavefish.png"
    },
    "Specular_Fish": {
        name: "Trout",
        cn_name: "镜面鱼",
        type: "fish",
        price: 7,
        amount: V.Specular_Fish || 0,
        icon: "fishing/fish/Specular_Fish.png"
    },
    "Flounder": {
        name: "Flounder",
        cn_name: "偏口鱼",
        type: "fish",
        price: 7,
        amount: V.Flounder || 0,
        icon: "fishing/fish/Flounder.png"
    },
    "Honeyfin": {
        name: "Honeyfin",
        cn_name: "蜂蜜鱼",
        type: "fish",
        price: 7,
        amount: V.Honeyfin || 0,
        icon: "fishing/fish/Honeyfin.png"
    },
    "Double_Cod": {
        name: "Double_Cod",
        cn_name: "双鳍鳕鱼",
        type: "fish",
        price: 15,
        amount: V.Double_Cod || 0,
        icon: "fishing/fish/Double_Cod.png"
    },
    "Variegated_Lardfish": {
        name: "Variegated_Lardfish",
        cn_name: "斑驳油鱼",
        type: "fish",
        price: 15,
        amount: V.Variegated_Lardfish || 0,
        icon: "fishing/fish/Variegated_Lardfish.png"
    },
    "Neon_Tetra": {
        name: "Neon_Tetra",
        cn_name: "霓虹脂鲤",
        type: "fish",
        price: 10,
        amount: V.Neon_Tetra || 0,
        icon: "fishing/fish/Neon_Tetra.png"
    },
    "Damselfish": {
        name: "Damselfish",
        cn_name: "雀鲷",
        type: "fish",
        price: 20,
        amount: V.Damselfish || 0,
        icon: "fishing/fish/Damselfish.png"
    },
    "Rock_Lobster": {
        name: "Rock_Lobster",
        cn_name: "岩石龙虾",
        type: "lobster",
        price: 15,
        amount: V.Rock_Lobster || 0,
        icon: "fishing/fish/Rock_Lobster.png"
    },
    "Greenwave_Loach": {
        name: "Greenwave_Loach",
        cn_name: "绿波泥鳅",
        type: "Loach",
        price: 20,
        amount: V.Greenwave_Loach || 0,
        icon: "fishing/fish/Greenwave_Loach.png"
    }
}

// 读取泰拉瑞亚的模组信息，现在能用到了
function hasTerrariaInfo() {
    const TerrariaInfo = window.modUtils.getMod('Terraria Expand Mod');
    if (TerrariaInfo) {
        return true;
    }
    return false;
}
window.hasTerrariaInfo = hasTerrariaInfo;

// 添加所有可食用的鱼类，调试用
function addEatAbleFish() {
    for (let fish in setup.eatableFish) {
        V[fish] = V[fish] || 0;
        V[fish] += 1;
        setup.eatableFish[fish].amount = V[fish]
    }
}
window.addEatAbleFish = addEatAbleFish;

// 日志展示用
function getAllEatableFishList() {
    // 获取前先更新一波
    for (let fish in setup.eatableFish) {
        setup.eatableFish[fish].amount = V[fish] || 0;
    }
    let all_eatable_fish_list = Object.keys(setup.eatableFish);
    return all_eatable_fish_list.filter(fish => {
        return setup.eatableFish[fish].amount > 0;
    });
}
window.getAllEatableFishList = getAllEatableFishList;

function getEatableFishList_fishOnly() {
    // 获取前先更新一波
    for (let fish in setup.eatableFish) {
        setup.eatableFish[fish].amount = V[fish] || 0;
    }
    let all_eatable_fish_list = Object.keys(setup.eatableFish);
    return all_eatable_fish_list.filter(fish => {
        return setup.eatableFish[fish].amount > 0 && setup.eatableFish[fish].type === 'fish';
    });
}
window.getEatableFishList_fishOnly = getEatableFishList_fishOnly;

//获取当前卖烤鱼的总价值，因为可能吃了一条所以要重新遍历
function getEatableFishPrice() {
    let price = 0;
    let all_eatable_fish_list = getEatableFishList_fishOnly();
    all_eatable_fish_list.forEach(fish => {
        price += setup.eatableFish[fish].amount * setup.eatableFish[fish].price;
    });
    return price;
}
window.getEatableFishPrice = getEatableFishPrice;

// 每次卖完烤鱼后调用
function clearEatableFish() {
    let all_eatable_fish_list = getEatableFishList_fishOnly();
    all_eatable_fish_list.forEach(fish => {
        setup.eatableFish[fish].amount = 0;
        V[fish] = 0;
    });
}
window.clearEatableFish = clearEatableFish;

function getLobsterPrice() {
    setup.eatableFish["Rock_Lobster"].amount = V["Rock_Lobster"]
    return setup.eatableFish["Rock_Lobster"].amount * setup.eatableFish["Rock_Lobster"].price;
}
window.getLobsterPrice = getLobsterPrice;

function clearLobster() {
    setup.eatableFish["Rock_Lobster"].amount = 0;
    V["Rock_Lobster"] = 0;
}
window.clearLobster = clearLobster;

function getLoachPrice() {
    setup.eatableFish["Greenwave_Loach"].amount = V["Greenwave_Loach"]
    return setup.eatableFish["Greenwave_Loach"].amount * setup.eatableFish["Greenwave_Loach"].price;
}
window.getLoachPrice = getLoachPrice;

function clearLoach() {
    setup.eatableFish["Greenwave_Loach"].amount = 0;
    V["Greenwave_Loach"] = 0;
}
window.clearLoach = clearLoach;

function meetFlyConditon() {
    return hasTerrariaInfo() && V.Snake_Charmers_Flute &&
        (V.harpy >= 6 || V.angel >= 6 || V.demon >= 6 || V.fallenangel >= 2 ||
            V.terra_accessories_slots.includes("Fledgling_Wings") || V.terra_accessories_slots.includes("Fin_Wings"));
}
window.meetFlyConditon = meetFlyConditon;

function getWingType() {
    if (hasTerrariaInfo() && V.terra_accessories_slots.includes("Fledgling_Wings")) {
        T.WingType = "雏翼";
        T.WingDesc = "真厉害，就像小鸟一样...";
    } else if (hasTerrariaInfo() && V.terra_accessories_slots.includes("Fin_Wings")) {
        T.WingType = "鳍翼";
        T.WingDesc = "真厉害，就像海中的游鱼一样...";
    } else if (V.angel >= 6) {
        T.WingType = "天使翅膀";
        T.WingDesc = "真美，好神圣的光芒...";
    } else if (V.fallenange >= 2) {
        T.WingType = "堕天使翅膀";
        T.WingDesc = "真美，好独特的光芒...";
    } else if (V.demon >= 6) {
        T.WingType = "恶魔翅膀";
        T.WingDesc = "真酷，好有力量感的形状...";
    } else {
        T.WingType = "哈比翅膀";
        T.WingDesc = "真酷，就像雄鹰一样...";
    }
}
window.getWingType = getWingType;