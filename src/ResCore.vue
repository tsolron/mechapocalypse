<template>
    <div class="rescore">
        <h1>{{ displayName }}</h1>
        <div v-if="isComposite">
          <!--<input v-model="craftAmount" type="text" placeholder="Amount to craft">-->
          <button v-on:click="doCraft" v-bind:disabled="!canCraft">Craft {{ this.name }}</button>
        </div>
        <!--<div v-if="isStructure">
            <input v-model="improveAmount" type="text" placeholder="Amount to improve">
            <button v-on:click="doImprove" v-bind:disabled="!canImprove">Upgrade</button>
        </div>-->
    </div>
</template>

<script>
  export default {
    name: 'rescore',
    props: {
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      isComposite: {
        type: Boolean,
        default: false
      },
      isStructure: {
        type: Boolean,
        default: false
      },
      units: {
        type: String,
        default: ''
      },
      cost: {
        type: Array,
        default: null
      },
      resPool: {
        type: Map,
        default: null
      }
      /*transactional: {
        type: Boolean,
        default: false
      }*/
    },
    data: function(){
      return {
        craftAmount: 1,
        improveAmount: 1,
      };
    },
    computed: {
      displayName: function () {
        return this.name + ' : ' + this.quantity + ((this.units.length > 0) ? (this.units) : (''));
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
