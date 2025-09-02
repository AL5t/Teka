<script setup>
import AppLayout from '@/layout/AppLayout.vue';
import IntroLayout from '@/layout/IntroLayout.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<template>
  <IntroLayout v-if="route.name === 'IntroPage'" />
  <AppLayout v-else />
</template>

<style lang="css">
@import "../node_modules/primeflex/primeflex.css";
</style>
