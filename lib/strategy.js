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
 *   - `clientId`           identifies client to Unsplash
 *   - `clientSecret`       secret used to establish ownership of the consumer key
 *   - `callbackURL`        URL to which Unsplash will redirect the user after obtaining authorization
 *   - `passReqToCallback`  when `true`, `req` is the first argument to the verify callback (default: `false`)
 *   - `scope`              Array of permission scopes to request
 *                          Check the official documentation for valid scopes to pass as an array.
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

    // Throw Type Errors if the options object is missing some keys
    if (!verify) { throw new TypeError('OAuth2Strategy requires a verify callback'); }
    if (!options.authorizationURL) { throw new TypeError('OAuth2Strategy requires a authorizationURL option'); }
    if (!options.tokenURL) { throw new TypeError('OAuth2Strategy requires a tokenURL option'); }
    if (!options.clientID) { throw new TypeError('OAuth2Strategy requires a clientID option'); }
    options.scopeSeparator = options.scopeSeparator || ' ';
    // Make the OAuth call here
    OAuth2Strategy.call(this, options, verify);
    this.name = 'unsplash';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);

/**
 * Retrieve user profile from Unsplash.
 *
 * This function constructs a normalized profile.
 * Along with the properties returned from /me/, properties returned include:
 *   - `provider`         always set to `unsplash`
 *   - `id`               the user's Unsplash ID
 *   - `name`             the user's name
 *   - `username`         the user's Unsplash username
 *   - `avatar`           the URL of the avatar for the user on Unsplash
 *   - `accessToken`      The access token used to fetch the (may be useful for refresh)
 * @param {string} accessToken
 * @param {function} done
 * @access protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
    // let self = this
    this._oauth2.get('https://api.unsplash.com/me', accessToken, function(err, body, res) {
        if (err) {
            return done(new InternalOAuthError('Failed to fetch the user profile.', err))
        }
        try {
            let parsedData = JSON.parse(body)
            let profile = {
                provider: 'unsplash',
                name: {}
            }
            profile.id = parsedData.uid
            profile.name.firstName = parsedData.first_name
            profile.name.lastName = parsedData.last_name
            profile.username = parsedData.username
            profile.email = parsedData.email
            profile._raw = body
            profile._json = parsedData

            done(null, profile)
        } catch (e) {
            done(e)
        }
    })
}

/**
 * Parse error response from Unsplash OAuth endpoint.
 *
 * @param {string} body
 * @param {number} status
 * @return {Error}
 * @access protected
 */
Strategy.prototype.parseErrorResponse = function(body, status) {
    let json;
    try {
        json = JSON.parse(body);
        if (json.error) {
            return new Error(json.error);
        }
    } catch (_) {}
};

/**
 * Options for the authorization.
 * @typedef {Object} authorizationParams
 * @property {any} permissions
 * @property {any} prompt
 */

/**
 * Return extra parameters to be included in the authorization request.
 *
 * @param {Object} options
 * @return {Object}
 * @api protected
 */
Strategy.prototype.authorizationParams = function(options) {
    let params = {};
    if (typeof options.permissions !== 'undefined') {
        params.permissions = options.permissions;
    }
    if (typeof options.prompt !== 'undefined') {
        params.prompt = options.prompt;
    }
    return params;
};

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;