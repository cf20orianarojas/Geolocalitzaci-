let meteorites = []
let coors = []
// METEORITS
fetch("js/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
    let dades = data;
    dades.forEach(el => {
        meteorites.push({ id: parseInt(el.id), rsc: el.recclass, nom: el.name, num: parseInt(el.mass)})
        if (el.geolocation) coors.push(el.geolocation.coordinates);
    })
    printList()
});

function printList() {
    let taula = "<table>";
    taula+= `<th>id</th><th>Recclass</th><th>Nom</th><th>Massa</th>`;
    meteorites.forEach((obj, index) => {
        taula+="<tr>";
        taula+=`<td>${obj.id}</td>`;
        taula+=`<td>${obj.rsc}</td>`;
        taula+=`<td>${obj.nom}</td>`;
        taula+=`<td>${obj.num}</td>`;
        taula+=`<td><button onclick="seeLocation(${index})">Location</button></td>`
        taula+="</tr>";
    });
    taula+="</table>";
    document.getElementById("resultat").innerHTML = taula;
}

function seeLocation(index) {
    
    let met = `<h2 onclick="printList()">${meteorites[index].nom}: <b>${coors[index]}</b></h2>`
    document.getElementById("resultat").innerHTML = met
    
    let ubi = coors[index].reverse()
    const map = L.map('map').setView(ubi, 13);
    const marker = L.marker(ubi).addTo(map);
    marker.bindPopup(`<b>El meteorit ${meteorites[index].nom}</b><br> ha caigut aqui.`).openPopup();
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
}