<template>
  <div class="title">
    <div class="title-before" />
    <div v-if="title">{{ title }}</div>
    <div class="title-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SmallTitle',
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .title {
    display: flex;
    align-items: center;
    font-weight: 600;
    margin: 15px;
    font-size: 18px;
  }

  .title-before {
    background-color: #409EFF;
    width: 4px;
    height: 20px;
    margin-right: 8px;
  }
</style>
