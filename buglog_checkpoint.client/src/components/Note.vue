<template>
  <div class="col-12 d-flex align-items-center">
    <div v-if="account.id === note.creatorId">
      <p class="m-0 mr-2 p-1 pointer" title="Delete Note" @click="deleteNote" v-if="!activeBug.closed">
        <span class="">X</span>
      </p>
    </div>
    <h6 class="p-1 flex-grow-1 text-break">
      <b>{{ note.body }}</b>
    </h6>
    <!-- // NOTE how do I wrap these around underneath the body on mobile? -->
    <p class="m-0 p-1">
      <img class="profile-img mr-3" :src="note.creator.picture" :alt="note.creator.name">
    </p>
    <p class="my-0 mr-3 p-1 d-sm-none d-md-block">
      <b>{{ note.creator.name }}</b>
    </p>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Notifier'
import { AppState } from '../AppState'
export default {
  props: {
    note: { type: Object, required: true }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      activeBug: computed(() => AppState.activeBug),
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
