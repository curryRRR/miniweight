// pages/select/select.js
import { request } from "../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        weightInfo:[], //根据关键字获取到的商品
        isFoucs:false, //取消按钮是否被隐藏
        inputValue:'', //输入框的值
        isScroll:true,//是否滚动标识
    },
    TimeId:-1, //定义全局的定时器

    
    /*TODO:绑定输入框的值改变时间
    1.获取到输入框的值
    2.检验值的合法性
    3.检验通过，将输入框的值发送至后台
    4.将返回的结果渲染到页面

    使用防抖(防止抖动) 定时器 节流
    1.防抖 一般使用在输入框 防止重复输入 重复的发送请求
    2.节流 使用在页面的上拉和下拉 加载数据
    3.添加定时器 完成防抖的实现
*/
    handleInput(e){
        //获取到输入框的值
        const {value} = e.detail;
        //判断值的合法性
        if(!value.trim()){
            this.setData({
                isFoucs:false,
                goods:[]
            })
            return
        }
        //输入的值合法 就将取消按钮显示
        this.setData({
            isFoucs:true
        })
        clearTimeout(this.TimeId) //关闭定时器
        this.TimeId = setTimeout(() => {
            this.qSearch(value); //开启定时器 目的:在输入完毕后 1秒后发送请求
        }, 1000);

    },

    //发起关键字搜索请求
    qSearch(query){
        request({url:"/weight/weightInfoForQuery",data:{query}})
        .then(res=>{
            if(res.data===null || res.data ===""){
                wx.showToast({
                  title: '没有符合的数据哦',
                  mask:true
                })
            }
            this.setData({
                weightInfo:res.data
            })
        })
    },

    //点击取消按钮
    handleCancel(){
        this.setData({
            inputValue:'',
            weightInfo:[],
            isFoucs:false
        })
    },

    //点击按钮回到顶部
    goTop(){
        wx.pageScrollTo({
            duration: 300,
            scrollTop:0
        })
    },

    //当页面发生了滚动
    onPageScroll: function(e){
        let that = this
        if(e.scrollTop > 300){
            that.setData({
                isScroll:false
            })
        }else{
            that.setData({
                isScroll:true
            })
        }
    }
})