<template>
  <div>
  <el-row :gutter="20">
    <div class="sub-title">circle</div>
    <div class="demo-basic--circle">
      <el-col :span="8">
        <canvas ref="canvas" width="150" height="150">
        </canvas>
        <el-button type="text" @click="innerVisible = true">点击打开录入界面</el-button>
      </el-col>
      <el-col :span="8"><div class="block"></div></el-col>
      <el-col :span="8"><div class="block"></div></el-col>
    </div>
  </el-row>
    <el-dialog width="30%" title="snap" :visible.sync="innerVisible" v-on:load="camera('environment')" append-to-body>
      <video ref="video" width="480" height="480" autoplay></video>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button ref="snap" type="primary" @click="innerVisible = false">拍 摄</el-button>
      </div>
    </el-dialog>
  <el-row>

  </el-row>
  </div>
</template>

<script>
    /**
     * 摄像头控制 demo
     */
    export default {
        data: () => ({
            video: {},
            localstream: undefined,
            innerVisible: false
        }),
        methods: {
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
            }
        },
        mounted () {
            this.camera('environment');
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
  /*.el-col {*/
  /*  border-radius: 4px;*/
  /*}*/
</style>
