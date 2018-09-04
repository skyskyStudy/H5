import Vue from 'vue'
import Router from 'vue-router'
import Dial from '@/views/Dial'
import Record from '@/views/Record'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: {
        name: 'Dial'
      },
      name: '/Dial',
      component: Dial,
      children: [
        {
          path: '/Dial',
          name: 'Dial',
          component: Dial
        }
      ]
    },
    {
      path: '/Record',
      name: 'Record',
      component: Record
    },
    // {
    //   path: '*',
    //   name: 'Dial',
    //   component: Dial
    // }
  ]
})
