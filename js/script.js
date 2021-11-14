/*
Exam One - Batch 364
Total 60 (40 + 20) Marks
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/



//capturing main Ul to DOM




/*--function for shoPage start--*/
let current_page = 1;
let itemPerPage = 9;

function showPage(list=data,  page=1) {
  
  let start = (itemPerPage * page) - itemPerPage
  let end = page * itemPerPage;

  const mainUl = document.querySelector('.student-list')
  mainUl.innerHTML = ""
  
    
      for(let i = 0;i < list.length ; i++){
        if(i >= start && i < end){
      const stdntLi = document.createElement('li');
    stdntLi.className = 'student-item'
    const stdntDiv = document.createElement('div');
    stdntDiv.className = 'student-details cf'
    stdntLi.appendChild(stdntDiv);
    const img = document.createElement('img');
    img.className = 'avatar'
    img.setAttribute('src', " ")
    img.src = list[i].picture.large;
    stdntDiv.appendChild(img);
    const h3 = document.createElement('h3');
    h3.innerHTML = list[i].name.title + ' ' + list[i].name.first + ' ' + list[i].name.last
    stdntDiv.appendChild(h3);
    const email = document.createElement('span');
    email.textContent = list[i].email;
    email.className = 'email'
    stdntDiv.appendChild(email);
    //creating joinDiv element 
    const joinDiv = document.createElement('div')
    joinDiv.className = 'joind-details'
    const date = document.createElement('span')
    date.textContent = list[i].registered.date + ' Age: ' + list[i].registered.age;
    date.className = 'date'
    joinDiv.appendChild(date)

    stdntLi.appendChild(joinDiv);
    mainUl.appendChild(stdntLi);

    }
  }}
  showPage()
 


/*--function for shoPage end--*/



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/


// pagination function : for creating, showing, adding eventListener to buttons
function pagination(list, page) {

  let button = document.createElement('button')
  button.innerText = page;

  if (current_page == page) 
    button.classList.add('active');

  button.addEventListener('click', function () {
    current_page = page;
    showPage(list, page);

    let current_btn = document.querySelector('.pagination button.active');
    current_btn.classList.remove('active');

    button.classList.add('active')
  })

  return button
}

/*--Creating paginationBtn function start--*/

// PaginationBtn functoin : for deciding number of pages to render all 42 items
function paginationBtn(list) {

  // total 42 items, 9 items in 1 page, totalPages = 42/9 = 4.6(42-36=6)
  
  let totalPages = Math.ceil(list.length / itemPerPage)
  const paginationUl = document.querySelector('.link-list')
  paginationUl.innerHTML = '';
        for(let j = 1; j <= totalPages; j++){

           pageBtn = pagination(list, j)
           paginationUl.appendChild(pageBtn)
        }
      }
      paginationBtn(data)
      showPage()
     
  

/*--Creating pagination function end--*/

// (Bonus Task)
// Create the `searchPage` function

//creatting dom element for search bar 

const header = document.querySelector('header');
const srchLabel = document.createElement('label');
srchLabel.className = 'student-search cf';
header.appendChild(srchLabel);
const srchBy = document.createElement('span');
srchBy.textContent = 'Search by name';
srchLabel.appendChild(srchBy);

const srchInput = document.createElement('input');
srchInput.type = 'text';
srchInput.id = 'search'
srchInput.setAttribute("placeholder", "Search by name");
const srchBtn = document.createElement('button');
srchBtn.type = 'button';
srchBtn.innerHTML = '<img src="img/icn-search.svg" alt="Search icon"></img>'

srchLabel.appendChild(srchInput);
srchLabel.appendChild(srchBtn);
const inputSearch = document.querySelector('#search')


inputSearch.addEventListener('keyup', function () {
  
  // Array of filtered items that included value of input(search) from the Data array
  const searchValue = inputSearch.value;
  const filteredItems = data.filter(function (d) {
    let fullName = d.name.title.toLowerCase() + ' ' + d.name.first.toLowerCase() + ' ' + d.name.last.toLowerCase();
    // Sending the items that startswith the value of the input only
    const result = fullName.includes(searchValue.toLowerCase());
    console.log(result);
    return result;
  })
  paginationBtn(filteredItems)
  //Showing Error Message if search doesn't match
  const p = document.querySelector('.srch-msg');

  if (filteredItems.length === 0) {
    p.style.display = "block";
  }
  else {
    p.style.display = "none";
  }

  if (searchValue != "") {
    showPage(filteredItems);
    
  } else {
    showPage(data);
  }
})




// This function will search and display results from all students
// Only the filtered result will be displayed in the view
// */


// Call function
