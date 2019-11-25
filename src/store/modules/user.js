import request from '../../utils/plugins/request';

const app = {
  state: {
    uname: '',
    realName: '',
    roleList: [],
  },
  mutations: {
    SET_USER_INFO: (state, user) => {
      state.uname = user.uname;
      state.realName = user.uname;
      state.roleList = ['admin'];
    },
  },
  actions: {
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        request.get('/manager/get-manager-info').then((data) => {
          commit('SET_USER_INFO', data.result);
          resolve(data.result);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
};

export default app;
