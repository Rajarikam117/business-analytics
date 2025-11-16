// Service for handling localStorage operations

class StorageService {
  static BUSINESS_TYPE_KEY = 'businessType';
  static PRODUCTS_KEY = 'products';

  // Get business type
  static getBusinessType() {
    return localStorage.getItem(this.BUSINESS_TYPE_KEY);
  }

  // Set business type
  static setBusinessType(type) {
    localStorage.setItem(this.BUSINESS_TYPE_KEY, type);
  }

  // Get all products
  static getProducts() {
    const products = localStorage.getItem(this.PRODUCTS_KEY);
    return products ? JSON.parse(products) : [];
  }

  // Save all products
  static saveProducts(products) {
    localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products));
  }

  // Add a new product
  static addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      id: Date.now(),
      ...product,
      salesData: []
    };
    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  // Update an existing product
  static updateProduct(updatedProduct) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      this.saveProducts(products);
      return updatedProduct;
    }
    return null;
  }

  // Delete a product
  static deleteProduct(productId) {
    const products = this.getProducts();
    const filteredProducts = products.filter(p => p.id !== productId);
    this.saveProducts(filteredProducts);
  }

  // Clear all data
  static clearAll() {
    localStorage.removeItem(this.BUSINESS_TYPE_KEY);
    localStorage.removeItem(this.PRODUCTS_KEY);
  }
}

export default StorageService;