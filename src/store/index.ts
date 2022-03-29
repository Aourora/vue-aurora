import { Commit, createStore, Store, useStore as baseUseStore } from "vuex";

import { InjectionKey } from "vue";
import {
  ColumnProps,
  MessageProps,
  PostProps,
  ResponseData,
  UserProps,
} from "@/utils/props";
import {
  CRESTE_POST_ACTION,
  FETCH_COLUMNS_ACTION,
  FETCH_POSTS_ACTION,
  SET_COLUMNS,
  SHOW_MESSAGE,
  SET_LOADING,
  SET_POSTS,
  SET_USER_INFO,
  LOGIN_ACTION,
  HIDE_MESSAGE,
  LOGOUT_ACTION,
  CRESTE_CLOUMN_ACTION,
  FETCH_POST_ACTION,
  PUSH_POST,
} from "@/utils/constant";
import axios from "axios";
import { FETCH_CURRENT_USER_ACTION } from "../utils/constant";

export interface RootState {
  loading: boolean;
  message: MessageProps;
  user: UserProps;
  columnList: ColumnProps[];
  postList: PostProps[];
}

export const key: InjectionKey<Store<RootState>> = Symbol();

const getAndCommit = <T>(
  url: string,
  commit: Commit,
  mutation: string
): Promise<ResponseData<T>> => {
  return new Promise((resolve) => {
    axios
      .get<ResponseData<T>>(url)
      .then(({ data }) => {
        commit(mutation, data.data);
        resolve(data);
      })
      .catch(({ data }) => {
        resolve(data);
      });
  });
};

const store = createStore<RootState>({
  state: {
    loading: false,
    message: { status: false },
    user: {
      id: -1,
      isLogin: false,
      name: "",
      role: "",
      avatar: "",
      description: "",
    },
    columnList: [],
    postList: [],
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columnList.find((c) => c.id === id);
    },
    getPostsByColummnId: (state) => (id: number) => {
      return state.postList.filter((p) => p.columnId === id);
    },
    getPostById: (state) => (id: number) => {
      return state.postList.find((p) => p.id === id);
    },
  },
  mutations: {
    [SET_USER_INFO](state, payload) {
      state.user = { isLogin: payload && true, ...payload };
    },
    [SET_COLUMNS](state, payload) {
      state.columnList = payload;
    },
    [SET_POSTS](state, payload) {
      if (payload) {
        state.postList = payload;
      }
    },
    [PUSH_POST](state, payload) {
      if (payload) {
        state.postList.push(payload);
      }
    },
    [SET_LOADING](state, payload) {
      state.loading = payload;
    },
    [SHOW_MESSAGE](state, payload) {
      state.message = { status: true, ...payload };
    },
    [HIDE_MESSAGE](state) {
      state.message = { status: false };
    },
  },
  actions: {
    [CRESTE_POST_ACTION](_, payload) {
      return axios.post("post", payload);
    },
    [FETCH_COLUMNS_ACTION]({ commit }) {
      return getAndCommit("columns", commit, SET_COLUMNS);
    },
    [FETCH_POSTS_ACTION]({ commit }, id) {
      return getAndCommit(`posts/${id}`, commit, SET_POSTS);
    },
    [FETCH_POST_ACTION]({ commit }, id) {
      return getAndCommit(`post/${id}`, commit, PUSH_POST);
    },
    [FETCH_CURRENT_USER_ACTION]({ commit }) {
      return getAndCommit("user/current", commit, SET_USER_INFO);
    },
    [LOGIN_ACTION]({ dispatch }, payload) {
      return axios.post("auth/login", payload).then(() => {
        return dispatch(FETCH_CURRENT_USER_ACTION);
      });
    },
    [LOGOUT_ACTION]({ commit }) {
      return axios.get("user/logout").then(() => {
        commit(SET_USER_INFO, false);
      });
    },
    [CRESTE_CLOUMN_ACTION]({ dispatch }, payload) {
      return axios.post("columns", payload).then(async ({ data }) => {
        await dispatch(FETCH_COLUMNS_ACTION);
        return data;
      });
    },
  },
});

export function useStore(): Store<RootState> {
  return baseUseStore(key);
}

export default store;
