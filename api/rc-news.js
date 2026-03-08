// api/rc-news.js
export default async function handler(req, res) {
  try {
    const rssUrl = 'https://www.bigsquidrc.com/feed';
    const response = await fetch(rssUrl);
    const xmlText = await response.text();

    // Minimal parsing: extract first 5 <item> blocks
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(xmlText)) && items.length < 5) {
      const itemText = match[1];

      const getTag = (tag) => {
        const m = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`).exec(itemText);
        return m ? m[1] : '';
      };

      items.push({
        title: getTag('title'),
        link: getTag('link'),
        description: getTag('description'),
        pubDate: getTag('pubDate'),
      });
    }

    // CORS headers so GitHub Pages can fetch it
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ items });

  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: err.message });
  }
}