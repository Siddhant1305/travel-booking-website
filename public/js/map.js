// let mapToken = mapToken;
// console.log(mapToken);
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

// console.log(coordinates);

const marker = new mapboxgl.Marker({ color: "red", draggable: true})
  .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
  .setPopup(new mapboxgl.Popup({ offset: 25 })
  .setHTML(
    `<h4>${listing.title}</h4>
     <h6>${listing.location}</h6>
    <p>Exact Location Provided After Booking!<p>`))
  .addTo(map);

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');