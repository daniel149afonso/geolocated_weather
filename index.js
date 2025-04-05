let villeChoisie;
let changerDeVille = document.querySelector('#changer');

//Acces position utilisateur
if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition((position)=>{//watch appelé à chaque fois que la position change (plus fiable que getCurrent position)
        const url = 
        'https://api.openweathermap.org/data/2.5/weather?lon=' + 
        position.coords.longitude +'&lat='+ position.coords.latitude + 
        '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';
        
        let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
        requete.open('GET', url); // Nous récupérons juste des données
        requete.responseType = 'json'; // Nous attendons du JSON
        requete.send(); // Nous envoyons notre requête
      
        // Dès qu'on reçoit une réponse, cette fonction est executée
        requete.onload = function() {
          if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
              let reponse = requete.response;
              // console.log(reponse);
              let temperature = reponse.main.temp;
              let ville       = reponse.name;
              // console.log(temperature);
              document.querySelector('#temperature_label').textContent = temperature;
              document.querySelector('#ville').textContent = ville;
            }
            else {
              alert('Un problème est intervenu, merci de revenir plus tard.');
            }
          }
        }
    },error, options);
}
//Au cas où affiche par défaut Paris
else{
    alert('Impossible access location');
    villeChoisie = 'Paris';
    recevoirTemperature(villeChoisie);
}
//améliore la précision de la position
var options = {
    enableHighAccuracy:true
}
//position refusée affiche par défaut Paris
function error() {
    villeChoisie = 'Paris';
    recevoirTemperature(villeChoisie);
}
//Changer de ville avec le boutton
changerDeVille.addEventListener('click', () => {
  villeChoisie = prompt('Which city do you want ?');
  recevoirTemperature(villeChoisie);
});

function recevoirTemperature(ville) {
  ville = ville.trim(); // ⚠️ enlève les espaces inutiles
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

  let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
  requete.open('GET', url); // Nous récupérons juste des données
  requete.responseType = 'json'; // Nous attendons du JSON
  requete.send(); // Nous envoyons notre requête

  // Dès qu'on reçoit une réponse, cette fonction est executée
  requete.onload = function() {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let reponse = requete.response;
        // console.log(reponse);
        let temperature = reponse.main.temp;
        let ville       = reponse.name;
        // console.log(temperature);
        document.querySelector('#temperature_label').textContent = temperature;
        document.querySelector('#ville').textContent = ville;
      }
      else {
        alert("Enter a valid city please.");
      }
    }
  }
}