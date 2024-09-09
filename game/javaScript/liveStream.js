setup.users = {
    "ZeroRing233": {
        id: "ZeroRing233",
        username: "零环零理想",
        attitude: ["supportive"],
        specialSpeech: ["嘿，大家好，我是零环",
            "告诉你们一个秘密，我是这个直播平台的管理员，遇到问题可以联系我，看到侧边栏的蓝色爱心了吗，那里有我的联系方式",
        ]
    },
    "benzene": {
        id: "benzene",
        username: "苯环",
        attitude: ["supportive"],
        specialSpeech: ["好看爱看⌬ω⌬", '主播你那是不是卡了(>﹏<)']
    },
    "random123": {
        id: "random123",
        username: "用户123",
        attitude: ["supportive", "neutral", "negative"],
        specialSpeech: []
    },
    "random456": {
        id: "random456",
        username: "用户456",
        attitude: ["supportive", "neutral", "negative"],
        specialSpeech: []
    },
    "random789": {
        id: "random789",
        username: "用户789",
        attitude: ["supportive", "neutral", "negative"],
        specialSpeech: []
    },
    "random123456": {
        id: "random123456",
        username: "用户123456",
        attitude: ["supportive", "neutral", "negative"],
        specialSpeech: []
    },
    "random2": {
        id: "random2",
        username: "我是好猫",
        attitude: ["supportive"],
        specialSpeech: []
    },
    "random3": {
        id: "random3",
        username: "我是坏猫",
        attitude: ["negative"],
        specialSpeech: []
    },
    "random4": {
        id: "random4",
        username: "彩彩彩彩彩虹马",
        attitude: ["supportive"],
        specialSpeech: []
    },
    "random5": {
        id: "random5",
        username: "抢不到草莓的蛋糕教授",
        attitude: ["supportive"],
        specialSpeech: ["主播好强好可爱，可以分享下经验吗(´இ皿இ｀)"]
    },
    "random6": {
        id: "random6",
        username: "tuyu丶涂鱼🐟",
        attitude: ["supportive"],
        specialSpeech: []
    },
    "random7": {
        id: "random7",
        username: "彭猫猫",
        attitude: ["supportive"],
        specialSpeech: []
    },
    "random8": {
        id: "random8",
        username: "芋泥冰沙",
        attitude: ["supportive", "neutral"],
        specialSpeech: []
    },
    "random9": {
        id: "random9",
        username: "利口湾大主教",
        attitude: ["supportive"],
        specialSpeech: []
    },
    "random10": {
        id: "random10",
        username: "查查今天工作了吗",
        attitude: ["supportive"],
        specialSpeech: []
    },
    "random11": {
        id: "random11",
        username: "从0学代码只为把饼变现顺便我要中门对狙",
        attitude: ["supportive"],
        specialSpeech: []
    },
    "random12": {
        id: "random12",
        username: "从0学代码只为把饼变现顺便我要中门对狙",
        attitude: ["supportive"],
        specialSpeech: []
    },
    "random13": {
        id: "random13",
        username: "离渊",
        attitude: ["neutral"],
        specialSpeech: []
    },
    "random14": {
        id: "random14",
        username: "是香菜不叫香草",
        attitude: ["neutral"],
        specialSpeech: []
    },
    "random15": {
        id: "random15",
        username: "miyako4828",
        attitude: ["supportive"],
        specialSpeech: []
    },
    "random16": {
        id: "random16",
        username: "黎明破晓",
        attitude: ["supportive"],
        specialSpeech: ["主播声音真好听，能唱一首歌吗？想多听听主播的声音。"]
    },
    "random17": {
        id: "random17",
        username: "一辆车创了过来",
        attitude: ["supportive"],
        specialSpeech: ["对不起刚才冲晕了过去，主播太可爱了"]
    },
    "random18": {
        id: "random18",
        username: "Ca",
        attitude: ["supportive"],
        specialSpeech: ["感觉主播的声音听起来好有安全感！一定是一位在生活中特别努力的人吧！"]
    },
    "random19": {
        id: "random19",
        username: "Penuma",
        attitude: ["supportive"],
        specialSpeech: []
    }
}

setup.random_msg = {
    supportive_list: ["这里在播什么，好热闹的样子。", "主播的笑容，是今天最温暖的阳光！", "主播主播，旁边是你<<girlfriend>>吗？",
        "主播加油，你的笑容超级治愈！", "今天也是元气满满的一天，主播好棒！", "直播间的氛围太棒了，每次来都感觉很温馨！", "被主播的真诚打动，继续加油哦！", "直播间氛围真好，大家都好和谐！", "看主播直播，心情都变好了！", "技术流主播，爱了爱了，继续发光发热吧！", "每次看主播直播都觉得时间过得好快！", "主播的笑声是我每天的快乐源泉！", "直播间的朋友们都好有爱，一起加油！",
        "给主播比心心", "主播好像一只小小小鸟啊", "主播好用心", "这是我最爱的主播", "大家都好有品味", "\\主播/\\主播/\\主播/", "今天的直播太精彩了，完全看不够！"
    ],
    neutral_list: ["主播主播，这是直播吗？", "在播什么呀？", '不错，继续看看。', "主播在忙什么呢？", "看起来挺有趣的", "画面挺清晰的", "直播挺流畅的", "节奏把握得不错。", "挺有新意的直播", "期待更多内容", "内容有一点无聊", "内容有一点平淡", "这不是有手就行", "主播有一点菜", "感觉我上我也行"],
    negative_list: ["这播得是什么东西", "无聊，来播点更刺激的东西吧", "把你的衣服脱了", "垃圾主播，趁早改行吧", "傻X", "脑残主播", "装什么纯洁呢，看看你的"]
}

setup.randomrelfreq = function(array) {
    // accepts a strided array in form [thing, 20, thing, 80]
    // in order to make one thing 20% likely and the other 80% likely
    // or however you want to weight it, hence relative frequency
    // then returns the winning element

    let randomized = [...array];
    let sumsofar = 0;
    for (let i = 0; i < randomized.length; i += 2) {
        let factor = randomized[i + 1];
        factor = factor == 0 ? 1 : factor;
        sumsofar += factor;
        randomized[i + 1] = sumsofar;
    }

    let roll = this.rir(0, sumsofar);

    for (let i = 0; i < randomized.length; i += 2) {
        if (roll <= randomized[i + 1]) {
            return randomized[i];
        }
    }

    return randomized[0];
}

setup.rbg_from_string = function(name) {
    let hash = inthash(name).toString();

    while (hash.length < 9)
        hash += " ";

    let r = parseInt(hash.substring(0, 3));
    let g = parseInt(hash.substring(3, 6));
    let b = parseInt(hash.substring(6, 9));

    r = Math.trunc(128 + (128 * (r / 999)));
    g = Math.trunc(128 + (128 * (g / 999)));
    b = Math.trunc(128 + (128 * (b / 999)));

    return "rgb(" + r + ", " + g + ", " + b + ")";
}

const inthash = str => {
    let arr = str.split('');
    return Math.abs(arr.reduce(
        (hashCode, currentVal) =>
        (hashCode = currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16) - hashCode),
        0
    ));
};
setup.inthash = inthash;

setup.rir = function(min, max) {
    return Math.floor(State.random() * (max - min) + min);
}

Macro.add('streamscreen', {
    tags: null,
    handler: function() {
        $(this.output).wiki('<main class="streamscreen">' + this.payload[0].contents + '</main>');
    }
});

window.random_username = function(taken = []) {
    let name = null;
    while (!name || taken.includes(name))
        name = Object.keys(setup.users).random();
    return name;
}