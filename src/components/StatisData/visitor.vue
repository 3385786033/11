<template>
  <!--访客分析-->
  <div class="visitor">
    <div class="facility">
      <p>设备情况</p>
      <div class="facility-info">
        <div id="facility" :style="{width:'100%',height:'100%'}">

        </div>
      </div>
    </div>
    <!--访问深度-->
    <div class="depth">
      <p>访问深度</p>
      <div class="depth-visit">
        <div id="depths" :style="{width:'100%',height:'100%'}"></div>
      </div>
    </div>

    <!--地区分布-->
    <div class="regional">
      <p>地区分布</p>
      <div class="regional-Dis">
        <div id="mapContainer" :style="{width:'100%',height:'100%'}"></div>
      </div>
    </div>
  </div>
  <!--end-->
</template>
<script>
  import 'echarts/map/js/china'
  export default {
    data () {
      return {
        shebei:[],
        Device:[],
        depth_datas:[],
        mapdata:[]
      }
    },
    mounted(){
      this.facilityinfo();
      this.depths();
      this.diqu()
    },
    methods: {
      facilityinfo(){
        let myChart = this.$echarts.init(document.getElementById('facility'))
        myChart.setOption({
          title : {
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['安卓','诺基亚','小米','vivo','苹果']
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '75%',
              center: ['50%', '55%'],
              data:this.shebei,
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
      depths(){
        let depth = this.$echarts.init(document.getElementById('depths'))
        let timedata =['1页','2页','3页','4页','5页','6页','7页','8页','9页','大于10页']
        depth.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: timedata
          },
          yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            axisLabel: {
              formatter: '{value}次'
            }
          },
          series: [{
            barWidth: '40%',
            data: this.depth_datas,
            type: 'bar'
          }]
        })
      },
      diqu(){
        let ditu = this.$echarts.init(document.getElementById('mapContainer'))
        ditu.setOption({
          title : {
            text: '',
            subtext: '',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            itemColor:'red'
          },
          legend: {
            orient: 'vertical',
            x:'left',
            data:['iphoneX']
          },

          toolbox: {
            show: true,
            orient : 'vertical',
            x: 'right',
            y: 'center',
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          roamController: {
            show: true,
            x: 'right',
            mapTypeControl: {
              'china': true
            }
          },
          series : [
            {
              name: '人均数量：',
              type: 'map',
              mapType: 'china',
              roam: false,
              itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
              },
              data:this.mapdata
            }
          ]
        })
      }
    },
    created(){
      this.$axios.post('/statistics/visitor_analysis').then((response)=>{
        if(response.data.status === 0){
          this.shebei = [{value: 0, name: "iPhone"}, {value: 0, name: "Android"}]
          this.depth_datas = [0,0,0,0,0]
          this.mapdata = [{value: 0, name: "北京"}]
        }else {
          this.shebei = response.data.data.platform_data
          this.depth_datas = response.data.data.depth_data
          this.mapdata = response.data.data.map_data
        }
        this.facilityinfo();
        this.depths();
        this.diqu()
        })
    }
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe{
    overflow: hidden;
    border: 1px solid;
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
  /*访客分析*/
  .visitor{
    width: 100%;
    height: auto;
    overflow: hidden;
    display: block;
    /*设备情况*/
    .facility{
      width: 80%;
      margin: 0 auto;
      p{
        padding-top: 30px;
        margin: 0;
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        white-space: normal;
        padding-bottom: 20px;
      }
      .facility-info{
        width: 500px;
        height: 300px;
        /*border: 1px solid;*/
        overflow: hidden;
        margin: 0 auto;
      }
    }
    /*访问深度*/
    .depth{
      @extend .visitor;
      width: 80%;
      margin: 0 auto;
      margin-top: 100px;
      @extend .facility;
      .depth-visit{
        width: 100%;
        height: 300px;
        /*border: 1px red solid;*/
        margin: 0 auto;
      }
    }
    /*访问地区*/
    .regional{
      @extend .visitor;
      @extend .facility;
      .regional-Dis{
        width:100%;
        height: 890px;
        /*border: 1px solid;*/
        //margin: 0 auto;
      }
    }
  }
  /*end*/
</style>
