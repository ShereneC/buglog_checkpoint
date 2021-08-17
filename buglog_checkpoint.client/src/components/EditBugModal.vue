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
                     minlength="3"
                     maxlength="50"
                     required
              >
              <small id="inputBugTitle" class="text-muted">Input Bug Title</small>
            </div>
            <!-- description input -->
            <div class="form-group">
              <input type="text"
                     name="description"
                     v-model="state.newBug.description"
                     class="form-control  text-break"
                     :placeholder="activeBug.description"
                     aria-describedby="inputBugDescription"
                     minlength="3"
                     maxlength="300"
                     required
              >
              <small id="inputBugDescription" class="text-muted">Input Bug Description</small>
            </div>
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
          $('#editBugModal').modal('hide')
          Pop.toast('Successfully Edited', 'success')
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
