<template>
  <div class="home">
    <div class="homeNav">
        <div class="homeNav-left">
            <img src="@/assets/home/default_customer_logo.png">
            <div>
                <el-menu  class="el-menu-demo" mode="horizontal" background-color="#002243" text-color="#fff" active-text-color="#ffd04b">
                    <el-submenu >
                        <template slot="title" >切换项目</template>
                        <template v-for="item in menuList">
                            <el-menu-item :index='item.appNameCn' :key="item.path" @click="linkTo(item.viewExtranetBaseUri)">{{item.appNameCn}}</el-menu-item>

                        </template>
                    </el-submenu>
                </el-menu>
            </div>
        </div>
        <div class="homeNav-right">
            <img src="@/assets/home/person.png">
            <div>我的</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      appArr:[],
      menuList:[]
    }
  },
  mounted(){
    var baseUrl = LoaderJS.getServerBaseURI({
        devServerHost: 'http://localhost:28084/base',
        serverHostForSubLevelDomain: "base-services"
    });
    console.info(baseUrl)
    this.getBoundInfo(baseUrl)
    
  },
  methods:{
    getBoundInfo(baseUrl){
        var appArr = []
        var menuList1 = []
		$.ajax({
			url: baseUrl + "/base/sys/bound-info",
            dataType: 'json',
            xhrFields: {withCredentials: true},
			async: false, // 使用同步来阻止body渲染，防止未登录时出现一闪而过
			success: function (res) {
				if (res.code == 401) {
					// 跳转登录页面
					window.location.href = res.data.redirect_url;
				} else if (res.code != 200) {
					throw "系统错误, " + JSON.stringify(res);
				}
				// 保存至sessionStroage，因为当body渲染完才能拿到元素对象
				window.sessionStorage.setItem("iamBoundInfo", JSON.stringify(res));
				// 如果只有一个应用权限直接跳转至该应用
				var appList = res.data.appList;
                console.info(this.appArr)
				if(appList.length == 1){
                    window.location.href = appList[0].viewExtranetBaseUri;
				}
                appArr = appList; 
			},
			error: function (err) {
				console.log("接口错误，" + err)
			}
		});

        $.ajax({
			url: baseUrl + "/base/userManage/getUserInfo",
            dataType: 'json',
            xhrFields: {withCredentials: true},
			success: function (res) {
				var baseImgUrl = '';
				appArr.forEach(function(n){
					if (n.appName === 'imgfs') {
						baseImgUrl = n.extranetBaseUri + '/images/';
					}
				});

				if(res.data.imgLogo){
					$('#customerLogo').attr('src', baseImgUrl + res.data.imgLogo);
				}

				if(res.data.customerName){
					$("#customerName").html(res.data.customerName)
				}

				if(res.data.networkImgLogo){
					$('#myLogo').attr('src',baseImgUrl + res.data.networkImgLogo)
				}

				if(res.data.wechatImg){
					$('#qrcodeImg').attr('src',baseImgUrl + res.data.wechatImg)
				}

			},
			error: function (err) {
				console.log("接口错误，" + err)
			}
		});
        $.ajax({
			url: baseUrl + "/base/deploy/config",
            dataType: 'json',
            xhrFields: {withCredentials: true},
			async: false,
			success: function (res) {
				if (res.code == 401) {
					// 跳转登录页面
					window.location.href = res.data;
				} else if (res.code != 200) {
					throw "系统错误, " + JSON.stringify(res);
				}
				var appInfo = res.data.appInfo;
				if (appInfo != null) {
					localStorage.setItem("application_list", JSON.stringify(appInfo));
                    console.info('appInfo:',appInfo)
                    let authorizedAppInfo = appInfo.filter(item=>item.isUserSystem && item.status == "Authorized")
                    console.info(authorizedAppInfo)
                    menuList1 = authorizedAppInfo
				}
			},
			error: function (err) {
				console.log("接口错误，" + err)
			}
		});
        this.menuList = menuList1
    },
    linkTo(val){
        window.location.href = val
    }
  }
}
</script>

<style scoped>
.homeNav{
    background: url("../../assets/home/navimg.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    justify-content: space-between;
}
.homeNav-left{
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.homeNav-left img {
    margin-right: 12px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
.homeNav-left div {
    margin-right: 12px;
    color: #d2dad2;
    font-weight: bold;
    cursor: pointer;
}
.homeNav-right{
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.homeNav-right img{
    width: 22px;
    height: 22px;
    vertical-align: middle;
}
.homeNav-right div {
    margin-right: 12px;
    color: #d2dad2;
    font-weight: bold;
    cursor: pointer;
}
</style>
