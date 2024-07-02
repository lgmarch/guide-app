const information = document.getElementById('info');

information.innerText = `This app is using Chrome (
  v${versions.chrome()}), 
  Node.js (v${versions.node()}), 
  and Electron (v${versions.electron()},
)`;

ipcRenderer.on('update-message', function (evt, message) {
  console.log(message); // Returns: {'SAVED': 'File Saved'}
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
