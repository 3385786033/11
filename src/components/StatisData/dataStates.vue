<template>
  <!--数据总览-->
  <div class="data-state">
    <div class="pandect">
      <div class="sumPres">
        <h3>用户总数量</h3>
        <p>{{ dataStat.userNumber }}</p>
      </div>
      <div class="sumPres">
        <h3>总浏览数量</h3>
        <p>{{ dataStat.visit_count }}</p>
      </div>
      <div class="sumPres">
        <h3>总订单数量</h3>
        <p>{{  dataStat.Always }}</p>
      </div>
      <div class="sumPres">
        <h3>总金额</h3>
        <p>{{ dataStat.income_count }}</p>
      </div>
    </div>
    <div class="browseStat">
      <p>总浏览统计</p>
      <div class="browseStat-mian">
        <div id="myChart1" :style="{width:'100%',height:'100%'}">

        </div>
      </div>
    </div>
    <div class="browseStat">
      <p>30天订单趋势图</p>
      <div class="browseStat-mian">
        <div id="myChart2" :style="{width:'100%',height:'100%'}">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        thirtyData:[],
        thirtyData_oerder:[],
        dataStat: {
          userNumber:'',
          visit_count: '',
          Always: '',
          income_count:''
        }
      }
    },
    mounted(){
      this.drawLine();
      //30天订单图
      this.drawLineto();
    },
    methods: {
      drawLine(){
        let myChart = this.$echarts.init(document.getElementById('myChart1'))
        let data = this.thirtyData;
        let dateList = data.map(function (item) {
          return item[0];
        });
        let valueList = data.map(function (item) {
          return item[1];
        });
        myChart.setOption({
          visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 1000
          }],
          title: [{
            left: 'center',
            text: ''
          }],
          tooltip: {
            trigger: 'axis',
          },
          xAxis: [{
            data: dateList
          }],
          yAxis: [{
            splitLine: {show: false},
            axisLabel: {
              formatter: '{value}次'
            }
          }],
          grid: [{
            bottom: '10%'
          }, {
            top: '60%'
          }],
          series: [{
            type: 'line',
            showSymbol: false,
            data: valueList
          }]
        })
      },
      drawLineto(){
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        let data = this.thirtyData_oerder
        let dateList = data.map(function (item) {
          return item[0];
        });
        let valueList = data.map(function (item) {
          return item[1];
        });
        myChart2.setOption({
          title: {
            text: '',
            subtext: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['最高值','最低值']
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: dateList
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}个'
            }
          },
          series: [
            {
              name:'最高值',
              type:'line',
              data:valueList,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        })
      }
    },
    created(){
      this.$axios.post('/statistics/overview').then((response)=>{
        //console.log(response)
        if(response.data.status === 0){
          this.dataStat.userNumber = 0
          this.dataStat.visit_count = 0
          this.dataStat.Always = 0
          this.dataStat.income_count = 0
          this.thirtyData = [
            ["0", 0], ["0", 0], ["0", 0], ["0", 0], ["0", 0]
          ]
          this.thirtyData_oerder = [
            ["0", 0], ["0", 0], ["0", 0], ["0", 0], ["0", 0]
          ]
        }else {
          this.thirtyData_oerder = response.data.data.order_month_count
          this.dataStat.userNumber = response.data.data.customer_count
          this.dataStat.visit_count = response.data.data.visit_count
          this.dataStat.Always = response.data.data.order_count
          this.dataStat.income_count = response.data.data.income_count
          if(response.data.data.visit_month_count.length === 0){
            this.thirtyData = [
              ["0", 0], ["0", 0], ["0", 0], ["0", 0], ["0", 0]
            ]
          }else {
            this.thirtyData = response.data.data.visit_month_count
          }
        }
        this.drawLine();
        //30天订单图
        this.drawLineto();
      })
    }
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe{
    overflow: hidden;
    /*border: 1px solid;*/
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
  /*数据总览*/
  .data-state{
    @include aspect(100%,auto);
    display: block;
    .pandect{
      @include aspect(100%,100px);
      .sumPres{
        float: left;
        width: 25%;
        text-align: center;
        h3{
          font-size: 30px;
        }
        p{
          font-weight: 700;
          margin-top: 10px;
          font-size: 24px;
        }
      }
    }
    .browseStat{
      @include aspect(100%,auto);
      p{
        width: 100%;
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        margin-top: 40px;
      }
      .browseStat-mian{
        @include aspect(80%,400px);
        margin: 0px auto;
        /*border: 1px solid;*/
      }
    }
  }
  /*end*/
</style>
