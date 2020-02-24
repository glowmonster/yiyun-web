// 开启严格模式
'use strict'
// 配置整个模块的导出对象
const user = {
  // 状态集的数据源
  state: {
    user: {
      user_id: '',
      user_account: '',
      user_avatar_url: '',
      user_name: '',
      user_describes: ''
    },
    isLogin: 0
  },
  // vuex给外界提供的获取函数
  getters: {
    user (state) {
      return state.user
    },
    isLogin (state) {
      return state.isLogin === 1
    }
  },
  // 外界操作get函数的函数 同步请求
  mutations: {
    // 修改登录状态
    changeLoginState (state, flag) {
      state.isLogin = flag
    },
    // 存储用户详细信息
    saveLoginInfo (state, user) {
      state.user.user_id = user.user_id
      state.user.user_account = user.user_account
      state.user.user_avatar_url = user.user_avatar_url
      state.user.user_name = user.user_name
      state.user.user_describes = user.user_describes
    }
  },
  // 异步请求
  actions: {
    changeLoginState ({commit}) {
      commit('changeLoginState', 1)
    },
    saveLoginInfo ({commit}, user) {
      commit('saveLoginInfo', user)
    }
  }
}

export default user
