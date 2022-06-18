const calcFinalPrice = (size: number, price: number) => {
  switch (size) {
    case 30:
      return Math.trunc(price * 1.2);
    case 40:
      return Math.trunc(price * 1.5);
    default:
      return price;
  }
}

export default calcFinalPrice;