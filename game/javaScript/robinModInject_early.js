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
                console.log('[robinMod_inject_early]', '  ', '所有 mod 数据覆盖到游戏后');

                const passage1 = modUtils.getPassageData('Widgets Robin');
                if (passage1) {
                    logger.log(`[robinMod_inject_early] 获取passage信息成功: [${passage1.name}]`);
                    let regex = new RegExp("<<getouticon>>.*", 'g');
                    let content = passage1.content;
                    if (content.match(regex).length === 12) {
                        let count = 0;
                        let contentReplaced = content.replace(regex, function(match) {
                            count++;
                            console.log("当前match是：" + match);
                            if (count < 2 || count == 12) {
                                console.log("当前match不做处理");
                                return match;
                            } else {
                                console.log("需要替换当前match");
                                return "REPLACED";
                            }
                        });
                        console.log("replace的结果是：" + contentReplaced)
                            // 将单个passage数据写回到SC2引擎的游戏数据中
                        modUtils.updatePassageData(
                            passage1.name,
                            contentReplaced,
                            passage1.tags,
                            passage1.id,
                        );

                    } else {
                        logger.warn(`[robinMod_inject_early] 匹配passage异常: [${passage1.name}]`);
                    }
                } else {
                    logger.warn(`[robinMod_inject_early] 获取passage信息失败： [${passage1.name}]`);
                }
            }
        },
    );
})();