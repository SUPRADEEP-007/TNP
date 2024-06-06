async function fetchAnnouncements() {
    try {
        const response = await fetch(`http://localhost:3000/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Update announcements content
        const announcementsContainer = document.querySelector('.latest-posts');
        announcementsContainer.style.overflowY="scroll";
        announcementsContainer.style.height="96%";

        data.forEach(announcement => {
            const article = document.createElement('article');
            article.classList.add('post', 'card');

            const h4 = document.createElement('h4');
            h4.textContent = announcement.title;

            const pContent = document.createElement('p');
            pContent.textContent = announcement.content;

            const link = document.createElement('a');
            link.href = announcement.link;
            link.textContent = 'Schedule and link';

            article.appendChild(h4);
            article.appendChild(pContent);
            article.appendChild(link);

            announcementsContainer.appendChild(article);
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Call fetchAnnouncements to fetch announcements data
fetchAnnouncements();

window.addEventListener('load', () => {
    const contentMain = document.querySelector('.content-main');
    const contentAside = document.querySelector('.content-aside');
  
    // Set the height of .content-aside to match .content-main
    contentAside.style.height = `${contentMain.clientHeight}px`;
});
  
//for admin page
document.addEventListener('keydown', function(event) {
    const desiredKeys = ['Control', 'Shift', 'Z'];
    // Track pressed keys
    const pressedKeys = new Set();

    document.addEventListener('keydown', (event) => {
        pressedKeys.add(event.key);
        if (desiredKeys.every(key => pressedKeys.has(key))) {
            document.getElementById('myButton').style.display = 'block';
        }
    });

    document.addEventListener('keyup', (event) => {
        pressedKeys.delete(event.key);
    });
});