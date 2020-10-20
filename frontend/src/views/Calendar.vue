<template>
  <c-calendar :events="state.data"/>
</template>
<script>
import CCalendar from '@/components/calendar/Calendar'
import useApi from '@/hooks/useApi'
import { onMounted, ref } from 'vue'

export default {
  name: 'AppCalender',
  components: {
    CCalendar
  },
  setup (props, ctx) {
    const { getAllEvents, state } = useApi()
    const page = ref(1)
    const limit = ref(20)

    onMounted(() => {
      getAllEvents(page.value, limit.value)
    })

    return {
      state
    }
  }
}
</script>
