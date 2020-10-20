<template>
  <aside class="sidebar md-drawer md-app-drawer md-left md-permanent md-permanent-clipped">
    <div class="md-content">
      <app-form />
    </div>
    <div class="md-content">
      <strong class="md-subheading event-subheading">
        All events
      </strong>
      <ul class="md-list md-triple-line">
        <li
          v-for="(event, index) in events.data"
          :key="index"
          class="md-list-item list-divider">
          <div class="md-list-item-default md-list-item-container md-button-clean">
            <div class="md-list-item-content md-ripple md-disabled">
              <div class="md-avatar bg-label" :style="{
                backgroundColor: event.label.length > 0 ? event.label : '#EEE'
              }">
              </div>
              <div class="md-list-item-text">
                <strong>{{ event.title }}</strong>
                <span>Start at: {{ event.started_at }}</span>
                <span>End at: {{ event.ended_at }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script>
import { onMounted, ref } from 'vue'
import useApi from '@/hooks/useApi'
import AppForm from '@/components/form/Form'

export default {
  name: 'AppSidebar',
  components: { AppForm },
  setup (props, ctx) {
    const { getAllEvents, state } = useApi()
    const page = ref(1)
    const limit = ref(20)
    const events = ref(state)

    onMounted(() => {
      getAllEvents(page.value, limit.value)
    })

    function loadMore () {
      getAllEvents(page.value, limit.value += 20)
    }

    return {
      state,
      loadMore,
      events
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  border-right: 2px solid #EEE;
  padding: 1.4rem 1rem;

  h3 {
    margin-left: 0.5rem;
  }

  .event-subheading {
    display: block;
    margin-top: 1rem;
  }

  .list-divider {
    &::after{
      content: "";
      background-color: #D2D2D2;
      height: 1px;
      margin: 0;
      padding: 0;
      display: block;
      border: 0;
      transition: margin-left .3s cubic-bezier(.4,0,.2,1);
      will-change: margin-left;
    }
  }
}
</style>
