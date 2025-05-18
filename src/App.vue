<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/layout/Sidebar.vue'
import Header from './components/layout/Header.vue'

const isCollapsed = ref(false)
const route = useRoute()

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const currentPageTitle = computed(() => {
  switch (route.name) {
    case 'dashboard':
      return 'Dashboard'
    case 'revenue-analysis':
      return 'Revenue Analysis'
    case 'inventory-management':
      return 'Inventory Management'
    case 'product-registration':
      return 'Product Registration'
    default:
      return 'Dashboard'
  }
})
</script>

<template>
  <div class="flex h-screen bg-neutral-100">
    <Sidebar :is-collapsed="isCollapsed" />
    
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header :title="currentPageTitle" @toggle-sidebar="toggleSidebar" />
      
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>