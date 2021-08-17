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
          state.newNote = { }
          // Do I need state.newNote = { bugId: route.params.bugId}
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
