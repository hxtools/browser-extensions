import ext from "./utils/ext";

var sourceUrl = 'https://hxtools.github.io/source/filtered_url.json'
var filteredDomains;

var fetchData = () => {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", sourceUrl, false);
  xhr.send();

  var result = xhr.responseText;

  filteredDomains = result;
}

var domainCheck = (activeDomain) => {
  console.log(filteredDomains);

  if (activeDomain === 'www.facebook.com' || activeDomain === 'twitter.com') {
    // do profile check
  } else {
    var found = filteredDomains.find(domain => domain.url === activeDomain)

    if (found !== undefined) {
      ext.declarativeContent.ShowPageAction();
    } else {
      console.log('lolos');
    }
  }
}


ext.tabs.onActivated.addListener( async () => {

  // get data from git data source
  await fetchData();

  // get url from activated tab
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {
    var tab = tabs[0];
    var url = new URL(tab.url)
    var domain = url.hostname

    domainCheck(domain);
  });

});





// ext.runtime.onInstalled.addListener( async function() {

//   let urlList = await fetchData;

//   ext.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     ext.declarativeContent.onPageChanged.addRules([
//       {
//         // That fires when a page's URL contains a 'g' ...
//         conditions: [
//           new ext.declarativeContent.PageStateMatcher({
//             pageUrl: { urlContains: 'g' },
//           })
//         ],
//         // And shows the extension's page action.
//         actions: [ new chrome.declarativeContent.ShowPageAction() ]
//       }
//     ]);
//   });
// });

