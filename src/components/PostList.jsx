import PropTypes from 'prop-types';
import PostCard from './PostCard';

export default function PostList({ posts }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired
};
