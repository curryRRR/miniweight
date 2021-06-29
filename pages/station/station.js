// pages/station/station.js
import QRCode from '../../utils/weapp-qrcode.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{} ,//用户信息
        isClick:true, //是否隐藏二维码
    },

    handleLogin(){
        wx.navigateTo({
          url: '/pages/login/login',
        })
    },

    handleBindQR(){
        let that = this;
        if(that.data.isClick){
            that.setData({
                isClick:false
            })
        }else{
            that.setData({
                isClick:true
            })
        }
    },

    //扫描二维码注册站点
    scanCodeEvent(){
        wx.scanCode({
          onlyFromCamera: true,
          success:(res)=>{
              console.log(res);
          }
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        new QRCode("myQrcode",{
            text: 'http://www.tongxingschool.com',
            width: 250,
            height: 250,
            padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
            // correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
            callback: (res) => {
              console.log(res.path)
              // 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const userInfo = wx.getStorageSync('userInfo');
        this.setData({
            userInfo
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})