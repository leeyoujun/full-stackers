export const state = () => ({
  configs: [],
})

export const getters = {
  blogs: state => state.configs.filter(({ type }) => type === 'blog'),
  bbses: state => state.configs.filter(({ type }) => type !== 'blog'),
}

export const mutations = {
  setConfigs(state, configs = []) {
    state.configs = configs
  },
}
