<template>
    <div>
      <el-row><CubeCore></CubeCore></el-row>
      <el-row :gutter="20">
        <el-col :span=4><div class="grid-content"></div></el-col>
        <el-col :span=4><div class="grid-content"></div></el-col>
        <el-col :span=4><div class="grid-content"><Camera @initcube="init"></Camera></div></el-col>
        <el-col :span=4><div class="grid-content"><Solver></Solver></div></el-col>
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
            init() {

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
