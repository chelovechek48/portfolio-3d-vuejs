<script setup>
import AppContacts from '@components/AppContacts.vue';
</script>

<template>
  <footer class="footer">
    <AppContacts class="footer__container container" />
  </footer>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/mixins' as *;

.footer {
  z-index: 2;
  padding-top: 2.5rem;
  padding-bottom: 1.5rem;
}
</style>
