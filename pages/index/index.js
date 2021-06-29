// pages/index/index.js
import { request } from "../request/index.js";
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{},   //用户信息
        dayInfo:{       //当日过磅的数据
        },
        monthInfo:{     //当月过磅数
        },
        inter:"", //计时器任务
    },

    //首页点击登录按钮
    handleLogin(){
        wx.navigateTo({
          url: '/pages/login/login',
        })
    },

    //查看货品的统计信息
    handleGoodsInfo(){
        wx.navigateTo({
          url: '/pages/statistics_pages/goods_Statistics/index',
        })
    },

    //查看车辆的统计信息
    handleCarInfo(){
        wx.navigateTo({
            url: '/pages/statistics_pages/car_Statistics/index',
        })
    },

    //查看过磅类型的统计信息
    handleWeighTypeInfo(){
        wx.navigateTo({
          url: '/pages/statistics_pages/weigh_Type/index',
        })
    },

    //查看单位的统计信息
    handleCompanyInfo(){
        wx.navigateTo({
            url: '/pages/statistics_pages/company_Statistics/index',
        })
    },

    //跳转到查询界面 查看全部数据，可筛选
    handleQueryData(){
        //由于是tabbar页面，所以不能使用 wx.navigateTo
        wx.switchTab({
          url: '/pages/search/search',
        })
    },

    //获取当日实时信息
    getDayTotalInfo(){
        var that = this
        request({url:"/weight/dayTotalInfo"})
        .then(res=>{
            // console.log(res.data);
            //将获取到的当日信息保存到缓存中
            wx.setStorageSync("dayInfo",res.data);
            that.setData({
                dayInfo:res.data
            })
        })
        //关闭下拉加载
        wx.stopPullDownRefresh();
    },

    //获取当月实时信息
    getMonthTotalInfo(){
        var that = this
        request({url:"/weight/monthTotalInfo"})
        .then(res=>{
            // console.log(res.data);
            //将获取到的当月信息保存到缓存中
            wx.setStorageSync("monthInfo",res.data);
            that.setData({
                monthInfo:res.data
            })
        })
        //关闭下拉加载
        wx.stopPullDownRefresh();
    },

    //开启计时器任务
    startTimer(){
        var that = this
        that.data.inter = setInterval(function(){
            that.getDayTotalInfo();
            that.getMonthTotalInfo();
        },30000)
    },

    //关闭计时器任务
    endTimer(){
        var that = this
        clearInterval(that.data.inter);
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(getApp().globalData.version);  //使用获取到globalData的值
        let dayInfo = wx.getStorageSync("dayInfo");
        let monthInfo = wx.getStorageSync("monthInfo");
        if(!dayInfo){
            this.getDayTotalInfo();
            console.log("今日信息本地没有缓存，正在发起请求");
        }else if(Date.now()-dayInfo.time>300*1000){
            this.getDayTotalInfo();
            console.log("今日信息本地缓存信息已过期");
        }else{
            console.log("今日信息缓存信息可用");
            this.setData({
                dayInfo:dayInfo
            })
        }

        if(!monthInfo){
            this.getMonthTotalInfo();
            console.log("本月信息本地没有缓存，正在发起请求");
        }else if(Date.now()-monthInfo.time>300*1000){
            this.getMonthTotalInfo();
            console.log("本月信息本地缓存信息已过期");
        }else{
            console.log("本月信息缓存信息可用");
            this.setData({
                monthInfo:monthInfo
            })
        }
        
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
        //let user = app.globalData.userInfo; //使用全局变量的方式
        let user = wx.getStorageSync('userInfo');
        this.setData({
            userInfo:user
        })
        //当页面显示的时候触发定时任务
        this.startTimer()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        //当页面隐藏结束定时任务
        this.endTimer()
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
        this.getDayTotalInfo();
        this.getMonthTotalInfo();
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