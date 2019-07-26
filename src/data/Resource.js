export default class Resource {
  constructor(n, q, c, s, r, cost, cf) {
    this.name = n;
    this.quantity = q;
    this.isComposite = c;
    this.isStructure = s;
    this.base_rpt = r;
    this.cost = cost;
    this.craftFactor = cf; // # crafted when cost is paid
  }

  tick(n) {
    this.quantity += (this.base_rpt * n);
  }

  getCraftGain() {
    return [{name:this.name, quantity:this.craftFactor}];
  }

  getCraftCost() {
    return this.cost;
  }

  add(n) {
    this.quantity += n;
  }
};
