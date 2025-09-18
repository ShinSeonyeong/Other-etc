const CACHE_NAME = "pwa-cache-v1";
const CACHE_FILES = [
    "/",
    "/index.html",
    "/css/styles.css",
    "/js/app.js",
    "/images/icon-192x192.png",
    "/images/icon-512x512.png"
];

// 서비스 워커 설치 (캐시 저장)
self.addEventListener("install", event => {
    console.log("Service Worker 설치 중...");
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("캐싱 완료");
            return cache.addAll(CACHE_FILES);
        })
    );
});

// 서비스 워커 활성화 (이전 캐시 삭제)
self.addEventListener("activate", event => {
    console.log("Service Worker 활성화됨");
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

// 네트워크 요청 가로채기 (캐싱된 데이터 제공)
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
