import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import Dashboard from './views/Dashboard.vue'
import RevenueAnalysis from './views/RevenueAnalysis.vue'
import InventoryManagement from './views/InventoryManagement.vue'
import ProductRegistration from './views/ProductRegistration.vue'

const routes = [
  { 
    path: '/', 
    component: Dashboard,
    name: 'dashboard',
  },
  { 
    path: '/revenue', 
    component: RevenueAnalysis,
    name: 'revenue-analysis',
  },
  { 
    path: '/inventory', 
    component: InventoryManagement,
    name: 'inventory-management',
  },
  { 
    path: '/product-registration', 
    component: ProductRegistration,
    name: 'product-registration',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')