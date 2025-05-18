<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  data: any[]
}>()

const sortBy = ref('revenue')
const sortDirection = ref('desc')

const handleSort = (column: string) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortDirection.value = 'desc'
  }
}

// const sortedData = computed(() => {
//   const data = Array.isArray(props.data) ? props.data : []
//   return [...props.data].sort((a, b) => {
//     const modifier = sortDirection.value === 'asc' ? 1 : -1
    
//     if (a[sortBy.value] < b[sortBy.value]) {
//       return -1 * modifier
//     }
//     if (a[sortBy.value] > b[sortBy.value]) {
//       return 1 * modifier
//     }
//     return 0
//   })
// })
const sortedData = computed(() => {
  if (!Array.isArray(props.data)) return []

  return [...props.data].sort((a, b) => {
    const modifier = sortDirection.value === 'asc' ? 1 : -1

    if (a[sortBy.value] < b[sortBy.value]) return -1 * modifier
    if (a[sortBy.value] > b[sortBy.value]) return 1 * modifier
    return 0
  })
})

const getSortIcon = (column: string) => {
  if (sortBy.value !== column) {
    return 'M7 16V4m0 0L3 8m4-4l4 4'
  }
  
  return sortDirection.value === 'asc'
    ? 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12'
    : 'M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4'
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-neutral-200">
      <thead class="bg-neutral-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
            Product
          </th>
          <th 
            scope="col" 
            @click="handleSort('revenue')"
            class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
          >
            <div class="flex items-center">
              Revenue
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getSortIcon('revenue')" />
              </svg>
            </div>
          </th>
          <th 
            scope="col" 
            @click="handleSort('orders')"
            class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
          >
            <div class="flex items-center">
              Orders
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getSortIcon('orders')" />
              </svg>
            </div>
          </th>
          <th 
            scope="col" 
            @click="handleSort('averageOrderValue')"
            class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
          >
            <div class="flex items-center">
              Avg Order Value
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getSortIcon('averageOrderValue')" />
              </svg>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-neutral-200">
        <tr v-for="item in sortedData" :key="item.id" class="hover:bg-neutral-50">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10 bg-neutral-200 rounded-full">
                <img v-if="item.image" :src="item.image" :alt="item.name" class="h-10 w-10 rounded-full object-cover" />
                <div v-else class="h-10 w-10 flex items-center justify-center text-neutral-500 rounded-full">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-neutral-900">
                  {{ item.name }}
                </div>
                <div class="text-sm text-neutral-500">
                  {{ item.category }}
                </div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-neutral-900">${{ item.revenue.toLocaleString() }}</div>
            <div class="text-xs text-neutral-500">
              <span :class="item.growth >= 0 ? 'text-accent-600' : 'text-error-600'">
                {{ item.growth > 0 ? '+' : '' }}{{ item.growth }}%
              </span>
              vs last period
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-neutral-900">{{ item.orders.toLocaleString() }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-neutral-900">${{ item.averageOrderValue.toLocaleString() }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>