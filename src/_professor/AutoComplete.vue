<template>
     <div style="position:relative" v-bind:class="{ open: openSuggestion }">
          <input
               type="text"
               v-model="selectData"
               @keydown.enter="enter"
               @keydown.down="down"
               @keydown.up="up"
               @input="change"
          />
          <ul
               v-if="openSuggestion"
               id="collapse"
               class="suggest"
               style="width:100%"
          >
               <li
                    v-for="(suggestion, s) in matches"
                    :key="s"
                    v-bind:class="{ 'is-active': isActive(s) }"
                    @click="suggestionClick(s)"
               >
                    <a href="#">{{
                         suggestion.subject_name +
                              ' Section ' +
                              suggestion.subject_code.split('-')[1]
                    }}</a>
               </li>
          </ul>
     </div>
</template>

<script>
     export default {
          props: {
               suggestions: {
                    type: Array,
                    required: true,

                    default() {
                         return []
                    },
               },

               selection: {
                    type: String,
                    required: true,
               },

               needs: {
                    type: Object,
                    required: true,

                    default() {
                         return {
                              subject_code: '',
                              subject_course: '',

                              subject_year: '',
                              subject_sem: '',
                              subject_desc: '',
                         }
                    },
               },
          },

          data() {
               return {
                    open: false,
                    current: 0,

                    selectData: this.selection,

                    userNeeds: this.needs,
               }
          },

          computed: {
               //Filtering the suggestion based on the input
               matches() {
                    return this.suggestions.filter((str) => {
                         return (
                              str.subject_name
                                   .toLowerCase()
                                   .indexOf(this.selectData) >= 0
                         )
                    })
               },

               //The flag
               openSuggestion() {
                    return (
                         this.selectData !== '' &&
                         this.matches.length != 0 &&
                         this.open === true
                    )
               },
          },

          methods: {
               //When enter pressed on the input
               enter() {
                    Object.keys(this.matches[this.current]).forEach((k) => {
                         this.userNeeds[k] = this.matches[this.current][k]
                    })
                    this.selectData = this.matches[this.current].subject_name

                    this.open = false
               },

               //When up pressed while suggestions are open
               up() {
                    if (this.current > 0) this.current--
               },

               //When up pressed while suggestions are open
               down() {
                    if (this.current < this.suggestions.length - 1)
                         this.current++
               },

               //For highlighting element
               isActive(index) {
                    return index === this.current
               },

               //When the user changes input
               change() {
                    if (this.open == false) {
                         this.open = true
                         this.current = 0
                    }
               },

               //When one of the suggestion is clicked
               suggestionClick(index) {
                    Object.keys(this.matches[index]).forEach((k) => {
                         this.userNeeds[k] = this.matches[index][k]
                    })

                    this.selectData = this.matches[index].subject_name

                    this.open = false
               },
          },
     }
</script>

<style lang="css" scoped>
     a {
          color: black;
          text-decoration: none;
     }

     .suggest {
          background: white;
          z-index: 5;
          font-weight: bold;
          max-height: 200px;
     }

     #add {
          max-width: 500px;
          padding: 10px;
     }

     ul li:hover {
          background: grey;
          cursor: pointer;
     }

     /* .is-active:hover {
  background: grey;
} */

     #collapse {
          height: auto;
          overflow: hidden;
          transition: 0.3s height;
     }
     #collapse[openSuggestion] {
          height: 0;
     }
</style>
