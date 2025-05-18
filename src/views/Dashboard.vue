<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StatCard from '../components/dashboard/StatCard.vue'
import SalesChart from '../components/dashboard/SalesChart.vue'
import InventoryChart from '../components/dashboard/InventoryChart.vue'
import TopProducts from '../components/dashboard/TopProducts.vue'
import RecentActivity from '../components/dashboard/RecentActivity.vue'
import { useDashboardStore } from '../stores/dashboardStore'


const dashboardStore = useDashboardStore()
const isLoading = ref(true)


onMounted(async () => {
  await dashboardStore.fetchDashboardData()
  isLoading.value = false
})

</script>

<template>
  <div>
    <div v-if="isLoading" class="h-full flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Revenue" 
          :value="dashboardStore.totalRevenue" 
          icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          type="currency"
          trend="up"
          :percentage="12.5"
        />
        <StatCard 
          title="Total Orders" 
          :value="dashboardStore.totalOrders" 
          icon="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          type="number"
          trend="up"
          :percentage="8.2"
        />
        <StatCard 
          title="Average Order Value" 
          :value="dashboardStore.averageOrderValue" 
          icon="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          type="currency"
          trend="up"
          :percentage="3.7"
        />
        <StatCard 
          title="Low Stock Items" 
          :value="dashboardStore.lowStockItems" 
          icon="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          type="number"
          trend="down"
          :percentage="5.2"
          trendDirection="negative"
        />
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="card">
          <h2 class="text-lg font-medium text-neutral-800 mb-4">Revenue Trends</h2>
          <SalesChart />
        </div>
        <div class="card">
          <h2 class="text-lg font-medium text-neutral-800 mb-4">Inventory Status</h2>
          <InventoryChart />
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="card">
          <h2 class="text-lg font-medium text-neutral-800 mb-4">Top Selling Products</h2>
          <TopProducts :products="dashboardStore.topProducts" />
        </div>
        <div class="card">
          <h2 class="text-lg font-medium text-neutral-800 mb-4">Recent Activity</h2>
          <!-- <RecentActivity :activities="dashboardStore.recentActivities" /> -->
         <RecentActivity 
  :activities="dashboardStore.recentActivities as Array<{
    id: string;
    type: 'order' | 'inventory' | 'product';
    description: string;
    timestamp: string;
    icon?: string;
  }>" 
/>
        </div>
      </div>
    </div>
  </div>
</template>