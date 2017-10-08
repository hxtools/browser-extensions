import ext from "./utils/ext";

var sourceUrl = 'https://hxtools.github.io/source/data.json'
var data;

var fetchData = () => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", sourceUrl, false);
    xhr.send();

    var result = xhr.responseText;

    resolve(JSON.parse(result));
  });
}


var domainCheck = (tab) => {

  return new Promise((resolve, reject) => {

    // get data from git data source
    fetchData().then( function(data) {

      var url = new URL(tab.url)
      var activeDomain = url.hostname

      if (activeDomain === 'www.facebook.com' || activeDomain === 'twitter.com') {

        // do profile check later
        resolve('social-media');

      } else {
        var found = data.links.find(domain => domain.url.indexOf(activeDomain) > -1 )

        if (found !== undefined) {

          ext.pageAction.show(tab.id)
          resolve(found);

        } else {

          resolve(null);
        }
      }

    });
  });
}

ext.tabs.onActivated.addListener( (activeInfo) => {

  ext.tabs.get(activeInfo.tabId, (tab) => {

    if (tab && tab.url) {
      domainCheck(tab).then( function(data) {
        if (data === 'social-media') {
          ext.tabs.sendMessage(activeInfo.tabId, { "action": "show-notice"});
        } else {
          var info = Object.assign( { "action": "show-alert"}, data);
          ext.tabs.sendMessage(activeInfo.tabId, info);
        }
      });
    }

  });

});

ext.tabs.onUpdated.addListener( (tabId, changeInfo, tab) => {

  domainCheck(tab).then( function(data) {
    if (data === 'social-media') {
      ext.tabs.sendMessage(tabId, { "action": "show-notice"});
    } else {
      var info = Object.assign( { "action": "show-alert"}, data);
      ext.tabs.sendMessage(tabId, info);
    }
  });

});