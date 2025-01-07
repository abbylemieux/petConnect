import React, { useState, useEffect } from 'react';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [user, setUser] = useState('Anonymous'); // Simulate user info

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const createPost = () => {
    if (newPost.trim() === '') return;
    const post = {
      id: Date.now(),
      content: newPost,
      author: user,
      likes: 0,
      dislikes: 0,
      comments: [],
      createdAt: new Date(),
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handlePostReaction = (postId, type) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, [type]: post[type] + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const addComment = (postId, commentContent) => {
    if (commentContent.trim() === '') return;
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          content: commentContent,
          author: user,
          likes: 0,
          dislikes: 0,
        };
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleCommentReaction = (postId, commentId, type) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, [type]: comment[type] + 1 }
            : comment
        );
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="blog-container">
      <h1>Blog</h1>
      <div className="create-post">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
        />
        <button onClick={createPost}>Post</button>
      </div>
      <div className="posts-container">
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to create one!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <h3>{post.author}</h3>
                <span className="post-date">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="post-content">{post.content}</p>
              <div className="post-actions">
                <button onClick={() => handlePostReaction(post.id, 'likes')}>
                  👍 {post.likes}
                </button>
                <button onClick={() => handlePostReaction(post.id, 'dislikes')}>
                  👎 {post.dislikes}
                </button>
              </div>
              <div className="comments-section">
                <h4>Comments</h4>
                {post.comments.map((comment) => (
                  <div key={comment.id} className="comment-card">
                    <p>
                      <strong>{comment.author}</strong>: {comment.content}
                    </p>
                    <div className="comment-actions">
                      <button
                        onClick={() =>
                          handleCommentReaction(post.id, comment.id, 'likes')
                        }
                      >
                        👍 {comment.likes}
                      </button>
                      <button
                        onClick={() =>
                          handleCommentReaction(post.id, comment.id, 'dislikes')
                        }
                      >
                        👎 {comment.dislikes}
                      </button>
                    </div>
                  </div>
                ))}
                <textarea
                  placeholder="Add a comment..."
                  rows="2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      addComment(post.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;

/* Updated Code */