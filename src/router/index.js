import Vue from 'vue'
import Router from 'vue-router'
import bindex from '@/view/bindex'
import login from '@/view/login'
import register from '@/view/register'
import bhome from '@/view/bhome'
import bsong from '@/view/bsong'
import bsonglist from '@/view/bsonglist'
import bsongstyle from '@/view/bsongstyle'
import bloginlog from '@/view/bloginlog'
import boperationlog from '@/view/boperationlog'
import testbar from '@/view/testbar'
// front
import frontIndex from '@/view/front/frontIndex'
import frontFindMusic from '@/view/front/frontFindMusic'
import frontMyMusic from '@/view/front/frontMyMusic'
import frontPersonal from '@/view/front/frontPersonal'
import frontSongList from '@/view/front/frontSongList'
import frontSongInfor from '@/view/front/frontSongInfor'

// fit
import fitIndex from '@/view/fit/fitIndex'
import fitFindMusic from '@/view/fit/fitFindMusic'
import fitSongList from '@/view/fit/fitSongList'
import fitMyMusic from '@/view/fit/fitMyMusic'

import fitPersonal from '@/view/fit/fitPersonal'
import fitSongInfor from '@/view/fit/fitSongInfor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'bindex',
      component: bindex,
      children: [
        {
          path: '/bhome',
          name: 'bhome',
          component: bhome
        },
        {
          path: '/bsong',
          name: 'bsong',
          component: bsong
        },
        {
          path: '/bsonglist',
          name: 'bsonglist',
          component: bsonglist
        },
        {
          path: '/bloginlog',
          name: 'bloginlog',
          component: bloginlog
        },
        {
          path: '/boperationlog',
          name: 'boperationlog',
          component: boperationlog
        },
        {
          path: '/bsongstyle',
          name: 'bsongstyle',
          component: bsongstyle
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/testbar',
      name: 'testbar',
      component: testbar
    },
    {
      path: '/frontIndex',
      name: 'frontIndex',
      component: frontIndex,
      children: [
        {
          path: '/frontFindMusic',
          name: 'frontFindMusic',
          component: frontFindMusic
        },
        {
          path: '/frontMyMusic',
          name: 'frontMyMusic',
          component: frontMyMusic
        },
        {
          path: '/frontPersonal',
          name: 'frontPersonal',
          component: frontPersonal
        },
        {
          path: '/frontSongList',
          name: 'frontSongList',
          component: frontSongList
        },
        {
          path: '/frontSongInfor',
          name: 'frontSongInfor',
          component: frontSongInfor
        }
      ]
    },
    {
      path: '/fitIndex',
      name: 'fitIndex',
      component: fitIndex,
      children: [
        {
          path: '/fitFindMusic',
          name: 'fitFindMusic',
          component: fitFindMusic
        },
        {
          path: '/fitSongList',
          name: 'fitSongList',
          component: fitSongList
        },
        {
          path: '/fitMyMusic',
          name: 'fitMyMusic',
          component: fitMyMusic
        },
        {
          path: '/fitPersonal',
          name: 'fitPersonal',
          component: fitPersonal
        },
        {
          path: '/fitSongInfor',
          name: 'fitSongInfor',
          component: fitSongInfor
        }
      ]
    }
  ]
})
