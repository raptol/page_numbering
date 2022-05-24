/******************************************
 * CSIS3380:Project2: Adding Page Number Links
 * This script file displays student list with pagination.
 * Sung-won Kim, 300320693
*****************************************/

//Change title from Contact to STUDENT
document.getElementsByClassName("page-header cf").item(0).innerHTML = "<h2>STUDENTS</h2>";

//Get ul root node from DOM
let contactListRootNode = document.getElementsByClassName("contact-list").item(0); //<ul>
const contactItems = contactListRootNode.getElementsByTagName('li');

//Fetch student list from li tags
let studentArray = getStudentList(contactItems);
console.log(studentArray);

//Initialize student list from current DOM
contactListRootNode.innerHTML = "";

//display student list with pagenation, default page is first page
displayStudentList(1);

/**
 * getStudentList function
 * Get strundt list from HTML DOM
 */
function getStudentList(items) {
    let list = [];
    for(let i = 0; i < items.length; i++) {
        // console.log(contactItem.item(i).getElementsByTagName('img')[0].src);
        // console.log(contactItem.item(i).getElementsByTagName('h3')[0].innerText);
        // console.log(contactItem.item(i).getElementsByTagName('span')[0].innerText);
        // console.log(contactItem.item(i).getElementsByTagName('span')[1].innerText);

        //Store html data into student array
        list.push({
            image: items.item(i).getElementsByTagName('img')[0].src,
            name: items.item(i).getElementsByTagName('h3')[0].innerText,
            email: items.item(i).getElementsByTagName('span')[0].innerText,
            date: items.item(i).getElementsByTagName('span')[1].innerText
        });
    }

    return list;
}

/**
 * displayStudentList function
 * Display student list for selected page 
 */
//Display student list
function displayStudentList(pageIndex) {

    const itemCountPerPage = 10; // Number of items per a page

    //Calculate total page count
    let pageCount; // Total page count
    if( (studentArray.length / itemCountPerPage > 0) && // last page has some items, so add one page
        (studentArray.length % itemCountPerPage > 0)) {
        pageCount = parseInt(studentArray.length / itemCountPerPage) + 1;
    } else if(studentArray.length / itemCountPerPage == 0){ // only one page
        pageCount = 1;
    } else { // exactly divided pages without the rest
        pageCount = parseInt(studentArray.length / itemCountPerPage);
    }
    console.log("page count:" + pageCount);
    console.log("page index:" + pageIndex);

    //Calculate item count for each page
    let loopCount = 0;
    if(pageIndex == pageCount) { // if selected page is last page, calculate the rest items count
        if(studentArray.length % itemCountPerPage > 0)
            loopCount = studentArray.length % itemCountPerPage;
        else 
            loopCount = itemCountPerPage;
    } else {
        loopCount = itemCountPerPage;
    }
    console.log("loop count: " + loopCount);


    //Calculate start index
    let startIndex;
    if(pageIndex == 1) { //if page index is first page, start index is zero
        startIndex = 0;
    }else { //otherwise, calculate start index with page index and page count
        startIndex = (pageIndex - 1) * itemCountPerPage;
    }
    console.log("start index: " + startIndex);

    //Format HTML for student list
    let ulHtml = "";
    let liHtml = "";
    for(let i = startIndex; i < (startIndex + loopCount); i++) {
        // console.log(studentArray[i]);
        liHtml += "<li class='contact-item cf'>";
        liHtml += "  <div class='contact-details'>";
        liHtml += "    <img class='avatar' src='" + studentArray[i].image + "'>"; // image url
        liHtml += "    <h3>" + studentArray[i].name + "</h3>";                    // name
        liHtml += "    <span class='email'>" + studentArray[i].email + "</span>"; // email
        liHtml += "  </div>";
        liHtml += "  <div class='joined-details'>";
        liHtml += "       <span class='date'>" + studentArray[i].date + "</span>"; //join date
        liHtml += "  </div>";
        liHtml += "</li>";

        ulHtml += liHtml; //add li tag into ul tag
        liHtml = ""; //initial li tag for next item
    }

    //add page button list
    let pageHtml = "<div class='pagination'><ol>";
    for(let i = 1; i <= pageCount; i++) {
        pageHtml += "<li><a onclick='displayStudentList(" + i + ")'>" + i + "</a></li>";
    }
    pageHtml += "</ol></div>";

    //console.log(ulHtml);
    //console.log(pgateHtml);

    //Display student list and pagination
    contactListRootNode.innerHTML = ulHtml + pageHtml;

    //change the button color of selected page to grey
    let paginationNode = document.getElementsByClassName("pagination").item(0);
    if(paginationNode != null) {
        let pageNumbers = paginationNode.getElementsByTagName('li');
        if(pageNumbers != null) {
            let anchorTag = pageNumbers.item(pageIndex-1).getElementsByTagName('a')[0];
            if(anchorTag != null)
                anchorTag.style.color = 'gray';
        }
    }
}
