// pages/statistics_pages/goods_Statistics/index.js
import { request } from "../../request/index.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData:[
            ]
    },

    //获取车辆的统计信息
    getCarInfo(){
        request({url:"/car/carInfoList"})
        .then(res=>{
            this.setData({
                listData:res.data
            })
        })
        wx.stopPullDownRefresh()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCarInfo();
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
        this.getCarInfo();
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