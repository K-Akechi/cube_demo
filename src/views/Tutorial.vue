<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        CASE<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>case1</el-dropdown-item>
        <el-dropdown-item disabled>case2</el-dropdown-item>
        <el-dropdown-item disabled>case3</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-row>

      <div><CubeCore ref="cube"></CubeCore></div>
      <div class="button-group">
      <button name = "IN" id = 1 @click="init()">初始化</button>
      <button name = "PL" id = 15 @click="play()">播放</button>
      </div>
    </el-row>
  </div>
</template>

<script>
    import CubeCore from "../components/CubeCore";
    export default {
        name: "Tutorial",
        components: {CubeCore},
        data: () => ({
            content: "To be updated",
            success: null,
            cube: [],
            trans: [],
            answer: [],
            finish_cube: []
        }),
        methods:{
            async init(){
              let json = {};
              json['magic_number'] = "qwertyuiop";
              json['program'] = 3;
              json['case'] = 1;
              json['type'] = "train";
              json = JSON.stringify(json);
              console.log(json);
              await this.axios.post('/api/generate', json).then((response)=>{
                  console.log(response);
                  this.success = response.data.success;
                  this.cube = response.data.cube;
                  this.trans = response.data.trans;
                  this.answer = response.data.answer_mirror;
                  this.finish_cube = response.data.finish_cube;

              }).catch((error)=>{
                  console.log(error);
              });
              if (!this.success){
                  this.$message.warning('编号出错！')
              }
              let flatten = [];
              for (let i=0; i<this.trans.length; i++){
                    if (this.trans[i] === "U2"){
                        flatten.push("U");
                        flatten.push("U")
                    }
                    else if (this.trans[i] === "F2"){
                        flatten.push("F");
                        flatten.push("F");
                    }
                    else if (this.trans[i] === "L2"){
                        flatten.push("L");
                        flatten.push("L");
                    }
                    else if (this.trans[i] === "R2"){
                        flatten.push("R");
                        flatten.push("R");
                    }
                    else if (this.trans[i] === "B2"){
                        flatten.push("B");
                        flatten.push("B");
                    }
                    else if (this.trans[i] === "D2"){
                        flatten.push("D");
                        flatten.push("D");
                    }
                    else
                        flatten.push(this.trans[i]);
              }
              console.log(this.cube);
              console.log(flatten);
              this.$refs.cube.generateparams(flatten);
              this.$refs.cube.isfast = true;
              this.play();
              this.$message.success('初始化完成！');
              setTimeout(()=>{this.$refs.cube.params = []}, 1000);
            },
            play(){
                console.log(this.$refs.cube.params.length === 0);
                if (this.$refs.cube.params.length === 0){
                    let flatten = [];
                    for (let i=0; i<this.answer.length; i++){
                        if (this.answer[i] === "U2"){
                            flatten.push("U");
                            flatten.push("U")
                        }
                        else if (this.answer[i] === "F2"){
                            flatten.push("F");
                            flatten.push("F");
                        }
                        else if (this.answer[i] === "L2"){
                            flatten.push("L");
                            flatten.push("L");
                        }
                        else if (this.answer[i] === "R2"){
                            flatten.push("R");
                            flatten.push("R");
                        }
                        else if (this.answer[i] === "B2"){
                            flatten.push("B");
                            flatten.push("B");
                        }
                        else if (this.answer[i] === "D2"){
                            flatten.push("D");
                            flatten.push("D");
                        }
                        else
                            flatten.push(this.answer[i]);
                    }
                    this.$refs.cube.generateparams(flatten);
                    this.$refs.cube.isfast = false;
                }
                this.$refs.cube.count += 1;
                this.$refs.cube.play();
            }
        }
    }
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    float: left;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
