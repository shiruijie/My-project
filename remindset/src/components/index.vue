<template>
  <div class="index">
    <van-nav-bar title="提醒设置" left-arrow @click-left="cancel">
    </van-nav-bar>
    <van-cell-group>
      <van-switch-cell v-model="isReceive" title="接收消息提醒" @change="getVal"/>
      <van-switch-cell v-model="isOpen" title="开瓶提醒" v-if="isReceive"/>
      <van-field
        v-model="openCycle"
        left
        clearable
        type="number"
        @keyup="test(openCycle)"
        v-if="isOpen && isReceive"
        label="开瓶提醒周期"
        input-align="right"
        @blur="changeRemindDate"
      >
        <span slot="button">天</span>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  export default {
    name: "index",
    data(){
      return{
        isReceive:false,
        isOpen:false,
        openCycle:0,
      }
    },
    methods:{
      getVal(val){
        if(!val){
          this.isOpen = false;
        }
      },
      cancel(){
        this.$router.go(-1)
      },
      test(str){
        if(str[0] == 0){
          this.openCycle = str.replace(/^[0]+/,'')
        }
      },
      // 获取设备通知状态
      getRemindStatus(){
        this.$http.post('http://enxcook.xcook.cn/clientRequest',{
          "method": "cabinet",
          "data": {
            "work": "notice",
            "user-id": this.userId,
            "mac-id": this.macId
          }
        }).then(res=>{
          console.log(res)
          if(res.data.list == undefined){

          }else if(res.data.list){
            this.isReceive = true;
            this.isOpen = true;
            this.openCycle = res.data['remind-days'];
          }
        })
      },
      //操作设备通知状态
      setRemindStatus(num){
        this.$http.post('http://enxcook.xcook.cn/clientRequest',{
          "method": "cabinet",
          "data": {
            "work": "config",
            "user-id": this.userId,
            "mac-id": this.macId,
            "type": "notice",
            "switch": num
          }
        }).then(res=>{
          console.log(res)
        })
      },
      //修改提醒天数
      changeRemindDate(){
        this.$http.post('http://enxcook.xcook.cn/clientRequest',{
          "method":"cabinet",
          "data":{
            "work": "config",
            "user-id": this.userId,
            "mac-id": this.macId,
            "type":"remind-days",
            "remind-days":Number(this.openCycle)
          }
        }).then(res=>{
          console.log(res)
        })
      },
    },
    computed:{
      changeData(){
        const { isReceive,isOpen  } = this;
        return{
          isReceive,isOpen
        }
      }
    },
    watch:{
      // changeData(newVal,OldVal){
      //   if(newVal.isReceive && newVal.isOpen){
      //
      //   }else if(!newVal.isReceive && !newVal.isOpen){
      //
      //   }
      // },
      isOpen(newVal,oldbal){
        if(newVal){
          this.setRemindStatus(1);
        }else if(!newVal){
          this.setRemindStatus(0);
        }
      }
    },
    mounted() {
      this.getRemindStatus();
    },
  }
</script>

<style scoped lang="scss">
  .index{
    width: 100%;
    height:100%;
    background-color: #f5f5f5;
    .van-cell-group{
      margin-top:18px;
    }
  }
</style>
