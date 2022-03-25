function getCommentList() {
    $.ajax({
        method: "GET",
        url: "http://www.liulongbin.top:3006/api/cmtlist",
        // data: { // 本次不需要 数据
        success: function(res) {
            // console.log(res);
            if (res.status !== 200) return alert("获取评论列表失败！") //测试
                // console.log("获取数据成功");
            let rows = []
            $.each(res.data, function(i, item) {
                let str = '<li class="list-group-item"><span class="badge" style="background-color:cornflowerblue;">评论时间：' + item.time + '</span><span class="badge" style="background-color:#F0AD4E;">评论人：' + item.username + '</span>' + item.content + '</li>'
                    // console.log(item.content);
                rows.push(str)
                    // console.log();
            })
            $('#cmt-list').empty().append(rows.join(''))
        }

    })
}

getCommentList() // 调用

$(function() {
    $('#formAddCmt').submit(function(e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.post("http://www.liulongbin.top:3006/api/addcmt", data, function(res) {
            if (res.status !== 201) {
                return alert("发表评论成功！")
            }
            getCommentList() // 调用
                //输入后清空填写栏  重置form表单
            $('#formAddCmt')[0].reset() //jquery转换为原生Dom对象 【0】
        })
    })
})