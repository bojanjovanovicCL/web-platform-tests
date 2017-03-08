if (this.document === undefined) {
  importScripts("/resources/testharness.js");
  importScripts("../resources/utils.js");

  // A nested importScripts() with a referrer-policy should have no effect
  // on overall worker policy.
  importScripts("nested-policy.js");
}

var referrerOrigin = "http://{{host}}:{{ports[http][0]}}/";
var fetchedUrl = "http://{{host}}:{{ports[http][1]}}" + dirname(location.pathname) + RESOURCES_DIR + "inspect-headers.py?cors&headers=referer";

promise_test(function(test) {
  return fetch(fetchedUrl).then(function(resp) {
    assert_equals(resp.status, 200, "HTTP status is 200");
    assert_equals(resp.headers.get("x-request-referer"), referrerOrigin, "request's referrer is " + referrerOrigin);
  });
}, "Request's referrer is origin");

done();
