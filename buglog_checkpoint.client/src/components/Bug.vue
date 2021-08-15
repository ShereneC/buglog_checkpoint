<template>
  <div class="row shadow border mb-2 mx-3">
    <div class="col-10 d-flex align-items-center">
      <div class="div mx-2 mb-0">
        <h3 class="mb-0 p-1">
          {{ bug.title }}
        </h3>
      </div>
      <div class="div text-green" v-if="bug.closed">
        <p class="m-0 p-0">
          <b>CLOSED</b>
        </p>
      </div>
      <div class="div text-red m-0 p-0" v-else>
        <p class="m-0 p-0">
          <b>OPEN</b>
        </p>
      </div>
      <div class="div mx-3 mb-0">
        <h5 class="mb-0">
          {{ bug.description }}
        </h5>
      </div>
    </div>
    <div class="col-2 text-light d-flex align-items-center justify-content-end">
      <p class="m-0 pointer" :title="'See Details for ' + bug.title" @click="openBug">
        <span class="text-dark">See Details 🐛</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
