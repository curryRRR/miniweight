// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    //简单的获取用户信息
    login(){
      wx.getUserProfile({
        desc:"展示用户信息",
        success:(res)=>{
          console.log(res);
          wx.setStorageSync('userInfo', res.userInfo);//将用户信息写入缓存
          getApp().globalData.version = "2.0.1";//将用户信息写入到公共数据
          console.log(getApp().globalData);
          wx.navigateBack({
            delta: 1,
          })
        }
      })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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