/**
 * Passport Strategy for authenticating with Unsplash
 * @author: Neeraj Pandey
 */

const OAuth2Strategy = require('passport-oauth2')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const util = require('util')
const querystring = require('querystring')
const InternalOAuthError = require('passport-oauth2').InternalOAuthError

/**
 * `Strategy` constructor.
 *
 * The Unsplash authentication strategy authenticates requests by delegating to
 * Unsplash using the OAuth protocol.d
 *
 * Applications must supply a `verify` callback which accepts a `token`,
 * `tokenSecret` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientId`     		identifies client to Unsplash
 *   - `clientSecret`   	secret used to establish ownership of the consumer key
 *   - `callbackURL`    	URL to which Unsplash will redirect the user after obtaining authorization
 *   - `passReqToCallback`  when `true`, `req` is the first argument to the verify callback (default: `false`)
 *   - `scope`          	Array of permission scopes to request
 *                      	Check the official documentation for valid scopes to pass as an array.
 *
 * @constructor
 * @param {StrategyOptions} options
 * @param {function} verify
 * @access public
 */
function Strategy(options, verify) {
    if (typeof options == 'function') {
        verify = options;
        options = undefined;
    }
    options = options || {};
    options.authorizationURL = options.authorizationURL || 'https://unsplash.com/oauth/authorize';
    options.tokenURL = options.tokenURL || 'https://unsplash.com/oauth/token';
    options.passReqToCallback = options.passReqToCallback === undefined ? true : options.passReqToCallback;
    // Make the OAuth call here
    OAuth2Strategy.call(this, options, verify);
    this.name = 'unsplash';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);