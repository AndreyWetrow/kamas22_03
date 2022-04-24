import axios from "axios";

const instanceFirebase = axios.create({
  baseURL: "https://itcamas2022-default-rtdb.firebaseio.com/",
});
const instancePlaceholder = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});
const instanceAuth = axios.create({
  baseURL:
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMZjFPjbex9PUgjluKGE--Uj4mSwZ3eqM",
});

export const userAPI = {
  // getProfile(userId) {
  //   return instancePlaceholder.get(`users/${userId}`).then((response) => {
  //     return response.data;
  //   });
  // },

  getProfile(userId) {
    console.warn("Obsolete method. Use profileAPI");

    return profileAPI.getProfile(userId);
  },
  getPhoto(userId) {
    return instancePlaceholder
      .get(`photos/${userId}`)
      .then((response) => response.data);
  },
  getUser(id) {
    return instanceFirebase.get("users.json").then((response) => {
      console.log(response.data);
    });
  },
  getUsers() {
    return instanceFirebase.get("users.json").then((response) => response.data);
  },
  getTotalCount() {
    return instanceFirebase
      .get("totalCount.json")
      .then((response) => response.data);
  },
  followUser(userKey) {
    return instanceFirebase
      .patch(`users/${userKey}.json`, { followed: false })
      .then((response) => response.status);
  },
  unfollowUser(userKey) {
    return instanceFirebase
      .patch(`users/${userKey}.json`, { followed: true })
      .then((response) => response.status);
  },
};
export const authAPI = {
  authData: {
    email: "test@mail.ru",
    password: "123456",
    returnSecureToken: true,
  },
  me() {
    return instanceAuth.post(``, this.authData);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instancePlaceholder.get(`users/${userId}`).then((response) => {
      return response.data;
    });
  },
  getProfileForStatus(userId) {
    return instanceFirebase.get("users.json").then((response) => {
      let userProfile = Object.entries(response.data).filter((item) => {
        return item[1].id === +userId;
      });

      return userProfile[0][1].status;
    });
  },

  updateStatusUser(userId, status) {
    return instanceFirebase
      .get("users.json")
      .then((response) => {
        let userProfile = Object.entries(response.data).filter((item) => {
          return item[1].id === +userId;
        });

        return userProfile[0][0];
      })
      .then((userKey) => {
        return instanceFirebase
          .patch(`users/${userKey}.json`, { status: status })
          .then((response) => {
            return response;
          });
      });
  },
};
