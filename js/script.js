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

  let ul_student_list = document.querySelector('.student-list');
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




/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  let pagination_buttons_needed = Math.ceil(list.length / 9);
  let ul_link_list = document.querySelector('.link-list');
  let html = '';
  for ( let i = 1; i <= pagination_buttons_needed; i++ ) {
    let button_html =  `<li>
                      <button type="button"> ${i} </button>
                    </li>`
    ul_link_list.insertAdjacentHTML('beforeend', button_html);
    
  }
  let first_pagination_button = ul_link_list.querySelector('li:first-child');
  first_pagination_button.className = 'active';
  ul_link_list.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      let current_link = event.target.parentNode;
      let page_number = event.target.textContent;
      if (current_link.className === 'active') {
        showPage(list, page_number);
      } else if (current_link.className != 'active') {
          let active_link = ul_link_list.querySelector('.active');
          active_link.className = '';
          current_link.className = 'active';
          showPage(list, page_number);
      }
      } 
  })  
  }





// Call functions
showPage(data, 1);
addPagination(data);