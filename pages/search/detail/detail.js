import { request } from "../../request/index.js";
// pages/search/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentId:"", //当前点击的id
        currentInfo:{} //当前点击项的详细信息
    },

    QueryParams:{
        id:""
    },
    
    //根据称重信息id查询详细信息
    getWeightInfoById(){
        var that = this;
        let currentId = this.data.currentId; //获取到被点击项的id
        that.QueryParams.id = currentId
        // var weightInfo = wx.getStorageSync("weightInfo");
        // //将缓存中的数据过滤
        // var current = weightInfo.filter(item => item.weightId == currentId);
        // // console.log(current);
        // that.setData({
        //     currentInfo:current
        // })
        //通过传递的id进行查询，不使用缓存中的数据
        request({url:"/weight/weightInfo",data:that.QueryParams})
        .then(res=>{
            that.setData({
                currentInfo:res.data
            })
        })
        //停止下拉加载效果
        wx.stopPullDownRefresh()
    },

    //点击拨打电话
    callPhone(){
        let phone = this.data.currentInfo.driverTel;
        wx.makePhoneCall({
          phoneNumber: phone,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //根据被点击项的id，发起请求获取到数据的详情
        let currentId = options.goodId;
        this.setData({
            currentId:currentId,
        })
        this.getWeightInfoById();
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
        this.getWeightInfoById();
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