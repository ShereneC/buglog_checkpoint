<template>
  <div class="col-12" v-if="activeBug._id">
    <!-- Mark put the v-if in here to prevent the page from loading blank. -->
    <!-- The bug details card -->
    <div class="row mt-2">
      <div class="col-1"></div>
      <div class="col-10 bg-gray-500 border border-primary shadow pb-3">
        <div class="row">
          <div class="col-12 d-flex align-items-center">
            <h1 class="mr-auto">
              {{ activeBug.title }}
            </h1>
            <!-- <h6 @click="editBug" v-if="!activeBug.closed">
              ✏ Edit Bug
            </h6> -->
            <div v-if="account.id === activeBug.creatorId">
              <button type="button"
                      class="btn btn-outline-success"
                      data-toggle="modal"
                      data-target="#editBugModal"
                      title="Edit Bug Button"
                      v-if="!activeBug.closed"
              >
                ✏ Edit Bug
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <img class="profile-img mr-3" :src="activeBug.creator.picture" :alt="activeBug.creator.name">
            <p>{{ activeBug.creator.name }}</p>
            <div class="div text-green text-shadow" v-if="activeBug.closed">
              <h4 class="m-0 p-0">
                <b>CLOSED</b> Date: {{ activeBug.closedDate }}
              </h4>
            </div>
            <div class="div text-red text-shadow m-0 p-0 d-flex align-items-center justify-content-around" v-else>
              <h4 class="m-0 p-0">
                <b>OPEN</b>
              </h4>
              <p class="m-0" v-if="activeBug.updatedAt">
                Last Updated {{ updatedDate }}
              </p>
              <p class="pl-1 m-0 pointer" title="Close Bug Button" @click="closeBug" v-if="account.id === activeBug.creatorId">
                Click to Close
              </p>
            </div>
          </div>
        </div>
        <div class="row mt-3"></div>
        <div class="col text-shadow">
          {{ activeBug.description }}
        </div>
      </div>
      <div class="col-1"></div>
    </div>
    <!-- End bug details card -->
    <!-- Add note form -->
    <div class="row bg-light shadow mt-3 my-2">
      <div class="col-2 mt-2">
        <h3 class="">
          Notes:
        </h3>
      </div>
      <div class="col-10 mt-2 mb-3" v-if="!activeBug.closed">
        <CreateNoteForm />
      </div>
      <!-- End Add note form -->
      <!-- Begin notes cards -->

      <div class="col-12 d-flex" v-for="n in notes" :key="n.id">
        <Note :note="n" />
        <!-- NOTE But if I do this, Note is being sent props from BugDetailsPage & Home Page  Maybe don't send the prop? -->
      </div>
    </div>
    <!-- End notes cards -->
  </div>
  <EditBugModal />
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Notifier'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
export default {
  setup() {
    const route = useRoute()
    const activeBug = computed(() => AppState.activeBug)

    // when page loads go get specific bug   await bugsService.getBugById(route.params.bugId) - Marks notes to me.  For some reason I do not have this function though!!!!
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })

    // NOTE should I send notes in as a prop from somewhere else? Is Bug the parent of Bug Details Page since you click on it from there? Or should I say this is the parent of Note and just compute them in here again.  A little iffy because I already have notes computed in Bug, because of the collapsible.  Maybe I should take the collapsible out, but why not have that feature as well?
    const notes = computed(() => AppState.notes[route.params.bugId] || [])
    watchEffect(async() => {
      try {
        // await bugsService.getBugById
        // - recommended to have this
        if (route.params.bugId) {
          await bugsService.getNotesByBugId(route.params.bugId)
        }
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      activeBug,
      notes,

      updatedDate: computed(() => {
        // logger.log('activeBug date: ', activeBug.value.createdAt)
        // NOTE Mick helped me on this - had to put in .value because I brought activeBug in wrong.
        if (activeBug.value.updatedAt) {
          const d = new Date(activeBug.value.updatedAt)
          return new Intl.DateTimeFormat('en-US').format(d)
        } else {
          return 0
        }
      }),
      account: computed(() => AppState.account),
      async closeBug() {
        try {
          await bugsService.closeBug(activeBug.value.id)
        } catch (error) {
          Pop.toast(error, 'error')
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
