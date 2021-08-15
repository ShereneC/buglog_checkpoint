<template>
  <div class="home col-12 shadow">
    <!-- Bug heading and create bug button -->
    <div class="row align-items-center mx-2">
      <div class="col-6">
        <div class="mt-3 ml-3">
          <h2 class="m-0">
            Bugs
          </h2>
          <p>This is a list of all your bugs</p>
        </div>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <button type="button"
                class="btn btn-outline-success shadow"
                data-toggle="modal"
                data-target="#createBugModal"
                title="Create Bug Button"
        >
          + New Bug
        </button>
      </div>
    </div>
    <Bug v-for="b in bugs" :key="b.id" :bug="b" />
  </div>
  <!-- <CreateProjectModal /> -->
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
