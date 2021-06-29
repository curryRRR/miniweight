let ajaxTimes = 0;  //记录页面的请求数
export const request=(params)=>{
    ajaxTimes++
    //公共的路径url
    const baseUrl = "http://192.168.1.108:8080/easy/api"
    //加载中效果
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    //将请求封装为异步
    return new Promise((resolve,reject)=>{
        wx.request({
          ...params,  //将请求的数据解构出来
          url:baseUrl+params.url,  //更好的将接口的公共部分封装
          // method:"POST",
          success:(result)=>{
            resolve(result);    
          },
          fail:(err)=>{
              wx.hideLoading();
              console.log("请求失败");
              reject(err);
          },
          complete:()=>{
            //不管请求成功失败，都要进行关闭加载中窗口
            //由于首页发起了三个请求，所以我们要等他们全部请求结束再进行关闭
            ajaxTimes--
            if(ajaxTimes==0){  
              //所有请求都结束后才关闭加载窗口
                wx.hideLoading()
            }
          }
        });
    })
}