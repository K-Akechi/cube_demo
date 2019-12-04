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
      <el-row><el-button type="text" @click="innerVisible = true, currentNumber = 1">Yellow</el-button></el-row>
    </el-col>
    <el-col :span="4">
      <el-row><canvas ref="canvas2" width="120" height="120"></canvas></el-row>
      <el-row><el-button type="text" @click="innerVisible = true, currentNumber = 2">Blue</el-button></el-row>
    </el-col>
    <el-col :span="4">
      <el-row><canvas ref="canvas3" width="120" height="120"></canvas></el-row>
      <el-row><el-button type="text" @click="innerVisible = true, currentNumber = 3">Orange</el-button></el-row>
    </el-col>
    <el-col :span="4">
      <el-row><canvas ref="canvas4" width="120" height="120"></canvas></el-row>
      <el-row><el-button type="text" @click="innerVisible = true, currentNumber = 4">White</el-button></el-row>
    </el-col>
    <el-col :span="4">
      <el-row><canvas ref="canvas5" width="120" height="120"></canvas></el-row>
      <el-row><el-button type="text" @click="innerVisible = true, currentNumber = 5">Green</el-button></el-row>
    </el-col>
    <el-col :span="4">
      <el-row><canvas ref="canvas6" width="120" height="120"></canvas></el-row>
      <el-row><el-button type="text" @click="innerVisible = true, currentNumber = 6">Red</el-button></el-row>
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
    <el-button type="primary" @click="submit()">提 交</el-button>
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
            innerVisible: false,
            outerVisible: false,
            response: null,
            error: null
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
                console.log('canvas')
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

            submit(){
                let img1 = this.$refs.canvas1.getContext('2d').getImageData(0, 0, 120, 120);
                let img2 = this.$refs.canvas2.getContext('2d').getImageData(0, 0, 120, 120);
                let img3 = this.$refs.canvas3.getContext('2d').getImageData(0, 0, 120, 120);
                let img4 = this.$refs.canvas4.getContext('2d').getImageData(0, 0, 120, 120);
                let img5 = this.$refs.canvas5.getContext('2d').getImageData(0, 0, 120, 120);
                let img6 = this.$refs.canvas6.getContext('2d').getImageData(0, 0, 120, 120);
                //data: 1-d array of RGBA
                let dr = []; let dg = []; let db = [];
                let rr = []; let rg = []; let rb = [];
                let br = []; let bg = []; let bb = [];
                let ur = []; let ug = []; let ub = [];
                let lr = []; let lg = []; let lb = [];
                let fr = []; let fg = []; let fb = [];
                console.log(img1.data, img1.data[0], img1.data[1], img1.data[2], img1.data[3], img1.data[4], img1.data[5]);
                for (let i = 0; i < 57600; i+=4){
                    dr.push(img1.data[i]); dg.push(img1.data[i+1]); db.push(img1.data[i+2]);
                    rr.push(img2.data[i]); rg.push(img2.data[i+1]); rb.push(img2.data[i+2]);
                    br.push(img3.data[i]); bg.push(img3.data[i+1]); bb.push(img3.data[i+2]);
                    ur.push(img4.data[i]); ug.push(img4.data[i+1]); ub.push(img4.data[i+2]);
                    lr.push(img5.data[i]); lg.push(img5.data[i+1]); lb.push(img5.data[i+2]);
                    fr.push(img6.data[i]); fg.push(img6.data[i+1]); fb.push(img6.data[i+2]);
                }
                let json = {};
                json['picture'] = {};
                json['picture'].width = 120;
                json['picture'].height = 120;
                let D = {}; let R= {}; let B = {}; let U = {}; let L = {}; let F = {};
                D['R'] = dr; D['G'] = dg; D['B'] = db; R['R'] = rr; R['G'] = rg; R['B'] = rb;
                B['R'] = br; B['G'] = bg; B['B'] = bb; U['R'] = ur; U['G'] = ug; U['B'] = ub;
                L['R'] = lr; L['G'] = lg; L['B'] = lb; F['R'] = fr; F['G'] = fg; F['B'] = fb;
                json['picture'].D = D; json['picture'].R = R; json['picture'].D = B;
                json['picture'].U = U; json['picture'].L = L; json['picture'].F = F;
                json = JSON.stringify(json);
                console.log(json);
                this.axios.post('http://106.14.45.216:8888/recognize', json).then(function (response) {
                    console.log(response)
                }).catch(function (error) {
                    console.log(error)
                });
                this.outerVisible = false
            }
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
