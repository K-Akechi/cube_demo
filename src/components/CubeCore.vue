<template>
<div class="hello" @mousedown="handleMouseDown">
  <div class="cube" :style="'transform: rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)' + 'rotateZ('+rotateZ+'deg)'">
    <Cube v-for="pos in positions" :position="pos" :ref="pos[0]+'-'+pos[1]+'-'+pos[2]" :key="pos[0]+'-'+pos[1]+'-'+pos[2]" :id="pos[0]+'-'+pos[1]+'-'+pos[2]" :opacity="opacity/100">
    </Cube>
  </div>
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
  <div class="button-group">
    <button name = "RE" id = 14 @click="reset()">重置</button>
    <button name = "PL" id = 15 v-on:click="count += 1" @click="play()">播放</button>
    <button name = "SP" id = 17 v-on:click="counter += 1" @click="singleplay()">单步</button>
    <button name = "SL" id = 21 @click="solve()">求解</button>
  </div>
</div>
</template>

<script>
import Cube from './Cube';

const positions = []
for (let x = 1; x < 4; x++) {
  for (let y = 1; y < 4; y++) {
    for (let z = 1; z < 4; z++) {
      positions.push([x, y, z])
    }
  }
}

// function generateRandomRotateParams() {
//   const param = {
//     direction: '',
//     clockwise: 0
//   };
//   const directions = ['r', 'u', 'b', 'f', 'd', 'l', 'z'];
//   param.direction = directions[Math.floor(Math.random() * 7)];
//   const clockwises = [-1, 1];
//   param.clockwise = clockwises[Math.floor(Math.random() * 2)];
//   return param;
// }

