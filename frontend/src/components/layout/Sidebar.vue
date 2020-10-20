<template>
  <aside class="sidebar md-drawer md-app-drawer md-left md-permanent md-permanent-clipped">
    <div class="sidebar__inner">
      <div class="md-content">
        <app-form />
      </div>
      <div class="md-content">
        <strong class="md-subheading event-subheading">
          All events
        </strong>
        <ul class="md-list md-triple-line" v-if="events.data.length !== 0">
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
                <button
                  @click="deleteItem(event.id)"
                  class="md-button md-icon-button md-list-action">
                  <span class="material-icons md-icon-font">delete</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
        <div v-else class="no-events">
          <span class="md-subheading">
            You don't have any events
          </span>
        </div>
      </div>
    </div>
  </aside>
</template>
<script>
import { onMounted, ref, watch } from 'vue'
import useApi from '@/hooks/useApi'
import AppForm from '@/components/form/Form'

export default {
  name: 'AppSidebar',
  components: { AppForm },
  setup (props, ctx) {
    const { getAllEvents, state, deleteOneEvent } = useApi()
    const page = ref(1)
    const limit = ref(20)
    const events = ref(state)

    watch(() => events.value, () => {
      getAllEvents(page.value, limit.value)
    }, { immediate: true })

    onMounted(() => {
      getAllEvents(page.value, limit.value)
    })

    function loadMore () {
      getAllEvents(page.value, limit.value += 20)
    }

    function deleteItem (evenId) {
      deleteOneEvent(evenId)
    }

    return {
      state,
      loadMore,
      deleteItem,
      events
    }
  }
}
</script>
