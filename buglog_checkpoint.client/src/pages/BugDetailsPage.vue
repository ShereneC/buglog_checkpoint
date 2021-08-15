<template>
  <div class="col-12">
    <div class="row mt-2">
      <div class="col-1"></div>
      <div class="col-10 bg-primary shadow pb-3">
        <div class="row">
          <div class="col-12">
            <h1>{{ activeBug.title }}</h1>
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
            <div class="div text-red text-shadow m-0 p-0" v-else>
              <h4 class="m-0 p-0">
                <b>OPEN</b>
              </h4>
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
    <div class="row mt-5">
      <div class="col-12">
        <p>Add New Note Input Field Goes Here</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      activeBug: computed(() => AppState.activeBug)
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
