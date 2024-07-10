function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === name) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return null;
}


window.addEventListener('beforeunload', function(event) {
    // Call a PHP script via AJAX to destroy the session
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'PHP/destroy_session.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Cookies deleted successfully.');
            } else {
                console.error('Failed to delete cookies:', xhr.status);
            }
        }
    };
    xhr.send();
});

window.onload = function() {
    if (!getCookie('user_login')) {
        // Redirect to res_login.html if the cookie is not present
        window.location.href = 'res_login.html';
    } else {
        // Cookie is present, fetch department data
        fetchDepartmentData('0');
    }
};


async function fetchDepartmentData(departmentId) {
    try {
            const response = await fetch(`http://localhost:3000/${departmentId}`);
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            var data = await response.json();

            // Update department title
            const dept_retrive =Object.keys(data)[0];
            document.getElementById('deptTitle').innerText = dept_retrive;
            data=data[dept_retrive];
            console.log(data);
            // Update year 1 content
            document.getElementById('year1Content').innerHTML = '<ul>' + data.Year1.map(item => `<li>${item}</li>`).join('') + '</ul>';

            // Update year 2 content
            document.getElementById('year2Content').innerHTML = '<ul>' + data.Year2.map(item => `<li>${item}</li>`).join('') + '</ul>';

            // Update year 3 content
            document.getElementById('year3Content').innerHTML = '<ul>' + data.Year3.map(item => `<li>${item}</li>`).join('') + '</ul>';

            // Update year 4 content
            document.getElementById('year4Content').innerHTML = '<ul>' + data.Year4.map(item => `<li>${item}</li>`).join('') + '</ul>';
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


function useful_links(num)
{
    var linkk;
    switch (num){
        case 1:
            linkk = "https://www.naukri.com";
            window.open(linkk, "_blank");
            break;
        case 2:
            linkk = "https://internshala.com";
            window.open(linkk, "_blank");
            break;
        case 3:
            linkk = "https://www.scaler.com";
            window.open(linkk, "_blank");
            break;
        case 4:
            linkk = "https://www.indiabix.com";
            window.open(linkk, "_blank");
            break;
        case 5:
            linkk = "https://leetcode.com";
            window.open(linkk, "_blank");
            break;

    }
}



function showFiles(fileid) {
        // Navigate to the PHP script with the fileid as a query parameter
    window.location.href = `PHP/get_files.php?fileid=${fileid}`;
}