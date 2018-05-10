var changecode = 0;
var allurl = window.allurl = "http://192.168.0.222:8080";
$(".vercode").click(function() {
    changecode++;
    console.log(this.src);
    this.src = allurl + "/data-management/customer/code?changecode=" + changecode;
})

var pass = document.getElementsByClassName("pass_input")[0];
var users = {};
var successUser = {};
$(document).ready(function() {
    var local_user = window.localStorage.getItem("userinfo");
    local_user = JSON.parse(local_user);
    console.log(local_user);
    if (local_user != null) {
        $(".pass_input").val(local_user.pass);
        $(".user_input").val(local_user.name);
    }
    var flag = false;
    var motionLogin = document.getElementsByName("autologin")[0];
    // $("input:name=['autologin']").prop("checked") == false;
    motionLogin.setAttribute("checked", true);

    function LoginAjax() {
        var logindata = "";
        if (motionLogin.checked) {
            logindata = {
                "remberme": "true",
                username: $(".user_input").val(),
                password: $(".pass_input").val(),
                code: $(".vercode_input").val()
            }
        } else {
            logindata = {
                "remberme": "false",
                username: $(".user_input").val(),
                password: $(".pass_input").val(),
                code: $(".vercode_input").val()
            }
        }
        console.log(logindata);
        $.ajax({
            url: allurl + "/data-management/customer/login.json",
            type: "get",
            data: logindata,
            dataType: "jsonp",
            jsonp: "jsonpCallback",
            success: function(data) {
                console.log(data);
                $(".logintips").html(data.msg);
                if (data.ret == false) {
                    successUser.flag = false;
                } else {
                    successUser.flag = true;
                    window.localStorage.successUser = JSON.stringify(logindata);
                    // window.location.href = '../home.html';
                }
            }
        })
    }
    $(".login_btn").click(function() {
        LoginAjax();
    });
    $("body").keydown(function() {
        if (event.keyCode == "13") {
            console.log(this);
            LoginAjax();
        }
    });
    motionLogin.onclick = function() {
        if (motionLogin.checked) {
            console.log(true);
            users.name = $(".user_input").val();
            users.pass = $(".pass_input").val();
            console.log(users);
            window.localStorage.userinfo = JSON.stringify(users);
        } else {
            console.log(false);
            window.localStorage.removeItem("userinfo");
        }
    }
})