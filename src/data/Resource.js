export default class Resource {
  constructor(n) {
    this.name = n;
    this._baseRPT = [{name:this.name,quantity:1}];
    this._quantity = 0;
    this._minimum = 0;
    this._maximum = 100;
    this._isComposite = false;
    this._isStructure = false;
    this._cost = null;
    this._craftFactor = 1; // # crafted when cost is paid
  }

  get baseRPT() { return this._baseRPT; }
  set baseRPT(rpt) { this._baseRPT = rpt; }

  get quantity() { return this._quantity; }
  set quantity(q) { this._quantity = q; }

  get minimum() { return this._minimum; }
  set minimum(q) { this._minimum = q; }

  get maximum() { return this._maximum; }
  set maximum(q) { this._maximum = q; }

  get isComposite() { return this._isComposite; }
  set isComposite(ic) { this._isComposite = ic; }

  get isStructure() { return this._isStructure; }
  set isStructure(is) { this._isStructure = is; }

  get cost() { return this._cost; }
  set cost(c) { this._cost = c; }

  get craftFactor() { return this._craftFactor; }
  set craftFactor(cf) { this._craftFactor = cf; }

  tick(n) {
    let rpt = this._baseRPT;
    if (rpt.length === 1 && rpt[0].name === this.name) {
      this.add(rpt[0].quantity * n);
    }
    else {
      // TODO: for if a Resource generates another type
    }
  }

  getCraftGain() {
    return [{name:this.name, quantity:this.craftFactor}];
  }

  getCraftCost() {
    return this.cost;
  }

  add(n) {
    this._quantity += n;
    this._quantity = Math.min(this._quantity,this._maximum);
    this._quantity = Math.max(this._quantity,this._minimum);
  }

  testAddMin(n) {
    if (this._quantity + n >= this._minimum) {
      return true;
    }
    return false;
  }
};
