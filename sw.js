/**
 * @author: big.bro
 * @date:  2024-01-12
 * @time: 11:37
 * @contact: chenliheng@youlai.cn
 * @description: #
 */
let pre = '/';
let cachesList = [
  pre + 'index.html',
];

const curCacheName = 'updater'

self.addEventListener('install', event => {
  console.log('sw install');
  self.skipWaiting().then().catch();
  event.waitUntil(
    caches.open(curCacheName)
      .then(cache => cache.addAll(cachesList))
      .then(ok => console.log('add all ok'), e => console.log(e))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          // 过滤掉当前版本的缓存
          return cacheName !== curCacheName;
        }).map(cacheName => {
          return caches.delete(cacheName); // 清理旧版本缓存
        })
      );
    })
  );
});


self.addEventListener('fetch', event => {
  console.log(`fetch`, event.request.url);
  caches.keys().then(ks => console.log('cache key', ks));
});
