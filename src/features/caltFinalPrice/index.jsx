const calcFinalPrice = (size, price) => {
  switch (size) {
    case 30: return price * 1.2;
    case 40: return price * 1.5;
    default: return price;
  }
}

export default calcFinalPrice;