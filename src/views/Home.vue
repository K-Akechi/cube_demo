<template>
  <div class="hello">
<!--    <h1>{{ msg }}</h1>-->
    <div><CubeCore ref="cube"></CubeCore></div>
    <div class="button-group">
      <button name = "R" id = 1 @click="rotate('r', 1)">R</button>
      <button name = "R'" id = 2 @click="rotate('r', -1)">R'</button>
      <button name = "U" id = 3 @click="rotate('u', -1)">U</button>
      <button name = "U'" id = 4 @click="rotate('u', 1)">U'</button>
      <button name = "B'" id = 5 @click="rotate('b', 1)">B'</button>
      <button name = "B" id = 6 @click="rotate('b', -1)">B</button>
      <button name = "F'" id = 7 @click="rotate('f', -1)">F'</button>
      <button name = "F" id = 8 @click="rotate('f', 1)">F</button>
      <button name = "D" id = 9 @click="rotate('d', 1)">D</button>
      <button name = "D'" id = 10 @click="rotate('d', -1)">D'</button>
      <button name = "L'" id = 11 @click="rotate('l', 1)">L'</button>
      <button name = "L'" id = 12 @click="rotate('l', -1)">L</button>
      <button name = "Z" id = 18 @click="rotate('z', -1, false)">Z</button>
      <button name = "X" id = 19 @click="rotate('x', -1, false)">X</button>
      <button name = "Y" id = 20 @click="rotate('y', -1, false)">Y</button>
    </div>
  </div>
</template>

<script>
import CubeCore from "../components/CubeCore";
export default {
  name: 'Home',
  components: {CubeCore},
  data () {
    return {
      msg: 'Playground'
    }
  },
  methods: {
      rotate(direction, clockwise, callback){
          this.$refs.cube.rotate(direction, clockwise, callback);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
