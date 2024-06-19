document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const postForm = document.getElementById('post-form');
    const postsDiv = document.getElementById('posts');
    const profileUsername = document.getElementById('profile-username');

    // Placeholder for users and posts
    const users = [];
    const posts = [];

    // Handle user registration
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        users.push({ username, password });
        alert('User registered successfully!');
        registerForm.reset();
    });

    // Handle user login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            alert('Login successful!');
            profileUsername.textContent = username;
            loginForm.reset();
        } else {
            alert('Invalid username or password!');
        }
    });

    // Handle new post
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const media = document.getElementById('post-media').files[0];
        const content = document.getElementById('post-content').value;
        const post = { media, content, likes: 0, comments: [] };
        posts.push(post);
        displayPosts();
        postForm.reset();
    });

    // Display posts
    function displayPosts() {
        postsDiv.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            if (post.media) {
                const mediaElement = post.media.type.startsWith('image/') ? document.createElement('img') : document.createElement('video');
                mediaElement.src = URL.createObjectURL(post.media);
                mediaElement.controls = true;
                postElement.appendChild(mediaElement);
            }

            const contentElement = document.createElement('p');
            contentElement.textContent = post.content;
            postElement.appendChild(contentElement);

            const postButtons = document.createElement('div');
            postButtons.classList.add('post-buttons');

            const likeButton = document.createElement('button');
            likeButton.textContent = `Like (${post.likes})`;
            likeButton.addEventListener('click', () => {
                post.likes++;
                displayPosts();
            });
            postButtons.appendChild(likeButton);

            const commentButton = document.createElement('button');
            commentButton.textContent = 'Comment';
            commentButton.addEventListener('click', () => {
                const comment = prompt('Enter your comment:');
                if (comment) {
                    post.comments.push(comment);
                    displayPosts();
                }
            });
            postButtons.appendChild(commentButton);

            const shareButton = document.createElement('button');
            shareButton.textContent = 'Share';
            shareButton.addEventListener('click', () => {
                alert('Post shared!');
            });
            postButtons.appendChild(shareButton);

            postElement.appendChild(postButtons);

            if (post.comments.length > 0) {
                const commentsSection = document.createElement('div');
                post.comments.forEach(comment => {
                    const commentElement = document.createElement('p');
                    commentElement.textContent = comment;
                    commentsSection.appendChild(commentElement);
                });
                postElement.appendChild(commentsSection);
            }

            postsDiv.appendChild(postElement);
        });
    }
});
