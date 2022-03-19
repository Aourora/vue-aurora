import {
  ActionContext,
  createStore,
  Store,
  useStore as baseUseStore,
} from "vuex";

import { InjectionKey } from "vue";
import { ColumnProps, PostProps, UserProps } from "@/utils/props";
import { testColumnData, testPostData } from "@/utils/test";
import {
  CRESTE_POST_ACTION,
  LOGIN_ACTION,
  SET_POST_INFO,
  SET_USER_INFO,
} from "@/utils/constant";

export interface RootState {
  user: UserProps;
  columnList: ColumnProps[];
  postList: PostProps[];
}

export const key: InjectionKey<Store<RootState>> = Symbol();

const store = createStore<RootState>({
  state: {
    user: { id: 1, isLogin: false, name: "aurora" },
    columnList: testColumnData,
    postList: testPostData,
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columnList.find((c) => c.id === id);
    },
    getPostByColummnId: (state) => (id: number) => {
      return state.postList.filter((p) => p.columnId === id);
    },
  },
  mutations: {
    [SET_USER_INFO](state: RootState, payload: UserProps) {
      if (payload) {
        state.user = payload;
      }
    },
    [SET_POST_INFO](state: RootState, payload: PostProps) {
      if (payload) {
        state.postList.push(payload);
      }
    },
  },
  actions: {
    async [LOGIN_ACTION](
      { commit }: ActionContext<RootState, RootState>,
      payload: UserProps
    ) {
      //test
      await (() => {
        return new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      })();
      commit(SET_USER_INFO, payload);
    },
    async [CRESTE_POST_ACTION](
      { commit }: ActionContext<RootState, RootState>,
      payload: UserProps
    ) {
      //test
      await (() => {
        return new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      })();
      commit(SET_POST_INFO, payload);
    },
  },
});

export function useStore(): Store<RootState> {
  return baseUseStore(key);
}

export default store;
