document.addEventListener("DOMContentLoaded", () => {
    // Altlık haritaları tanımlama (Base Maps)
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    });

    // Google Satellite (Alternatif olarak Esri WorldImagery de kullanılabilir)
    const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '© Google Satellite'
    });

    // Haritayı başlatma
    const map = L.map('map', {
        center: [45.0, 20.0],
        zoom: 4,
        layers: [osm] // Varsayılan açılış katmanı
    });

    // Harita Sağ Üst Katman Kontrolü Ekleme
    const baseMaps = {
        "OpenStreetMap": osm,
        "Uydu (Satellite)": googleSat
    };
    L.control.layers(baseMaps).addTo(map);

    // İşaretçiler (Markers) ve Pop-uplar listesi
    const locations = [
        {
            name: "Ankara",
            coords: [39.92077, 32.85411],
            description: "Yaşadığım ve eğitim aldığım şehir, gezmeyi sevdiğim favori yer."
        },
        {
            name: "İstanbul",
            coords: [41.0082, 28.9784],
            description: "Tarihi ve kültürel zenginlikleriyle eşsiz, favori şehirlerimden."
        },
        {
            name: "İzmir",
            coords: [38.4237, 27.1428],
            description: "Ege'nin incisi, yaz tatillerimin vazgeçilmez rotası."
        },
        {
            name: "Berlin",
            coords: [52.5200, 13.4050],
            description: "Gezmeyi planladığım ve kültürünü merak ettiğim hedef rotam."
        },
        {
            name: "Londra",
            coords: [51.5074, -0.1278],
            description: "Gelecekteki hedef rotalarımdan biri, görülmeye değer!"
        }
    ];

    // Çizgi için koordinatları tutacak boş dizi
    const latlngs = [];

    // Marker'ları haritaya ekleme ve koordinatları yakalama
    locations.forEach(loc => {
        L.marker(loc.coords)
            .addTo(map)
            .bindPopup(`<b>${loc.name}</b>${loc.description}`);

        // Koordinatı çizgi dizisine ekle
        latlngs.push(loc.coords);
    });

    // Noktalar arasına kesik çizgi (Polyline) ekleme
    const polyline = L.polyline(latlngs, {
        color: '#3b82f6',     // Temamızdaki primary-color (Mavi)
        weight: 3,            // Çizgi kalınlığı
        opacity: 0.8,         // Saydamlık
        dashArray: '10, 10'   // Kesik çizgi efekti (10px çizgi, 10px boşluk)
    }).addTo(map);

    // İsterseniz haritayı bu çizginin sınırlarına otomatik sığdırabilirsiniz:
    // map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
});
