export const products = [
  { id: 1, name: 'Classic White Tee', description: 'Soft cotton tee - relaxed fit', price: 599.0, originalPrice: 799.0, discount: 25, image: 'https://images.unsplash.com/photo-1520975912118-2b8a3f1b8b8e?w=800&q=80', category: 'Men', rating: 4.6, reviews: 420, inStock: true },
  { id: 2, name: 'Slim Fit Jeans', description: 'Stretch denim - slim tapered', price: 1499.0, originalPrice: 1999.0, discount: 25, image: 'https://images.unsplash.com/photo-1520975912116-3a7a8b3c7d7a?w=800&q=80', category: 'Men', rating: 4.5, reviews: 312, inStock: true },
  { id: 3, name: 'Checked Flannel Shirt', description: 'Cozy brushed flannel for layering', price: 999.0, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80', category: 'Men', rating: 4.4, reviews: 198, inStock: true },
  { id: 4, name: 'Lightweight Bomber Jacket', description: 'Versatile jacket with ribbed cuffs', price: 2499.0, image: 'https://images.unsplash.com/photo-1520975920007-89a34b8d6f4a?w=800&q=80', category: 'Men', rating: 4.7, reviews: 142, inStock: true },
  { id: 5, name: 'Summer Linen Shirt', description: 'Breathable linen blend', price: 1299.0, image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&q=80', category: 'Men', rating: 4.3, reviews: 88, inStock: true },
  { id: 6, name: 'Floral Midi Dress', description: 'Flowy silhouette with ruffle hem', price: 1799.0, originalPrice: 2299.0, discount: 22, image: 'https://images.unsplash.com/photo-1520975912119-5c7a1a9c8b9d?w=800&q=80', category: 'Women', rating: 4.8, reviews: 512, inStock: true },
  { id: 7, name: 'Tailored Blazer', description: 'Structured blazer for work and events', price: 3499.0, image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80', category: 'Women', rating: 4.6, reviews: 231, inStock: true },
  { id: 8, name: 'High-Waisted Trousers', description: 'Comfort stretch with classic cut', price: 1599.0, image: 'https://images.unsplash.com/photo-1520975912115-0b6e1b2c7f2a?w=800&q=80', category: 'Women', rating: 4.5, reviews: 183, inStock: true },
  { id: 9, name: 'Casual Sneakers', description: 'Lightweight everyday sneakers', price: 2199.0, originalPrice: 2699.0, discount: 18, image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800&q=80', category: 'Unisex', rating: 4.7, reviews: 402, inStock: true },
  { id: 10, name: 'Knitted Beanie', description: 'Soft acrylic knit beanie', price: 349.0, image: 'https://images.unsplash.com/photo-1542060744-3a0f5b2252d3?w=800&q=80', category: 'Accessories', rating: 4.4, reviews: 76, inStock: true },
  { id: 11, name: 'Leather Belt', description: 'Genuine leather belt with metal buckle', price: 799.0, image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80', category: 'Accessories', rating: 4.6, reviews: 98, inStock: true },
  { id: 12, name: 'Kids Graphic Tee', description: 'Cotton tee with playful print', price: 399.0, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80', category: 'Kids', rating: 4.5, reviews: 64, inStock: true },
  { id: 13, name: 'Denim Jacket (Women)', description: 'Classic denim with modern tailoring', price: 1999.0, image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800&q=80', category: 'Women', rating: 4.6, reviews: 144, inStock: true },
  { id: 14, name: 'Athletic Leggings', description: 'High-stretch, moisture-wicking fabric', price: 899.0, image: 'https://images.unsplash.com/photo-1520975912117-1a2b3c4d5e6f?w=800&q=80', category: 'Women', rating: 4.5, reviews: 210, inStock: true },
  { id: 15, name: 'Puffer Jacket', description: 'Warm insulated jacket for cold days', price: 2999.0, image: 'https://images.unsplash.com/photo-1542293787938-c9e299b880b5?w=800&q=80', category: 'Men', rating: 4.7, reviews: 220, inStock: true },
  { id: 16, name: 'Satin Scarf', description: 'Lightweight scarf - elegant sheen', price: 499.0, image: 'https://images.unsplash.com/photo-1520975912120-6b8c9d7e8f8a?w=800&q=80', category: 'Accessories', rating: 4.4, reviews: 56, inStock: true },
  { id: 17, name: 'Casual Shorts', description: 'Comfortable cotton shorts', price: 699.0, image: 'https://images.unsplash.com/photo-1520975912121-9c8d1f2b7a6d?w=800&q=80', category: 'Men', rating: 4.3, reviews: 78, inStock: true },
  { id: 18, name: 'Wrap Dress', description: 'Versatile wrap dress with belt', price: 1899.0, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80', category: 'Women', rating: 4.6, reviews: 132, inStock: true },
  { id: 19, name: 'Kids Hoodie', description: 'Cozy hoodie with front pocket', price: 699.0, image: 'https://images.unsplash.com/photo-1520975912114-2f3b4c5d6e7f?w=800&q=80', category: 'Kids', rating: 4.5, reviews: 44, inStock: true },
  { id: 20, name: 'Weekend Tote Bag', description: 'Durable canvas tote for daily use', price: 899.0, image: 'https://images.unsplash.com/photo-1520975912113-3c4d5e6f7a8b?w=800&q=80', category: 'Accessories', rating: 4.6, reviews: 98, inStock: true }
];

export const categories = [
  { id: 1, name: 'Men', icon: '👔' },
  { id: 2, name: 'Women', icon: '👗' },
  { id: 3, name: 'Kids', icon: '🧒' },
  { id: 4, name: 'Accessories', icon: '👜' },
  { id: 5, name: 'Unisex', icon: '🧥' }
];
