<template>
  <div class="row bg-info rounded shadow m-2">
    <div class="col-12 d-flex align-items-center my-2">
      <p class="m-0 mr-2 pointer" title="Delete Note" @click="deleteNote">
        <span class="">X</span>
      </p>
      <!-- <h5 class="m-0 mr-auto pointer"
          data-toggle="modal"
          :data-target="'#taskDetailsModal'+ task.id"
          title="See Task Details"
      > -->
      <h5>
        <b>{{ note.body }}</b>
      </h5>
      <p class="m-0 mr-3">
        <span class="fa fa-balance-scale"></span> <b>{{ note.name }}</b>
      </p>
      <p class="m-0">
        <b>{{ note.picture }}</b>
      </p>
    </div>
  </div>
  <!-- <TaskDetailsModal :task="task" /> -->
</template>

<script>
import { notesService } from '../services/NotesService'
import Pop from '../utils/Notifier'
export default {
  props: {
    note: { type: Object, required: true }
  },
  setup(props) {
    return {
      async deleteNote() {
        if (await Pop.confirm()) {
          try {
            await notesService.deleteNote(props.note.id, props.note.bugId)
          } catch (error) {
            Pop.toast(error, 'error')
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
