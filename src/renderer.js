const information = document.getElementById('info');

console.log(`*** ${versions.node()}`);

information.innerText = `This app is using Chrome (
    v${versions.chrome()}), 
    Node.js (v${versions.node()}), 
    and Electron (v${versions.electron()},
)`;
