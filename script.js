async function getProfile() {
    const username = document.getElementById('usernameInput').value.trim();
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = ''; // Clear previous data

    if (username === '') {
        profileDiv.innerHTML = '<p>Please enter a GitHub username.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error('User not found');
        }

        const data = await response.json();
        profileDiv.innerHTML = `
            <div class="profile-card">
                <img src="${data.avatar_url}" alt="${data.login}'s avatar" width="150">
                <h2>${data.name || data.login}</h2>
                <p><strong>Username:</strong> ${data.login}</p>
                <p><strong>Bio:</strong> ${data.bio || 'No bio available'}</p>
                <p><strong>Location:</strong> ${data.location || 'Not specified'}</p>
                <p><strong>Public Repos:</strong> ${data.public_repos}</p>
                <p><strong>Followers:</strong> ${data.followers}</p>
                <p><strong>Following:</strong> ${data.following}</p>
                <a href="${data.html_url}" target="_blank">View Profile on GitHub</a>
            </div>
        `;
    } catch (error) {
        profileDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
