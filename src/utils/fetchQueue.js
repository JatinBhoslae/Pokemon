const MAX_CONCURRENT = 15;
let activeCount = 0;
const queue = [];
const cache = new Map();

const processQueue = () => {
  if (activeCount >= MAX_CONCURRENT || queue.length === 0) {
    return;
  }
  activeCount++;
  const { url, resolve, reject } = queue.shift();

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      cache.set(url, data); // Save to cache
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    })
    .finally(() => {
      activeCount--;
      processQueue();
    });
};

export const queuedFetch = (url) => {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url));
  }

  return new Promise((resolve, reject) => {
    queue.push({ url, resolve, reject });
    processQueue();
  });
};
