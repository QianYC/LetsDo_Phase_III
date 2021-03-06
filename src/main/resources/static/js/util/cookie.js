function setCookie(name, value, iDay)
{
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+iDay); //用来设置过期时间用的，获取当前时间加上传进来的iDay就是过期时间
    document.cookie=name+'='+value+';expires='+oDate+";path=/";
};
function getCookie(name)
{
    var arr=document.cookie.split('; '); //多个cookie值是以; 分隔的，用split把cookie分割开并赋值给数组
    for(var i=0;i<arr.length;i++) //历遍数组
    {
        var arr2=arr[i].split('='); //原来割好的数组是：user=simon，再用split('=')分割成：user simon 这样可以通过arr2[0] arr2[1]来分别获取user和simon
        if(arr2[0]===name) //如果数组的属性名等于传进来的name
        {
            return arr2[1]; //就返回属性名对应的值
        }
    }
    return '';
};
function removeCookie(name)
{
    setCookie(name, 1, -1); //-1就是告诉系统已经过期，系统就会立刻去删除cookie
};

function logout(){
    removeCookie("JSESSIONID");
    removeCookie("projectId");
    removeCookie("pictureId");
    removeCookie("projectType");
    removeSession();
    window.location.href="/user/login";
}

function removeSession() {
    $.ajax({
        url:"/user/logout",
        type:"POST",
        dataType:"text",
        processData: false,
        contentType: false,
        success:function(res){
            console.log(res);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            alert("登出失败");
        }
    })
}