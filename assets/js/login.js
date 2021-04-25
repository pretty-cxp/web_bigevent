$(function() {
    // 点击”去注册的链接“
    $('#link_reg').on('click', function() {
            $('.reg_box').show();
            $('.login_box').hide();

        })
        // 点击“去登录的链接”
    $('#link_login').on('click', function() {
            $('.login_box').show();
            $('.reg_box').hide();
        })
        // 从layui中获取formd对象
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        // 自定义了一个叫psaa的校验规则
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function(value) {
            var pwd = $('.reg_box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
                username: $('.reg_box [name=username]').val(),
                password: $('.reg_box [name=password]').val()
            }
            // 发起ajax的post请求
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            $('#link_login').click();
        })
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            url: '/api/login',
            method: 'post',
            // 快速获取表单中的数据
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败!')
                }
                layer.msg('登录成功!');
                // 将登录成功得到的 token 字符串，保存到localStorage中
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})