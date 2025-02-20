import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

const transformProduct = (product) => ({
  id: product.id,
  name: product.title,
  price: product.price,
  image: product.image,
  category: product.category,
  description: product.description,
  features: getFeaturesByCategory(product.category)
});

const getFeaturesByCategory = (category) => {
  const features = {
    "electronics": [
      "High quality build",
      "1 year warranty",
      "Free technical support",
      "Energy efficient"
    ],
    "jewelery": [
      "Premium materials",
      "Elegant design",
      "Gift ready packaging",
      "Certificate of authenticity"
    ],
    "men's clothing": [
      "Premium fabric",
      "Comfortable fit",
      "Easy care instructions",
      "Durable construction"
    ],
    "women's clothing": [
      "Stylish design",
      "Quality materials",
      "Perfect fit",
      "Easy maintenance"
    ]
  };
  return features[category.toLowerCase()] || [
    "Quality guaranteed",
    "Great value",
    "Fast shipping",
    "Satisfaction guaranteed"
  ];
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data.map(transformProduct);
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return transformProduct(response.data);
  } catch (error) {
    throw new Error('Product not found');
  }
};
