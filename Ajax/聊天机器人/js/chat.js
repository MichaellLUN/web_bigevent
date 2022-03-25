$(function() {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    // 为发送按钮绑定鼠标点击事件
    $("#btnSend").on("click", function() {
        let text = $("#ipt").val().trim() //获取用户输入的内容
        if (text.length <= 0) { // 判断用户输入的内容是否为空
            return $("#ipt").val('')
        }
        // 如果用户输入了内容 则将聊天内容追加到页面上显示
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
        $("#ipt").val('') // 清空输入框的内容

        resetui() // 重置滚动条的位置


        // 将用户输入的内容显示到聊天窗口中
        // 发起请求 获取聊天内容
        getMsg(text)
    })


    // 获取聊天机器人发送过来的消息
    function getMsg(text) { //用户填写的内容
        $.ajax({ // 发起ajax请求
            method: "GET", // 指定请求的类型 
            url: "http://www.liulongbin.top:3006/api/robot", // 请求地址
            data: { // 请求的数据
                spoken: text
            },
            success: function(res) { // 请求后 返回的
                // console.log(res);
                if (res.message === "success") { // 判断是否成功
                    let msg = res.data.info.text
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')

                    resetui() // 重置滚动条的位置

                    getVoice(msg) // 调用getVoice函数 把文本转化为语音
                }
            }
        })
    }

    // 拿到机器人返回的 之后调用  getmsg之后 getvoic
    function getVoice(text) { // 把文字转换为语音 进行后台播放
        $.ajax({ // 发起ajax请求
            method: "GET", // 指定请求的类型 
            url: "http://www.liulongbin.top:3006/api/synthesize", // 请求地址
            data: { // 请求的数据
                text: text
            },
            success: function(res) {
                // console.log(res);
                if (res.status === 200) { //请求成功后
                    // 播放语音
                    $('#voice').attr('src', res.voiceUrl) // 将地址传给 audio 后台播放
                }
            }
        })
    }
    // 让文本输入框相应回车事件后 提交消息
    $('#ipt').on('keyup', function(e) {
        if (e.keyCode === 13) { // 判断回车的code 编号13 如果按了松开就会触发
            $('#btnSend').click()
        }
        // console.log(e.keyCode);

    })
})