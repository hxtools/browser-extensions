import ext from "./utils/ext";
import storage from "./utils/storage";

var popup = document.getElementById("app");

var submissionLink = document.querySelector(".js-report");
submissionLink.addEventListener("click", function(e) {
  e.preventDefault();
  ext.tabs.create({'url': ext.extension.getURL('report.html')});
})
