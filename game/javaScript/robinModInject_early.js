(() => {
    const modUtils = window.modUtils;
    const logger = modUtils.getLogger();
    const modSC2DataManager = window.modSC2DataManager;
    logger.log('[robinMod_inject_early] 开始执行');
    // 从罗宾房间离开，场景修改
    function changeRobinRoomLeave() {
        const passage1 = modUtils.getPassageData('Widgets Robin');
        if (passage1) {
            logger.log(`[robinMod_inject_early] 获取passage信息成功: [${passage1.name}]`);
            let regex1 = new RegExp("<<main_hall_icon>>.*", 'g');
            let regex2 = new RegExp("<<getouticon>>.*", 'g');
            let content = passage1.content;
            let count1 = 0;

            let contentReplaced = content.replace(regex1, function(match) {
                count1++;
                if (count1 <= 2) {
                    // 被过滤的情况：异装一、异装二
                    console.log("当前match不做处理");
                    return match;
                } else if (count1 === 3) {
                    // 有创伤时拒绝一起上学（有衣服，无衣服版）
                    let replaceString = match.replace("Orphanage", "Robin Room Leave").replace("<<endevent>>", "<<set $phase to \"schoolRefuseTramua\">>");
                    console.log("当前match替换后是" + replaceString);
                    return replaceString;
                } else if (count1 === 4) {
                    // 无创伤时拒绝一起上学
                    let replaceString = match.replace("Orphanage", "Robin Room Leave").replace("<<endevent>>", "<<set $phase to \"schoolRefuse\">>");
                    console.log("当前match替换后是" + replaceString);
                    return replaceString;
                } else if (count1 === 5) {
                    // 有创伤时拒绝留宿，无创伤时不做特殊处理
                    let replaceString = match.replace("Orphanage", "Robin Room Leave").replace("<<endevent>>", "<<set $phase to \"sleepRefuseTramua\">>");
                    console.log("当前match替换后是" + replaceString);
                    return replaceString;
                } else if (count1 === 7) {
                    // 不一起搭摊子
                    let replaceString = match.replace("Orphanage", "Robin Room Leave").replace("<<endevent>>", "<<set $phase to \"lemonade\">>");
                    console.log("当前match替换后是" + replaceString);
                    return replaceString;
                } else {
                    // 剩余情况为：搭摊子，万圣节，无创伤不留宿，平时
                    let replaceString = match.replace("Orphanage", "Robin Room Leave").replace("<<endevent>>", "<<set $phase to \"normal\">>");
                    console.log("当前match替换后是" + replaceString);
                    return replaceString;
                }
            });
            let count2 = 0;
            let contentReplaced1 = contentReplaced.replace(regex2, function(match) {
                count2++;
                if (count2 === 1) {
                    // 有创伤时拒绝一起上学（有衣服，无衣服版）
                    let replaceString = match.replace("Orphanage", "Robin Room Leave").replace("<<endevent>>", "<<set $phase to \"schoolRefuseTramua\">>");
                    console.log("当前match替换后是" + replaceString);
                    return replaceString;
                } else if (count2 === 2) {
                    // 无创伤时拒绝一起上学
                    let replaceString = match.replace("Orphanage", "Robin Room Leave").replace("<<endevent>>", "<<set $phase to \"schoolRefuse\">>");
                    console.log("当前match替换后是" + replaceString);
                    return replaceString;
                } else if (count2 === 3) {
                    // 直播
                    let replaceString = match.replace("Orphanage", "Robin Room Leave").replace("<<endevent>>", "<<set $phase to \"normal\">>");
                    console.log("当前match替换后是" + replaceString);
                    return replaceString;
                } else if (count2 === 4) {
                    // 拒绝陪罗宾写作业
                    let replaceString = match.replace("Orphanage", "Robin Room Leave").replace("<<endevent>>", "<<set $phase to \"studyRefuse\">>");
                    console.log("当前match替换后是" + replaceString);
                    return replaceString;
                } else if (count2 === 5) {
                    // 泰拉联动
                    let replaceString = match.replace("Orphanage", "Robin Room Leave").replace("<<endevent>>", "<<set $phase to \"normal\">>");
                    console.log("当前match替换后是" + replaceString);
                    return modUtils.getMod('Terraria Expand Mod') ? replaceString : match;
                } else {
                    // 被过滤的情况：海滩
                    console.log("当前match不做处理");
                    return match;
                }

            });

            console.log("replace的结果是：" + contentReplaced1)
                // 将单个passage数据写回到SC2引擎的游戏数据中
            modUtils.updatePassageData(
                passage1.name,
                contentReplaced1,
                passage1.tags,
                passage1.id,
            );
        } else {
            logger.error(`[robinMod_inject_early] 获取passage信息失败`);
        }
    }

    // 和罗宾一起出门做某事，场景修改
    function changeRobinRoomWalkTogether() {
        const passage1 = modUtils.getPassageData('Widgets Robin');
        if (passage1) {
            logger.log(`[robinMod_inject_early] 第二次获取passage信息成功: [${passage1.name}]`);
            let content = passage1.content;
            let regex = new RegExp("<<if .* lte 0>>", 'g');
            let replaceString = "<<set _condition to getRobinWalkSchoolCondition()>>\n<<if [\"Robin's Room\",\"Robin's Room Photography\"].includes(_condition)>><<schoolicon \"building\">><<link [[\"换好校服，一起去学校 (0:25)\"|Robin Walk School]]>><<storeon _condition>><<run setRobinLocationOverride(\"school\", 7)>><<pass 25>><<handheldon 1>><</link>><br><<elseif $exposed lte 0>>";
            if (content.match(regex).length === 12) {
                let count = 0;
                let contentReplaced = content.replace(regex, function(match) {
                    count++;
                    console.log("当前match是：" + match);
                    // count说明：1 2 7 11 一起上学 3 4 6 7 10其他情况（去市政厅太特殊，不做处理）
                    switch (count) {
                        case 1:
                        case 2:
                        case 7:
                        case 11:
                            console.log("当前match为一起去上学");
                            return replaceString;
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 8:
                        case 9:
                        case 10:
                            console.log("当前match不做处理");
                            return match;
                    }
                })
                console.log("replace的结果是：" + contentReplaced)
                    // 将单个passage数据写回到SC2引擎的游戏数据中
                modUtils.updatePassageData(
                    passage1.name,
                    contentReplaced,
                    passage1.tags,
                    passage1.id,
                );
            } else {
                logger.error(`[robinMod_inject_early] 第二次匹配passage信息异常: [${passage1.name}]`);
            }
        } else {
            logger.error(`[robinMod_inject_early] 第二次获取passage信息失败`);
        }
    }

    // 枫桦叶 柠檬摊许可证
    function changeRobinLemonLicense() {
        const passage1 = modUtils.getPassageData('Robin\'s Lemonade Help');
        if (passage1) {
            logger.log(`[robinMod_inject_early] 获取passage信息成功: [${passage1.name}]`);
            let regex = new RegExp("\t\t\t<br><br>.*", 'g');
            let content = passage1.content;
            if (content.match(regex).length === 17) {
                let count = 0;
                let contentReplaced = content.replace(regex, function(match) {
                    count++;
                    console.log("当前match是：" + match);
                    if (count === 16) {
                        let replaceString = match.replace("<br><br>", "<br><br>\n\t\t\t<<if $robinmoney >= ($rentShouldPay + 100)>>罗宾小心地数着手里的钱。\n\t\t\t<br><br<<<link [[继续|Robin's Lemonade Confident]]>><</link>><<exit>><</if>>")
                        console.log("当前match替换后是" + replaceString);
                        return replaceString;
                    } else {
                        console.log("当前match不做处理");
                        return match;
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
                logger.error(`[robinMod_inject_early] <<getouticon>>.* 匹配passage异常: [${passage1.name}]`);
            }
        } else {
            logger.error(`[robinMod_inject_early] 获取passage信息失败`);
        }
    }

    // 枫桦叶 罗宾早起叫床
    function domRobinSleepGetUp() {
        let targetPassages = [
            'Robin Sleep',
            'Sleep'
        ];

        targetPassages.forEach(passageName => {
            const passage1 = modUtils.getPassageData(passageName);
            if (!passage1) {
                logger.error(`[robinMod_inject_early] 未找到: ${passageName}`);
                return;
            }
            let regex = new RegExp("\t\t\t<</if>>.*", 'g');
            let content = passage1.content;
            let count = 0;
            let contentReplaced = content.replace(regex, (match) => {
                count++;
                if (count === 4) {
                    let replaceString = match.replace("<</if>>", "<</if>>\n\t\t\t\t<<if random(1,2) === 1 && ($robinPayBothTalked || $robinFightTogether)>>\n\t\t\t\t\t<<domRobinOrphanageGetUp>>\n\t\t\t\t<<else>>");
                    console.log("当前match替换后是" + replaceString);
                    return replaceString;
                } else if (count === 5) {
                    let replaceString = match.replace("<</if>>", "\t<</if>>\n\t\t\t<</if>>");
                    console.log("当前match替换后是" + replaceString);
                    return replaceString;
                } else {
                    console.log("当前match不做处理");
                    return match;
                }
            });
            console.log("replace的结果是：" + contentReplaced);

            // 更新前做内容对比
            if (contentReplaced !== content) {
                modUtils.updatePassageData(
                    passage1.name,
                    contentReplaced,
                    passage1.tags,
                    passage1.id
                );
                logger.log(`[robinMod_inject_early] 成功更新: ${passage1.name}`);
            } else {
                logger.warn(`[robinMod_inject_early] 未检测到有效修改: ${passage1.name}`);
            }
        });
    }

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
                changeRobinRoomLeave();
                changeRobinRoomWalkTogether();
                changeRobinLemonLicense();
                domRobinSleepGetUp();
            }
        },
    );
})();