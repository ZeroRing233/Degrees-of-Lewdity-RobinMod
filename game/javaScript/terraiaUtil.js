function hasTerrariaInfo() {
    const TerrariaInfo = window.modUtils.getMod('Terraria Expand Mod v0.1.4');
    if (TerrariaInfo) {
        return true;
    }
    return false;
}
window.hasTerrariaInfo = hasTerrariaInfo;

function getEatableFishList() {
    // 三文鱼，鲈鱼，金枪鱼，红鲷鱼，鳟鱼, 装甲洞穴鱼, 镜面鱼，偏口鱼, 蜂蜜鱼，双鳍鳕鱼，斑驳油鱼，霓虹脂鲤，雀鲷
    let all_eatable_fish_list = ['Salmon', 'Bass', 'Tuna', "Red_Snapper", "Trout",
        "Armored_Cavefish", "Specular_Fish", "Flounder", "Honeyfin", "Double_Cod", "Variegated_Lardfish", "Neon_Tetra", "Damselfish"
    ]
    let eatable_fish_list = [];
    // 岩石龙虾，绿波泥鳅
    //let all_eatable_seafood_list = ["Rock_Lobster", "Greenwave_Loach"]
    for (let fish of eatable_fish_list) {
        if (typeof V[fish] === 'number' && V[fish] >= 1) {
            eatable_fish_list.pushUnique(fish);
        }
    }
    return eatable_fish_list;
}
window.getEatableFishList = getEatableFishList;