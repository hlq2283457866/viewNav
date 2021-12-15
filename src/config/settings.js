var gbs = {
  host: '/portal', // 接口根地址。本地代理到slsadmin.api.sls.com,线上使用的是Nginx代理
  // Determine apiServer baseURI
  servicesBaseUrl: LoaderJS.getServerBaseURI({
    devServerHost: 'http://localhost:28082',
    serverHostForSubLevelDomain: "portal-services"
  }) + "/portal/",
  db_prefix: 'customer_web', // 本地存储的key
  // 状态码字段
  api_status_key_field: 'code',
  // 状态码value
  api_status_value_field: 200,
  // 存放数据的字段
  api_data_field: 'data',
  api_custom: {
    //未登录操作
    401: function (res) {


    }
  }
}

var cbs = {
  /**
   * ajax请求成功，返回的状态码不是200时调用
   * @param  {object} err 返回的对象，包含错误码和错误信息
   */
  statusError (err) {
    console.log('err')
    if (err.status !== 401) {
      this.$message({
        showClose: true,
        message: '返回错误：' + err.msg,
        type: 'error'
      })
    } else {

    }
  },

  /**
   * ajax请求网络出错时调用
   */
  requestError (err) {
    // this.$message({
    //   // showClose: true,
    //   // message: '请求错误：' + (err.response ? err.response.status : '') + ',' + (err.response ? err.response.statusText : ''),
    //   // type: 'error'
    // })
  }
}

export {
  gbs,
  cbs
}
