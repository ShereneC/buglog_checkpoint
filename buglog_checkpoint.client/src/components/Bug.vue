<template>
  <div class="row shadow border border-primary mb-2 mx-3">
    <div class="col-10 d-flex align-items-center">
      <button class="btn mr-2"
              type="button"
              data-toggle="collapse"
              :data-target="'#collapse' + bug.id"
              :title="'Expand '+bug.title+' Details'"
      >
        <span class="fas fa-chevron-down text-white"></span>
      </button>
      <div class="div mx-2 mb-0">
        <h3 class="mb-0 p-1">
          {{ bug.title }}
        </h3>
      </div>
      <div class="div text-green" v-if="bug.closed">
        <p class="m-0 p-0">
          <b>CLOSED</b>
        </p>
      </div>
      <div class="div text-red m-0 p-0" v-else>
        <p class="m-0 p-0">
          <b>OPEN</b>
        </p>
      </div>
      <div class="div mx-3 mb-0">
        <h5 class="mb-0">
          {{ bug.description }}
        </h5>
      </div>
    </div>
    <div class="col-2 text-light d-flex align-items-center justify-content-end">
      <!-- NOTE  This router link should take you to the active bug page when you click See Details  Did I put this in right? Actually, I took it out and will use a router push when they click on setActive Bug-->
      <p class="m-0 pointer" :title="'See Details for ' + bug.title" @click="setActiveBug">
        <span class="text-dark">See Details 🐛</span>
      </p>
    </div>
  </div>
  <!-- Collapsible for Notes -->
  <div class="collapse" :id="'collapse' + bug.id">
    <div class="row bg-light shadow mx-4 pb-3" v-for="n in notes" :key="n.id">
      <div class="col-12 mt-3">
        <div class="row shadow border border-primary mx-3 my-2">
          <Note :note="n" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { bugsService } from '../services/BugsService'
import { router } from '../router'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const notes = computed(() => AppState.notes[props.bug.id] || [])
    watchEffect(async() => {
      try {
        await bugsService.getNotesByBugId(props.bug.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      notes,
      async setActiveBug() {
        try {
          await bugsService.setActiveBug(props.bug.id)
          router.push({ name: 'BugDetails', params: { bugId: props.bug.id } })
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
