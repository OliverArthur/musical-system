<template>
<div class="md-card">
  <div class="md-card-area md-inset">
    <div class="md-card-header">
      <span class="md-title">Add new event</span>
    </div>
    <div class="md-card-content md-inset">
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
</template>
<script>
import { ref } from 'vue'
import useApi from '@/hooks/useApi'

export default {
  name: 'AppForm',
  setup (props, ctx) {
    const { addEvent } = useApi()
    const event = ref({
      title: '',
      start: '',
      end: '',
      description: '',
      color: ''
    })

    function createEvent () {
      addEvent(event)
    }

    return {
      event,
      createEvent
    }
  }
}
</script>

<style lang="scss" scoped>
.app-field {
  position: relative;
  width: 100%;

  &--input {
    height: 3.8rem;
    overflow: hidden;
    input {
      border-radius: 0;
      border: none;
      color: #333;
      display: block;
      font-size: 0.875rem;
      padding-top: 2rem;
      transition: .3s ease;
      width: 100%;

      &:valid {
        ~label {
          color: #333;
          font: 700 0.875rem Roboto;
          top: 0;
        }
      }
      &:focus {
        outline: none;
        ~label {
          color: #2196f3;
          font: 700 0.875rem Roboto;
          top: 0;
        }
        ~.bar:before {
          transform: translateX(0);
        }
      }
    }

    label {
      color: #333;
      cursor: text;
      font: 400 0.875rem Roboto;
      position: absolute;
      top: 1rem;
      transition: .25s ease;
    }
  }

  &--textarea {
    height: 8rem;
    margin-top: 1.4rem;

    textarea {
      border:1px solid #333;
      padding: 0.2rem;
      resize: none;
      width: 100%;
    }
  }

  &--radios {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    > label {
      display: flex;
      margin-top: 1rem;
      width: 34.34%;
    }
  }
}

.bar {
  background: #333;
  content: '';
  height: 0.0326rem;
  position: relative;
  transition: .3s ease;
  width: 34rem;
  &:before {
    background:  #2196F3 ;
    content: '';
    height: 150%;
    position: absolute;
    transform: translateX(-100%);
    width: 100%;
  }
}

button {
  background-color:  #2196f3;
  color: #FFF;
}

</style>
