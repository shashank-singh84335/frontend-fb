/* eslint-disable no-unused-vars */
export const initFacebookSdk = () => {
    return new Promise((resolve, reject) => {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: '332688753090534',
          cookie: true,
          xfbml: true,
          version: 'v2.7'
        });
        resolve();
      };
    })
}
export const getFacebookLoginStatus = () => {
    return new Promise((resolve, reject) => {
      window.FB.getLoginStatus((response) => {
        resolve(response);
      });
    });
  };
 export const fbLogin = () => {
    return new Promise((resolve, reject) => {
      window.FB.login((response) => {
        resolve(response)        
      })
    })
  }