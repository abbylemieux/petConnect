import React, { useState, useEffect } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [user, setUser] = useState('Anonymous'); // Simulate user info

  // Load posts from localStorage when the component mounts
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  // Create a new post
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

  // Like/Dislike a post
  const handlePostReaction = (postId, type) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          [type]: post[type] + 1,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Add a comment
  const addComment = (postId, commentContent) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          content: commentContent,
          author: user,
          likes: 0,
          dislikes: 0,
          replies: [],
        };
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Like/Dislike a comment
  const handleCommentReaction = (postId, commentId, type) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              [type]: comment[type] + 1,
            };
          }
          return comment;
        });
        return {
          ...post,
          comments: updatedComments,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Add a reply to a comment
  const addReply = (postId, commentId, replyContent) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments.map(comment => {
          if (comment.id === commentId) {
            const newReply = {
              id: Date.now(),
              content: replyContent,
              author: user,
              likes: 0,
              dislikes: 0,
            };
            return {
              ...comment,
              replies: [...comment.replies, newReply],
            };
          }
          return comment;
        });
        return {
          ...post,
          comments: updatedComments,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="blog-container" style={{ padding: '20px', animation: 'fadeIn 0.3s ease-in' }}>
      <h1 style={{ marginTop: '70px' }}>Blog</h1>
      <div>
        <h2>Create a Post</h2>
        <textarea
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <button onClick={createPost} style={{ padding: '10px', cursor: 'pointer' }}>
          Post
        </button>
      </div>
      <div>
        <h2>All Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to create one!</p>
        ) : (
          posts.map(post => (
            <div
              key={post.id}
              style={{
                border: '1px solid #ddd',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <h3>{post.author}</h3>
              <p>{post.content}</p>
              <div>
                <button onClick={() => handlePostReaction(post.id, 'likes')}>
                  👍 {post.likes}
                </button>
                <button onClick={() => handlePostReaction(post.id, 'dislikes')}>
                  👎 {post.dislikes}
                </button>
              </div>
              <div>
                <h4>Comments</h4>
                {post.comments.map(comment => (
                  <div
                    key={comment.id}
                    style={{
                      border: '1px solid #ccc',
                      padding: '5px',
                      marginBottom: '5px',
                    }}
                  >
                    <p>
                      <strong>{comment.author}</strong>: {comment.content}
                    </p>
                    <div>
                      <button onClick={() => handleCommentReaction(post.id, comment.id, 'likes')}>
                        👍 {comment.likes}
                      </button>
                      <button onClick={() => handleCommentReaction(post.id, comment.id, 'dislikes')}>
                        👎 {comment.dislikes}
                      </button>
                      <input
                        type="text"
                        placeholder="Reply"
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            addReply(post.id, comment.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                        style={{ marginTop: '5px', width: '100%' }}
                      />
                    </div>
                    <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                      {comment.replies.map(reply => (
                        <div
                          key={reply.id}
                          style={{
                            border: '1px solid #ddd',
                            padding: '5px',
                            marginBottom: '5px',
                          }}
                        >
                          <p>
                            <strong>{reply.author}</strong>: {reply.content}
                          </p>
                          <div>
                            <button
                              onClick={() =>
                                handleCommentReaction(post.id, reply.id, 'likes')
                              }
                            >
                              👍 {reply.likes}
                            </button>
                            <button
                              onClick={() =>
                                handleCommentReaction(post.id, reply.id, 'dislikes')
                              }
                            >
                              👎 {reply.dislikes}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add a comment"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      addComment(post.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                  style={{ marginTop: '5px', width: '100%' }}
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
