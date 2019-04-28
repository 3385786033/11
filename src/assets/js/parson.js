export default {
  getData:function () {
      this.formatTen = function (num) {
      return num > 9 ? (num + "") : ("0" + num);
    },
      this.formatDate = function(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day) +' '+hour +':'+minute + ':'+second;
    }
  },
  getTime:function () {
    this.formatTen = function (num) {
      return num > 9 ? (num + "") : ("0" + num);
    },
      this.formatTime = function(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
  }
}
}
