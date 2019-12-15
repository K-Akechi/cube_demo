<template>
  <div id="app">
    <el-container>
      <el-header height="100px">
      <h1><img src="./assets/logo2.png" alt="">Easy Cube by Sword Y.</h1>
      </el-header>
      <el-main>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
          <el-menu-item index="1" route="/">Playground</el-menu-item>
          <el-menu-item index="2" route="/solve">Solver</el-menu-item>
          <el-menu-item index="3" route="/tutorial">Tutorial</el-menu-item>
          <el-menu-item index="4" route="/quiz">Quiz</el-menu-item>
        </el-menu>
        <router-view/>
      </el-main>

    </el-container>

  </div>
</template>

<script>
// import CubeCore from "./components/CubeCore";
export default {
    name: 'App',
    data() {
        return {
            activeIndex: '1',
            // routerStatus: true,
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
    // components: {CubeCore},
}
</script>

<style>
  .el-header{
    margin-left: 15%;
    margin-right: 15%;
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    margin-left: 15%;
    margin-right: 15%;
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 10px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

</style>
