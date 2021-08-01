import { ACTION } from "./context";
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.CLEARCART:
      return { ...state, cart: [] };
    case ACTION.REMOVECART:
      return {
        ...state,
        cart: state.cart.filter((itemCart) => itemCart.id !== action.payload),
      };
    case ACTION.INCREASE:
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
      return { ...state, cart: tempCart };

    case ACTION.DECREASE:
      let temp = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload) {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0);
      return { ...state, cart: temp };

    case ACTION.TOTAL:
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.total += itemTotal;

          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );

      total = parseFloat(total.toFixed(2));

      return { ...state, total, amount };

    case ACTION.LOADING:
      return { ...state, loading: true };

    case ACTION.DISPLAY:
      return { ...state, cart: action.payload, loading: false };

    case ACTION.TOGGLE_AMOUNT:
      let tmpCartt = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.peyload.id) {
            if (action.peyload.type === "inc") {
              return { ...cartItem, amount: cartItem.amount + 1 };
            }
            if (action.peyload.type === "dec") {
              return { ...cartItem, amount: cartItem.amount - 1 };
            }
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0);
      return { ...state, cart: tmpCartt };

    default:
      throw new Error ('no matching action type')
  }
};

export default reducer;
