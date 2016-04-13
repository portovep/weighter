
var FacebookLogin = React.createClass({
  initFacebookSDK: function () {
    var self = this;

    window.fbAsyncInit = function () {
      FB.init({
        appId: '1048102421917335',
        cookie: true,
        xfbml: false,
        version: 'v2.5'
      });

      FB.getLoginStatus(function(response) {
        self.statusChangeCallback(response);
      });
    },

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },

  statusChangeCallback: function(response) {
    if (response.status === 'connected') {
      this.setState({loggedIn: true});
      console.info('Logged into the app');

      this.welcomeUser();
    }
    else if (response.status === 'not_authorized') {
      this.setState({loggedIn: false});
      console.info('Logged into Facebook, but not the app.');
    }
    else {
      this.setState({loggedIn: false});
      console.info('Not logged into Facebook');
    }
  },

  welcomeUser: function() {
    console.info('Fetching user information.... ');

    var self = this;

    FB.api('/me', function(response) {
      var username = response.name;
      console.info('Successful login for: ' + username);
      self.setState({username: username});
    });
  },

  loginFB: function() {
    console.info('Trying to log in into FB');
    FB.login(this.statusChangeCallback, {scope: 'public_profile,email'});
  },

  getInitialState: function() {
    return {loggedIn: false, username: ''};
  },

  componentDidMount: function () {
    this.initFacebookSDK();
  },

  render: function() {
    var content;

    if (this.state.loggedIn) {
      content = 'Welcome ' +  this.state.username + '!';
    }
    else {
      content = <button type="button" className="btn btn-success" onClick={this.loginFB}>Login in with Facebook</button>;
    }

    return (
      <div>
        { content }
      </div>
    );
  }
});

module.exports = FacebookLogin;