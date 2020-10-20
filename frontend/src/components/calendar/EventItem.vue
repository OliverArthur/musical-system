<template>
  <p
  :style="{backgroundColor: bgColor.length > 0 ? bgColor : '#EEE'}"
  :class="cssClasses"
  @click="$emit('click', event, $event)"
  class="c-event-item">
    <span class="md-caption" v-if="displayTitle">
      {{ event.title }}
    </span>
  </p>
</template>
<script>
import { computed } from 'vue'
import moment from 'moment'

export default {
  name: 'CEventItem',
  props: ['event', 'date', 'firstDay'],
  setup (props, ctx) {
    const displayTitle = computed(() => (props.date.day() === props.firstDay || eventStart.value.isSame(props.date, 'day')))
    const eventStart = computed(() => moment(props.event.started_at))
    const eventEnd = computed(() => moment(props.event.ended_at))
    const bgColor = computed(() => props.event.label)
    const cssClasses = computed(() => {
      let cssClasses = []

      if (!Array.isArray(cssClasses)) {
        cssClasses = [cssClasses]
      } else {
        cssClasses = Array.from(cssClasses)
      }
      if (eventStart.value.isSame(props.date, 'day')) {
        cssClasses.push('event-start')
      }
      if (eventEnd.value.isSame(props.date, 'day')) {
        cssClasses.push('event-end')
      }
      if (!props.event.isShow) {
        cssClasses.push('is-opacity')
      }
      return cssClasses.join(' ')
    })

    return {
      bgColor,
      displayTitle,
      cssClasses,
      eventStart,
      eventEnd
    }
  }
}
</script>

<style lang="scss" scoped>
.c-event-item {
  cursor: pointer;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  color: #333;
  height: 1.12rem;
  white-space: nowrap;
  width: 100%;
  span {
    display: block;
    overflow: hidden;
    padding:4px;
    text-overflow: ellipsis;
    width: 100%;
  }
  &.is-opacity{
    opacity: 0;
  }
}
</style>
