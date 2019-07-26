export default class Resource {
  constructor(n) {
    this.name = n;
    this._baseRPT = [{name:this.name,quantity:1}];
    this._quantity = 0;
    this._isComposite = false;
    this._isStructure = false;
    this._cost = null;
    this._craftFactor = 1; // # crafted when cost is paid
  }

  get baseRPT() { return this._baseRPT; }
  set baseRPT(rpt) { this._baseRPT = rpt; }

  get quantity() { return this._quantity; }
  set quantity(q) { this._quantity = q; }

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
      this._quantity += (rpt[0].quantity * n);
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
  }
};
