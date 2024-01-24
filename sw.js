/**
 * @author: big.bro
 * @date:  2024-01-12
 * @time: 11:37
 * @contact: chenliheng@youlai.cn
 * @description: #
 */
let pre = '/';
let cachesList = [
  pre,
  pre + 'index.html',
];

const CACHE_NAME = 'cache-v3'

// 安装注册 sw
self.addEventListener('install', event => {
  console.log('sw install');
  self.skipWaiting().then().catch();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(cachesList))
      .then(ok => console.log('add all ok'), e => console.log(e))
  );
});

// 检测网站更新
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 监听消息事件，用于接收更新通知
self.addEventListener('message', function(event) {
  console.log('收到消息', event);
  if (event.data === 'update') {
    self.skipWaiting().then().catch();
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


