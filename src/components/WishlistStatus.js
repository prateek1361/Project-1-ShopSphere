import { useShop } from "../context/ShopContext";

const WishlistStatus = () => {
  const { wishlist } = useShop();

  if (wishlist.length === 0) return null;

  return (
    <div
      className="position-absolute  translate-middle badge rounded-pill bg-danger"
      style={{ fontSize: "0.6rem" }}
    >
      {wishlist.length}
    </div>
  );
};

export default WishlistStatus;
