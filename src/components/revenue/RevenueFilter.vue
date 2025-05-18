<script setup lang="ts">
defineProps<{
  timeFrame: string
  category: string
  categories: string[]
}>()

const emit = defineEmits(['time-frame-change', 'category-change'])

const handleTimeFrameChange = (newTimeFrame: string) => {
  emit('time-frame-change', newTimeFrame)
}

const handleCategoryChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('category-change', target.value)
}
</script>
<template>
  <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
    <div class="flex">
      <button 
        v-for="frame in ['daily', 'weekly', 'monthly', 'yearly']"
        :key="frame"
        @click="handleTimeFrameChange(frame)"
        :class="[
          'px-4 py-2 text-sm font-medium',
          timeFrame === frame 
            ? 'bg-primary-500 text-white border-primary-500'
            : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-300',
          'border',
          frame === 'daily' ? 'rounded-l-md' : '',
          frame === 'yearly' ? 'rounded-r-md' : '',
          '-ml-px first:ml-0'
        ]"
      >
        {{ frame.charAt(0).toUpperCase() + frame.slice(1) }}
      </button>
    </div>
    
    <div class="flex items-center flex-1 justify-end">
      <label for="category-filter" class="mr-2 text-sm font-medium text-neutral-700">
        Category:
      </label>
      <select 
        id="category-filter" 
        :value="category" 
        @change="handleCategoryChange"
        class="input max-w-xs py-1"
      >
        <option value="all">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>
  </div>
</template>