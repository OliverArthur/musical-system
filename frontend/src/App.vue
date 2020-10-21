<template>
  <app-header :current-month="currentMonth" />
  <main class="md-app-container md-flex md-layout-row md-scrollbar">
    <app-sidebar />
    <div class="md-app-scroller md-layout-column md-flex md-scrollbar">
      <div class="md-content md-app-content md-flex">
        <app-calendar />
      </div>
    </div>
  </main>
</template>

<script>
import AppHeader from '@/components/layout/Header'
import AppSidebar from './components/layout/Sidebar'
import AppCalendar from '@/views/Calendar'
export default {
  name: 'App',
  components: { AppHeader, AppSidebar, AppCalendar }
}
</script>

<style lang="scss">
  body {
    overflow: hidden;
  }
  .main {
    display: flex;
  }

  .container {
    width: 100%;
  }
</style>
