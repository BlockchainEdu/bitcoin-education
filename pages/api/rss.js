import Parser from 'rss-parser';

export default async function handler(req, res) {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL('https://rss.beehiiv.com/feeds/gfjLR7z5O9.xml');
    const sortedPosts = feed.items
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
      .slice(0, 3); // display only the 3 most recent posts
    res.status(200).json(sortedPosts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};