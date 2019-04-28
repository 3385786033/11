<template>
  <!--用户画像-->
  <div class="userPortrayal">
    <div class="sexRatio">
      <p>性别比例</p>
      <div class="sexRatio-data">
        <div id="sexRatiodata" :style="{width:'100%',height:'100%'}"></div>
      </div>
    </div>
    <div class="ageDist">
      <p>年龄分布</p>
      <div class="ageDist-data">
        <div id="ageDistdata" :style="{width:'100%',height:'100%'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        age:[],
        gender:[],
        age_ranges:[]
      }
    },
    mounted(){
      this.sexRatiodatas();
      this.ageDistdatas();
    },
    methods:{
      sexRatiodatas(){
        let sexRatiodata = this.$echarts.init(document.getElementById('sexRatiodata'))
        sexRatiodata.setOption({
          title : {
            text: '',
            subtext: '',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.gender,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      },
      ageDistdatas(){
        let myChart = this.$echarts.init(document.getElementById('ageDistdata'))
        var dataAxis = this.age_ranges;
        var data = this.age;
        var yMax = 100;
        var dataShadow = [];

        for (var i = 0; i < data.length; i++) {
          dataShadow.push(yMax);
        }
        myChart.setOption({
          title: {
            text: '',
            subtext: '',
            x:'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          xAxis: {
            data: dataAxis,
            axisLabel: {
              inside: true,
              textStyle: {
                color: '#000'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              },
              formatter: '{value}人'
            },
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap:'-100%',
              barCategoryGap:'1%',
              data: dataShadow,
              animation: false
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#83bff6'},
                      {offset: 0.5, color: '#188df0'},
                      {offset: 1, color: '#188df0'}
                    ]
                  )
                },
                emphasis: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                  )
                }
              },
              data: data
            }
          ]
        })
        var zoomSize = 6;
        myChart.on('click', function (params) {
          console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
          myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
          });
        });
      }
    },
    created(){
      this.$axios.post('/statistics/user_portrait ').then((response)=>{
        if(response.data.status === 0){
          this.age = [0,0,0]
          this.gender = [{value: 0, name: "男"}, {value: 0, name: "女"}]
          this.age_ranges = ["18-24岁", "25-29岁", "40-49岁"]
        }else {
          if(response.data.data.age_data.length === 0){
            this.age = [0,0,0]
          }else {
            this.age = response.data.data.age_data
          }
          if(response.data.data.gender_data.length === 0){
            this.gender = [{value: 0, name: "男"}, {value: 0, name: "女"}]
          }else {
            this.gender = response.data.data.gender_data
          }
          if(response.data.data.age_range.length === 0){
            this.age_ranges = ["18-24岁", "25-29岁", "40-49岁"]
          }else {
            this.age_ranges = response.data.data.age_range
          }
        }
          this.sexRatiodatas();
          this.ageDistdatas();
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
  /*用户画像*/
  .userPortrayal{
    @include aspect(960px,860px);
    margin: 0 auto;
    .sexRatio{
      @include aspect(100%,49%);
      margin-bottom: 1%;
      p{
        font-weight: 700;
        font-size: 24px;
        white-space: normal;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 20px;
        margin: 0;
      }
      .sexRatio-data{
        @include aspect(100%,85%);
      }
    }
    .ageDist{
      @extend .sexRatio;
      .ageDist-data{
        @extend .sexRatio-data;
      }
    }
  }
  /*end*/
</style>
