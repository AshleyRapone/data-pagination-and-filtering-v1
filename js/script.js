/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  let start_index = (page * 9) - 9;
  let end_index = page * 9;

  ul_student_list = document.querySelector('.student-list');
  ul_student_list.innerHTML = '';

  let html = '';
  for (let i = 0; i < list.length; i++) {
    if (i >= start_index && i < end_index) {
      let student_html = `
         <li class="student-item cf">
           <div class="student-details">
             <img class="avatar" src=${ data[i]['picture']['thumbnail'] } alt="Profile Picture">
             <h3>${ data[i]['name']['first'] } ${ data[i]['name']['last'] }</h3>
             <span class="email"> ${ data[i]['email'] } </span>
           </div>
           <div class="joined-details">
             <span class="date">Joined ${ data[i]['registered']['date'] }</span>
           </div>
         </li>
      `
      html += student_html
    }
  }
  ul_student_list.innerHTML = html; 
}

showPage(data, 1);


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
