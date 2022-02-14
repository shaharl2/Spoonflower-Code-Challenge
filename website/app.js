const baseURL = "https://pythias.spoonflower.com/search/v1/designs?terms=";
const APIsort = "&sort=";
const APIproduct = "&product=";
const APIcolor = "&color=";
const APIstyle = "&style=";

// the designs will be dynamically appended to the container
const designsContainer = document.querySelector(".container");

// Event listeners to add function to existing HTML DOM element

document.getElementById("search").addEventListener("click", performAction);
document
  .getElementById("sort-select")
  .addEventListener("change", performAction);
document
  .getElementById("product-select")
  .addEventListener("change", performAction);
document
  .getElementById("color-select")
  .addEventListener("change", performAction);
document
  .getElementById("style-select")
  .addEventListener("change", performAction);

// array to hold the design cards
const designsArray = [];

//array to store the design images src
let designPics = [];
//array to store the designers names
let designers = [];
//array to store the design name
let designName = [];
//array to store the design ID
let designID = [];
//array to store the product category
let category = [];

// Function called by event listeners

function performAction(event) {
  const newTerm = document.getElementById("term").value;
  const newSort = document.getElementById("sort-select").value;
  const newProduct = document.getElementById("product-select").value;
  const newColor = document.getElementById("color-select").value;
  const newStyle = document.getElementById("style-select").value;
  // Function to GET Web API Data

  getData(
    baseURL,
    newTerm,
    APIsort,
    newSort,
    APIproduct,
    newProduct,
    APIcolor,
    newColor,
    APIstyle,
    newStyle
  ).then(function (data) {
    for (let step = 0; step < data.total_page_results; step++) {
      // Add data
      postData("/addData", {
        image: data.page_results[step].thumbnail,
        id: data.page_results[step].designId,
        name: data.page_results[step].name,
        designer: data.page_results[step].user.screenName,
        category: data.page_results[step].productListing.name,
        term: newTerm,
        sort: newSort,
        product: newProduct,
        color: newColor,
        style: newStyle,
      });
    }
  });
  //store the designs images, the designer names, design names, productIDs, and product category in arrays
  designPics = Array.from(document.getElementsByClassName("design-pic"));
  designers = Array.from(document.getElementsByClassName("designer-name"));
  designName = Array.from(document.getElementsByClassName("design-name"));
  designID = Array.from(document.getElementsByClassName("productID"));
  category = Array.from(document.getElementsByClassName("product-category"));
}

/* Function to GET Web API Data*/

