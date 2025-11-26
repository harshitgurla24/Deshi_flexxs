import dotenv from 'dotenv';
import path from 'path';
import { pathToFileURL } from 'url';
import connectDB from './config/db.js';
import Product from './models/product.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();
    // default frontend products path
    const frontendProducts = process.env.FRONTEND_PRODUCTS_PATH || path.resolve('../frontend/src/data/products.js');
    const fileUrl = pathToFileURL(frontendProducts).href;
    const module = await import(fileUrl);
    const products = module.products || module.default || [];

    if (!products || !products.length) {
      console.log('No products found in frontend file:', frontendProducts);
      process.exit(0);
    }

    // Clear existing products (optional)
    await Product.deleteMany({});

    const docs = products.map(p => ({
      productId: p.id?.toString() || undefined,
      name: p.name,
      description: p.description,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount,
      image: p.image,
      category: p.category,
      rating: p.rating,
      reviews: p.reviews,
      inStock: p.inStock !== false,
    }));

    await Product.insertMany(docs);
    console.log(`Seeded ${docs.length} products`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed', err);
    process.exit(1);
  }
};

run();
