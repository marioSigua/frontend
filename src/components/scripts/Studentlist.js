import nav from '../navbar'
export default {

  components: {
    'navbar': nav
  },

  data(){
    return{
      fields: [
        {
          key: 'Student_ID',
          sortable: true
        },
        {
          key: 'last_name',
          sortable: true
        },
        {
          key: 'first_name',
          sortable: false
        },
        {
          key: 'Course',
          label: 'Course',
          sortable: true,
          // Variant applies to the whole column, including the header and footer
          // variant: 'danger'
        },
        
          'show_details'
      ],
      items: [
        {  Course: 'BSEE', first_name: 'Dickerson', last_name: 'Macdonald', Student_ID: '2015020055' },
        {  Course: 'BSCOE', first_name: 'Larsen', last_name: 'Shaw', Student_ID: '2015020055'  },
        {   Course: 'BSECE', first_name: 'Geneva', last_name: 'Wilson', Student_ID: '2015020055'  },
        {  Course: 'BSEEE', first_name: 'Jami', last_name: 'Carney', Student_ID: '2015020055'  }
      ]
    }
  }
}