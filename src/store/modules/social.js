import userService from '../../services/UserService'
// import router from '../../router/index'

const state = {
  searchProfile: ' ',
}

// mutations
const mutations = {
  // PUT_SEARCH_PROFILE({ state }, searchBox) {
  //   state.searchProfile = searchBox
  // },
  PUT_SEARCH_PROFILE: (state, searchBox) => {
    state.searchProfile = searchBox
  },
}
// actions
const actions = {
  putSearchProfile({ commit }, searchProfile) {
    commit('PUT_SEARCH_PROFILE', searchProfile)
  },
  searchProfile({ getters }) {
    userService.searchProfile(getters('searchProfile'))
  },
}

// getters
const getters = {
  searchProfile(state) {
    const copyStr = Object.assign('', state.searchProfile)
    console.log('COPYSTR_searchProfile', copyStr)
    return copyStr
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
