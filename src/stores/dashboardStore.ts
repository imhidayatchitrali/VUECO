import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  const totalRevenue = ref(427896.45)
  const totalOrders = ref(1254)
  const averageOrderValue = ref(341.23)
  const lowStockItems = ref(8)
  
  const topProducts = ref([
    {
      id: '1',
      name: 'Wireless Headphones',
      category: 'Electronics',
      sales: 42500,
      stock: 24,
      image: 'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '2',
      name: 'Smartphone X Pro',
      category: 'Electronics',
      sales: 38750,
      stock: 12,
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '3',
      name: 'Ultra HD Smart TV',
      category: 'Electronics',
      sales: 32100,
      stock: 7,
      image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '4',
      name: 'Designer Backpack',
      category: 'Fashion',
      sales: 28400,
      stock: 32,
      image: 'https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '5',
      name: 'Fitness Tracker',
      category: 'Health & Fitness',
      sales: 19250,
      stock: 18,
      image: 'https://images.pexels.com/photos/437038/pexels-photo-437038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ])
  
  const recentActivities = ref([
    {
      id: '1',
      type: 'order',
      description: 'New order #4721 received - $352.49',
      timestamp: new Date(Date.now() - 25 * 60000).toISOString() // 25 minutes ago
    },
    {
      id: '2',
      type: 'inventory',
      description: 'Smartphone X Pro stock is low (8 units remaining)',
      timestamp: new Date(Date.now() - 2 * 3600000).toISOString() // 2 hours ago
    },
    {
      id: '3',
      type: 'product',
      description: 'New product "Smart Watch Pro" added to inventory',
      timestamp: new Date(Date.now() - 5 * 3600000).toISOString() // 5 hours ago
    },
    {
      id: '4',
      type: 'order',
      description: 'Order #4715 has been shipped',
      timestamp: new Date(Date.now() - 8 * 3600000).toISOString() // 8 hours ago
    },
    {
      id: '5',
      type: 'inventory',
      description: 'Restocked Wireless Headphones (+25 units)',
      timestamp: new Date(Date.now() - 24 * 3600000).toISOString() // 1 day ago
    }
  ])
  
  const monthlyRevenueData = ref([
    { label: 'Jan', revenue: 89250, orders: 250 },
    { label: 'Feb', revenue: 76400, orders: 220 },
    { label: 'Mar', revenue: 82300, orders: 235 },
    { label: 'Apr', revenue: 91700, orders: 260 },
    { label: 'May', revenue: 102500, orders: 290 },
    { label: 'Jun', revenue: 94800, orders: 275 },
    { label: 'Jul', revenue: 99200, orders: 285 },
    { label: 'Aug', revenue: 93500, orders: 265 },
    { label: 'Sep', revenue: 87300, orders: 245 },
    { label: 'Oct', revenue: 105200, orders: 295 },
    { label: 'Nov', revenue: 110400, orders: 310 },
    { label: 'Dec', revenue: 118900, orders: 340 }
  ])
  
  const inventoryByCategory = ref([
    { category: 'Electronics', totalProducts: 58, lowStockProducts: 12 },
    { category: 'Fashion', totalProducts: 42, lowStockProducts: 3 },
    { category: 'Home & Kitchen', totalProducts: 35, lowStockProducts: 5 },
    { category: 'Health & Fitness', totalProducts: 28, lowStockProducts: 2 },
    { category: 'Beauty', totalProducts: 20, lowStockProducts: 0 }
  ])
  
  const fetchDashboardData = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, 800)
    })
  }
  
  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    lowStockItems,
    topProducts,
    recentActivities,
    monthlyRevenueData,
    inventoryByCategory,
    fetchDashboardData
  }
})