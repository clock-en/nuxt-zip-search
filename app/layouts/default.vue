<template>
  <div id="app">
    <SiteHeader id="masthead" />
    <Nuxt id="content" />
  </div>
</template>

<script>
import SiteHeader from '~/components/layouts/SiteHeader';

export default {
  components: {
    SiteHeader,
  },
};
</script>
