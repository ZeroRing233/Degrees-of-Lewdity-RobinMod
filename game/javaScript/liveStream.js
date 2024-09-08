setup.users = {
    "ZeroRing233": {
        id: "ZeroRing233",
        username: "零环零理想",
        attitude: "supportive",
        specialSpeech: ["嘿，大家好，我是零环",
            "告诉你们一个秘密，我是这个直播平台的管理员，遇到问题可以联系我，看到侧边栏的蓝色爱心了吗，那里有我的联系方式",
        ]
    },
    "benzene": {
        id: "benzene",
        username: "苯环",
        attitude: "supportive",
        specialSpeech: ["好看爱看⌬ω⌬", '主播你那是不是卡了(>﹏<)']
    },
    "random1": {
        id: "random1",
        username: "用户123",
        attitude: "supportive",
        specialSpeech: []
    },
    "random2": {
        id: "random2",
        username: "我是好猫",
        attitude: "supportive",
        specialSpeech: []
    },
    "random3": {
        id: "random3",
        username: "我是坏猫",
        attitude: "supportive",
        specialSpeech: []
    },
}

setup.random_msg = {
    supportive_list: ["这里在播什么，好热闹的样子。",
        "主播主播，这是直播吗？", "主播主播，旁边是你女朋友吗？"
    ]
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