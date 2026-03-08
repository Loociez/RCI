// api/rc-news.js
const https = require('https');
const { DOMParser } = require('xmldom');

module.exports = (req, res) => {
  const rssUrl = 'https://www.bigsquidrc.com/feed';

  https.get(rssUrl, (rssRes) => {
    let data = '';

    rssRes.on('data', chunk => data += chunk);
    rssRes.on('end', () => {
      try {
        const xmlDoc = new DOMParser().parseFromString(data, 'text/xml');
        const items = Array.from(xmlDoc.getElementsByTagName('item')).slice(0, 5).map(item => ({
          title: item.getElementsByTagName('title')[0]?.textContent || 'No title',
          link: item.getElementsByTagName('link')[0]?.textContent || '#',
          description: item.getElementsByTagName('description')[0]?.textContent || '',
          pubDate: item.getElementsByTagName('pubDate')[0]?.textContent || ''
        }));

        // ✅ Add proper CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify({ items }));

      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  }).on('error', (err) => {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: err.message }));
  });
};