import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import {
  fetchPostById,
  fetchUsers,
  fetchOneComment
} from '../services/api';
import PostDetail from '../components/PostDetail';
import RecentPosts from '../components/RecentPosts';
import SkeletonDetail from '../components/SkeletonDetail';

export default function PostPage() {
  const { id } = useParams();
  const { data: post, loading: l1, error: e1 } = useFetch(() => fetchPostById(id), [id]);
  const [author, setAuthor] = useState(null);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    if (post) {
      // Fetch author
      fetchUsers().then(all => {
        const u = all.find(u => u.id === post.userId);
        setAuthor(u);
      });
      // Fetch satu komentar
      fetchOneComment(id).then(setComment);
    }
  }, [post, id]);

  if (l1) return <SkeletonDetail />;
  if (e1) return <div className="text-center text-red-500">Error loading post.</div>;

  return (
    <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
      {/* Main */}
      <div className="lg:col-span-2 space-y-6">
        {/* Detail Post */}
        <PostDetail post={post} />

        {/* Author Card */}
        {author && (
          <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
            <img
              src={author.image}
              alt={author.username}
              className="w-20 h-20 rounded-full object-cover mr-5 border-2 border-sky-200"
            />
            <div>
              <h4 className="text-xl font-semibold text-gray-800">
                {author.firstName} {author.lastName}
              </h4>
              <p className="text-sm text-gray-500">{author.company?.title}</p>
              <p className="text-sm text-gray-500">{author.email}</p>
            </div>
          </div>
        )}

        {/* Single Comment */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Comment</h3>
          {comment ? (
            <div className="space-y-2">
              <p className="text-gray-700 italic">"{comment.body}"</p>
              <div className="flex items-center mt-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3 text-gray-500">
                  {/* Placeholder avatar */}
                  {comment.user.fullName.charAt(0)}
                </div>
                <div>
                  <p className="text-gray-800 font-medium">
                    {comment.user.fullName}
                  </p>
                  <p className="text-sm text-gray-500">{comment.likes} likes</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </section>
      </div>

      {/* Sidebar */}
      <RecentPosts />
    </div>
  );
}
