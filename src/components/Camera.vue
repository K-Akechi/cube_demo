<template>
  <div>
  <el-button type="text" @click="outerVisible = true">点击打开录入界面</el-button>
  <el-dialog title="魔方录入" :visible.sync="outerVisible" ref="dialog1" width="80%">
  <!--    <el-dialog-->
  <!--      width="30%"-->
  <!--      title="内层 Dialog"-->
  <!--      :visible.sync="innerVisible"-->
  <!--      append-to-body>-->
  <!--    </el-dialog>-->
  <el-row :gutter="20">
    <el-col :span="4">
      <el-row><canvas ref="canvas1" width="120" height="120"></canvas></el-row>
      <el-row><el-button type="text" @click="innerVisible = true, currentNumber = 1">Red</el-button></el-row>
    </el-col>
    <el-col :span="4">
      <el-row><canvas ref="canvas2" width="120" height="120"></canvas></el-row>
      <el-row><el-button type="text" @click="innerVisible = true, currentNumber = 2">Blue</el-button></el-row>
    </el-col>
    <el-col :span="4">
      <el-row><canvas ref="canvas3" width="120" height="120"></canvas></el-row>
      <el-row><el-button type="text" @click="innerVisible = true, currentNumber = 3">Green</el-button></el-row>
    </el-col>
    <el-col :span="4">
      <el-row><canvas ref="canvas4" width="120" height="120"></canvas></el-row>
      <el-row><el-button type="text" @click="innerVisible = true, currentNumber = 4">Orange</el-button></el-row>
    </el-col>
    <el-col :span="4">
      <el-row><canvas ref="canvas5" width="120" height="120"></canvas></el-row>
      <el-row><el-button type="text" @click="innerVisible = true, currentNumber = 5">Yellow</el-button></el-row>
    </el-col>
    <el-col :span="4">
      <el-row><canvas ref="canvas6" width="120" height="120"></canvas></el-row>
      <el-row><el-button type="text" @click="innerVisible = true, currentNumber = 6">White</el-button></el-row>
    </el-col>
    <el-dialog width="40%" title="snap" :visible.sync="innerVisible" ref="dialog2" @open="open()" append-to-body>

      <div slot="footer" class="dialog-footer">
        <video ref="video" width="120" height="120" autoplay></video>
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button ref="snap" type="primary" @click="draw()">拍 摄</el-button>
      </div>
    </el-dialog>
  </el-row>
  <div slot="footer" class="dialog-footer">
    <el-button @click="outerVisible = false">取 消</el-button>
    <el-button type="primary" @click="outerVisible = false">提 交</el-button>
  </div>
  </el-dialog></div>
</template>

<script>
    /**
     * 摄像头控制 demo
     */
    export default {
        data: () => ({
            video: {},
            // localstream: undefined,
            currentNumber: 0,
            imageFlag: [{},{},{},{},{},{}],
            innerVisible: false,
            outerVisible: false
        }),
        methods: {
            canvas(){
                let ctx1 = this.$refs.canvas1.getContext('2d');
                let ctx2 = this.$refs.canvas2.getContext('2d');
                let ctx3 = this.$refs.canvas3.getContext('2d');
                let ctx4 = this.$refs.canvas4.getContext('2d');
                let ctx5 = this.$refs.canvas5.getContext('2d');
                let ctx6 = this.$refs.canvas6.getContext('2d');
                ctx1.strokeStyle = "#c50209";
                ctx2.strokeStyle = "#0500c1";
                ctx3.strokeStyle = "#138804";
                ctx4.strokeStyle = "#f9640a";
                ctx5.strokeStyle = "#f9fd0c";
                ctx6.strokeStyle = "#f7f8f5";
            },

            camera (face) {
                this.stop();
                this.gum(face);
            },
            stop () {
                return this.video.srcObject && this.video.srcObject.getTracks().map(t => t.stop());
            },
            gum (face) {
                const fa = face === 'user' ? { facingMode: 'user' } : { facingMode: { exact: 'environment' } };
                return navigator.mediaDevices.getUserMedia({ audio: false, video: fa })
                    .then(stream => {
                        this.$refs.video.srcObject = stream;
                        this.$refs.video.play();
                    }).catch(() => {
                        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
                            .then(stream => {
                                this.$refs.video.srcObject = stream;
                                this.$refs.video.play();
                            });
                    });
            },

            open(){
                this.camera('environment')
            },

            draw(){
                let ctx;
                if (this.currentNumber === 1) {
                    ctx = this.$refs.canvas1.getContext('2d')
                }
                else if (this.currentNumber === 2){
                    ctx = this.$refs.canvas2.getContext('2d')
                }
                else if (this.currentNumber === 3){
                    ctx = this.$refs.canvas3.getContext('2d')
                }
                else if (this.currentNumber === 4){
                    ctx = this.$refs.canvas4.getContext('2d')
                }
                else if (this.currentNumber === 5){
                    ctx = this.$refs.canvas5.getContext('2d')
                }
                else {
                    ctx = this.$refs.canvas6.getContext('2d')
                }
                ctx.drawImage(this.$refs.video, 0, 0, 120, 120);
                console.log(this.currentNumber);
                console.log(this.$refs.video);
                this.innerVisible = false;
                this.stop()
            },

            submit(){}
        },
        mounted () {
            // this.canvas()
            // this.$refs.dialog2.open();
            // this.camera('environment');
        }
    };
</script>

<style scoped>
  /*.el-row {*/
  /*  margin-bottom: 20px;*/
  /*&:last-child {*/
  /*   margin-bottom: 0;*/
  /* }*/
  /*}*/
  .el-col {
    border-radius: 4px;
  }
  video{
    object-fit: fill;
  }
</style>
