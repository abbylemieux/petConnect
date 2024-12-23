function Blog() {
  return (
    <div className="blog">
      <h2 className="blog-title">Blog Posts</h2>
      <div className="blog-posts">
        <article className="blog-post">
          <h3 className="post-title">First Blog Post</h3>
          <p className="post-content">This is the content of the first blog post.</p>
        </article>
        <article className="blog-post">
          <h3 className="post-title">Second Blog Post</h3>
          <p className="post-content">This is the content of the second blog post.</p>
        </article>
      </div>
    </div>
  );
}

export default Blog;