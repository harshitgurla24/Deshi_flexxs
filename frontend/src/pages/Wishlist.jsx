import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromWishlist, toggleWishlist } from '../features/wishlistSlice';
import './Wishlist.css';

const Wishlist = () => {
  const wishlist = useSelector(state => state.wishlist?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!wishlist || wishlist.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Your wishlist is empty</h2>
        <p>Explore products and add them to your wishlist.</p>
        <Link to="/">Browse products</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Your Wishlist</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16, marginTop: 12 }}>
        {wishlist.map((p) => (
          <div key={p.id} className="wishlist-item" style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
            <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${p.id}`)}>
              <img src={p.image} alt={p.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 6 }} />
              <h3 style={{ marginTop: 8 }}>{p.name}</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <div style={{ fontWeight: 700 }}>₹{p.price.toFixed(0)}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => navigate(`/product/${p.id}`)} className="view-button">View</button>
                <button onClick={() => dispatch(removeFromWishlist(p.id))} className="remove-button">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
