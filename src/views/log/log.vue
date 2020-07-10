<template>
  <div class="app-container">
    <p slot="title">监听程序日志</p>
    <div class="padding">
      <el-button type="primary" @click="openSocket">开启日志</el-button>
      <!-- <el-button type="info" @click="closeSocket">关闭日志</el-button> -->
      <el-button type="danger" @click="clearlog">清除日志</el-button>
    </div>
    <div id="filelog-container">
      <div id="aa">{{pullFileLogger}}</div>
    </div>
  </div>
</template>

<script>
// 安装并引入相关模块
import SockJS from "sockjs-client";
import Stomp from "stompjs";
export default {
  data() {
    return {
      pullLogger: "",
      pullFileLogger: "",
      stompClient: null
    };
  },
  methods: {
    clearlog() {
      document.getElementById("aa").innerHTML = "正在连接，请稍后~";
    },
    openSocket() {
      if (this.stompClient === null) {
        this.pullFileLogger = "正在连接，请稍后~";
        let _that = this;
        var socket = new SockJS("https://iazuresky.com:8443/websocket?token=kl");
                // var socket = new SockJS("http://localhost.com:8081/websocket?token=kl");

        _that.stompClient = Stomp.over(socket);
        _that.stompClient.connect({ token: "kl" }, function(frame) {
          _that.stompClient.subscribe(
            "/topic/pullFileLogger",
            function(event) {
              _that.pullFileLogger = "";
              var content = event.body;
              var aa = document.getElementById("aa");
              var p = document.createElement("p");
              p.style.wordWrap = "break-word";
              p.style.fontSize = 18 + "px";
              p.appendChild(document.createTextNode(event.body));
              aa.appendChild(p);
              var div1 = document.getElementById("filelog-container");
              div1.scrollTop = div1.scrollHeight;
            },
            {
              token: "kltoen"
            }
          );
        });
      }
    },
    closeSocket() {
      if (this.stompClient != null) {
        this.stompClient.disconnect();
        this.stompClient = null;
        this.pullFileLogger = "连接已关闭";
      }
    }
  },
  //销毁页面之前，断开连接
  beforeDestroy: function() {
    //页面离开时断开连接,清除定时器
    this.closeSocket();
  },
  mounted() {
    //调用初始化websocket方法
    this.openSocket();
  }
};
</script>
<style>
#filelog-container {
  height: 760px;
  overflow-y: scroll;
  background: #333;
  color: #aaa;
  padding: 10px;
}
.padding{
  margin-bottom: 10px;
}
</style>