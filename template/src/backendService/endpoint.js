const RemoteEndpoint = window.ENDPOINT ? ENDPOINT: 'http://localhost:3000';

export var GetSampleData = function (callback) {
  var AjaxUrl = `${RemoteEndpoint}/api/dataX`;
  // $.getJSON(AjaxUrl, callback);

  setTimeout(function mockServerResp () {
    var dataJson = {
      error: 0,
      data: 'apple: '
    };
    callback(dataJson);
  }, 1000);
}