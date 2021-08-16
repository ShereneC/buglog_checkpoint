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
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-primary mb-2 ml-1" @click="showOpen">
          Show Open
        </button>
        <button type="button" class="btn btn-primary mb-2 ml-1" @click="showAll">
          Show All
        </button>
        <button type="button" class="btn btn-primary mb-2 ml-1" @click="showClosed">
          Show Closed
        </button>
      </div>
    </div>
    <Bug v-for="b in bugs" :key="b.id" :bug="b" />
  </div>
  <CreateBugModal />
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Notifier'
export default {
  setup() {
    // when this page loads go get   await bugsService.getAllBugs()  Mark's notes to me
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      bugs: computed(() => AppState.bugs),
      async showOpen() {
        try {
          await bugsService.showOpen()
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async showClosed() {
        try {
          await bugsService.showClosed()
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async showAll() {
        try {
          await bugsService.getAllBugs()
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
