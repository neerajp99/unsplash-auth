
#  Sign in with Unsplash for Passport JS

<a href="https://twitter.com/intent/follow?screen_name=neerajp99"><img src="https://img.shields.io/twitter/follow/neerajp99.svg?label=Follow%20@neerajp99" alt="Follow @neerajp99"></img></a>
<a href="https://www.npmjs.com/package/unsplash-passport">
  <img src="https://img.shields.io/npm/v/unsplash-passport.svg"></img>
</a>
</p>

Passport Strategy for the sign in with Unsplash, with profile information ✅!


## Installation
Install the package via npm / yarn:
``` npm install --save unsplash-passport ```

You will also need to install & configure `body-parser` if using Express:
``` npm install --save body-parser ```

```js
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
```

Next, you need to configure your Unsplash Developer account by creating OAuth applications here: [https://unsplash.com/developers](https://unsplash.com/developers)



## Usage

The Unsplash authentication strategy authenticates users via Unsplash user account and OAuth 2.0 token(s). An  Unsplash API Client ID, secret and redirect URL must be supplied when using this strategy. The strategy also requires a `verify` callback, which receives the access token and an optional refresh token, as well as a `profile` which contains the authenticated Unsplash user's profile. The `verify` callback must also call `cb` or `done` providing a user to complete the authentication.

Initialize the strategy as follows:

```js
const UnsplasgStrategy = require('unsplash-passport').Strategy;
let scopes = ['public', 'read_user'];
passport.use(new UnsplashStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "",
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
    return done(null, profile);
}));
```


#### Authenticate Requests

Use `passport.authenticate()`, specifying the `unsplash` strategy, to
authenticate requests.

On successful authentication, add the callback route and handle the response.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get('/auth/unsplash', passport.authenticate('unsplash'));

app.get('/auth/unsplash/callback',
  passport.authenticate('unsplash', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/redirectHome');
  });
```
## Examples

Developers using the popular [Express](http://expressjs.com/) web framework can refer to an [example](https://github.com/neerajp99/unsplash-auth-example) as a starting point for their own web applications. 

## Questions / Contributing

Feel free to open issues and pull requests. If you would like to be one of the core creators of this library, message me on twitter @neerajp99!

<h4> Created with ❤️ by <a href="https://http://github.com/neerajp99">Neeraj Pandey</a></h4>