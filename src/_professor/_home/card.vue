<template lang="html">
     <div class="card" @click="click">
          <h1>{{ title }}</h1>
          <hr />
          <p>{{ code }}</p>
          <p>{{ sem }}</p>
          <p>{{ acadYear }}</p>
          <p>{{ time }}</p>
          <p></p>
     </div>
</template>

<script>
     export default {
          props: {
               title: {
                    default() {
                         return 'title'
                    },
               },
               code: {
                    default() {
                         return 'ENGG101'
                    },
               },
               time: {
                    default() {
                         return 'MWF'
                    },
               },

               acadYear: {
                    default() {
                         return ''
                    },
               },

               sem: {
                    default() {
                         return ''
                    },
               },
          },
          methods: {
               click() {
                    this.$router.push({
                         name: 'studentList',
                         params: { code: this.code },
                    })
               },
          },
     }
</script>

<style lang="css" scoped>
     .card {
          cursor: pointer;
     }

     .card:hover {
          background-color: rgb(143, 32, 29);
     }
</style>
