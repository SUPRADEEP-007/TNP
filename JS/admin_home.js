

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
        console.log(this.responseText);
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
        console.log(this.responseText);
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
