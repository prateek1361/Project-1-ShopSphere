import { createContext, useContext, useState, useEffect } from "react";
import products from "../data/productData";
import { toast } from "react-toastify";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchCart();
    fetchWishlist();
    fetchAddresses();
    fetchOrders();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://shop-sphere-eosin.vercel.app/cart");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://shop-sphere-eosin.vercel.app/wishlist");
      const data = await res.json();
      setWishlist(data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://shop-sphere-eosin.vercel.app/addresses");
      const data = await res.json();
      setAddresses(data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://shop-sphere-eosin.vercel.app/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      const res = await fetch("https://shop-sphere-eosin.vercel.app/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });

      if (res.ok) {
        fetchCart();
        toast.success("✅ Added to cart");
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await fetch(
        `https://shop-sphere-eosin.vercel.app/cart/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setCart((prev) => prev.filter((item) => item._id !== itemId));
        toast.info("🗑️ Removed from cart");
        fetchCart();
      } else {
        toast.error("Failed to remove from cart");
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const addToWishlist = async (product) => {
    try {
      const res = await fetch(
        "https://shop-sphere-eosin.vercel.app/wishlist/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product._id }),
        }
      );

      if (res.ok) {
        fetchWishlist();
        toast.success("💖 Added to wishlist");
      } else {
        toast.error("Already in wishlist");
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      const res = await fetch(
        `https://shop-sphere-eosin.vercel.app/wishlist/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setWishlist((prev) => prev.filter((item) => item._id !== itemId));
        toast.info("🗑️ Removed from wishlist");
      } else {
        toast.error("Failed to remove from wishlist");
      }
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  const moveToWishlist = async (item) => {
    await removeFromCart(item._id);
    await addToWishlist(item.productId);
    toast("Moved to wishlist");
  };

  const moveToCart = async (item) => {
    await removeFromWishlist(item._id);
    await addToCart(item.productId);
    toast("Moved to cart");
  };

  const increaseQty = async (itemId) => {
    try {
      const res = await fetch(
        `https://shop-sphere-eosin.vercel.app/cart/update/${itemId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ change: 1 }),
        }
      );

      if (res.ok) {
        await fetchCart();
        toast.success("🔼 Quantity increased");
      } else {
        toast.error("Failed to increase quantity");
      }
    } catch (err) {
      console.error("Error increasing quantity:", err);
      toast.error("Something went wrong");
    }
  };

  const decreaseQty = async (itemId) => {
    try {
      const res = await fetch(
        `https://shop-sphere-eosin.vercel.app/cart/update/${itemId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ change: -1 }),
        }
      );

      if (res.ok) {
        await fetchCart();
        toast.success("🔽 Quantity decreased");
      } else {
        toast.error("Failed to decrease quantity");
      }
    } catch (err) {
      console.error("Error decreasing quantity:", err);
      toast.error("Something went wrong");
    }
  };

  const selectAddress = (address) => {
    setSelectedAddress(address);
  };

  const placeOrder = async () => {
    if (!selectedAddress || cart.length === 0) {
      toast.error("Select address and ensure cart is not empty");
      return;
    }

    const orderPayload = {
      items: cart.map((item) => {
        const product = item.productId || {}; // Defensive in case cart format changes
        return {
          productId: product._id ?? item.productId,
          name: product.name ?? item.name,
          price: product.price ?? item.price,
          image: product.image ?? item.image,
          qty: item.quantity || 1,
        };
      }),
      address: {
        name: selectedAddress.name,
        street: selectedAddress.street,
        city: selectedAddress.city,
        pincode: selectedAddress.pincode,
      },
    };

    try {
      const res = await fetch(
        "https://shop-sphere-eosin.vercel.app/orders/place",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        }
      );

      for (let item of cart) {
        const cartItemId = item._id;
        const delRes = await fetch(
          `https://shop-sphere-eosin.vercel.app/cart/${cartItemId}`,
          {
            method: "DELETE",
          }
        );
        if (!delRes.ok) {
          console.error(`Failed to delete cart item ${cartItemId}`);
        }
      }

      toast.success("🎉 Order placed successfully");
      await fetchCart();
      await fetchOrders();
    } catch (err) {
      console.error("Order placement failed:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        loading,
        setLoading,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        addToWishlist,
        removeFromWishlist,
        moveToWishlist,
        moveToCart,
        products,
        setCart,
        addresses,
        setAddresses,
        selectedAddress,
        selectAddress,
        orders,
        setOrders,
        placeOrder,
        fetchAddresses,
        fetchOrders,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);
