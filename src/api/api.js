import axios from "axios";
import { logout } from "../redux/auth-reducer";

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
    // console.warn("Obsolete method. Use profileAPI");

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
  // authData: {
  //   email: "test@mail.ru",
  //   password: "123456",
  //   returnSecureToken: true,
  // },
  me(email, password, rememberMe) {
    return instanceAuth.post(``, { email, password, rememberMe });
  },
  login(email, password, rememberMe = false) {
    // const getRes = () => {
    //   return instanceAuth
    //     .post(``, {
    //       email,
    //       password,
    //       rememberMe,
    //     })
    //     .then((response) => {
    //       return response;
    //     })
    //     .catch((error) => {
    //       // в debugger ошибка появляется, а в error не попадает??????
    //       return { error: "Введите правильные данные" };
    //     });
    // };

    const getRes = async () => {
      return await instanceAuth
        .post(``, { email, password, rememberMe })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return { error: "Введите правильные данные" };
        });
    };

    return getRes();
    // const getRes = async () => {
    //   try {
    //     return await instanceAuth.post(``, {
    //       email,
    //       password,
    //       rememberMe,
    //     });
    //   } catch (error) {
    //     debugger;
    //     return { error: "Введите правильные данные" };
    //   }
    // };

    // return instanceAuth.post(``, { email, password, rememberMe }).then(
    //   (res) => {
    //     return res;
    //   },
    //   () => {
    //     // в debbuger ошибка появляется, а в error не попадает??????
    //     return { error: "Введите правильные данные" };
    //   }
    // );

    // return instanceAuth.post(``, { email, password, rememberMe });
  },
  logout(email, password, rememberMe = false) {
    return instanceAuth.post(``, { email, password, rememberMe });
  },
};

export const profileAPI = {
  // savePhoto(file, userId) {
  //   let formData = new FormData();
  //   formData.append(" photoURL:", file);
  //   return instanceFirebase
  //     .patch(`users/${userId}.json`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((response) => {
  //       return response;
  //     });
  // },
  savePhoto(file, userId) {
    return instanceFirebase
      .patch(`users/${userId}.json`, { photoURL: file })
      .then((response) => {
        return response;
      });
  },

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
