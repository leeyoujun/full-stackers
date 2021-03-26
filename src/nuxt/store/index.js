export const actions = {
  async nuxtServerInit({ commit }, { $axios }) {
    const { data: bbsConfigs } = await $axios.get('/api/configs/bbs')
    commit('bbsConfigs/setConfigs', bbsConfigs)
  },
}
