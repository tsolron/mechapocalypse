<template>
  <div id="app">
    <h1>Tick Number : {{ this.timeTick }}</h1>
    <button @click="tryUndo">Undo Last Action</button>
    <hr>
    <ResCore v-for="thisRes in resPoolArr" v-bind="thisRes" v-bind:resPool="resPool" v-on:doCraft="doCraft"></ResCore>
  </div>
</template>

<script>
import ResCore from './ResCore'
import Resource from './data/Resource.js'
import Action from './data/Action.js'
import ActionList from './data/ActionList.js'
import Math from './lib/math.js'

export default {
  name: 'app',
  components: {
    ResCore
  },
  data () {
    let alTemp = new ActionList(10);
    let resList = new Map();
    /* Resource(name, quantity, isComposite, isStructure, base_resources_per_tick) */
    resList.set('energy', new Resource('energy'));
    resList.set('mass', new Resource('mass'));
    resList.get('mass').cost = [{name:'energy',quantity:10}];
    resList.get('mass').craftFactor = 10;
    resList.get('mass').isComposite = true;
    resList.get('mass').baseRPT = [{name:'mass',quantity:0}];
    //resList.get('mass').isStructure = true;
    return {
      resPool: resList,
      action_list: alTemp,
      timeTick: 0,
      tickspersecond: 20,
    }
  },
  methods: {
    doCraft: function(res_name, n) {
      let act = new Action(this.timeTick, this.resPool.get(res_name).getCraftGain(), this.resPool.get(res_name).getCraftCost(), n);
      this.action_list.addAction(act);
    },
    gameLoop: function() {
      this.timeTick++;
      this.resPool.forEach(function (thisRes,name) {
        thisRes.tick(1);
      });
      this.action_list.runNextAction(this.resPool);
    },
    tryUndo: function() {
      this.action_list.rollbackPreviousAction(this.resPool);
    },
  },
  computed: {
    resPoolArr: function() {
      return Array.from(this.resPool.values());
    }
  },
  mounted: function() {
    setInterval(this.gameLoop, 1000 / this.tickspersecond);
  },
}
</script>

<style>
</style>
