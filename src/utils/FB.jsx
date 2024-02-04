import React, { useEffect } from "react";

function FacebookLoginComponent() {
  useEffect(() => {
    loadFacebookSDK();
  }, []);

  const loadFacebookSDK = () => {
    window.fbAsyncInit = function() {
    window.FB.init({
      appId: "746632784072597",
      cookie: true,
      xfbml: true,
      version: "v18.0",
    });
      
    window.FB.AppEvents.logPageView();   
      
  };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  const statusChangeCallback = (response) => {
    console.log(response);
  };

  const checkLoginState = () => {
    window.FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  };

  const handleFBLogin = () => {
    window.FB.login(checkLoginState);
  };

  return (
    <div>
      <button onClick={handleFBLogin}>Login with Facebook</button>
    </div>
  );
}

export default FacebookLoginComponent;
