<template>
  <div id="app">
    <Anumber name="Credits" v-bind:amount="credits" v-bind:credits="credits"></Anumber>
    <Anumber name="Ore Reserves" units="tons" v-on:doBuy="buyOre" v-on:doSell="sellOre" v-bind:amount="ore" v-bind:buyPrice="oreBuy" v-bind:sellPrice="oreSell" v-bind:credits="credits" transactional></Anumber>
    <Anumber name="Mines" :amount="mines" :credits="credits"></Anumber>
    <Anumber name="Colonists" :amount="colonists" :credits="credits"></Anumber>
    <Anumber name="Food" units="units" @doBuy="buyFood" @doSell="sellFood" :amount="food" :buyPrice="foodBuy" :sellPrice="foodSell" :credits="credits" transactional></Anumber>
    <Anumber name="Satisfaction" :amount="satisfaction" :credits="credits"></Anumber>
    <br>
    <button v-on:click="mineOre">Mine Ore</button>
    <hr>
    <!--<div v-for="thisRes in res">{{ thisRes.name }} : {{ thisRes.quantity }} : {{ thisRes.base_rpt }}</div>-->
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
    //costTemp[0] = {name:'energy', quantity:10};
    let resList = new Map();
    /* Resource(name, quantity, isComposite, isStructure, base_resources_per_tick, cost, craft_factor) */
    resList.set('energy', new Resource('energy', 0, false, false, 1, null, 1));
    resList.set('mass', new Resource('mass', 0, true, false, 0, costTemp, 1));
    return {
      resPool: resList,
      action_list: alTemp,
      timetick: 0,
      tickspersecond: 5,
      ore: 0,
      mines: 1,
      colonists: 12,
      food: 1800,
      satisfaction: 1.0,
      credits: 0,
      foodBuy: 100,
      foodSell: 50,
      oreBuy: 25,
      oreSell: 8,
    }
  },
  methods: {
    doCraft: function(res_name, n) {
      let act = new Action(this.timeTick, this.resPool.get(res_name).getCraftGain(), this.resPool.get(res_name).getCraftCost(), n);
      this.action_list.addAction(act);
    },
    sellOre: function(amount) {
      this.credits += amount * this.oreSell;
      this.ore -= amount;
    },
    buyOre: function(amount) {
      this.credits -= amount * this.oreBuy;
      this.ore += amount;
    },
    sellFood: function(amount) {
      this.credits += amount * this.foodSell;
      this.food -= amount;
    },
    buyFood: function(amount) {
      this.credits -= amount * this.foodBuy;
      this.food += amount;
    },
    mineOre: function() {
      this.ore += (10 * this.colonists * this.mines);
    },
    updateSatisfaction: function() {
      this.satisfaction += (this.food / this.colonists > 120) ? (0.1) : (0.0);
      this.satisfaction += (this.food / this.colonists < 80) ? (-0.2) : (0.0);
      this.satisfaction = Math.min(1, Math.max(0, this.satisfaction));
    },
    tick: function() {
      this.timetick++;
      this.resPool.forEach(function (thisRes,name) {
        thisRes.tick(1);
      });
      this.action_list.runNextAction(this.resPool);
    },
    gameLoop: function() {
      this.tick();
      this.mineOre();
      this.updateSatisfaction();
      if (this.satisfaction < 0.6 && this.colonists > 0) {
        this.colonists--;
      }
      if (this.satisfaction > 0.6) {
        this.colonists++;
      }
      this.food -= (this.colonists * 2);
      this.food = Math.max(0, this.food);
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
