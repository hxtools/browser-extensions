import ext from "./utils/ext";

var alertCreatedStatus = false;

var createAlert = () => {

  if (alertCreatedStatus === false) {

    var container = document.createElement('div');
    container.className = 'pinokio-alert';

    var inner = document.createElement('div');
    inner.className = "inner"

    var message = document.createElement('span');
    message.id = 'pmessage';

    var closeButton = document.createElement('button');
    closeButton.innerHTML = "x";
    closeButton.id = "pclose";

    inner.appendChild(message);
    inner.appendChild(closeButton);
    container.appendChild(inner);
    document.body.appendChild(container);

    closeButton.addEventListener('click', () => {
      container.remove()
    });

    alertCreatedStatus = true;

  }

}

createAlert();


var showNotice = () => {

      var message = document.querySelector('#pmessage');
      var messageValue = '';

      messageValue += '<span class="icon-pinokio">🎗️</span>Bersikaplah Bijak dalam menggunakan Sosial Media.<br><strong>Alasan:</strong> Konten bersifat subjektif';
      message.innerHTML = messageValue;

      var container = document.querySelector('.pinokio-alert');
      container.classList.add('show');

  }

var showAlert = (info) => {

  if (info.url) {

    var reason = '<strong>Alasan:</strong> ';

    switch (reason.classType) {
      case 'berita-palsu':
        reason += 'Berita Palsu'
        break;
      case 'satir':
        reason += 'Tulisan Satir'
        break;
      case 'bias-politik':
        reason += 'Bias Politik'
        break;
      case 'teori-konspirasi':
        reason += 'Teori Konspirasi'
        break;
      case 'junk-science':
        reason += 'Junk Science'
        break;
      case 'hate-group':
        reason += 'Hate Group'
        break;
      case 'clickbait':
        reason += 'Click Bait'
        break;
      case 'waspada':
        reason += 'Butuh Verifikasi lebih lanjut'
        break;
      default:
        reason += 'Belum di verifikasi';
        break;
    }

    var message = document.querySelector('#pmessage');
    var messageValue = '';

    messageValue += '<span class="icon-pinokio">🎗️</span>Halaman ini merupakan sumber informasi yang tidak terpercaya.<br>' + reason;
    message.innerHTML = messageValue;

    var container = document.querySelector('.pinokio-alert');
    container.classList.add('show');
  }

}


function onRequest(request, sender, sendResponse) {

  if (request.action === 'show-alert') {
    sendResponse(showAlert(request))
  } else if (request.action === 'show-notice') {
    sendResponse(showNotice())
  }
}

ext.runtime.onMessage.addListener(onRequest);
