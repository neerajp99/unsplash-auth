let chai = require("chai");
let UnsplashStrategy = require("../lib/strategy");
let expect = require("chai").expect;
chai.use(require("chai-passport-strategy"));

describe("Strategy", () => {
  // Check for correct strategy name
  describe("constructer method", () => {
    let strategy = new UnsplashStrategy(
      {
        clientID: "ID123",
        clientSecret: "secret123"
      },
      () => {}
    );

    it("should be named as unsplash", () => {
      expect(strategy.name).to.equal("unsplash");
    });
  });

  // Check if contructor defined with undefined options
  describe("constructor method with undefined options", () => {
    it("should throw", () => {
      expect(() => {
        let strategy = new UnsplashStrategy(undefined, () => {});
      }).to.throw(Error);
    });
  });

  // Incorrect redirect with display parameter
  describe("correct redirect after authorization with display parameter", () => {
    let strategy = new UnsplashStrategy(
      {
        clientID: "ABC123",
        clientSecret: "secret123"
      },
      () => {}
    );

    let url;

    before(done => {
      chai.passport
        .use(strategy)
        .redirect(_url => {
          url = _url;
          done();
        })
        .req(req => {})
        .authenticate({
          display: "mobile"
        });
    });

    it("should redirect", () => {
      expect(url).to.equal(
        "https://unsplash.com/oauth/authorize?response_type=code&client_id=ABC123"
      );
    });
  });

  // Incorrect redirect with reauthorizaton parameter
  describe("correct redirect after authorization with reathorization parameter", () => {
    let strategy = new UnsplashStrategy(
      {
        clientID: "ABC123",
        clientSecret: "secret123"
      },
      () => {}
    );

    let url;

    before(done => {
      chai.passport
        .use(strategy)
        .redirect(_url => {
          url = _url;
          done();
        })
        .req(req => {})
        .authenticate({
          authType: "reauthenticate",
          authNonce: "check123"
        });
    });

    it("should redirect to", () => {
      expect(url).to.equal(
        "https://unsplash.com/oauth/authorize?response_type=code&client_id=ABC123"
      );
    });
  });

  // Denying request failure
  describe("denying requests failure", () => {
    let strategy = new UnsplashStrategy(
      {
        clientID: "ABC123",
        clientSecret: "secret123"
      },
      () => {}
    );

    let info;
    // chai-passport-strategy
    before(done => {
      chai.passport
        .use(strategy)
        .fail(_info => {
          info = _info;
          done();
        })
        .req(req => {
          req.query = {};
          req.query.error = "access_denied";
          req.query.error_code = "200";
          req.query.error_description = "Permissions error";
          req.query.error_reason = "user_denied";
        })
        .authenticate();
    });

    it("should fail with info", () => {
      expect(info).to.not.be.undefined;
      expect(info.message).to.equal("Permissions error");
    });
  });



  
});
