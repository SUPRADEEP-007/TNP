

const year_filter = document.getElementById("yearFilter");
const departmentFilter=document.getElementById("departmentFilter");
const selections=["placement-records","major-recruit"];
var option =-1;
const placement_records = document.getElementById("placement-records");
const major_recruit = document.getElementById("major-recruit");

placement_records.addEventListener('click',function(){
    option=0;
    placement_records.style.transform = 'scale(0.9)';
    placement_records.style.boxShadow = '5px 5px 5px 5px black';
    major_recruit.style.transform = 'scale(1)';
    major_recruit.style.boxShadow = 'none';
    // Get the filter values
    const element = document.getElementById('departmentFilter');
    if (element.style.visibility === 'hidden') {
    element.style.visibility = 'visible';
    }
    //clear filter
    year_filter.selectedIndex=0;
    departmentFilter.selectedIndex=0;
});

major_recruit.addEventListener('click',function(){
    option=1;
    major_recruit.style.transform = 'scale(0.9)';
    major_recruit.style.boxShadow = '10px 10px 5px black';
    placement_records.style.transform = 'scale(1)';
    placement_records.style.boxShadow = 'none';
    // Get the filter values
    const element = document.getElementById('departmentFilter');
    if (element.style.visibility === 'visible') {
    element.style.visibility = 'hidden';
    }
    //clear filter
    year_filter.selectedIndex=0;
    departmentFilter.selectedIndex=0;
});


document.getElementById('viewoption').addEventListener('click', function() {
    if(option== 0)
    {
    viewPlacementRecords();
    }
    else if(option==1)
    {
    viewMajorRecruiters();
    }
    else{
    alert('Please select Placement Records (or) Major Recruiters')
    }
});


function viewPlacementRecords() {
    const year = document.getElementById('yearFilter').value;
    const department = document.getElementById('departmentFilter').value;
    // Create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'PHP/fetch_placement_records.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
    if (this.status === 200) {
        const records = JSON.parse(this.responseText);
        let output = '';

        if(records.length==0){
        output = `<tr><td colspan="5" style="border-collapse: collapse">No record found with given filters</td></tr>`;
        }
        else{
        records.forEach(function(record) {
        output += `
            <tr>
            <td>${record.student_name}</td>
            <td>${record.pass_out_year}</td>
            <td>${record.department_name}</td>
            <td>${record.company_name}</td>
            <td>${record.package}</td>
            </tr>
        `;
        });
        }
        
        const placement_record_table_format = `<table>
                                <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Pass out</th>
                                    <th>Branch</th>
                                    <th>Company Name</th>
                                    <th>Package(LPA)</th>
                                </tr>
                                </thead>
                                <tbody id="placementTableBody">
                                <!-- Data will be inserted here dynamically -->
                                </tbody>
                            </table>
                            `;

        document.getElementById('placement_data').innerHTML = placement_record_table_format;
        document.getElementById('placementTableBody').innerHTML = output;
    } else {
        console.error('Error:', this.statusText);
    }
    };

    xhr.onerror = function() {
    console.error('Request failed');
    };

    // Send the request with the filter parameters
    xhr.send('year=' + year + '&department=' + department);
}



function viewMajorRecruiters() {
    

    const year = document.getElementById('yearFilter').value;

    // Create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'PHP/fetch_major_recruiters.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
    if (this.status === 200) {
        const records = JSON.parse(this.responseText);
        let output = '';

        if(records.length==0){
        output = `<tr><td colspan="2" style="border-collapse: collapse">No record found for given year</td></tr>`;
        }
        else{
        records.forEach(function(record) {
        output += `
            <tr>
            <td>${record.Company}</td>
            <td>${record.Placed}</td>
            </tr>
        `;
        });
        }
        
        const major_recruiters_table_format = `<table>
                                <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Placed</th>
                                </tr>
                                </thead>
                                <tbody id="recruitersTableBody">
                                <!-- Data will be inserted here dynamically -->
                                </tbody>
                            </table>
                            `;

        document.getElementById('placement_data').innerHTML = major_recruiters_table_format;
        document.getElementById('recruitersTableBody').innerHTML = output;
    } else {
        console.error('Error:', this.statusText);
    }
    };

    xhr.onerror = function() {
    console.error('Request failed');
    };

    // Send the request with the filter parameters
    xhr.send('year=' + year);
}



