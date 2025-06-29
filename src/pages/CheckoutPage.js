import { useShop } from "../context/ShopContext";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const {
    cart,
    addresses,
    setAddresses,
    selectedAddress,
    selectAddress,
    placeOrder,
    fetchAddresses,
  } = useShop();

  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    pincode: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.productId?.price * (item.quantity || 1),
    0
  );

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select an address first.");
      return;
    }

    placeOrder();
    window.location.href = "/orderSuccess";
  };

  const handleAddOrUpdateAddress = async () => {
    try {
      if (isEditing) {
        const res = await fetch(
          `https://shop-sphere-eosin.vercel.app/addresses/update/${editId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAddress),
          }
        );
        if (!res.ok) throw new Error("Failed to update address");

        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await fetch(
          "https://shop-sphere-eosin.vercel.app/addresses/add",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAddress),
          }
        );
        if (!res.ok) throw new Error("Failed to add address");
      }

      await fetchAddresses();
      setNewAddress({ name: "", street: "", city: "", pincode: "" });
    } catch (err) {
      console.error("Add/Update address error:", err);
      alert("Error adding or updating address.");
    }
  };

  const handleEdit = (addr) => {
    setIsEditing(true);
    setEditId(addr._id);
    setNewAddress({
      name: addr.name,
      street: addr.street,
      city: addr.city,
      pincode: addr.pincode,
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://shop-sphere-eosin.vercel.app/addresses/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete address");

      await fetchAddresses();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete address.");
    }
  };

  return (
    <div className="bg-light py-3">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-7 mb-3">
            <h2>Select Delivery Address:</h2>

            {Array.isArray(addresses) && addresses.length > 0 ? (
              addresses.map((addr) => (
                <div key={addr._id}>
                  <div
                    className={`card ${
                      selectedAddress?._id === addr._id ? "border-primary" : ""
                    }`}
                  >
                    <div className="card-body">
                      <h5>{addr.name}</h5>
                      <p>
                        {addr.street}, {addr.city}, {addr.pincode}
                      </p>
                      <button
                        className="btn btn-outline-secondary btn-sm me-2"
                        onClick={() => selectAddress(addr)}
                      >
                        Deliver Here
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm me-2"
                        onClick={() => handleEdit(addr)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleDelete(addr._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">
                No addresses available. Please add one.
              </p>
            )}

            <h4 className="mt-4">
              {isEditing ? "Update Address" : "Add New Address"}
            </h4>
            <div className="mb-3">
              <input
                className="form-control mb-2"
                placeholder="Name"
                value={newAddress.name}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, name: e.target.value })
                }
              />
              <input
                className="form-control mb-2"
                placeholder="Street"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
              />
              <input
                className="form-control mb-2"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
              />
              <input
                className="form-control mb-2"
                placeholder="Pincode"
                value={newAddress.pincode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, pincode: e.target.value })
                }
              />
              <button
                className="btn btn-secondary w-100"
                onClick={handleAddOrUpdateAddress}
              >
                {isEditing ? "Update Address" : "Add Address"}
              </button>
            </div>
          </div>

          <div className="col-md-5">
            <h4>Order Summary</h4>

            {cart.map((item) => {
              const product = item.productId;
              return (
                <div className="card mb-3" key={item._id}>
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="mb-1">{product.name}</h6>
                      <p className="mb-0">Price: ₹{product.price}</p>
                      <p className="mb-0">Qty: {item.quantity}</p>
                      <p className="mb-0 fw-bold">
                        Subtotal: ₹{product.price * item.quantity}
                      </p>
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid"
                      style={{
                        maxHeight: "80px",
                        maxWidth: "100px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              );
            })}

            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
