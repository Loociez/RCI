export default async function handler(req, res) {
  try {
    const rssUrl = 'https://www.bigsquidrc.com/feed';
    const response = await fetch(rssUrl);
    const xmlText = await response.text();

    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xmlText)) && items.length < 5) {
      const item = match[1];

      const get = (tag) => {
        const m = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`).exec(item);
        return m ? m[1] : "";
      };

      items.push({
        title: get("title"),
        link: get("link"),
        description: get("description"),
        pubDate: get("pubDate")
      });
    }

    // IMPORTANT: CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).json({ items });

  } catch (err) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: err.message });

  }
}