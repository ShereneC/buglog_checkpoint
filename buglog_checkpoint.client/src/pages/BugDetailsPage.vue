<template>
  <div class="col-12">
    {{ activeBug }}
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

</style>
