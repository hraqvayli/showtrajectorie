
var map = L.map('map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


getData() ;
async function getData() {
    
    const response =  await fetch('data/trajectories/traj5.json');
    const data = await response.json();
    let latlngs = [];
    let Icon = L.icon({
        iconUrl: 'images/icon.png',
        iconSize: [20, 20], 
    });
    for (item of data) {
        L.marker([item.lat, item.lng],{icon: Icon}).addTo(map)
        latlngs.push([item.lat, item.lng]);
    }
    
    let polyline = L.polyline(latlngs, {color: 'blue'}).addTo(map);
    
    map.fitBounds(polyline.getBounds());

    let start_icon = L.icon({
        iconUrl: 'images/blue.png',
        iconSize: [40, 50], 
    });
    let end_icon = L.icon({
        iconUrl: 'images/rouge.png',
        iconSize: [40, 50], 
    });

    L.marker(latlngs[0], {icon: start_icon}).addTo(map);
    L.marker(latlngs[latlngs.length-1], {icon: end_icon}).addTo(map);
}

