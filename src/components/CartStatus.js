import { useShop } from "../context/ShopContext";

const CartStatus = () => {
  const { cart } = useShop();
  if (cart.length === 0) return null;

  return (
    <span
      className="position-absolute  translate-middle badge rounded-pill bg-danger"
      style={{ fontSize: "0.6rem" }}
    >
      {cart.length}
    </span>
  );
};

export default CartStatus;
