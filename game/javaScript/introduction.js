if (!localStorage.getItem('robinModDontShowAgain') || localStorage.getItem('robinModDontShowAgain') !== 'true') {
    window.modSweetAlert2Mod.fire(
        // do anything the ``Swal.fire()`` can do
        {
            title: '欢迎体验dom<i class="liveStreamFans"></i>罗宾模组!',
            html: `开始游戏后，你会发现左侧栏有一颗<i class=\"liveStreamFans\"></i>，点击它，你可以了解当前模组做过哪些改动，以避免将模组内容和原版内容混淆，你还可以对模组内容进行设置，已经开启过家教的玩家可在设置中自定义家教学生和家长的性别/描述。<i class=\"liveStreamFans\"></i>符号本身可在选项-通用中隐藏。 
            <br><br>
            <label>
                <input type="checkbox" id="dontShowAgain"> 下次不再显示此提示弹窗（提示内容有更新时除外）
            </label>
        `,
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '了解，请继续(*•̀ᴗ•́*)و ̑̑',
            preConfirm: () => {
                // 如果勾选了“不再显示此提示弹窗”，保存到 localStorage
                if (document.getElementById('dontShowAgain').checked) {
                    localStorage.setItem('robinModDontShowAgain', 'true');
                }
            }
        }
    );
}