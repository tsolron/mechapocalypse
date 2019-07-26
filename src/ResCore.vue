<template>
    <div class="resource">
        <h1>{{ displayName }}</h1>
        <div v-show="_isComposite">
          <!--<input v-model="craftAmount" type="text" placeholder="Amount to craft">-->
          <button v-on:click="doCraft" v-bind:disabled="!canCraft">Craft {{ name }}</button>
        </div>
        <!--<div v-if="isStructure">
            <input v-model="improveAmount" type="text" placeholder="Amount to improve">
            <button v-on:click="doImprove" v-bind:disabled="!canImprove">Upgrade</button>
        </div>-->
    </div>
</template>

<script>
  export default {
    name: 'resource',
    props: {
      name: {
        type: String,
        required: true
      },
      _quantity: {
        type: Number,
        required: true
      },
      _isComposite: {
        type: Boolean,
        default: false
      },
      _isStructure: {
        type: Boolean,
        default: false
      },
      _cost: {
        type: Array,
        default: null
      },
      resPool: {
        type: Map,
        default: null
      }
    },
    data: function(){
      return {
        craftAmount: 1,
        improveAmount: 1,
      };
    },
    computed: {
      displayName: function () {
        return this.name + ' : ' + this._quantity;
      },
      canCraft: function () {
        // TODO: Maybe move this to data classes? Action? If not then Resource?
        /* // Currently not working?
        if (!this.isComposite && !this.isStructure) {
          return false;
        }

        let costCheck = this.cost;
        let tempPool = this.resPool;
        costCheck.forEach(function(r) {
          if (tempPool.get(r.name).quantity < r.quantity) {
            return false;
          }
        });
        */
        return true;
      },
      /*canImprove: function () {
        return true;
      }*/
    },
    methods: {
      doCraft: function () {
        this.$emit('doCraft', this.name, 1);
      },
      /*doImprove: function () {
        this.$emit('doImprove', parseInt(this.improveAmount));
      }*/
    }
  }
</script>
