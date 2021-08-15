<template>
  <div class="row shadow border border-primary mx-3 my-2">
    <div class="col-12 d-flex align-items-center">
      <p class="m-0 mr-2 p-1 pointer" title="Delete Note" @click="deleteNote">
        <span class="">X</span>
      </p>
      <!-- <h5 class="m-0 mr-auto pointer"
          data-toggle="modal"
          :data-target="'#taskDetailsModal'+ task.id"
          title="See Task Details"
      > -->
      <h5 class="p-1 flex-grow-1 ">
        <b>{{ note.body }}</b>
      </h5>
      <p class="m-0 p-1">
        <img class="profile-img mr-3" :src="note.creator.picture" :alt="note.creator.name">
      </p>
      <p class="my-0 mr-3 p-1">
        <b>{{ note.creator.name }}</b>
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
.profile-img{
  height: 3vh;
  width: 3vh;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
</style>
