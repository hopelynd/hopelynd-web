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

const cacheName = 'cache-v1'

// 安装注册 sw
self.addEventListener('install', event => {
  console.log('sw install');
  self.skipWaiting().then().catch();
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(cachesList))
      .then(ok => console.log('add all ok'), e => console.log(e))
  );
});

// 检测网站更新
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response; // 缓存中有对应的响应，直接返回
        }

        return fetch(event.request)
          .then(function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response; // 响应不成功，直接返回
            }

            const responseToCache = response.clone(); // 克隆响应对象

            caches.open(cacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache); // 将响应添加到缓存中
              });

            return response;
          });
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
    self.clients.matchAll().then(function(clients) {
      clients.forEach(function(client) {
        client.postMessage('网站已更新，请刷新页面以获取最新内容。');
      });
    })
  );
});


