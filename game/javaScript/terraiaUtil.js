function hasTerrariaInfo() {
    const TerrariaInfo = window.modUtils.getMod('Terraria Expand Mod v0.1.3');
    if (TerrariaInfo) {
        return true;
    }
    return false;
}
window.hasTerrariaInfo = hasTerrariaInfo;

// 待和作者讨论
function hasEatableFish() {

}

// const modAName = window.modUtils.getNowRunningModName();
// 使用Mod A的名字获取Mod A的信息（也就是自己的信息）
const modAInfo = window.modUtils.getMod("DomRobin");
// 创建并保存一个对象到 `ModInfo::modRef` 来暴露Mod自己的接口。  ( `modRef` 默认情况下是 undefined )
// modAInfo.modRef 可以是一个对象，可以在这里添加Mod A主动暴露给其他Mod来与Mod A进行交互的功能
// 例如提供一个切换Mod A中状态的函数，或者读取Mod A中数据的接口
modAInfo.modRef = {
    // 一个函数
    funcA: () => {
        console.log('modA funcA');
    },
    // 一个对象
    objA: {
        a: 1,
        b: 2,
    }
};