<template>
  <div id="app">
    <transition-group name="flip-list">
      <div
        v-for="item in pics"
        :style="{top: item.top,left: item.left,marginTop: item.margin,marginLeft: item.margin,zIndex: item.z}"
        :key="item.index"
        class="pic"
        @click="shuffle(item.index)"
      >
        <img
          :src=item.src
          :style="{transform: item.deg,width: item.size, height: item.size}"
        >
      </div>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: 'app',
    
    data(){
      return {
        total: 205,
        pics: []
      }
    },
    methods: {
      shuffle(n) {
      	let _this = this;
      	if(n===0 || this.pics[n].z !== 99){
          this.pics = []
          for (let i = 0; i < this.total; i++) {
            this.pics.push(n === i ? {
              size: innerWidth / 5 + 'px',
              margin: -innerWidth / 10 + 'px',
              top: '50%',
              left: '50%',
              deg: 'rotate(0deg)',
              z: 99
            } : {
              size: innerWidth / 10 + 'px',
              margin: -innerWidth / 20 + 'px',
              top: Math.random() * innerHeight + 'px',
              left: Math.random() * innerWidth + 'px',
              deg: 'rotate(' + Math.random() * 30 * (Math.random() > .5 ? -1 : 1) + 'deg)',
              z: 1
            })
            this.pics[i].index = i;
            this.pics[i].src = require('./assets/' + (i + 1) + '.jpg');
          }
        }
      }
    },
    mounted(){
      this.shuffle(0);
    }
  }
</script>

<style>
  body {
    overflow: hidden;
  }
  
  #app {
    margin: 0;
    padding: 0;
  }
  
  .pic {
    position: absolute;
    cursor: pointer;
  }
  
  .flip-list-move {
    transition: transform 2s;
  }
</style>
