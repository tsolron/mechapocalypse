<template>
  <div id="app">
    <h1>Tick Number : {{ this.timeTick }}</h1>
    <hr>
    <ResCore v-for="thisRes in resPoolArr" v-bind="thisRes" v-bind:resPool="resPool" v-on:doCraft="doCraft"></ResCore>
  </div>
</template>

<script>
import Anumber from './Anumber'
import ResCore from './ResCore'
import Resource from './data/Resource.js'
import Action from './data/Action.js'
import ActionList from './data/ActionList.js'
import Math from './lib/math.js'

export default {
  name: 'app',
  components: {
    Anumber,
    ResCore
  },
  data () {
    let alTemp = new ActionList(10);
    let costTemp = [{name:'energy',quantity:1000}];
    let resList = new Map();
    /* Resource(name, quantity, isComposite, isStructure, base_resources_per_tick, cost, craft_factor) */
    resList.set('energy', new Resource('energy', 0, false, false, 1, null, 1));
    resList.set('mass', new Resource('mass', 0, true, false, 0, costTemp, 1));
    return {
      resPool: resList,
      action_list: alTemp,
      timeTick: 0,
      tickspersecond: 5,
    }
  },
  methods: {
    doCraft: function(res_name, n) {
      let act = new Action(this.timeTick, this.resPool.get(res_name).getCraftGain(), this.resPool.get(res_name).getCraftCost(), n);
      this.action_list.addAction(act);
    },
    tick: function() {
      this.timeTick++;
      this.resPool.forEach(function (thisRes,name) {
        thisRes.tick(1);
      });
      this.action_list.runNextAction(this.resPool);
    },
    gameLoop: function() {
      this.tick();
      this.mineOre();
    }
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
