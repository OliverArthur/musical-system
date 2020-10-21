<template>
  <c-calendar :events="events"/>
</template>
<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import CCalendar from '@/components/calendar/Calendar'

export default {
  name: 'AppCalender',
  components: {
    CCalendar
  },
  setup (props, ctx) {
    const store = useStore()
    const page = ref(1)
    const limit = ref(20)
    const events = computed(() => store.getters['events/getEvents'])

    onMounted(() => {
      const pages = {
        a: page.value,
        b: limit.value
      }
      store.dispatch('events/GET_EVENTS', pages)
    })

    return {
      events
    }
  }
}
</script>
