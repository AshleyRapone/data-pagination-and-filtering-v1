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
             <img class="avatar" src=${ list[i]['picture']['thumbnail'] } alt="Profile Picture">
             <h3>${ list[i]['name']['first'] } ${ list[i]['name']['last'] }</h3>
             <span class="email"> ${ list[i]['email'] } </span>
           </div>
           <div class="joined-details">
             <span class="date">Joined ${ list[i]['registered']['date'] }</span>
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
  ul_link_list.innerHTML = '';
  for ( let i = 1; i <= pagination_buttons_needed; i++ ) {
    let button_html =  `<li>
                      <button type="button"> ${i} </button>
                    </li>`
    ul_link_list.insertAdjacentHTML('beforeend', button_html);
    
  }
  // If there are no student list items, display 'No Results Found' and exit function
  let first_pagination_button = ul_link_list.querySelector('li:first-child');
  if (!first_pagination_button) {
    ul_link_list.innerHTML = '<p>No Results Found</p>';
    return
  }
  // Mark the first pagination button as active and when a user clicks another pagination button mark that as active
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



/*
Create the `showSearchBar` function
This function will create and insert/append the elements needed to display a search bar
*/
function showSearchBar() {
    let search_bar_html = `
      <label for="search" class="student-search">
        <span>Search by name</span>
        <input id="search" placeholder="Search by name...">
        <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
    `
    let header = document.querySelector('.header');
    header.insertAdjacentHTML('beforeend', search_bar_html);
  }



/*
Create the `addSearchFunctionality` function
This function will create and insert/append the elements needed to display results based off of the search bar input
*/
function addSearchFunctionality(list) {
  let search_bar_input = document.getElementById('search');
  search_bar_input.addEventListener('keyup', (event) => {
    let substring = event.target.value
    let search_results_list = [];
 
    for (let i = 0; i < list.length; i++) {
      substring = event.target.value.toLowerCase()
      let first_name = list[i]['name']['first'].toLowerCase();
      let last_name = list[i]['name']['last'].toLowerCase();
      if ( (first_name.includes(substring) || last_name.includes(substring)) ) {
        search_results_list.push(list[i]);
      }
    }
   
    showPage(search_results_list, 1);
    addPagination(search_results_list);
  })
}




// Call functions 
showPage(data, 1);
showSearchBar();
addPagination(data);
addSearchFunctionality(data);

