import { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";

export default function UserProfilePage() {
  const { addresses, setAddresses, orders, fetchAddresses, fetchOrders } =
    useShop();

  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    pincode: "",
  });
  useEffect(() => {
    fetchOrders();
    fetchAddresses();
  }, []);

  const handleAddAddress = () => {
    const id = Date.now();
    setAddresses((prev) => [...prev, { ...newAddress, id }]);
    setNewAddress({ name: "", street: "", city: "", pincode: "" });
  };

  const user = {
    name: "Prateek Sharma",
    email: "prateek@gmail.com",
    phone: "+91 6666666666",
  };

  return (
    <div className="container py-4">
      <h2>User Profile</h2>
      <div className="card p-3 mb-4">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
      </div>

      <h4>Saved Addresses:</h4>
      <div className="row">
        {addresses.map((addr) => (
          <div className="col-md-6 mb-3" key={addr.id}>
            <div className="card p-2">
              <p>
                <strong>{addr.name}</strong>
              </p>
              <p>
                {addr.street}, {addr.city}, {addr.pincode}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h5 className="mt-4">Add New Address</h5>
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
        <button className="btn btn-secondary w-100" onClick={handleAddAddress}>
          Add Address
        </button>
      </div>

      <h4 className="mt-4">Order History</h4>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="card mb-3 p-3">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Date:</strong> {new Date(order.date).toLocaleString()}
            </p>
            <p>
              <strong>Address:</strong> {order.address.name},{" "}
              {order.address.street}, {order.address.city},{" "}
              {order.address.pincode}
            </p>

            {order.items.map((item) => (
              <div className="card mt-2">
                <div
                  key={item.id}
                  className="card-body d-flex justify-content-between"
                >
                  <h6>{item.name}</h6>
                  <p className="mb-0">Qty: {item.qty || 1}</p>
                  <p className="mb-0 fw-bold">
                    ₹{item.price * (item.qty || 1)}
                  </p>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid"
                    style={{
                      maxHeight: "80px",
                      maxWidth: "100px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-muted">No orders placed yet.</p>
      )}
    </div>
  );
}
