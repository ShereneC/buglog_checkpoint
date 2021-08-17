<template>
  <!--Create Bug  Modal -->
  <div class="modal fade"
       id="createBugModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            🐜 Create Bug Report
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createBug">
            <!-- title input -->
            <div class="form-group">
              <input type="text"
                     name="title"
                     v-model="state.newBug.title"
                     class="form-control"
                     placeholder="Bug Title..."
                     aria-describedby="inputBugTitle"
                     required
              >
              <small id="inputBugTitle" class="text-muted">Input Bug Title</small>
            </div>
            <!-- description input -->
            <div class="form-group">
              <input type="text"
                     name="description"
                     v-model="state.newBug.description"
                     class="form-control"
                     placeholder="Bug Description..."
                     aria-describedby="inputBugDescription"
                     required
              >
              <small id="inputBugDescription" class="text-muted">Input Bug Description</small>
            </div>
            <!-- Took out the status option and Date selector - I think not needed because there is a separate function for selecting close data nd it should automatically put a date.now on it. -->
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Pop from '../utils/Notifier'
import { bugsService } from '../services/BugsService'
import $ from 'jquery'
import { useRoute } from 'vue-router'
import { router } from '../router'
// import { router } from '../router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      newBug: {
      }
    })
    return {
      state,
      async createBug() {
        try {
          const newId = await bugsService.createBug(state.newBug)
          state.newBug = {}
          $('#createBugModal').modal('hide')
          // router.push({ name: 'BacklogPage', params: { projectId: newId } })  // NOTE need to create bug details page
          // router.push({ name: 'BugDetails', params: { bugId: route.params.bugId } })
          Pop.toast('Successfully Created', 'success')
          // await bugsService.setActiveBug(state.newBug.bugId)
          await router.push({ name: 'BugDetails', params: { bugId: newId } })
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
