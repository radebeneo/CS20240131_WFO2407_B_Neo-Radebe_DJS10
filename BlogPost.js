import React, { useState, useEffect } from 'react';

const BlogPosts = () => {
  // State to store fetched posts and potential errors
  const [posts, setPosts] = useState([]); // Holds the list of blog posts fetched from the API
  const [error, setError] = useState(null); // Holds the error message if the API call fails

  // useEffect to handle side effects like API calls
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch data from the API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        // Check if the response status is not ok (e.g., 404, 500)
        if (!response.ok) {
          // Throw an error with a detailed message
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Parse the response JSON and update state with posts
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        // Update state with the error message if fetching fails
        setError(err.message);
      }
    };

    // Call the async function to fetch posts
    fetchPosts();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <h1>Blog Posts</h1>

      {/* If there is an error, display an error message */}
      {error && <p style={{ color: 'red' }}>Failed to fetch posts: {error}</p>}

      {/* If there are posts and no error, render the list of posts */}
      {!error && posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {/* Display the title of each post */}
              <h2>{post.title}</h2>
              {/* Display the body content of each post */}
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}

      {/* If there are no posts yet and no error, show a loading message */}
      {!error && posts.length === 0 && <p>Loading posts...</p>}
    </div>
  );
};

export default BlogPosts;
