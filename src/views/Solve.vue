<template>
    <div>
      <el-row>
        <CubeCore ref="cube"></CubeCore>
        <div class="button-group">
          <button name = "RE" id = 14 @click="reset()">重置</button>
          <button name = "RE" id = 23 @click="back()">回退</button>
          <button name = "PL" id = 15 @click="play()">播放</button>
          <button name = "SP" id = 17 @click="singleplay()">单步加</button>
          <button name = "PR" id = 22 @click="pre()">单步减</button>
          <button name = "SL" id = 21 @click="solve()">求解</button>
        </div>
      </el-row>
      <el-row :gutter="20">
        <el-col :span=9><div class="grid-content"></div></el-col>
        <el-col :span=6><div class="grid-content"><Camera @initcube="init"></Camera></div></el-col>
<!--        <el-col :span=4><div class="grid-content"><Solver></Solver></div></el-col>-->
      </el-row>
    </div>
</template>

<script>
  // import Dialog from "../components/Dialog";
  import CubeCore from "../components/CubeCore";
  import Camera from "../components/Camera";
  import Solver from "../components/Solver";
    export default {
        name: 'solve',
        components: {Camera, CubeCore, Solver},
        data(){
            return{
                content:"提示信息"
            }
        },
        methods: {
            init(cube, trans) {
                // console.log(cube);
                console.log(trans[0]);
                let flatten = [];
                for (let i=0; i<trans.length; i++){
                    if (trans[i] === "U2"){
                        flatten.push("U");
                        flatten.push("U")
                    }
                    else if (trans[i] === "F2"){
                        flatten.push("F");
                        flatten.push("F");
                    }
                    else if (trans[i] === "L2"){
                        flatten.push("L");
                        flatten.push("L");
                    }
                    else if (trans[i] === "R2"){
                        flatten.push("R");
                        flatten.push("R");
                    }
                    else if (trans[i] === "B2"){
                        flatten.push("B");
                        flatten.push("B");
                    }
                    else if (trans[i] === "D2"){
                        flatten.push("D");
                        flatten.push("D");
                    }
                    else
                        flatten.push(trans[i]);
                }
                console.log(cube);
                console.log(flatten);
                this.$refs.cube.generateparams(flatten);
                this.$refs.cube.isfast = true;
                this.$refs.cube.cubeInitial = cube;
                this.play();
                console.log(this.$refs.cube.params);
                this.$message.success("录入完成！");
                setTimeout(()=>{this.$refs.cube.params = []}, 1000);
            },
            reset(){
                this.$refs.cube.reset()
            },
            back(){
                this.$refs.cube.back();
            },
            play(){
                this.$refs.cube.count += 1;
                this.$refs.cube.play();
            },
            singleplay(){
                this.$refs.cube.counter += 1;
                this.$refs.cube.singleplay();
            },
            pre(){
                this.$refs.cube.pre();
            },
            solve(){
                this.$refs.cube.solve();
            }
        },
        mounted() {
            // this.init()
        }
    }
</script>

<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
