(() => {
    // 自执行函数，会在[Story/storyInit()]后执行
    // 由于此时引擎已经抓取所有模板数据，故无法在此处使用modUtils.updatePassageData更新passage
    const modUtils = window.modUtils;
    const logger = modUtils.getLogger();
    logger.log('[robinMod_inject_early] 开始执行');
    const modSC2DataManager = window.modSC2DataManager;
    //return Promise.resolve("robinModPreload.js，获取返回值");
    modSC2DataManager.getAddonPluginManager().registerAddonPlugin(
        'DomRobin', //  mod名称
        'DomRobin1', // 插件名称，必须唯一，一个mod可以挂多个插件，可以使用mod名称
        {
            // 参见类型定义：src/BeforeSC2/AddonPlugin.ts
            // export type AddonPluginHookPointEx =
            //     AddonPluginHookPoint
            //     & AddonPluginHookPointExOptional
            //     & AddonPluginHookPointExMustImplement
            //     & AddonPluginHookPointWhenSC2;
            registerMod: async(addonName, mod, modZip) => {
                // 其他mod使用addonPlugin注册到本插件时执行
                // !!!!! 必须实现此钩子 !!!!!(既然说是必须就不删了)
                console.log('domRobin_inject_early', '  ', '其他mod注册到本mod时执行');
            },

            afterPatchModToGame: async() => {
                // 所有 mod 数据覆盖到游戏后
                // 可选钩子
                console.log('domRobin_inject_early', '  ', '所有 mod 数据覆盖到游戏后');

                const passage1 = modUtils.getPassageData('Widgets Robin');
                if (passage1) {
                    // 成功获得passage数据
                    logger.log('[robinMod_inject_early] 获取passage信息成功', [passage1.name]);
                    // passage 的文本内容
                    let regex = new RegExp("<<getouticon>>.*", 'g');

                    let content = passage1.content;
                    let resultList = content.match(regex);
                    if (resultList.length === 12) {
                        content = content.replace(new RegExp(regex), "只是验证一下替换效果");
                    } else {
                        logger.warn('[robinMod_inject_early] 匹配结果数量异常', [passage1.name]);
                    }
                    // 将单个passage数据写回到SC2引擎的游戏数据中
                    modUtils.updatePassageData(
                        passage1.name,
                        content,
                        passage1.tags,
                        passage1.id,
                    );
                    // pp.content = pp.content.replace(new RegExp(p.findRegex), replaceString);

                } else {
                    logger.warn('[robinMod_inject_early] 获取passage信息失败');
                }
            },
            afterPreload: async() => {
                // 所有 Preload 脚本执行后
                // 可选钩子
                console.log('domRobin_inject_early', '  ', '所有 Preload 脚本执行后');
            },
        },
    );
})();