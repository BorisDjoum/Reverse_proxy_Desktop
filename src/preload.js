// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.js

// Toutes les API Node.js sont disponibles dans le processus de préchargement.
// Il a la même sandbox qu'une extension Chrome.  
const { contextBridge, ipcRenderer } = require('electron')
const express = require('express');
const expressApp = express();
/*window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
})*/

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
  // nous pouvons aussi exposer des variables en plus des fonctions
})

/*expressApp.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});
  
expressApp.use((req, res, next) => {
    res.status(201);
    next();
});
  
expressApp.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
});
  
expressApp.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
});*/
expressApp.use(express.json());

expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

expressApp.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
});

expressApp.get('/api/stuff', (req, res, next) => {
    const stuff = [
      
    ];
    res.status(200).json(stuff);
  });

module.exports = expressApp;
