import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile, cancelOrder } from '../features/ordersSlice';
import API from '../utils/api';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.orders.userProfile);
  const ordersFromStore = useSelector((state) => state.orders.orders);
  const [orders, setOrders] = useState(ordersFromStore || []);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const fileInputRef = useRef(null);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = () => {
    // update local + backend
    (async () => {
      try {
        const res = await API.put('/api/profile', formData);
        const updated = res.data.user;
        setFormData(updated);
        dispatch(updateUserProfile(updated));
        setIsEditing(false);
        alert('Profile updated');
      } catch (err) {
        alert(err.response?.data?.error || 'Update failed');
      }
    })();
  };

  const handleAvatarFile = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      try {
        const res = await API.put('/api/profile', { avatar: dataUrl });
        const updated = res.data.user;
        setFormData(updated);
        dispatch(updateUserProfile(updated));
        alert('Profile photo updated');
      } catch (err) {
        alert(err.response?.data?.error || 'Upload failed');
      }
    };
    reader.readAsDataURL(file);
  };

  const onChooseAvatar = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleRemoveAvatar = async () => {
    if (!window.confirm('Remove profile photo?')) return;
    try {
      const res = await API.put('/api/profile', { avatar: '' });
      const updated = res.data.user;
      setFormData(updated);
      dispatch(updateUserProfile(updated));
      alert('Profile photo removed');
    } catch (err) {
      alert(err.response?.data?.error || 'Remove failed');
    }
  };

  useEffect(() => {
    // fetch profile and orders from backend
    const load = async () => {
      try {
        const p = await API.get('/api/profile');
        if (p.data?.user) {
          setFormData(p.data.user);
          dispatch(updateUserProfile(p.data.user));
        }
        const o = await API.get('/api/orders');
        if (o.data?.orders) setOrders(o.data.orders.map(o2 => ({
          id: o2._id,
          items: o2.items.map(it => ({ id: it.productId, ...it })),
          total: o2.total,
          date: new Date(o2.createdAt).toLocaleDateString(),
          status: o2.status,
          deliveryDate: new Date(o2.deliveryDate).toLocaleDateString(),
        })));
      } catch (err) {
        // ignore — user may be not authenticated
      }
    };
    load();
  }, [dispatch]);

  const handleProductClick = (product) => {
    setSelectedProductModal(product);
  };

  const handleCloseModal = () => {
    setSelectedProductModal(null);
  };

  const handleViewProductDetails = (productId) => {
    setSelectedProductModal(null);
    navigate(`/product/${productId}`);
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      dispatch(cancelOrder(orderId));
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {formData?.avatar ? (
              <img src={formData.avatar} alt={formData.name} className="avatar-img" />
            ) : (
              <div className="avatar-circle">{(formData?.name || userProfile?.name || 'U').charAt(0)}</div>
            )}
            <div className="avatar-actions">
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={(e) => handleAvatarFile(e.target.files?.[0])}
              />
              <button className="btn btn-small" onClick={onChooseAvatar}>Change Photo</button>
              {formData?.avatar && (
                <button className="btn btn-small btn-remove" onClick={handleRemoveAvatar}>Remove</button>
              )}
            </div>
          </div>
          <div className="profile-header-info">
            <h1>{formData?.name || userProfile?.name}</h1>
            <p className="member-since">Member since {formData?.memberSince || userProfile?.memberSince}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Orders
          </button>
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile Info
          </button>
          <button
            className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="tab-content orders-tab">
            <h2>Order History</h2>
            {orders.length === 0 ? (
              <div className="empty-state">
                <p>📭 No orders yet</p>
                <p>Start shopping to see your orders here</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3>{order.id}</h3>
                        <p className="order-date">{order.date}</p>
                      </div>
                      <div className="order-status">
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="order-items-preview">
                      <p className="items-count">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </p>
                      <div className="items-list">
                        {order.items.map((item) => (
                          <div 
                            key={item.id} 
                            className="item-preview"
                            onClick={() => handleProductClick(item)}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') handleProductClick(item);
                            }}
                          >
                            <img src={item.image} alt={item.name} />
                            <div className="item-detail">
                              <p className="item-name">{item.name}</p>
                              <p className="item-qty">Qty: {item.quantity}</p>
                            </div>
                            <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="order-footer">
                      <div className="order-total">
                        <span>Total:</span>
                        <span className="total-amount">₹{order.total.toFixed(2)}</span>
                      </div>
                      <div className="order-delivery">
                        <span className="delivery-label">Est. Delivery:</span>
                        <span className="delivery-date">{order.deliveryDate}</span>
                      </div>
                      <div className="order-actions">
                        <button className="btn-track">Track Order</button>
                        <button 
                          className="btn-cancel-order"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Cancel Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Info Tab */}
        {activeTab === 'profile' && (
          <div className="tab-content profile-tab">
            <h2>Profile Information</h2>
            {!isEditing ? (
              <div className="profile-info-view">
                <div className="info-card">
                  <label>Full Name</label>
                  <p>{userProfile.name}</p>
                </div>
                <div className="info-card">
                  <label>Email Address</label>
                  <p>{userProfile.email}</p>
                </div>
                <div className="info-card">
                  <label>Phone Number</label>
                  <p>{userProfile.phone}</p>
                </div>
                <div className="info-card">
                  <label>Address</label>
                  <p>{userProfile.address}</p>
                </div>
                <button
                  className="btn btn-edit"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="profile-info-edit">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleEditChange}
                    rows="3"
                  />
                </div>
                <div className="form-actions">
                  <button
                    className="btn btn-save"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </button>
                  <button
                    className="btn btn-cancel"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(userProfile);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="tab-content settings-tab">
            <h2>Settings</h2>
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-label">
                  <h4>Email Notifications</h4>
                  <p>Receive order updates via email</p>
                </div>
                <input type="checkbox" defaultChecked className="toggle" />
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <h4>SMS Notifications</h4>
                  <p>Receive order updates via SMS</p>
                </div>
                <input type="checkbox" defaultChecked className="toggle" />
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <h4>Marketing Emails</h4>
                  <p>Receive promotional offers and deals</p>
                </div>
                <input type="checkbox" className="toggle" />
              </div>
            </div>

            <div className="danger-zone">
              <h3>Account Actions</h3>
              <button className="btn btn-danger">Change Password</button>
              <button className="btn btn-danger">Delete Account</button>
            </div>
          </div>
        )}

        {/* Product Modal */}
        {selectedProductModal && (
          <div className="product-modal-overlay" onClick={handleCloseModal}>
            <div className="product-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={handleCloseModal}>✕</button>
              
              <div className="modal-content">
                <div className="modal-image">
                  <img src={selectedProductModal.image} alt={selectedProductModal.name} />
                </div>
                
                <div className="modal-info">
                  <h2>{selectedProductModal.name}</h2>
                  <p className="modal-description">{selectedProductModal.description}</p>
                  
                  <div className="modal-price-section">
                    <span className="modal-price">₹{selectedProductModal.price.toFixed(2)}</span>
                    {selectedProductModal.originalPrice && (
                      <span className="modal-original-price">₹{selectedProductModal.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  <div className="modal-details">
                    <div className="detail-row">
                      <span className="label">Quantity Ordered:</span>
                      <span className="value">{selectedProductModal.quantity}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Unit Price:</span>
                      <span className="value">₹{selectedProductModal.price.toFixed(2)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Total:</span>
                      <span className="value">₹{(selectedProductModal.price * selectedProductModal.quantity).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button 
                      className="btn-view-details"
                      onClick={() => handleViewProductDetails(selectedProductModal.id)}
                    >
                      View Full Details
                    </button>
                    <button 
                      className="btn-close-modal"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
