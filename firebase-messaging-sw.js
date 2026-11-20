// Ping：プッシュ通知を受ける裏方（アプリを閉じていても、通知を表示する）
// ここに書く値は、index.html の FIREBASE_CONFIG と同じ公開してよい値だけ
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyD7eiB6jT_1ox7Yfdz8TCxEryAF8y54bLU',
  authDomain: 'wcms-92f78.firebaseapp.com',
  projectId: 'wcms-92f78',
  messagingSenderId: '507561141213',
  appId: '1:507561141213:web:f0a813730990ba983f0c34',
});

// 「notification」付きのメッセージは、Firebase の部品が自動で表示する。ここでは、押したときの動作だけ決める
firebase.messaging();

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = self.registration.scope;
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if ('focus' in c) return c.focus(); }
    return clients.openWindow(url);
  }));
});
