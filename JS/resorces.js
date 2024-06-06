
window.onload = function() {
fetchDepartmentData('0');
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
