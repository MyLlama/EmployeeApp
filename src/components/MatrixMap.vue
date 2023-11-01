<template>
  <v-card class="matric-map-card mx-4 my-3 rounded-xl px-2 elevation-0" variant="outlined">
    <v-card-title color="black" class="metric-maps-title mt-4 text-black"> {{ $t('MetricMaps') }}</v-card-title>
    <v-divider color="black"></v-divider>
    <canvas class="pa-4" ref="radarChartCanvas"></canvas>
  </v-card>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import { onMounted, ref } from 'vue'

Chart.register(...registerables)

const radarChartCanvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (radarChartCanvas.value) {
    new Chart(radarChartCanvas.value, {
      type: 'radar',
      data: {
        labels: [
          'Productivity',
          'Stress',
          'Conflict',
          'Self  Awareness',
          'Job Satisfaction',
          'Turnover',
          'Mindfulness'
        ],
        datasets: [
          {
            backgroundColor: 'rgba(255, 185, 104, 0.39)',
            borderColor: 'rgba(255, 129, 37, 1)',
            pointBackgroundColor: 'rgba(245, 146, 75, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(245, 146, 75, 1)',
            data: [97, 20, 42, 15, 65, 15, 56]
          }
        ]
      },
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        },
        scales: {
          r: {
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }
})
</script>

<style>
.metric-maps-title {
  font-family: 'Albert Sans', sans-serif;
}

.matric-map-card {
  color: var(--metric-map-card-border-color);
}
</style>
