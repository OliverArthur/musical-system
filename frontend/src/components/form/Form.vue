<template>
<div class="event-form">
  <div class="md-card-header event-form__header">
    <span class="md-title">Add new event</span>
    <button @click="toggleForm" class="md-button md-icon-button md-list-action">
      <i class="material-icons md-icon-font">
      keyboard_arrow_down
      </i>
    </button>
  </div>
  <div v-show="isOpen">
    <div class="md-card-content">
      <form class="form">
        <div class="app-field app-field--input">
          <input
            v-model="event.title"
            class="app-input"
            name="title"
            id="title"
            type="text"
            required/>
          <label for="title">Title</label>
          <div class="bar"></div>
        </div>
        <div class="app-field app-field--input">
          <input
            v-model="event.start"
            class="app-input"
            name="start_date"
            type="date"
            id="start_date"
            required/>
          <label for="start_date">Start date</label>
          <div class="bar"></div>
        </div>
        <div class="app-field app-field--input">
          <input
            v-model="event.end"
            class="app-input"
            name="end_date"
            type="date"
            id="end_date"
            required/>
          <label for="start_date">End date</label>
          <div class="bar"></div>
        </div>
        <div class="app-field app-field--textarea">
          <textarea
            v-model="event.description"
            class="app-input"
            placeholder="description"
            rows="6"
            id="description"/>
        </div>
        <strong class="md-body-2">Select a color label</strong>
        <div class="app-field app-field--radios">
          <label class="radio">
              <input type="radio" v-model="event.color" name="group-color" value="#448aff">
              <span>Blue label</span>
          </label>
          <label class="radio">
              <input type="radio" v-model="event.color" name="group-color" value="#ffab40">
              <span>Orange label</span>
          </label>
          <label class="radio">
              <input type="radio" v-model="event.color" name="group-color" value="#64ffda">
              <span>Green label</span>
          </label>
          <label class="radio">
              <input type="radio" v-model="event.color" name="group-color" value="#ff5252">
              <span>Red label</span>
          </label>
        </div>
      </form>
    </div>
    <div class="md-card-actions md-alignment-right">
      <button type="button" @click="createEvent" class="md-button md-raised md-primary">
        <div class="md-ripple">
          <div class="md-button-content">
            ADD EVENT
          </div>
        </div>
      </button>
    </div>
  </div>
</div>
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'AppForm',
  setup (props, ctx) {
    const store = useStore()
    const isOpen = ref(false)
    const event = ref({
      title: '',
      start: '',
      end: '',
      description: '',
      color: ''
    })

    function createEvent () {
      store.dispatch('events/SET_EVENT', event)
    }

    function toggleForm () {
      isOpen.value = !isOpen.value
    }

    return {
      isOpen,
      event,
      createEvent,
      toggleForm
    }
  }
}
</script>
