import React, { useState, useEffect } from 'react';
import Parser from 'rss-parser';

function BlogGrid() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/rss');
        const feed = await response.json();
        console.log(feed[0].enclosure)
        const sortedPosts = Array.isArray(feed) && feed.length > 0
          ? feed
              .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
              .slice(0, 3) // display only the 3 most recent posts
          : [];
        setPosts(sortedPosts);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPosts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid-container blog-grid">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl m-auto gap-y-10 sm:gap-y-4">
      {posts.map((post) => (
        <div key={post.link} className="grid-item">
        <a href={post.link}>
        <div className="text-center m-auto">
            <div>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front" style={{backgroundImage: `url(${post.enclosure.url || ''})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                  </div>
                  <div className="flip-card-back text-black font-mont p-5 text-sm text-left overflow-y-scroll">
                    <div>{post.contentSnippet}</div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="font-mont font-bold text-xl text-black pt-5">{post.title}</h3>
            <div className="text-bengrey-300 pt-2"><small>{new Date(post.pubDate).toDateString()}</small></div>
            </div>
          </a>
        </div>
      ))}
    </div>
    </div>
  );
}

export default BlogGrid;
