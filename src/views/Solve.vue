<template>
    <div>
      <el-row><CubeCore></CubeCore></el-row>
      <el-row :gutter="20">
        <el-col :span=12><Camera></Camera></el-col>
        <el-col :span=12><Solver></Solver></el-col>
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
        }
    }
</script>

<style scoped>

</style>
