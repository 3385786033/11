<template>
  <!--用户分析-->
  <div class="userAnalyze">
    <div class="newUser">
      <p>新老用户存留</p>
      <div class="newUser-data">
        <div id="newUserdata" :style="{width:'100%',height:'100%'}">

        </div>
      </div>
    </div>
    <div class="userIndependent">
      <p>独立用户</p>
      <div class="userIndependent-data">
        <div id="userIndependentdata" :style="{width:'100%',height:'100%'}">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        datalist:[],
        newuser:[],
        activeuser:[],
        user_day:[],
        visitor_day:[],
        visitor_counts:[]
    }
  },
  mounted(){
    this.newUserdata();
    this.userIndependentdata();
  },
    methods:{
      newUserdata(){
          let newUserdata = this.$echarts.init(document.getElementById('newUserdata'))
        newUserdata.setOption({
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['老用户','新用户']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: [{
            data: this.user_day
          }],
          yAxis: {
            type: 'value',
            min: 0,
            max: 50,
          },
          series: [
            {
              name:'新用户',
              type:'line',
              stack: '总量',
              data:this.newuser
            },
            {
              name:'老用户',
              type:'line',
              stack: '总量',
              data:this.activeuser
            }
          ]
        })
      },
      userIndependentdata(){
        let userIndependentdata = this.$echarts.init(document.getElementById('userIndependentdata'))
        userIndependentdata.setOption({
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.visitor_day
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            barWidth: '30%',
            data: this.visitor_counts,
            type: 'bar'
          }]
        })
      }
    },
    created(){
      this.$axios.post('/statistics/user_analysis').then((response)=>{
        if(response.data.status === 0){
          this.newuser = [0,0]
          this.activeuser = [0,0]
          this.user_day = ['0','0']
          this.visitor_day = ['0','0']
          this.visitor_counts = [0,0]
        }else {
          this.newuser = response.data.data.newuser_data
          this.activeuser = response.data.data.activeuser_data
          this.user_day = response.data.data.user_days
          this.visitor_day = response.data.data.visitor_days
          this.visitor_counts = response.data.data.visitor_count
        }
          this.newUserdata();
          this.userIndependentdata();
          //console.log(response)
        })
    }
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe{
    overflow: hidden;
    margin: 0 auto;
  }
  /*
  设置宽高overflow
  */
  @mixin aspect($width,$height){
    width: $width;
    height: $height;
    overflow: hidden;
  }
  /*用户分析*/
  .userAnalyze{
    width: 100%;
    height: auto;
    overflow: hidden;
    display: block;
    .newUser{
      overflow: hidden;
      height: auto;
      p{
        font-weight: 700;
        font-size: 24px;
        white-space: normal;
        text-align: center;
        padding-top: 30px;
        margin: 0;
        padding-bottom: 20px;
      }
      .newUser-data{
        width: 860px;
        height: 500px;
        @include border_overfloe;
      }
    }
    .userIndependent{
      overflow: hidden;
      height: auto;
      p{
        font-weight: 700;
        font-size: 24px;
        white-space: normal;
        text-align: center;
        padding-top: 30px;
        margin: 0;
        padding-bottom: 20px;
      }
      .userIndependent-data{
        width: 860px;
        height: 500px;
        margin: 0 auto;
      }
    }
  }
</style>
