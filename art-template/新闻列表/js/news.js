$(function() {
    function padZero(n) {
        if (n < 10) {
            return '0' + n
        } else {
            return n
        }
    }

    // 定义格式化 事件过滤器
    template.defaults.imports.dateFormat = function(dtStr) {
        let dt = new Date(dtStr)

        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())

        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 获取新闻列表的函数
    function getNewsList() {
        $.get('http://www.liulongbin.top:3006/api/news', function(res) {
            if (res.status !== 200) {
                return alert('获取新闻列表数据失败')
            }
            // console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
                // 把每一项的 tags 属性 都改成字符串形式
                res.data[i].tags = res.data[i].tags.split(',')

            }
            console.log(res);
            let htmlStr = template('tpl-news', res)
            $('#news-list').html(htmlStr)
        })

    }
    getNewsList()
})