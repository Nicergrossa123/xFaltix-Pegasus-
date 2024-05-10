const serverIP = "bzg6ld";

document.addEventListener("DOMContentLoaded", function () {
  window.bridge.updateMessage(updateMessage);
});

function updateMessage(event, message) {
  console.log("message logged in view");
  let elemE = document.getElementById("message");
  elemE.innerHTML = message;
}

function openServer() {
  const serverUrl = `fivem://${serverIP}:30120`;
  
 
  getServerStatus(serverIP, 5000)
    .then(function(serverStatus) {
      if (serverStatus.online) {
      
        window.location.href = serverUrl;

        setTimeout(() => {
          window.close();
        }, 3000);
      } else {
        
        console.log("Server ist offline. Die Anwendung wird nicht geöffnet.");
        const offlineMessage = document.createElement('div');
        offlineMessage.classList.add('offline-message');
        offlineMessage.innerText = 'Der Server ist momentan offline.';
        document.body.appendChild(offlineMessage);
      }
    })
    .catch(function(error) {
      console.error("Fehler beim Abrufen des Serverstatus:", error);
    });
}


function getServerStatus(ip, timeout) {
  return new Promise((resolve, reject) => {
      axios
          .get(`https://servers-frontend.fivem.net/api/servers/single/${ip}`, { headers: { 'User-Agent': 'api-cfx' }, timeout: timeout })
          .then(function(response) {
            
              resolve({ online: true });
          })
          .catch(function(error) {
              // Server ist offline
              resolve({ online: false, url: error.config.url, method: error.config.method });
          });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  getServerStatus(serverIP, 5000)
      .then(function(serverStatus) {
          const statusDot = document.getElementById("status-dot");
          if (serverStatus.online) {
              statusDot.classList.add("green-dot");
              statusDot.classList.remove("red-dot");
          } else {
              statusDot.classList.add("red-dot");
              statusDot.classList.remove("green-dot");
          }
      })
      .catch(function(error) {
          console.error("Fehler beim Abrufen des Serverstatus:", error);
      });


  console.log("Fetching player count...");
  getPlayersCounter()
      .then((count) => {
          console.log("Player count fetched:", count);
          document.getElementById("player-count").innerText = `Spieler Online: ${count}`;
      })
      .catch((error) => {
          console.error("Fehler beim Abrufen des Spielerzählers:", error);
      });
});



function getPlayersCounter() {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://servers-frontend.fivem.net/api/servers/single/${serverIP}`, { headers: { 'User-Agent': 'api-cfx' } })
      .then(function(response) {
        let players = response.data.Data.players;
        resolve(players.length);
      })
      .catch(function(error) {
        reject(error);
      });
  });
}