import { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api';
import { Link } from 'react-router-dom';

export default function RecentPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts().then(all => {
      // ambil 5 post terbaru berdasarkan id tertinggi
      const sorted = all.sort((a, b) => b.id - a.id).slice(0, 5);
      setPosts(sorted);
    });
  }, []);
  return (
    <aside className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-700">Recent Posts</h2>
      <ul className="space-y-2">
        {posts.map(p => (
          <li key={p.id}>
            <Link to={`/posts/${p.id}`} className="text-sky-600 hover:underline">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
