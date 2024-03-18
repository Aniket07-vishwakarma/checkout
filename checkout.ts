class CheckOut {
  pricingRules: any;
  quantity: {
    [ipd: string]: number;
    mbp: number;
    atv: number;
    vga: number;
  } = {
    ipd: 0,
    mbp: 0,
    atv: 0,
    vga: 0,
  };
  totalAmt: number = 0;

  constructor(pricingRules: any) {
    this.pricingRules = pricingRules;
  }

  scan(sku: string) {
    this.quantity[sku] = this.quantity[sku] + 1;
  }

  total() {
    let amtArr: [string, number][] = Object.entries(this.quantity);

    for (let i = 0; i < amtArr.length; i++) {
      switch (amtArr[i][0]) {
        case "ipd":
          this.totalAmt += this.pricingRules.ipdCost(amtArr[i][1]);
          break;
        case "mbp":
          this.totalAmt += this.pricingRules.mbpCost(amtArr[i][1]);
          break;
        case "atv":
          this.totalAmt += this.pricingRules.atvCost(amtArr[i][1]);
          break;
        case "vga":
          this.totalAmt += this.pricingRules.vgaCost(amtArr[i][1]);
          break;
        default:
          console.log(`Input object type is incorrect.`);
      }
    }
    return this.totalAmt;
  }
}

const price: {
  ipd: number;
  mbp: number;
  atv: number;
  vga: number;
} = {
  ipd: 549.99,
  mbp: 1399.99,
  atv: 109.5,
  vga: 30.0,
};

let pricingRules = {
  atvCost(atvQty: number) {
    return atvQty > 2 ? atvQty * price.atv - price.atv : atvQty * price.atv;
  },
  mbpCost(mbpQty: number) {
    return mbpQty * price.mbp;
  },
  ipdCost(ipdQty: number) {
    return ipdQty > 4 ? ipdQty * 499.99 : ipdQty * price.ipd;
  },
  vgaCost(vgaQty: number) {
    return vgaQty * price.vga;
  },
};

const cost = new CheckOut(pricingRules);

// cost.scan("atv");
// cost.scan("atv");
// cost.scan("atv");
// cost.scan("vga");

cost.scan("atv");
cost.scan("ipd");
cost.scan("ipd");
cost.scan("atv");
cost.scan("ipd");
cost.scan("ipd");
cost.scan("ipd");

console.log(cost.total());
