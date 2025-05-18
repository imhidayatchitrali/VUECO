<script setup lang="ts">
defineProps<{
  title: string
}>()

const emit = defineEmits(['toggle-sidebar'])

const toggleSidebar = () => {
  emit('toggle-sidebar')
}
</script>

<template>
  <header class="bg-white shadow-sm z-10">
    <div class="px-4 py-3 flex items-center justify-between">
      <div class="flex items-center">
        <button @click="toggleSidebar" class="mr-4 text-neutral-500 hover:text-neutral-700 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <h1 class="text-xl font-medium text-neutral-800">{{ title }}</h1>
      </div>
      
      <div class="flex items-center space-x-4">
        <button class="text-neutral-500 hover:text-neutral-700 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
        </button>
        
        <div class="flex items-center">
          <span class="mr-2 text-sm font-medium text-neutral-700">Admin User</span>
          <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
            <span class="text-sm font-medium">A</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>