<template>
  <!--Edit Bug  Modal -->
  <div class="modal fade"
       id="editBugModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            🐜 Edit Bug Report
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editBug">
            <!-- title input -->
            <div class="form-group">
              <input type="text"
                     name="title"
                     v-model="state.newBug.title"
                     class="form-control"
                     :placeholder="activeBug.title"
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
                     :placeholder="activeBug.description"
                     aria-describedby="inputBugDescription"
                     required
              >
              <small id="inputBugDescription" class="text-muted">Input Bug Description</small>
            </div>
            <!-- status input -->
            <div class="form-group">
              <select
                name="status"
                v-model="state.newBug.closed"
                class="form-control"
                :aria-describedby="state.newBug.title+'BugStatus'"
                required
              >
                <option value="true">
                  Closed
                </option>
                <option value="false">
                  Open
                </option>
              </select>
              <small :id="state.newBug.closed+'BugStatus'" class="text-muted">Input Bug Status</small>
            </div>
            <!-- End status input -->
            <!-- startDate input -->
            <div class="form-group">
              <input type="date"
                     name="closedDate"
                     v-model="state.newBug.closedDate"
                     class="form-control"
                     placeholder="Bug Closed Date..."
                     aria-describedby="inputClosedBugDate"
              >
              <small id="inputClosedBugDate" class="text-muted">Input Closed Bug Date</small>
            </div>
            <!-- endDate input -->
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
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import Pop from '../utils/Notifier'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'
import $ from 'jquery'
export default {

  setup() {
    const route = useRoute()
    const state = reactive({
      newBug: {
        bugId: (route.params.bugId)
      }
    })
    return {
      activeBug: computed(() => AppState.activeBug),
      state,
      async editBug() {
        try {
          await bugsService.editBug(state.newBug, state.newBug.bugId)
          state.newBug = {}
          $('editBugModal').modal('hide')
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
