import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type Product = {
  id: string
  name: string
  description: string
  category: string
  price: number
  stock: number
  minStock: number
  sku: string
  cost: number
  supplier: string
  createdAt: string
  image: string
  dimensions: {
    width: number
    height: number
    depth: number
    weight: number
  }
}
export const useInventoryStore = defineStore('inventory', () => {

  const categories = ref(['Electronics', 'Fashion', 'Home & Kitchen', 'Health & Fitness', 'Beauty'])

  const products = ref([
    {
      id: '1',
      name: 'Wireless Headphones',
      description: 'Premium wireless headphones with noise cancellation and 20-hour battery life.',
      category: 'Electronics',
      price: 199.99,
      stock: 24,
      minStock: 15,
      sku: 'EL-WH-001',
      cost: 129.99,
      supplier: 'AudioTech Inc.',
      createdAt: '2024-05-15T14:22:18.123Z',
      image: 'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      dimensions: {
        width: 18,
        height: 20,
        depth: 8,
        weight: 0.3
      }
    },
    {
      id: '2',
      name: 'Smartphone X Pro',
      description: 'Latest model smartphone with 6.7" OLED display, 256GB storage and triple camera system.',
      category: 'Electronics',
      price: 999.99,
      stock: 12,
      minStock: 10,
      sku: 'EL-SP-002',
      cost: 749.99,
      supplier: 'TechGlobal',
      createdAt: '2024-05-10T09:15:32.456Z',
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      dimensions: {
        width: 7.5,
        height: 15.6,
        depth: 0.8,
        weight: 0.2
      }
    },
    {
      id: '3',
      name: 'Ultra HD Smart TV',
      description: '65" 4K Ultra HD Smart TV with HDR and built-in streaming services.',
      category: 'Electronics',
      price: 1299.99,
      stock: 7,
      minStock: 8,
      sku: 'EL-TV-003',
      cost: 950.00,
      supplier: 'VisualTech',
      createdAt: '2024-05-02T11:42:51.789Z',
      image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      dimensions: {
        width: 145,
        height: 83,
        depth: 5,
        weight: 25
      }
    },
    {
      id: '4',
      name: 'Designer Backpack',
      description: 'Water-resistant backpack with laptop compartment and multiple pockets.',
      category: 'Fashion',
      price: 89.99,
      stock: 32,
      minStock: 20,
      sku: 'FA-BP-001',
      cost: 45.00,
      supplier: 'Urban Gear',
      createdAt: '2024-04-25T16:37:42.123Z',
      image: 'https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      dimensions: {
        width: 30,
        height: 45,
        depth: 15,
        weight: 0.8
      }
    },
    {
      id: '5',
      name: 'Fitness Tracker',
      description: 'Advanced fitness tracker with heart rate monitoring, GPS and 7-day battery life.',
      category: 'Health & Fitness',
      price: 129.99,
      stock: 18,
      minStock: 12,
      sku: 'HF-FT-001',
      cost: 75.00,
      supplier: 'FitTech',
      createdAt: '2024-04-18T10:22:33.456Z',
      image: 'https://images.pexels.com/photos/437038/pexels-photo-437038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      dimensions: {
        width: 2,
        height: 4,
        depth: 1,
        weight: 0.03
      }
    },
    {
      id: '6',
      name: 'Coffee Maker',
      description: 'Programmable coffee maker with 12-cup capacity and built-in grinder.',
      category: 'Home & Kitchen',
      price: 149.99,
      stock: 15,
      minStock: 10,
      sku: 'HK-CM-001',
      cost: 89.99,
      supplier: 'Kitchen Essentials',
      createdAt: '2024-04-12T14:18:27.789Z',
      image: 'https://images.pexels.com/photos/6312055/pexels-photo-6312055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      dimensions: {
        width: 25,
        height: 35,
        depth: 20,
        weight: 3.5
      }
    },
    {
      id: '7',
      name: 'Luxury Skincare Set',
      description: 'Premium skincare set with cleanser, toner, serum and moisturizer.',
      category: 'Beauty',
      price: 199.99,
      stock: 22,
      minStock: 15,
      sku: 'BE-SC-001',
      cost: 120.00,
      supplier: 'Glow Beauty',
      createdAt: '2024-04-05T09:33:42.123Z',
      image: 'https://images.pexels.com/photos/3762880/pexels-photo-3762880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      dimensions: {
        width: 20,
        height: 15,
        depth: 8,
        weight: 0.5
      }
    },
    {
      id: '8',
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with 360° sound and 12-hour battery life.',
      category: 'Electronics',
      price: 79.99,
      stock: 28,
      minStock: 20,
      sku: 'EL-BS-004',
      cost: 45.00,
      supplier: 'AudioTech Inc.',
      createdAt: '2024-03-28T11:27:36.456Z',
      image: 'https://images.pexels.com/photos/157757/wedding-dresses-fashion-character-157757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      dimensions: {
        width: 8,
        height: 8,
        depth: 8,
        weight: 0.5
      }
    },
    {
      id: '9',
      name: 'Running Shoes',
      description: 'Lightweight running shoes with responsive cushioning and breathable mesh.',
      category: 'Fashion',
      price: 129.99,
      stock: 35,
      minStock: 25,
      sku: 'FA-RS-002',
      cost: 75.00,
      supplier: 'Active Lifestyle',
      createdAt: '2024-03-20T15:44:22.789Z',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      dimensions: {
        width: 10,
        height: 5,
        depth: 30,
        weight: 0.3
      }
    },
    {
      id: '10',
      name: 'Robot Vacuum',
      description: 'Smart robot vacuum with mapping technology, app control and automatic charging.',
      category: 'Home & Kitchen',
      price: 299.99,
      stock: 9,
      minStock: 10,
      sku: 'HK-RV-002',
      cost: 200.00,
      supplier: 'Smart Home Tech',
      createdAt: '2024-03-15T12:38:51.123Z',
      image: 'https://images.pexels.com/photos/4793259/pexels-photo-4793259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      dimensions: {
        width: 35,
        height: 10,
        depth: 35,
        weight: 3.2
      }
    },
    {
      id: '11',
      name: 'Yoga Mat',
      description: 'Non-slip yoga mat with alignment marks and carrying strap.',
      category: 'Health & Fitness',
      price: 49.99,
      stock: 42,
      minStock: 30,
      sku: 'HF-YM-002',
      cost: 25.00,
      supplier: 'Wellness Products',
      createdAt: '2024-03-08T10:17:36.456Z',
      image: 'https://images.pexels.com/photos/3822308/pexels-photo-3822308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      dimensions: {
        width: 60,
        height: 180,
        depth: 0.5,
        weight: 1.2
      }
    },
    {
      id: '12',
      name: 'Facial Cleansing Brush',
      description: 'Electric facial cleansing brush with multiple speeds and replaceable heads.',
      category: 'Beauty',
      price: 89.99,
      stock: 0,
      minStock: 10,
      sku: 'BE-FC-002',
      cost: 55.00,
      supplier: 'Glow Beauty',
      createdAt: '2024-03-02T16:55:22.789Z',
      image: 'https://images.pexels.com/photos/3737602/pexels-photo-3737602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      dimensions: {
        width: 5,
        height: 15,
        depth: 5,
        weight: 0.2
      }
    }
  ])

  const lowStockCount = computed(() => {
    return products.value.filter(product => product.stock <= (product.minStock || 10)).length
  })

  const fetchInventoryData = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, 800)
    })
  }

  // const getFilteredProducts = (searchQuery: string, categoryFilter: string, stockFilter: string, sortBy: string, sortOrder: string) => {
  //   let filteredProducts = [...products.value]

  // const getFilteredProducts = (
  //   searchQuery: string,
  //   categoryFilter: string,
  //   stockFilter: string,
  //   sortBy: keyof Product,
  //   sortOrder: 'asc' | 'desc'
  // ) => {
  //   let filteredProducts = [...products.value]
  //   if (searchQuery) {
  //     const query = searchQuery.toLowerCase()
  //     filteredProducts = filteredProducts.filter(product =>
  //       product.name.toLowerCase().includes(query) ||
  //       product.description.toLowerCase().includes(query) ||
  //       product.sku?.toLowerCase().includes(query)
  //     )
  //   }

  //   if (categoryFilter !== 'all') {
  //     filteredProducts = filteredProducts.filter(product => product.category === categoryFilter)
  //   }

  //   if (stockFilter !== 'all') {
  //     switch (stockFilter) {
  //       case 'in-stock':
  //         filteredProducts = filteredProducts.filter(product => product.stock > (product.minStock || 10))
  //         break
  //       case 'low-stock':
  //         filteredProducts = filteredProducts.filter(product => product.stock > 0 && product.stock <= (product.minStock || 10))
  //         break
  //       case 'out-of-stock':
  //         filteredProducts = filteredProducts.filter(product => product.stock === 0)
  //         break
  //     }
  //   }

  //   filteredProducts.sort((a, b) => {
  //     const modifier = sortOrder === 'asc' ? 1 : -1
  //     const aValue = a[sortBy]
  //     const bValue = b[sortBy]

  //     if (aValue < bValue) return -1 * modifier
  //     if (aValue > bValue) return 1 * modifier
  //     return 0
  //   })

  //   return filteredProducts
  // }

  const getFilteredProducts = (
    searchQuery: string,
    categoryFilter: string,
    stockFilter: string,
    sortBy: keyof Product,
    sortOrder: 'asc' | 'desc'
    
  ) => {
    let filteredProducts = [...products.value]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
      )
    }


    if (categoryFilter !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === categoryFilter)
    }


    if (stockFilter !== 'all') {
      switch (stockFilter) {
        case 'in-stock':
          filteredProducts = filteredProducts.filter(product => product.stock > (product.minStock || 10))
          break
        case 'low-stock':
          filteredProducts = filteredProducts.filter(product => product.stock > 0 && product.stock <= (product.minStock || 10))
          break
        case 'out-of-stock':
          filteredProducts = filteredProducts.filter(product => product.stock === 0)
          break
      }
    }

    filteredProducts.sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1
      const aValue = a[sortBy]
      const bValue = b[sortBy]

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * modifier
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * modifier
      }

      return 0
    })

    return filteredProducts
  }
  // filteredProducts.sort((a, b) => {
  //   const modifier = sortOrder === 'asc' ? 1 : -1

  //   if (a[sortBy] < b[sortBy]) {
  //     return -1 * modifier
  //   }
  //   if (a[sortBy] > b[sortBy]) {
  //     return 1 * modifier
  //   }
  //   return 0
  // })


  //   return filteredProducts
  // }

  const updateProduct = (updatedProduct: any) => {
    const index = products.value.findIndex(p => p.id === updatedProduct.id)
    if (index !== -1) {
      products.value[index] = updatedProduct
    }
  }


  const addProduct = async (newProduct: any) => {
    return new Promise(resolve => {
      setTimeout(() => {
        products.value.push(newProduct)
        resolve(true)
      }, 800)
    })
  }

  return {
    products,
    categories,
    lowStockCount,
    fetchInventoryData,
    getFilteredProducts,
    updateProduct,
    addProduct
  }
})