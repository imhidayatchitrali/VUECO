<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import { useDashboardStore } from '../../stores/dashboardStore';

Chart.register(...registerables);

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const dashboardStore = useDashboardStore();

onMounted(() => {
  const ctx = chartCanvas.value?.getContext('2d');
  if (!ctx) return;
  
  const inventoryByCategory = dashboardStore.inventoryByCategory;
  const totalProducts = inventoryByCategory.map(item => item.totalProducts);
  const lowStockProducts = inventoryByCategory.map(item => item.lowStockProducts);
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: inventoryByCategory.map(item => item.category),
      datasets: [
        {
          label: 'Total Products',
          data: totalProducts,
          backgroundColor: 'rgba(25, 118, 210, 0.7)',
          borderColor: 'rgba(25, 118, 210, 1)',
          borderWidth: 1
        },
        {
          label: 'Low Stock Products',
          data: lowStockProducts,
          backgroundColor: 'rgba(244, 67, 54, 0.7)',
          borderColor: 'rgba(244, 67, 54, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Products'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  });
});
</script>

<template>
  <div class="h-64">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>