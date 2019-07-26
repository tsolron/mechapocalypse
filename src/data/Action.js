export default class Action {
  constructor(t, g, c, n) {
    this.timetick = t;
    this.gain = g;
    this.cost = c;
    // TODO: Hard coded for now
    this.repeat = 1;
  }
  process(resPool) {
    // TODO: Ignoring limits and checks for now
    let rep = this.repeat;
    this.cost.forEach(function(r) {
      resPool.get(r.name).add(-r.quantity * rep);
    });
    this.gain.forEach(function(r) {
      resPool.get(r.name).add(r.quantity * rep);
    });
  }
  undo(resPool) {
    let rep = this.repeat;
    this.cost.forEach(function(r) {
      resPool.get(r.name).add(r.quantity * rep);
    });
    this.gain.forEach(function(r) {
      resPool.get(r.name).add(-r.quantity * rep);
    });
  }
};
