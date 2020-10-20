<template>
  <div class="c-header">
    <div class="c-header__inner">
      <button
        @click="prevMonth"
        class="controller__left">
        <span class="material-icons">keyboard_arrow_left</span>
      </button>
      <h2 class="md-subheading">
        {{ title }}
      </h2>
      <button
        @click="nextMonth"
        class="controller__right">
        <span class="material-icons">keyboard_arrow_right</span>
      </button>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import moment from 'moment'
import config from '@/config'

export default {
  name: 'CHeader',
  props: {
    currentMonth: {
      type: Object
    },
    titleFormat: {
      type: String
    },
    firstDay: {
      type: Number
    },
    locale: {
      type: String
    }
  },
  setup (props, ctx) {
    const title = computed(() => {
      if (!props.currentMonth) return
      return props.currentMonth.format(config.format)
    })

    const prevMonth = () => {
      const newMonth = moment(props.currentMonth)
        .subtract(1, 'months')
        .startOf('months')
      ctx.emit('change', newMonth)
      console.log(newMonth)
    }

    const nextMonth = () => {
      const newMonth = moment(props.currentMonth)
        .add(1, 'months')
        .startOf('months')
      ctx.emit('change', newMonth)
    }

    return {
      title,
      prevMonth,
      nextMonth
    }
  }
}
</script>
