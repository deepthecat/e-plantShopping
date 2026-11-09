import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  
  const cartItems = useSelector(state => state.cart.items);
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?w=300", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484437-25826ebc3e77?w=300", description: "Filters formaldehyde and xylene.", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=300", description: "Removes mold spores from the air.", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=300", description: "Natural air humidifier.", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300", description: "Easy to grow and purifies toxins.", cost: "$20" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", description: "Medicinal and air purifying properties.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic & Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", description: "Calming floral fragrance.", cost: "$16" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=300", description: "Sweet, romantic scent.", cost: "$22" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=300", description: "Fragrant culinary herb.", cost: "$11" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=300", description: "Refreshing and aromatic.", cost: "$9" },
        { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1594918055631-081c3c9b749a?w=300", description: "Invigorating citrus scent.", cost: "$13" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=300", description: "Menthol-fresh invigorating scent.", cost: "$19" }
      ]
    },
    {
      category: "Low Maintenance & Succulents",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=300", description: "Thrives in low light conditions.", cost: "$25" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=300", description: "Fast-growing cascading vine.", cost: "$13" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1509223197845-458d87318791?w=300", description: "Symbol of good luck and resilience.", cost: "$15" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300", description: "Virtually indestructible foliage.", cost: "$24" },
        { name: "Haworthia", image: "https://images.unsplash.com/photo-1508020963102-c6c723be9764?w=300", description: "Compact architectural succulent.", cost: "$8" },
        { name: "Monstera Deliciosa", image: "https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?w=300", description: "Iconic split-leaf tropical plant.", cost: "$28" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setShowCart(false)}>Paradise Nursery</div>
        <div className="nav-menu">
          <button className="nav-link" onClick={() => setShowCart(false)}>Plants</button>
          <button className="cart-icon-btn" onClick={() => setShowCart(true)}>
            🛒 <span className="cart-count">{totalCartCount}</span>
          </button>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          {plantsArray.map((cat, idx) => (
            <div key={idx} className="category-section">
              <h2 className="category-title">{cat.category}</h2>
              <div className="plant-cards-group">
                {cat.plants.map((plant, pIdx) => (
                  <div key={pIdx} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                    <h3>{plant.name}</h3>
                    <p className="plant-desc">{plant.description}</p>
                    <p className="plant-price">{plant.cost}</p>
                    <button
                      className="add-to-cart-btn"
                      disabled={addedToCart[plant.name] || cartItems.some(i => i.name === plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] || cartItems.some(i => i.name === plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
