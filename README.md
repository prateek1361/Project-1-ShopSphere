# ShopSphere

**ShopSphere** is a full-stack e-commerce application where users can browse products by category.

---

## 🔗 Demo Link

[Live Demo](https://project-1-shop-sphere.vercel.app/)

---

## 🚀 Quick Start

```bash
git clone https://github.com/prateek1361/Project-1-ShopSphere.git
cd Project-1-ShopSphere
npm install
npm run dev 
``` 

---

## Technologies

Frontend:
- React JS
- React Router
- Bootstrap
- useContext (React)


Backend:
- Node.js
- Express
- MongoDB

---

## Demo Video
Watch a walkthrough (7-8 minutes) of all the major features of this app:
[Google Drive](https://drive.google.com/file/d/1UlXl-s15VvTM3c2q8rNr7KR2zyoB9H6Z/view?usp=drive_link)


---


## Features

**Home**
- View featured product categories
- Explore Top Deals, New Arrivals, and Suggested Items

**Product Listing**
- Filter by category, rating and price
- Sort by price
- View product cards with details
- Search functionality

**Product Details**
- View detailed information (title, description, rating, price)

**Cart & Wishlist**
- Add/Remove items
- Move items between cart and wishlist
- Quantity adjustment

**Checkout**
- Select delivery address
- Confirm and place order

**User**
- Address management (Add, Edit, Delete)
- View order history


---


## API Reference

**GET /api/products**<br>
- Fetch all products
- Sample Response:
[{ _id, title, category, price, image, rating }, ...]


**GET /categories**
- Fetch all categories
- Sample Response:
[{ _id, name }, ...]

**GET /wishlist**
- Fetch all wishlist items
- Sample Response:
[{ _id, productId: { _id, title, ... } }, ...]

**POST /wishlist/add**
- Add a product to wishlist
- Request:
{ productId }
- Sample Response:
{ _id, productId }

**GET /cart**
- Fetch all cart items
Response:
[{ _id, productId: { _id, title, ... }, quantity }, ...]

**POST /cart/add**
- Add product to cart
- Request:
{ productId, quantity }
- Sample Response:
{ _id, productId, quantity }


**GET /addresses**
- Fetch all addresses
- Sample Response:
[{ _id, name, street, city, state, country, zipCode, mobile }, ...]


**GET /orders**
- Fetch all orders
- Sample Response:
[{ _id, orderId, items, address }, ...]

**POST /orders/place**
- Place a new order
-Request:
{ items: [{ productId, quantity }], address: { name, ... } }
- Sample Response:
{ message, order: { _id, orderId, items, address } }


---

## Contact

For buys or feature request, please reach out to prateek20091234@gmail.com


















