<template>
  <!--数据分析-->
  <div class="dataAnalyze">
    <div class="entrance">
      <p>入口分析</p>
      <div class="entrance-data">
        <div id="entrancedata" :style="{width:'100%',height:'100%'}"></div>
      </div>
    </div>
    <div class="timeShare" >
      <p>分时浏览</p>
      <div class="timeShare-data">
        <div id="timeSharedata" :style="{width:'100%',height:'100%'}"></div>
      </div>
    </div>
    <div class="onLine">
      <p>人均在线时长</p>
      <div class="onLine-data">
        <div id="onLinedata" :style="{width:'100%',height:'100%'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        source:[],
        source_data_outs:[],
        stay_day:[],
        stay_times:[],
        times:[],
        timedata:[]
      }
    },
    mounted(){
      this.entrancedatas();
      this.timeSharedatas();
      this.onLinedatas();
    },
    methods:{
      entrancedatas(){
        let entrancedata = this.$echarts.init(document.getElementById('entrancedata'))
        entrancedata.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left'
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              label: {
                normal: {
                  position: 'inner'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:this.source_data_outs
            },
            {
              name:'访问来源',
              type:'pie',
              radius: ['40%', '55%'],
              label: {
                normal: {
                  formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                  backgroundColor: '#eee',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  borderRadius: 4,
                  rich: {
                    a: {
                      color: '#999',
                      lineHeight: 22,
                      align: 'center'
                    },
                    hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data:this.source
            }
          ]
        })
      },
      timeSharedatas(){
        let timeSharedata = this.$echarts.init(document.getElementById('timeSharedata'))
        timeSharedata.setOption({
          color: ['#3398DB'],
          title: {
            text: '',
            subtext: ''
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '7.5%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : this.times,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              axisLabel: {
                formatter: '{value}个'
              }
            }
          ],
          series : [
            {
              name:'直接访问',
              type:'bar',
              barWidth: '30%',
              data:this.timedata
            }
          ]
        })
      },
      onLinedatas(){
        let onLinedata = this.$echarts.init(document.getElementById('onLinedata'))
        onLinedata.setOption({
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '7.5%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.stay_day
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}秒'
            }
          },
          series: [{
            data: this.stay_times,
            type: 'line'
          }]
        })
      }
    },
    created(){
      this.$axios.post('/statistics/data_analysis').then((response)=>{
        if(response.data.status === 0){
          this.source = [{value: 0, name: "搜索"}]
          this.source_data_outs = [{value: 0, name: "小程序任务栏"}]
          this.stay_day = ['0','0']
          this.stay_times = [0,0]
          this.times = ['0','0']
          this.timedata = [0,0]
        }else {
          this.source = response.data.data.source_data_inside
          this.source_data_outs = response.data.data.source_data_outside
          this.stay_day = response.data.data.stay_days
          this.stay_times = response.data.data.stay_time
          this.times = response.data.data.division_hours
          this.timedata = response.data.data.division_time
        }
          this.entrancedatas();
          this.timeSharedatas();
          this.onLinedatas();
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
  /*数据分析*/
  .dataAnalyze{
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
      }
      .newUser-data{
        width: 860px;
        height: 180px;
        @include border_overfloe;
      }
    }
    .entrance{
      @extend .newUser;
      .entrance-data{
        width: 1000px;
        height: 500px;
        @include border_overfloe;
      }
    }
    .timeShare{
      @extend .newUser;
      .timeShare-data{
        width: 80%;
        height: 380px;
        @include border_overfloe;
      }
    }
    .onLine{
      @extend .newUser;
      .onLine-data{
        width: 80%;
        height: 380px;
        @include border_overfloe;
      }
    }
  }
  /*end*/
</style>
