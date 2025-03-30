// 罗宾帮助孤儿的保底机制
window.meetOrphangePayBackGarantee = function(sort) { // 添加sort参数
    let results = []; // 初始化results数组
    let pattern;
    let key;
    let match;
    pattern = /^orphan_rent_robin_(\d+)$/; // 确认正则匹配实际键名
    for (key in V.per_npc) {
        if (V.per_npc.hasOwnProperty(key)) { // 正确检查属性
            match = key.match(pattern);
            if (match) {
                results.push({
                    key,
                    value: V.per_npc[key],
                    index: parseInt(match[1], 10)
                });
            }
        }
    }
    if (sort) {
        results.sort((a, b) => a.index - b.index);
    }
    return results;
};
window.setRandomOrphanWillPayBack = function() {
    let properties = window.meetOrphangePayBackGarantee();
    if (properties.length === 0) {
        console.error("未找到任何 orphan_rent_robin_数字 属性");
        return;
    }

    let Rng = Math.floor(Math.random() * 100) + 1;
    let selected = properties[Math.floor(Math.random() * properties.length)];

    if (!V.per_npc[selected.key] || typeof V.per_npc[selected.key] !== 'object') {
        V.per_npc[selected.key] = { willPayBack: false }; 
    }

    if (V.per_npc[selected.key].willPayBack === true) {
        return; 
    }

    let shouldPayBack = false;
    if (V.orphan_hope >= 50) {
        shouldPayBack = true;
    } 
    else if (V.orphan_hope >= 30 && Rng >= 50) {
        shouldPayBack = true;
    }
    else if (V.orphan_hope >= 15 && Rng >= 90) {
        shouldPayBack = true;
    }

    // 只修改为true（保留可能的其他状态）
    if (shouldPayBack) {
        V.per_npc[selected.key].willPayBack = true;
    }

    if (!V.per_npc[selected.key].couldPayBackDay) {
        V.per_npc[selected.key].couldPayBackDay = Math.floor(Math.random() * 35) + 1;
    }
};