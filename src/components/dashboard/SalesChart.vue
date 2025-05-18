<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useDashboardStore } from '../../stores/dashboardStore'

Chart.register(...registerables)

const chartCanvas = ref<HTMLCanvasElement | null>(null)
const dashboardStore = useDashboardStore()
const timeFrame = ref('monthly')

onMounted(() => {
  const ctx = chartCanvas.value?.getContext('2d')
  if (!ctx) return
  
  const salesData = dashboardStore.monthlyRevenueData
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: salesData.map(item => item.label),
      datasets: [
        {
          label: 'Revenue',
          data: salesData.map(item => item.revenue),
          borderColor: '#1976D2',
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#1976D2',
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Orders',
          data: salesData.map(item => item.orders * 100), 
          borderColor: '#4CAF50',
          backgroundColor: 'transparent',
          tension: 0.4,
          borderDash: [5, 5],
          pointBackgroundColor: '#4CAF50',
          pointRadius: 4,
          pointHoverRadius: 6
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
            text: 'Revenue ($)'
          },
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString();
            }
          }
        },
        y1: {
          position: 'right',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Orders'
          },
          grid: {
            drawOnChartArea: false
          },
          ticks: {
            callback: function(value) {
              return (Number(value) / 100).toFixed(0);
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.dataset.label === 'Revenue') {
                // label += '$' + context.raw.toLocaleString();
                label += '$' + (context.raw as number).toLocaleString();
              } else {
                label += (Number(context.raw) / 100).toFixed(0);
              }
              return label;
            }
          }
        }
      }
    }
  })
})

const handleTimeFrameChange = (frame: string) => {
  timeFrame.value = frame
}
</script>

<template>
  <div>
    <div class="flex justify-end space-x-2 mb-4">
      <button 
        v-for="frame in ['daily', 'weekly', 'monthly', 'yearly']"
        :key="frame"
        @click="handleTimeFrameChange(frame)"
        :class="[
          'px-3 py-1 text-sm rounded-md',
          timeFrame === frame 
            ? 'bg-primary-500 text-white' 
            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
        ]"
      >
        {{ frame.charAt(0).toUpperCase() + frame.slice(1) }}
      </button>
    </div>
    
    <div class="h-64">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>