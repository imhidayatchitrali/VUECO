import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRevenueStore = defineStore('revenue', () => {
  const totalRevenue = ref(1251480)
  const totalOrders = ref(3542)
  const averageOrderValue = ref(353)
  const revenueGrowth = ref(8.5)
  const ordersGrowth = ref(12.3)
  const aovGrowth = ref(3.7)
  
  const categories = ref(['Electronics', 'Fashion', 'Home & Kitchen', 'Health & Fitness', 'Beauty'])
  
  const revenueData = ref([
    {
      id: '1',
      name: 'Wireless Headphones',
      category: 'Electronics',
      revenue: 125000,
      orders: 358,
      averageOrderValue: 349.16,
      growth: 12.5,
      image: 'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '2',
      name: 'Smartphone X Pro',
      category: 'Electronics',
      revenue: 215000,
      orders: 430,
      averageOrderValue: 500,
      growth: 8.2,
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '3',
      name: 'Ultra HD Smart TV',
      category: 'Electronics',
      revenue: 320000,
      orders: 320,
      averageOrderValue: 1000,
      growth: 15.7,
      image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '4',
      name: 'Designer Backpack',
      category: 'Fashion',
      revenue: 85000,
      orders: 425,
      averageOrderValue: 200,
      growth: 5.8,
      image: 'https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '5',
      name: 'Fitness Tracker',
      category: 'Health & Fitness',
      revenue: 75000,
      orders: 300,
      averageOrderValue: 250,
      growth: 7.2,
      image: 'https://images.pexels.com/photos/437038/pexels-photo-437038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '6',
      name: 'Coffee Maker',
      category: 'Home & Kitchen',
      revenue: 63000,
      orders: 210,
      averageOrderValue: 300,
      growth: 4.1,
      image: 'https://images.pexels.com/photos/6312055/pexels-photo-6312055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '7',
      name: 'Luxury Skincare Set',
      category: 'Beauty',
      revenue: 89000,
      orders: 445,
      averageOrderValue: 200,
      growth: 9.3,
      image: 'https://images.pexels.com/photos/3762880/pexels-photo-3762880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '8',
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      revenue: 52500,
      orders: 350,
      averageOrderValue: 150,
      growth: 6.5,
      image: 'https://images.pexels.com/photos/157757/wedding-dresses-fashion-character-157757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '9',
      name: 'Running Shoes',
      category: 'Fashion',
      revenue: 112500,
      orders: 450,
      averageOrderValue: 250,
      growth: 11.2,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '10',
      name: 'Robot Vacuum',
      category: 'Home & Kitchen',
      revenue: 114480,
      orders: 254,
      averageOrderValue: 450.71,
      growth: 13.8,
      image: 'https://images.pexels.com/photos/4793259/pexels-photo-4793259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ])
  
  const dailyData = ref([
    { label: 'Mon', revenue: 15250, orders: 43 },
    { label: 'Tue', revenue: 18400, orders: 52 },
    { label: 'Wed', revenue: 17300, orders: 49 },
    { label: 'Thu', revenue: 21700, orders: 62 },
    { label: 'Fri', revenue: 25500, orders: 72 },
    { label: 'Sat', revenue: 19800, orders: 56 },
    { label: 'Sun', revenue: 12200, orders: 35 }
  ])
  
  const weeklyData = ref([
    { label: 'Week 1', revenue: 85250, orders: 242 },
    { label: 'Week 2', revenue: 92400, orders: 261 },
    { label: 'Week 3', revenue: 87300, orders: 248 },
    { label: 'Week 4', revenue: 95700, orders: 271 }
  ])
  
  const monthlyData = ref([
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
  
  const yearlyData = ref([
    { label: '2020', revenue: 850250, orders: 2350 },
    { label: '2021', revenue: 920400, orders: 2610 },
    { label: '2022', revenue: 985300, orders: 2780 },
    { label: '2023', revenue: 1105700, orders: 3125 },
    { label: '2024', revenue: 1251480, orders: 3542 }
  ])
  
  const fetchRevenueData = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, 800)
    })
  }
  
  const getFilteredRevenueData = (timeFrame: string, category: string) => {
    let timeData
    
    switch (timeFrame) {
      case 'daily':
        timeData = dailyData.value
        break
      case 'weekly':
        timeData = weeklyData.value
        break
      case 'monthly':
        timeData = monthlyData.value
        break
      case 'yearly':
        timeData = yearlyData.value
        break
      default:
        timeData = monthlyData.value
    }
    
    let filteredProducts = revenueData.value
    if (category !== 'all') {
      filteredProducts = revenueData.value.filter(product => product.category === category)
    }
    
    return {
      timeData,
      products: filteredProducts
    }
  }
  
  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    revenueGrowth,
    ordersGrowth,
    aovGrowth,
    categories,
    revenueData,
    fetchRevenueData,
    getFilteredRevenueData
  }
})