export default {
  name: 'CubeCore',
  data() {
    return {
      params: [],
      title: 'Rubik Cube',
      rotateX: -45,
      rotateY: 45,
      rotateZ: 0,
      rotateing: false,
      looping: false,
      opacity: 100,
      counter: 0,
      count: 0,
      index: 0,
      state: [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[1, 1, 1], [1, 1, 1], [1, 1, 1]], [[2, 2, 2], [2, 2, 2], [2, 2, 2]], [[3, 3, 3], [3, 3, 3], [3, 3, 3]],
        [[4, 4, 4], [4, 4, 4], [4, 4, 4]], [[5, 5, 5], [5, 5, 5], [5, 5, 5]]],
      isfast: false,
      positions
    };
  },
  methods: {
    solve() {
      this.isfast = false;
      const params = ["B", "D", "B'", "L'", "F", "L", "z", "R", "R", "D", "B", "R'", "B'", "z", "L", "L", "B'", "L'", "L'", "z", "L", "D", "F", "L'", "F'", "z", "D'", "F'", "D'", "D'", "F", "D", "D", "L", "D'", "L'", "z", "D", "D", "D'", "R'", "D", "R", "z", "R", "D", "R'", "D'", "D'", "B'", "D", "B", "z", "B", "D", "B'", "D'", "D'", "L'", "D", "L", "z", "x", "x", "D", "z'", "D", "B", "D'", "B'", "D'", "L'", "D", "L", "z", "z", "z'", "D", "R", "D'", "R'", "D'", "B'", "D", "B", "z", "D", "D", "z'", "D", "R", "D'", "R'", "D'", "B'", "D", "B", "z", "z", "z", "D", "D", "D'", "F'", "D", "F", "D", "L", "D'", "L'", "z", "B", "D", "R", "D'", "R'", "B'", "D", "R", "D", "R'", "D", "R", "D", "D", "R'", "D", "D", "L'", "D'", "L", "D'", "L'", "D'", "D'", "L", "z", "z", "D", "D", "z'", "y'", "F", "F", "U", "F'", "F'", "U'", "R", "R", "F'", "F'", "D'", "F", "F", "D", "R'", "R'", "y", "z", "D'", "L", "D", "L'", "D", "L", "D", "D", "L'", "z", "F'", "D'", "F", "D'", "F'", "D'", "D'", "F", "z", "L'", "D'", "L", "D'", "L'", "D'", "D'", "L", "z'", "B", "D", "B'", "D", "B", "D", "D", "B'"];
      this.generateparams(params);
      for (let i = 0; i < this.params.length; i++) {
        console.log(this.params[i].direction, this.params[i].clockwise, i);
      }
    },
    generateparams(params) {
      this.params = [];
      for (let i = 0; i < params.length; i++) {
        let param = {
          direction: '',
          clockwise: 0
        };
        if (params[i] === "R") {
          param.direction = 'r';
          param.clockwise = 1;
        }
        else if (params[i] === "R'") {
          param.direction = 'r';
          param.clockwise = -1;
        }
        else if (params[i] === "U") {
          param.direction = 'u';
          param.clockwise = -1;
        }
        else if (params[i] === "U'") {
          param.direction = 'u';
          param.clockwise = 1;
        }
        else if (params[i] === "B'") {
          param.direction = 'b';
          param.clockwise = 1;
        }
        else if (params[i] === "B") {
          param.direction = 'b';
          param.clockwise = -1;
        }
        else if (params[i] === "F") {
          param.direction = 'f';
          param.clockwise = 1;
        }
        else if (params[i] === "F'") {
          param.direction = 'f';
          param.clockwise = -1;
        }
        else if (params[i] === "D'") {
          param.direction = 'd';
          param.clockwise = -1;
        }
        else if (params[i] === "D") {
          param.direction = 'd';
          param.clockwise = 1;
        }
        else if (params[i] === "z") {
          param.direction = 'z';
          param.clockwise = -1;
        }
        else if (params[i] === "x") {
          param.direction = 'x';
          param.clockwise = -1;
        }
        else if (params[i] === "y") {
          param.direction = 'y';
          param.clockwise = -1;
        }
        else if (params[i] === "L") {
          param.direction = 'l';
          param.clockwise = -1;
        }
        else if (params[i] === "L'") {
          param.direction = 'l';
          param.clockwise = 1;
        }
        this.params.push(param);
      }
    },
    reset() {
      this.rotateing = false;
      this.looping = false;
      this.opacity = 100;
      this.params = [];
      this.count = 0;
      this.index = 0;
      this.isfast = true;
      //D：R：B：U：L：F
      //下：右：后：上：左：前
      this.state = [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[1, 1, 1], [1, 1, 1], [1, 1, 1]], [[2, 2, 2], [2, 2, 2], [2, 2, 2]], [[3, 3, 3], [3, 3, 3], [3, 3, 3]],
        [[4, 4, 4], [4, 4, 4], [4, 4, 4]], [[5, 5, 5], [5, 5, 5], [5, 5, 5]]];
      // for (let i =0; i <= 5; ++i) {
      //   console.log(this.state[i]);
      // }
      // let params = [];
      // const directions = ['r', 'u', 'b', 'f', 'd', 'l', 'z', 'r\'', 'u\'', 'b\'', 'f\'', 'd\'', 'l\''];
      // for (let i = 0; i < 20; i++) {
      //   let param = directions[Math.floor(Math.random() * 13)];
      //   params.push(param);
      // }
      const params = ["U'", "B'", "U'", "L", "F'", "L", "R", "R", "B'", "L'", "R", "D", "B'"]
      // for (let i = 0; i < params.length; i++) {
      //   console.log(params[i])
      // }
      // console.log("--------------------------")
      this.generateparams(params);
      // for (let i = 0; i < this.params.length; i++) {
      //   console.log(this.params[i].direction, this.params[i].clockwise)
      // }
      // const list = this.$children.;
      // console.log(list);
      // list.forEach((item) => {
      //     Object.assign(item.colorCache, item.color);
      //     console.log(item.colorCache === item.color);
      // })
    },
    rotate(direction, clockwise, callback) {
      if (this.looping) {
        return
      }
      if (this.rotateing) {
        return
      }
      let coordinate = '';
      let position = 0;
      switch (direction) {
        case 'r':
          coordinate = 'y';
          position = 3;
          break;
        case 'u':
          coordinate = 'z';
          position = 3;
          break;
        case 'l':
          coordinate = 'y';
          position = 1;
          break;
        case 'd':
          coordinate = 'z';
          position = 1;
          break;
        case 'f':
          coordinate = 'x';
          position = 3;
          break;
        case 'b':
          coordinate = 'x';
          position = 1;
          break;
        case 'z':
        //   let state_temp_z = [this.state[1], this.state[3], this.state[2], this.state[4], this.state[0], this.state[5]];
        //   for(let i = 2; i <= 5; i = i + 3) {
        //     state_temp_z[i][0][0] = this.state[i][0][2];
        //     state_temp_z[i][0][1] = this.state[i][1][2];
        //     state_temp_z[i][0][2] = this.state[i][2][2];
        //     state_temp_z[i][1][0] = this.state[i][0][1];
        //     state_temp_z[i][1][2] = this.state[i][2][1];
        //     state_temp_z[i][2][0] = this.state[i][0][0];
        //     state_temp_z[i][2][1] = this.state[i][1][0];
        //     state_temp_z[i][2][2] = this.state[i][1][2];
        // }
        //   this.state = state_temp_z;
        //   console.log(this.state)
          if (this.isfast) {
            this.rotateZ = (this.rotateZ + 90) % 360;
          }
          else {
            for (let i = 1; i <= 90; i++) {
              setTimeout(() => {
                this.rotateZ = (this.rotateZ + 1 + 360) % 360;
              }, 500);
            }
          }
          break;
        case 'x':
          // let state_temp_x = [this.state[5], this.state[1], this.state[0], this.state[4], this.state[0], this.state[5]];
          // for(let i = 2; i <= 5; i = i + 3) {
          //   state_temp[i][0][0] = this.state[i][0][2];
          //   state_temp[i][0][1] = this.state[i][1][2];
          //   state_temp[i][0][2] = this.state[i][2][2];
          //   state_temp[i][1][0] = this.state[i][0][1];
          //   state_temp[i][1][2] = this.state[i][2][1];
          //   state_temp[i][2][0] = this.state[i][0][0];
          //   state_temp[i][2][1] = this.state[i][1][0];
          //   state_temp[i][2][2] = this.state[i][1][2];
          // }
          if (this.isfast) {
            this.rotateX = (this.rotateX - 90) % 360;
          }
          else {
            for (let i = 1; i <= 90; i++) {
              setTimeout(() => {
                this.rotateX = (this.rotateX - 1 + 360) % 360;
              }, 500);
            }
          }
          break;
          case 'y':
            if (this.isfast) {
              this.rotateY = (this.rotateY + 90) % 360;
            }
            else {
              for (let i = 1; i <= 90; i++) {
                setTimeout(() => {
                  this.rotateY = (this.rotateY + 1 + 360) % 360;
                }, 500);
              }
            }
            break;        default:
          console.log('error direction')
      }
      let speed = 0;
      let speed_b = 0;
      if(!this.isfast) {
        speed = 500;
        speed_b = 100;
      }
      this.rotateing = true;
      const list = this.$children.filter(item => item[coordinate] === position);
      list.forEach((item) => {
        Object.assign(item.colorCache, item.color);
        item.$el.style.transition = 'all .5s ease-in-out';
        if (coordinate == 'y') {
          item.rotateX += clockwise;
        } else if (coordinate == 'x') {
          item.rotateZ += clockwise;
        } else if (coordinate == 'z') {
          item.rotateY += clockwise;
        }
      })
      setTimeout(() => {
        list.forEach((item) => {
          item.$el.style.transition = 'none';
          if (coordinate == 'y') {
            item.rotateX = 0;
            if (clockwise == 1) {
              this.changeColor(this.$refs[`${this.transpose(item.z)}-${item.y}-${item.x}`][0], item, 'x', 'z', 'y')
            } else {
              this.changeColor(this.$refs[`${item.z}-${item.y}-${this.transpose(item.x)}`][0], item, 'z', 'x', 'y')
            }
          } else if (coordinate == 'x') {
            item.rotateZ = 0;
            if (clockwise == 1) {
              this.changeColor(this.$refs[`${item.x}-${item.z}-${this.transpose(item.y)}`][0], item, 'z', 'y', 'x')
            } else {
              this.changeColor(this.$refs[`${item.x}-${this.transpose(item.z)}-${item.y}`][0], item, 'y', 'z', 'x')
            }
          } else if (coordinate == 'z') {
            item.rotateY = 0;
            if (clockwise == 1) {
              this.changeColor(this.$refs[`${this.transpose(item.y)}-${item.x}-${item.z}`][0], item, 'x', 'y', 'z')
            } else {
              this.changeColor(this.$refs[`${item.y}-${this.transpose(item.x)}-${item.z}`][0], item, 'y', 'x', 'z')
            }
          }
        })
        this.rotateing = false;
        if (callback) {
          setTimeout(() => {
            callback()
          }, speed_b)
        }
      }, speed)
},
    changeColor(c1, c2, d1, d2, d3) {
      c1.color = {
        [`${d1}1`]: c2.colorCache[`${d2}3`],
        [`${d1}3`]: c2.colorCache[`${d2}1`],
        [`${d2}3`]: c2.colorCache[`${d1}3`],
        [`${d2}1`]: c2.colorCache[`${d1}1`],
        [`${d3}1`]: c2.colorCache[`${d3}1`],
        [`${d3}3`]: c2.colorCache[`${d3}3`],
      }
    },
    transpose(x) {
      if (x == 1) {
        return 3
      } else if (x == 3) {
        return 1
      }
      return 2
    },
    handleMouseDown(e) {
      this.dragging = true;
      let firstX = e.clientX;
      let firstY = e.clientY;
      const handleMouseMove = (event) => {
        this.rotateY += (event.clientX - firstX) * 0.5;
        this.rotateX -= (event.clientY - firstY) * 0.5;
        firstX = event.clientX;
        firstY = event.clientY;
      };
      const handleMouseUp = () => {
        if (this.dragging) {
          this.dragging = false;
        }
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },

    // randomRotate(loopNum) {
    //   if (loopNum <= 0) {
    //     this.looping = false;
    //     return;
    //   }
    //   this.looping = true;
    //   const param = generateRandomRotateParams();
    //   console.log(param.direction, param.clockwise);
    //   this.rotate(
    //     param.direction,
    //     param.clockwise,
    //     this.randomRotate.bind(this, loopNum - 1, false, param), true);
    // },
    playparams(index) {
      const loopNum = this.params.length;
      if (index >= loopNum || index < 0) {
        this.looping = false;
        return;
      }
      if (this.count % 2 === 0) {
        this.index = index;
        return;
      }
      const param = this.params[index];
      console.log(param.direction, param.clockwise, index);
      this.rotate(param.direction, param.clockwise, this.playparams.bind(this, index + 1, this.params[index]), true)
    },
    play() {
      // this.generateparams();
      // 可以实现双击重新播放
      if (this.index === this.params.length) {
        this.count = 1;
        this.index = 0;
      }
      this.playparams(this.index);
    },
    singleplayparams(index) {
      const loopNum = this.params.length;
      if (index >= loopNum || index < 0) {
        this.looping = false;
        return;
      }
      const param = this.params[index];
      console.log(param.direction, param.clockwise);
      this.rotate(param.direction, param.clockwise, this.singleplayparams.bind(this), true);
    },
    singleplay() {
      this.singleplayparams(this.counter - 1);
    },
  },
  components: {
    Cube,
  },
};
</script>

<style>
h1 {
  font-size: 30px;
  margin: 20px 0;
}

.button-group {
  height: 60px;
  line-height: 30px;
}

button {
  padding: 0 20px;
  line-height: 21px;
  font-size: 14px;
  display: inline-block;
  margin: 0 10px 0 0;
  border: 1px solid #333;
  border-radius: 3px;
  cursor: pointer;
}

.cube {
  width: 180px;
  height: 180px;
  position: relative;
  margin: 80px auto;
  transform-style: preserve-3d;
  transform-origin: center;
}
</style>
