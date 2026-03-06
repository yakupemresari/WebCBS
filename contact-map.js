document.addEventListener("DOMContentLoaded", () => {
    // Haritayı Ankara merkezli başlatma
    const map = L.map('contact-map').setView([39.92077, 32.85411], 11);

    // Dark temaya uygun CartoDB Dark Matter altlık haritası veya standart OSM kullanılabilir.
    // Şık durması için CartoDB Dark Matter kullanalım:
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // İşaretçiler (Markers)
    // 1. Ev (Keçiören civarı ortalama koordinat)
    const homeCoords = [39.9821, 32.8643];
    // 2. İş (Çankaya civarı ortalama koordinat)
    const workCoords = [39.8901, 32.8576];

    // Marker ekleme
    L.marker(homeCoords)
        .addTo(map)
        .bindPopup('<b>Ev</b><br>Keçiören');

    L.marker(workCoords)
        .addTo(map)
        .bindPopup('<b>İş</b><br>Çankaya');

    // Haritayı iki marker'ı da görecek şekilde sığdırma
    const bounds = L.latLngBounds([homeCoords, workCoords]);
    map.fitBounds(bounds, { padding: [30, 30] });
});
