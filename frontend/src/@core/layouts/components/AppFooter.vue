<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      <span class="d-none d-sm-inline-block">COPYRIGHT © {{ new Date().getFullYear() }}, All rights Reserved</span>
    </span>

    <span class="float-md-right d-none d-md-block">
      <feather-icon
        icon="HeartIcon"
        size="21"
        class="text-danger stroke-current"
      />
    </span>
  </p>
</template>

<script>
import { BLink } from "bootstrap-vue";

export default {
  components: {
    BLink,
  },
};
</script>
