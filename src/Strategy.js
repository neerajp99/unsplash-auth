/**
 * Passport Strategy for authenticating with Unsplash
 * @author: Neeraj Pandey
 */

const OAuth2Strategy = require('passport-oauth2')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const util = require('util')
const querystring = require('querystring')

/**
 * `Strategy` constructor.
 *
 * The Unsplash authentication strategy authenticates requests by delegating to
 * Unsplash using the OAuth protocol.
 *
 * Applications must supply a `verify` callback which accepts a `token`,
 * `tokenSecret` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientId`     	identifies client to Unsplash
 *   - `clientSecret`   secret used to establish ownership of the consumer key
 *   - `callbackURL`    URL to which Unsplash will redirect the user after obtaining authorization
 *   - `scope`          Array of permission scopes to request
 *                      Check the official documentation for valid scopes to pass as an array.
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
 function Strategy(){}



