<template>
  <div>
  <el-button type="text" @click="outerVisible = true">点击打开录入界面</el-button>

  <el-dialog title="魔方录入" :visible.sync="outerVisible" >
<!--    <el-dialog-->
<!--      width="30%"-->
<!--      title="内层 Dialog"-->
<!--      :visible.sync="innerVisible"-->
<!--      append-to-body>-->
<!--    </el-dialog>-->
    <Camera></Camera>
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">取 消</el-button>
      <el-button type="primary" @click="outerVisible = false">提 交</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
  import Camera from "./Camera";
    export default {
        name: "Dialog",
        components: {Camera},
        data() {
            return {
                outerVisible: false,
            };
        }
    }
</script>

<style scoped>

</style>
