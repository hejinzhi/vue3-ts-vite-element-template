import setting from '@/settings'
import { ActionContext } from 'vuex'

const { fixedHeader, sidebarLogo } = setting

export interface ISettingState {
    fixedHeader:boolean;
    sidebarLogo:boolean;
}

const state:ISettingState = {
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state:ISettingState, { key, value }:{ [key:string]: string}) => {
    // eslint-disable-next-line no-prototype-builtins
    // if (state.hasOwnProperty(key)) {
    //   state[key] = value
    // }
    // state = data
    console.log(key)
    console.log(value)
  }
}

const actions = {
  changeSetting({ commit }:ActionContext<ISettingState, {}>, data:ISettingState) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

