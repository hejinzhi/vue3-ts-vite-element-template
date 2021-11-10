import { ActionContext } from 'vuex'
import Cookies from 'js-cookie'

interface ISidebar {
  opened: boolean;
  withoutAnimation: boolean;
}
export interface IAppState {
  sidebar: ISidebar;
  device: string;
}

const state:IAppState = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? true : false,
    // opened: true,
    withoutAnimation: false
  },
  device: 'desktop'
}
const mutations = {
  TOGGLE_SIDEBAR: (state:IAppState) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1')
    } else {
      Cookies.set('sidebarStatus', '0')
    }
  },
  CLOSE_SIDEBAR: (state:IAppState, withoutAnimation:boolean) => {
    Cookies.set('sidebarStatus', '0')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state:IAppState, device:string) => {
    state.device = device
  }
}

interface ICloseSiderbarAction {
  withoutAnimation: boolean
}
const actions = {
  toggleSideBar({ commit }: ActionContext<IAppState, {}>) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }: ActionContext<IAppState, {}>, { withoutAnimation }:ICloseSiderbarAction) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }: ActionContext<IAppState, {}>, device:string) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

