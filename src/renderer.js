const information = document.getElementById('info');

information.innerText = `This app is using Chrome (
  v${versions.chrome()}), 
  Node.js (v${versions.node()}), 
  and Electron (v${versions.electron()},
)`;

window.updateAPI.onUpdateRelease((value) => {
  alertSuccess(value);
});

function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: 'green',
      color: 'white',
      textAlign: 'center',
    },
  });
}
  
function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: 'red',
      color: 'white',
      textAlign: 'center',
    },
  });
}
