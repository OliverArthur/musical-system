<template>
  <c-header
    :current-month="currentMonth"
    :first-day="firstDay"
    @change="emitChangeMonth"
    />
  <section class="calendar">

    <div class="weeks">
      <strong
          class="week"
          v-for="(i, dayIndex) in 7"
          :key="i">
        {{ localeWeekDayFilter(dayIndex, firstDay, 'en') }}
      </strong>
    </div>

    <div class="dates">
      <div class="date__bg">
        <div class="week-row"
          v-for="week in currentDates"
          :key="week">
          <div
            v-for="day in week"
            :key="day"
            :class="{
              'today' : day.isToday,
              'not-current-month': !day.isCurrentMonth
            }"
            class="week-col">
            <p class="day">
              <span>{{ day.monthDay }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="dates-events">
        <div
        v-for="week in currentDates"
        :key="week"
        class="dates-events__week">
          <div
            v-for="day in week"
            :key="day"
            :class="{
              'today' : day.isToday,
              'not-current-months': !day.isCurrentMonth
            }"
            @click.stop="dayClick(day.date, $event)"
            class="dates-events__day">
            <p class="day">
              <span>{{ day.monthDay }}</span>
            </p>
            <div class="event__box">
              <c-event-item
                v-for="event in day.events"
                :key="event.date"
                :date="day.date"
                :event="event"
                :first-day="firstDay"
                v-show="event.cellIndex <= eventLimit"
                @click="eventClick">
                  <template v-slot:default="p">
                    <slot name="c-event-card" :event="p.event.title"></slot>
                  </template>
              </c-event-item>
              <p v-if="day.events.length > eventLimit"
                  class="more-link" @click.stop="selectThisDay(day, $event)">
                + {{day.events[day.events.length -1].cellIndex - eventLimit}} more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import moment from 'moment'
import useDate from '@/hooks/useDate'
import CHeader from '@/components/calendar/Header'
import CEventItem from '@/components/calendar/EventItem'

export default {
  name: 'CCalendar',
  components: {
    CHeader,
    CEventItem
  },
  props: {
    events: {
      type: Array,
      default: () => []
    },
    firstDay: {
      type: [Number, String],
      validator (val) {
        const res = parseInt(val)
        return res >= 0 && res <= 6
      },
      default: 0
    }
  },
  setup (props, ctx) {
    const { getStartDateView, getEndDateView } = useDate()

    const currentMonth = ref(moment().startOf('month'))
    const isLimit = ref(true)
    const eventLimit = ref(3)
    const showMore = ref(false)
    const positions = ref({
      top: 0,
      left: 0
    })

    const selectedDay = ref({})
    const currentDates = computed(() => getCalendar())
    const localeWeekDay = computed(() => {
      return localeWeekDayFilter(props.firstDay, 'en')
    })

    onMounted(() => {
      emitChangeMonth(currentMonth.value)
    })

    function emitChangeMonth (firstDayOfMonth) {
      currentMonth.value = firstDayOfMonth
      const start = getStartDateView(firstDayOfMonth, props.firstDay)
      const end = getEndDateView(firstDayOfMonth, props.firstDay)
      ctx.emit('change-month', start, end, firstDayOfMonth)
    }

    function getCalendar () {
      const monthStartDateView = getStartDateView(currentMonth.value, props.firstDay)
      const calendar = []

      for (let perWeek = 0; perWeek < 6; perWeek++) {
        const week = []

        for (let perDay = 0; perDay < 7; perDay++) {
          week.push({
            monthDay: monthStartDateView.date(),
            isToday: monthStartDateView.isSame(moment(), 'day'),
            isCurrentMonth: monthStartDateView.isSame(currentMonth.value, 'month'),
            weekDay: perDay,
            date: moment(monthStartDateView),
            events: eventsSlots(monthStartDateView)
          })
          monthStartDateView.add(1, 'day')
        }
        calendar.push(week)
      }
      return calendar
    }

    function eventsSlots (date) {
      const daysEvents = props.events.filter(day => {
        const start = moment(day.started_at)
        const end = moment(day.ended_at ? day.ended_at : start)

        return date.isBetween(start, end, null, '[]')
      })

      daysEvents.sort((a, b) => {
        if (!a.cellIndex) return 1
        if (!b.cellIndex) return -1
        return a.cellIndex - b.cellIndex
      })

      for (let i = 0; i < daysEvents.length; i++) {
        daysEvents[i].cellIndex = daysEvents[i].cellIndex || (i + 1)
        daysEvents[i].isShow = true
        if (daysEvents[i].cellIndex === i + 1 || i > 2) continue
        daysEvents.splice(i, 0, {
          title: 'holder',
          cellIndex: i + 1,
          start: date.format(),
          end: date.format(),
          isShow: false
        })
      }

      return daysEvents
    }

    function selectThisDay (day, evt) {
      selectedDay.value = day
      showMore.value = true
      positions.value = computePosition(event.target)
      positions.value.top -= 100
      const events = day.events.filter(item => {
        return item.isShow === true
      })
      ctx.emit('more-click', day.date, events, evt)
    }
    function computePosition (target) {
      const eventRect = target.getBoundingClientRect()
      const pageRect = ctx.$refs.dates.getBoundingClientRect()
      return {
        left: eventRect.left - pageRect.left,
        top: eventRect.top + eventRect.height - pageRect.top
      }
    }

    function dayClick (day, jsEvent) {
      ctx.emit('day-click', day, jsEvent)
    }

    function eventClick (event, jsEvent) {
      if (!event.isShow) return
      jsEvent.stopPropagation()
      const pos = this.computePos(jsEvent.target)
      ctx.emit('event-click', event, jsEvent, pos)
    }

    function localeWeekDayFilter (weekday, firstDay, locale) {
      const localDays = moment().locale('en')
      return localDays.localeData().weekdays()[(weekday + firstDay) % 7]
    }

    return {
      currentMonth,
      emitChangeMonth,
      isLimit,
      eventLimit,
      showMore,
      positions,
      selectedDay,
      selectThisDay,
      dayClick,
      eventClick,
      currentDates,
      localeWeekDay,
      localeWeekDayFilter
    }
  }
}
</script>
