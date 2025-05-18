<script setup lang="ts">
import { computed } from 'vue'
import {  useRoute } from 'vue-router'
// import { useRouter, useRoute } from 'vue-router'

const props = defineProps<{
  isCollapsed: boolean
}>()

// const router = useRouter()
const route = useRoute()

const navItems = [
  { name: 'Dashboard', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Revenue Analysis', path: '/revenue', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { name: 'Inventory', path: '/inventory', icon: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' },
  { name: 'Add Product', path: '/product-registration', icon: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const sidebarWidth = computed(() => props.isCollapsed ? 'w-20' : 'w-64')

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <aside :class="['bg-primary-800 text-white transition-all duration-300', sidebarWidth]">
    <div class="p-4">
      <div :class="[isCollapsed ? 'justify-center' : 'justify-start', 'flex items-center']">
        <svg viewBox="0 0 24 24" class="w-8 h-8 text-white" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        <span class="ml-2 text-xl font-bold" v-if="!isCollapsed">EcomDash</span>
      </div>
    </div>
    
    <nav class="mt-8">
      <div class="px-4">
        <div v-for="item in navItems" :key="item.path" class="mb-2">
          <router-link :to="item.path" 
                      :class="[
                        'flex items-center p-3 rounded-md transition-colors duration-200',
                        isActive(item.path) 
                          ? 'bg-primary-700 text-white' 
                          : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                      ]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"></path>
            </svg>
            <span class="ml-3" v-if="!isCollapsed">{{ item.name }}</span>
          </router-link>
        </div>
      </div>
    </nav>
  </aside>
</template>