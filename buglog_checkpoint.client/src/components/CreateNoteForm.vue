<template>
  <!-- It slots into a column -->
  <form @submit.prevent="createNote">
    <!-- body input -->
    <div class="form-group">
      <input type="text"
             name="body"
             v-model="state.newNote.body"
             class="form-control text-break"
             placeholder="Type New Note Here..."
             aria-describedby="inputNoteBody"
             minlength="3"
             maxlength="50"
             required
      >
      <small id="inputNoteBody" class="text-muted">Input Note Description</small>
    </div>
    <button type="submit" class="btn btn-primary">
      Submit
    </button>
  </form>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Notifier'
import { useRoute } from 'vue-router'
export default {

  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: {
        bugId: route.params.bugId
      }
    })
    return {
      state,
      async createNote() {
        try {
          // const newId =  // this goes with the push below
          await notesService.createNote(state.newNote)
          state.newNote = { bugId: route.params.bugId }
          // NOTE I have to put the bugId in here to have it let me create a new note, but there are times when this needs to be empty to let you create a new object - a little confused here.
          Pop.toast('Successfully Created', 'success')
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
