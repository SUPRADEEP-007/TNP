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

        while (announcementsContainer.firstChild) {
            announcementsContainer.removeChild(announcementsContainer.firstChild);
        }
        

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

            const check_box = document.createElement('input');
            check_box.type = "checkbox";
            check_box.id = announcement.title;

            article.appendChild(check_box);
            article.appendChild(h4);
            article.appendChild(pContent);
            article.appendChild(link);
            

            announcementsContainer.appendChild(article);
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
fetchAnnouncements();

document.getElementById("delete").addEventListener('click', async function(){
    const articles = document.getElementsByClassName('post card');
    const checkedIds = [];

    Array.from(articles).forEach(article => {
        const checkbox = article.querySelector('input[type="checkbox"]');
        
        if (checkbox.checked) {
            checkedIds.push({"title": checkbox.id});
        }
    });
    console.log(checkedIds);
    const data_to_be_sent = JSON.stringify(checkedIds);
    console.log(data_to_be_sent);
    try {
        const response = await fetch('http://localhost:3000/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data_to_be_sent,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result);
        fetchAnnouncements();
    } catch (error) {
        console.error('There was a problem with the delete operation:', error);
    }
});




document.getElementById("insert").addEventListener('click', async function() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const link = document.getElementById('link').value;

    const postData = {
        title: title,
        content: content,
        link: link
    };
    const insert_data = JSON.stringify(postData);
    try {
        const response = await fetch('http://localhost:3000/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: insert_data
        });

        if (response.ok) {
            alert('Post added successfully!');
            fetchAnnouncements();
        } else {
            console.error('Failed to add post');
        }
    } catch (error) {
        console.error('Error adding post:', error);
    }
});
