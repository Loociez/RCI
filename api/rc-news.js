// api/rc-news.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const rssUrl = 'https://www.bigsquidrc.com/feed';
    const response = await fetch(rssUrl);
    const xmlText = await response.text();

    // Parse XML to extract items
    const parser = new (require('xmldom').DOMParser)();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const items = Array.from(xmlDoc.getElementsByTagName('item')).slice(0, 5).map(item => ({
      title: item.getElementsByTagName('title')[0]?.textContent || 'No title',
      link: item.getElementsByTagName('link')[0]?.textContent || '#',
      description: item.getElementsByTagName('description')[0]?.textContent || '',
      pubDate: item.getElementsByTagName('pubDate')[0]?.textContent || ''
    }));

    // Return JSON with CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}