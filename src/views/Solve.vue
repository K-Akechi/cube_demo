<template>
    <div>
      <el-row><CubeCore></CubeCore></el-row>
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
                content:""
            }
        },
        methods: {
            init(cube, trans) {
                console.log(cube);
                console.log(trans);
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
            }
        }
    }
</script>

<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
