export default function OrderSuccessPage() {
  return (
    <div className="container text-center py-5">
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Your order has been saved.</p>
      <a href="/profile" className="btn btn-primary mt-4">
        Go to Profile
      </a>
    </div>
  );
}
