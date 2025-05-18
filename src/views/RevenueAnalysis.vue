<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import RevenueChart from '../components/revenue/RevenueChart.vue'
import RevenueTable from '../components/revenue/RevenueTable.vue'
import RevenueFilter from '../components/revenue/RevenueFilter.vue'
import { useRevenueStore } from '../stores/revenueStore'

const revenueStore = useRevenueStore()
const isLoading = ref(true)
const timeFrame = ref('monthly')
const categoryFilter = ref('all')

onMounted(async () => {
  await revenueStore.fetchRevenueData()
  isLoading.value = false
})

const handleTimeFrameChange = (newTimeFrame: string) => {
  timeFrame.value = newTimeFrame
}

const handleCategoryChange = (newCategory: string) => {
  categoryFilter.value = newCategory
}

const filteredRevenueData = computed(() => {
  return revenueStore.getFilteredRevenueData(timeFrame.value, categoryFilter.value)
})

const categories = computed(() => revenueStore.categories)
</script>

<template>
  <div>
    <div v-if="isLoading" class="h-full flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    
    <div v-else>
      <div class="card mb-6">
        <h2 class="text-lg font-medium text-neutral-800 mb-4">Revenue Analysis</h2>
        <RevenueFilter 
          :time-frame="timeFrame" 
          :category="categoryFilter"
          :categories="categories"
          @time-frame-change="handleTimeFrameChange"
          @category-change="handleCategoryChange"
        />
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div class="card flex flex-col">
          <span class="text-sm text-neutral-500 mb-1">Total Revenue</span>
          <span class="text-2xl font-semibold text-neutral-800">${{ revenueStore.totalRevenue.toLocaleString() }}</span>
          <div class="mt-1 flex items-center">
            <span class="text-xs font-medium text-accent-600">+{{ revenueStore.revenueGrowth }}%</span>
            <span class="text-xs text-neutral-500 ml-1">vs previous period</span>
          </div>
        </div>
        
        <div class="card flex flex-col">
          <span class="text-sm text-neutral-500 mb-1">Total Orders</span>
          <span class="text-2xl font-semibold text-neutral-800">{{ revenueStore.totalOrders.toLocaleString() }}</span>
          <div class="mt-1 flex items-center">
            <span class="text-xs font-medium text-accent-600">+{{ revenueStore.ordersGrowth }}%</span>
            <span class="text-xs text-neutral-500 ml-1">vs previous period</span>
          </div>
        </div>
        
        <div class="card flex flex-col">
          <span class="text-sm text-neutral-500 mb-1">Average Order Value</span>
          <span class="text-2xl font-semibold text-neutral-800">${{ revenueStore.averageOrderValue.toLocaleString() }}</span>
          <div class="mt-1 flex items-center">
            <span class="text-xs font-medium text-accent-600">+{{ revenueStore.aovGrowth }}%</span>
            <span class="text-xs text-neutral-500 ml-1">vs previous period</span>
          </div>
        </div>
      </div>
      
      <div class="card mb-6">
        <h2 class="text-lg font-medium text-neutral-800 mb-4">Revenue Trends ({{ timeFrame }})</h2>
        <RevenueChart :data="filteredRevenueData.products" :time-frame="timeFrame" />
      </div>
      
      <div class="card">
        <h2 class="text-lg font-medium text-neutral-800 mb-4">Revenue by Product</h2>
        <RevenueTable :data="filteredRevenueData.products" />
      </div>
    </div>
  </div>
</template>