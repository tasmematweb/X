// Service Worker لإشعارات الدعم — لازم يكون في نفس مجلد index.html بالظبط
self.addEventListener('push', function (event) {
    let data = { title: 'EUX', body: 'رسالة جديدة' };
    try { data = event.data.json(); } catch (e) {
        if (event.data) data.body = event.data.text();
    }
    const options = {
        body: data.body || '',
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+CiAgPHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIHJ4PSIyNCIgZmlsbD0iIzBiMTIyMCIvPgogIDx0ZXh0IHg9IjY0IiB5PSI4MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iNTIiIGZpbGw9IiNmZmZmZmYiPkVVWDwvdGV4dD4KPC9zdmc+Cg==',
        badge: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+CiAgPHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIHJ4PSIyNCIgZmlsbD0iIzBiMTIyMCIvPgogIDx0ZXh0IHg9IjY0IiB5PSI4MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iNTIiIGZpbGw9IiNmZmZmZmYiPkVVWDwvdGV4dD4KPC9zdmc+Cg==',
        dir: 'rtl',
        lang: 'ar',
        tag: 'eux-support-message',
        renotify: true,
        data: { url: data.url || './' },
    };
    event.waitUntil(self.registration.showNotification(data.title || 'EUX - رسالة دعم جديدة', options));
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    const url = (event.notification.data && event.notification.data.url) || './';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
            for (const client of clientList) {
                if ('focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow(url);
        })
    );
});
