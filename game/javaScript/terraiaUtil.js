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

// 读取泰拉瑞亚的模组信息，也许并用不到
function hasTerrariaInfo() {
    const TerrariaInfo = window.modUtils.getMod('Terraria Expand Mod v0.1.4');
    if (TerrariaInfo) {
        return true;
    }
    return false;
}
window.hasTerrariaInfo = hasTerrariaInfo;

// 添加所有可食用的鱼类，调试用
function addEatAbleFish() {
    for (let fish in setup.eatableFish) {
        setup.eatableFish[fish].amount += 1;
    }
}
window.addEatAbleFish = addEatAbleFish;

function getEatableFishList() {
    // 获取前先更新一波
    for (let fish in setup.eatableFish) {
        setup.eatableFish[fish].amount = V[fish] || 0;
    }
    let all_eatable_fish_list = Object.keys(setup.eatableFish);
    return all_eatable_fish_list.filter(fish => {
        return setup.eatableFish[fish].amount > 0;
    });
}
window.getEatableFishList = getEatableFishList;


// function getEatableFishList() {
//     // 三文鱼，鲈鱼，金枪鱼，红鲷鱼，鳟鱼, 装甲洞穴鱼, 镜面鱼，偏口鱼, 蜂蜜鱼，双鳍鳕鱼，斑驳油鱼，霓虹脂鲤，雀鲷
//     let all_eatable_fish_list = Object.keys(setup.eatableFish)

//     ['Salmon', 'Bass', 'Tuna', "Red_Snapper", "Trout",
//         "Armored_Cavefish", "Specular_Fish", "Flounder", "Honeyfin", "Double_Cod", "Variegated_Lardfish", "Neon_Tetra", "Damselfish"
//     ]
//     let eatable_fish_list = [];
//     for (let fish of all_eatable_fish_list) {
//         if (typeof V[fish] === 'number' && V[fish] >= 1) {
//             eatable_fish_list.pushUnique(fish);
//         }
//     }
//     return eatable_fish_list;
// }
// window.getEatableFishList = getEatableFishList;

// 岩石龙虾，绿波泥鳅
//let all_eatable_seafood_list = ["Rock_Lobster", "Greenwave_Loach"]
function hasLobster() {
    if (typeof V["Rock_Lobster"] === 'number' && V["Rock_Lobster"] >= 1) {
        return true;
    }
    return false;
}
window.hasLobster = hasLobster;

function hasLoach() {
    if (typeof V["Greenwave_Loach"] === 'number' && V["Greenwave_Loach"] >= 1) {
        return true;
    }
    return false;
}
window.hasLoach = hasLoach;