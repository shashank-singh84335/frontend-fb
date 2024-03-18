import React, { useEffect } from "react";

const FacebookLogin = ({ onLoginSuccess, onLoginFailure }) => {
  useEffect(() => {
    // Load the Facebook SDK asynchronously
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "332688753090534",
          cookie: true,
          xfbml: true,
          version: "v12.0",
        });

        window.FB.getLoginStatus(function (response) {
          statusChangeCallback(response);
        });
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    };

    loadFacebookSDK();
  }, []);

  const statusChangeCallback = (response) => {
    if (response.status === "connected") {
      onLoginSuccess(response.authResponse);
    } else {
      onLoginFailure();
    }
  };

  const handleLogin = () => {
    window.FB.login(
      function (response) {
        statusChangeCallback(response);
      },
      {
        scope:
          "pages_show_list, pages_read_user_content, pages_manage_engagement, pages_manage_posts, pages_read_engagement, publish_video",
      }
    );
  };

  return <button onClick={handleLogin}>Login with Facebook</button>;
};

export default FacebookLogin;
