let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueDiv = document.getElementById("change-due");
const priceDisplay = document.getElementById("price-display");

priceDisplay.textContent = `$${price.toFixed(2)}`;

const currencyUnits = [
  { name: "ONE HUNDRED", val: 100 },
  { name: "TWENTY", val: 20 },
  { name: "TEN", val: 10 },
  { name: "FIVE", val: 5 },
  { name: "ONE", val: 1 },
  { name: "QUARTER", val: 0.25 },
  { name: "DIME", val: 0.1 },
  { name: "NICKEL", val: 0.05 },
  { name: "PENNY", val: 0.01 },
];

purchaseBtn.addEventListener("click", () => {
  const cash = parseFloat(cashInput.value);

  if (isNaN(cash)) {
    alert("Please enter a valid cash amount");
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    changeDueDiv.textContent = "";
    return;
  }

  if (cash === price) {
    changeDueDiv.textContent = "No change due - customer paid with exact cash";
    return;
  }

  const changeDue = parseFloat((cash - price).toFixed(2));
  let changeRemaining = changeDue;

  // Calculate total cid
  const totalCid = cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);

  if (totalCid < changeDue) {
    changeDueDiv.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  if (totalCid == changeDue) {
    // Drawer is closed, return all cash
    let resultStr = "Status: CLOSED";
    for (let [name, amount] of cid) {
      if (amount > 0) {
        resultStr += ` ${name}: $${amount.toFixed(2)}`;
      }
    }
    changeDueDiv.textContent = resultStr;
    return;
  }

  // Calculate change to give back in highest to lowest order
  const changeArray = [];

  // Reverse cid to align with currencyUnits order
  const reversedCid = [...cid].reverse();

  for (let i = 0; i < currencyUnits.length; i++) {
    const currencyName = currencyUnits[i].name;
    const currencyVal = currencyUnits[i].val;

    // Find amount available in drawer for this currency
    const cidEntry = reversedCid.find((c) => c[0] === currencyName);
    let amountInDrawer = cidEntry ? cidEntry[1] : 0;

    if (changeRemaining >= currencyVal && amountInDrawer > 0) {
      let amountToReturn = 0;
      while (changeRemaining >= currencyVal && amountInDrawer > 0) {
        changeRemaining = parseFloat((changeRemaining - currencyVal).toFixed(2));
        amountInDrawer = parseFloat((amountInDrawer - currencyVal).toFixed(2));
        amountToReturn = parseFloat((amountToReturn + currencyVal).toFixed(2));
      }
      if (amountToReturn > 0) {
        changeArray.push([currencyName, amountToReturn]);
      }
    }
  }

  
  if (changeRemaining > 0) {
    changeDueDiv.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  
  let output = "Status: OPEN";
  for (let [name, amount] of changeArray) {
    output += ` ${name}: $${amount.toFixed(2)}`;
  }

  changeDueDiv.textContent = output;
});
