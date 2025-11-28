var map = new maplibregl.Map({
container: 'map',
style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
//'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'//for dark mode
center: listing.geometry.coordinates, 
zoom: 9
});
//for icon creation
// const icon=document.createElement('img');
// icon.src="https://pluspng.com/img-png/airbnb-logo-png-airbnb-logo-1600.png";
// icon.style.width="40px";
// icon.style.height="40px";
//,element:icon , anchor: "bottom" in Marker()
const marker = new maplibregl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new maplibregl.Popup({offset:25}).setHTML(
            // "<p>Exact location will be provided after booking</p>"
            `<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`
        )
    )
    .addTo(map);