const getData = async (
  baseURL,
  term,
  sort,
  newSort,
  product,
  newProduct,
  color,
  newColor,
  style,
  newStyle
) => {
  //set a string with arguments to easily edit the URL query
  let queryURL =
    baseURL +
    term +
    sort +
    newSort +
    product +
    newProduct +
    color +
    newColor +
    style +
    newStyle;
  //with the searchParams property I can access the arguments and remove, add or change them
  let url = new URL(queryURL);
  console.log(url.search);
  let search_params = url.searchParams;

  if (newColor === "all colors") {
    search_params.delete("color");
  }
  if (newStyle === "all styles") {
    search_params.delete("style");
  }

  search_params = search_params.toString().slice(6);
  // a string to store the edited URL query
  let queryEdited = baseURL + search_params.toString();
  console.log(queryEdited);

  let res = await fetch(queryEdited);

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// ************************************************************************************
// declaring a function to set the page the user sees first, before generating a search
// ************************************************************************************

const getDefault = async (baseURL) => {
  const res = await fetch(baseURL);
  try {
    const data = await res.json();
    //calling the function to dynamically built the HTML elements to store the designs
    designElements(data.page_results.length);
    //after we built the elements, we can store the designs images, the designer names and design names in arrays
    designPics = Array.from(document.getElementsByClassName("design-pic"));
    designers = Array.from(document.getElementsByClassName("designer-name"));
    designName = Array.from(document.getElementsByClassName("design-name"));
    designID = Array.from(document.getElementsByClassName("productID"));
    category = Array.from(document.getElementsByClassName("product-category"));

    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

getDefault(baseURL).then(function (data) {
  console.log(data.total_page_results);
  console.log(data.query_hit_count.total_listings);
  //add data to the object from the API or each result
  for (let step = 0; step < data.total_page_results; step++) {
    postData("/addData", {
      image: data.page_results[step].thumbnail,
      id: data.page_results[step].designId,
      name: data.page_results[step].name,
      designer: data.page_results[step].user.screenName,
      category: data.page_results[step].productListing.name,
      product: data.page_results[step].productListing.name,
    });
  }
});

/* Function to POST data */

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    //capitilizing the product string
    let productString =
      newData.product[0] + newData.product.substring(1).toLowerCase();
    //handling different image src for different product categories
    designPics.shift().src =
      productString === "Fabric"
        ? `https://garden.spoonflower.com/c/${newData.id}/p/f/m/${newData.image}`
        : `https://garden.spoonflower.com/c/${newData.id}/i/m/${newData.image}`;
    designers.shift().innerHTML = newData.designer;
    designName.shift().innerHTML = newData.name;
    designID.shift().innerHTML = newData.id;
    //removing the "HOME GOOD" substring from the category name string. removing the "_" chars
    category.shift().innerHTML = newData.category.includes("HOME")
      ? newData.category.slice(10).replaceAll("_", " ")
      : newData.category.replaceAll("_", " ");

    return newData;
  } catch (error) {
    console.log("error", error);
  }
  console.log(data);
};

// *********************************
//a function to be called by an input
// event. this function checks the
// re-entered password is similar to
//the original password. red shadow if
//not, green shadow if yes.
// *********************************
const checkpass = () => {
  document.getElementById("password").value ===
  document.getElementById("confirm-password").value
    ? document
        .getElementById("confirm-password")
        .style.setProperty(
          "--box-shadow",
          "0 0 0 0.8rem rgba(18, 241, 10, 0.63)"
        )
    : document
        .getElementById("confirm-password")
        .style.setProperty(
          "--box-shadow",
          "0 0 0 0.8rem rgba(218, 19, 19, 0.877)"
        );
};

// *******************************************************************
// a function to dynamically build HTML elements to hold
// the desings cards and append these elements to the container
// *******************************************************************

const designElements = (pageSize) => {
  for (let i = 0; i < pageSize; i++) {
    // *************************************
    // storing the diffrent HTML elements
    // *************************************

    const newDiv = document.createElement("div");
    const newDiv2 = document.createElement("div");
    const newImg = document.createElement("img");
    const newDiv3 = document.createElement("div");
    const newSpan = document.createElement("span");
    const newSpan2 = document.createElement("span");
    const newAnch = document.createElement("a");
    const newPar = document.createElement("p");
    const newAnch2 = document.createElement("a");
    const newDiv4 = document.createElement("div");

    // *************************************
    // creating attributes
    // *************************************

    newDiv.className = "design-box";
    newDiv2.className = "design-image";
    newImg.className = "design-pic";
    newImg.setAttribute("height", "294");
    newImg.setAttribute("width", "294");
    newImg.setAttribute("src", "");
    newImg.setAttribute("alt", "");
    newDiv3.className = "design-text";
    newSpan.setAttribute("itemprop", "name");
    newSpan2.className = "productID";
    newAnch.setAttribute("href", "");
    newAnch.className = "design-name";
    newPar.className = "designer-box";
    newPar.textContent = "Designer: ";
    newAnch2.setAttribute("href", "");
    newAnch2.className = "designer-name";
    newDiv4.className = "product-category";

    // *****************************************
    // appending the elements in the design card
    // *****************************************

    newDiv.appendChild(newDiv2);
    newDiv2.appendChild(newImg);
    newDiv.appendChild(newDiv3);
    newDiv3.appendChild(newSpan);
    newDiv3.appendChild(newSpan2);
    newDiv3.appendChild(newAnch);
    newDiv3.appendChild(newPar);
    newPar.appendChild(newAnch2);
    newDiv.appendChild(newDiv4);

    // ***********************************************
    // adding the new design card to the designs array
    // ***********************************************

    designsArray.push(newDiv);
  }

  // ******************************************
  // appending the new designs to the container
  // ******************************************

  for (design of designsArray) {
    designsContainer.appendChild(design);
  }
};

// ***************************************************************************
//sticky navigation bar. setting IntersectionObserver to observe when
//the user input section is out of the viewport and then adding a sticky class
// ***************************************************************************
const sectionUser = document.querySelector(".user-box");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    //adding and removing an active class
    ent.isIntersecting
      ? document.body.classList.remove("sticky")
      : document.body.classList.add("sticky");
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    // rootMargin: "-80px",
  }
);
obs.observe(sectionUser);
