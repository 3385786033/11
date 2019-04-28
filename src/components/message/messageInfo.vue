 <template>
  <div class="messageInfo">
    <header>
      <h3>消息列表</h3>
      <button type="button" class="btn btn-primary rightBtn" @click="returnBtn">返回</button>
    </header>
    <div class="main">
      <h3 class="main-title">{{ title }}</h3>
      <p class="main-time">{{ create_date }}</p>
      <div class="main-line"></div>
      <p class="main-info">{{content}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        content:'',
        title:'',
        create_date:''
      }
    },
    methods:{
      returnBtn(){
        this.$router.go(-1)
      }
    },
    created(){
      this.$axios.post('/applet_message/messageedit',{message_id:this.$route.query.id,status:this.$route.query.status}).then((response=>{
        this.create_date = response.data.data.create_date
        this.title = response.data.data.title
        this.content = response.data.data.content
      }))
    }
  }
</script>
<style scoped lang="scss">
  .messageInfo{
    header{
      width: 100%;
      height: auto;
      overflow: hidden;
      h3{
        margin: 30px 20px;
      }
      .rightBtn{
        float: right;
        margin-right: 30px;
      }
    }
    .main-title{
      text-align: center;
    }
    .main-time{
      text-align: center;
    }
    .main-line{
      width: 99%;
      height: 1px;
      background-color: #73879C;
    }
    .main-info{
      margin-left: 10%;
      font-size: 16px;
      margin-top: 30px;
    }
  }
</style>