//delete data
function Delete_data() {
    const year = document.getElementById('yearFilter').value;
    const department = document.getElementById('departmentFilter').value;
    
    // Create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'PHP/delete_records.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        if (this.status === 200) {
        console.log(this.responseText);
        // Clear the visible records
        document.getElementById('placement_data').innerHTML = '';

        var yearSelect = document.getElementById("yearFilter");
        removeOptionsFromThird(yearSelect);
        orderFilter();
        alert('Records deleted successfully');
        } else {
        console.error('Error:', this.statusText);
        alert('Error deleting records');
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
        alert('Request failed');
    };

    // Send the request with the filter parameters
    xhr.send('year=' + year + '&department=' + department);

}

window.onload = function() {

    let adminUsername = sessionStorage.getItem('admin_username');
    let adminPassword = sessionStorage.getItem('admin_password');

    if (!adminUsername || !adminPassword) {
        // Redirect to login page if session storage is not set
        window.location.href = 'login.html';
    }
    
    var yearSelect = document.getElementById("yearFilter");
    // Function to remove all options from the third onward
    removeOptionsFromThird(yearSelect);
    orderFilter();
}

function removeOptionsFromThird(selectElement) {
    var optionsLength = selectElement.options.length;
    for (var i = optionsLength - 1; i >= 2; i--) {
        selectElement.remove(i);
    }
}

function orderFilter()
{
    var yearSelect = document.getElementById("yearFilter");
    // Fetch distinct years from the server
    fetch('./PHP/fetch_years.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            var year = item.year;  // Adjust this line based on the actual structure
            var option = document.createElement("option");
            option.text = year;
            option.value = year;
            yearSelect.add(option);
        });
    })
    .catch(error => console.error('Error fetching years:', error));
}

function createFileInput() {
    // Create file input field dynamically
    const fileInputDiv = document.createElement('div');
    fileInputDiv.id = 'fileInputDiv';

    const display_layout= document.getElementById("placement_data");
    display_layout.innerHTML="";

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'fileInput';
    fileInput.accept = '.csv';

    const uploadButton = document.createElement('button');
    uploadButton.textContent = 'Upload and Insert Data';
    uploadButton.onclick = function() { Insert_data(); };

    display_layout.appendChild(fileInput);
    display_layout.appendChild(uploadButton);

    
}

function logoutadmin(){
    fetch('PHP/logout.php')
    .then(response => {
        if (response.ok) {
            let adminUsername = sessionStorage.getItem('admin_username');
            let adminPassword = sessionStorage.getItem('admin_password');
            console.log(adminPassword,adminUsername);
            // Remove specific items from session storage
            sessionStorage.removeItem('admin_username');
            sessionStorage.removeItem('admin_password');
             adminUsername = sessionStorage.getItem('admin_username');
             adminPassword = sessionStorage.getItem('admin_password');
            console.log(adminPassword,adminUsername);
            window.location.href = 'home.html';
        } else {
            alert('Logout failed.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

async function Insert_data() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('PHP/insert_records.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        alert(result.message);

        // Create a div dynamically to display the inserted data
        if (result.data && result.data.length > 0) {
            const insertSpace = document.getElementById('placement_data');
            const dataDiv = document.createElement('div');
            dataDiv.className = 'data-div';

            const table = document.createElement('table');
            table.border = 1;

            // Create table headers
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const headers = ['Student ID', 'Student Name', 'Department ID', 'Pass Out Year', 'Company ID', 'Package'];
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create table body
            const tbody = document.createElement('tbody');
            result.data.forEach(row => {
                const tr = document.createElement('tr');
                Object.values(row).forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);

            dataDiv.appendChild(table);
            insertSpace.appendChild(dataDiv);
        }
    } catch (error) {
        console.error('There was an error!', error);
    }
}



