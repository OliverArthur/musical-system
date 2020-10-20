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
<style lang="scss" scoped>
.red {
  background: #ff5252 !important;
  color: whitesmoke !important;
}
.blue {
  background: #448aff !important;
  color: whitesmoke !important;
}
.orange {
  background: #ffab40 !important;
  color: white !important;
}
.green {
  background: #64ffda !important;
  color: white !important;
}
.blue,
.orange,
.red,
.green {
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
}
</style>
