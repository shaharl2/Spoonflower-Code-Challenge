// const baseURL =
//   "https://pythias.spoonflower.com/search/v1/designs?page_size=12&terms=";
const baseURL = "https://pythias.spoonflower.com/search/v1/designs?terms=";
const APIsort = "&sort=";
const APIproduct = "&product=";
const APIcolor = "&color=";
const APIstyle = "&style=";

const designs = document.querySelectorAll("article");
// ******************************************
// converting the NodeList to an array
// ******************************************
const designsArray = Array.from(designs);
const designsContainer = document.querySelector("section.container");

//sticky navigation

const sectionUser = document.querySelector(".user-box");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    // rootMargin: "-80px",
  }
);
obs.observe(sectionUser);

// Event listener to add function to existing HTML DOM element

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

document
  .getElementById("style-select")
  .addEventListener("change", performAction);

// const counter = 0;
let picas = Array.from(document.getElementsByClassName("design-pic"));
let picast = Array.from(document.getElementsByClassName("designer-name"));
let designName = Array.from(document.getElementsByClassName("design-name"));

/* Function called by event listener */
function performAction(event) {
  const newTerm = document.getElementById("term").value;
  const newSort = document.getElementById("sort-select").value;
  const newProduct = document.getElementById("product-select").value;
  const newColor = document.getElementById("color-select").value;
  const newStyle = document.getElementById("style-select").value;
  const newEvent = event.currentTarget.textContent;
  console.log(newTerm);
  console.log(newSort);
  console.log(newProduct);
  console.log(newColor);
  console.log(newStyle);
  console.log(newEvent);

  console.log(event.target);
  console.log(event.target.value);
  console.log(event.currentTarget.textContent);

  getTerm(
    baseURL,
    newTerm,
    APIsort,
    newSort,
    APIproduct,
    newProduct,
    APIcolor,
    newColor,
    APIstyle,
    newStyle,
    newEvent
  ).then(function (data) {
    // Add data
    // for (const result of data.page_results) {
    // data.page_results.forEach((result) => {
    // let ind = data.page_results.indexOf(this);

    console.log(data.query_hit_count.total_listings);

    for (let step = 0; step < data.total_page_results; step++) {
      console.log(newTerm);
      console.log(newSort);
      console.log(newProduct);
      console.log(newColor);
      console.log(newStyle);

      postData("/addData", {
        image: data.page_results[step].thumbnail,
        id: data.page_results[step].designId,
        name: data.page_results[step].name,
        designer: data.page_results[step].user.screenName,
        term: newTerm,
        sort: newSort,
        product: newProduct,
        color: newColor,
        style: newStyle,
      });
      // }
      //  updateUI();
    }
    // updateUI(data);
    console.log(data.page_results);
    // console.log(ind);
    // });
    // updateUI();
  });
  picas = Array.from(document.getElementsByClassName("design-pic"));
  picast = Array.from(document.getElementsByClassName("designer-name"));
  designName = Array.from(document.getElementsByClassName("design-name"));
}

/* Function to GET Web API Data*/

const getTerm = async (
  baseURL,
  term,
  sort,
  newSort,
  product,
  newProduct,
  color,
  newColor,
  style,
  newStyle,
  newEvent
) => {
  console.log(sort);
  console.log(newSort);
  console.log(product);
  console.log(term);
  console.log(newColor);
  console.log(newStyle);
  console.log(newEvent);

  // console.log(res.url);
  // if (newSort === "newest") {
  //   const str = `${res.url.replace("&terms=", "")}`;
  //   res.url =
  //     "https://pythias.spoonflower.com/search/v1/designs?page_size=12&sort=newest&product=Fabric";
  //   console.log(res.url);
  //   console.log(str);
  // }
  // console.log(res.url);
  // console.log(typeof res.url);
  let strq =
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
  console.log(strq);

  let url = new URL(strq);
  console.log(url.search);
  let search_params = url.searchParams;

  if (newColor === "all colors") {
    search_params.delete("color");
  }
  if (newStyle === "all styles") {
    search_params.delete("style");
  }

  search_params = search_params.toString().slice(6);
  // console.log(search_params.toString());
  // url.search = search_params.toString();
  // console.log(res.url);

  let strurl = baseURL + search_params.toString();
  console.log(strurl);

  let res = await fetch(strurl);
  console.log(res.url);
  // if (newColor === "all colors" && newStyle !== "all styles") {
  //   res = await fetch(
  //     baseURL + term + sort + newSort + product + newProduct + style + newStyle
  //   );
  // } else if (newStyle === "all styles" && newColor !== "all colors") {
  //   res = await fetch(
  //     baseURL + term + sort + newSort + product + newProduct + color + newColor
  //   );
  // } else if (newColor === "all colors" && newStyle === "all styles") {
  //   res = await fetch(baseURL + term + sort + newSort + product + newProduct);
  // }
  console.log(res.url);

  try {
    const data = await res.json();
    console.log(data.page_results);
    console.log(sort);
    console.log(product);
    console.log(color);
    console.log(style);

    // const pica = Array.from(document.getElementsByClassName("design-pic"));
    // console.log(pica);
    // pica.forEach((imag) => {
    // const pica = Array.from(document.getElementsByClassName("design-pic"));
    // console.log(pica);
    // pica.forEach((imag) => {
    // pica[0].src = `https://garden.spoonflower.com/c/${data.page_results[0].designId}/p/f/m/${data.page_results[0].thumbnail}`;
    // pica[1].src = `https://garden.spoonflower.com/c/${data.page_results[1].designId}/p/f/m/${data.page_results[1].thumbnail}`;
    // pica[2].src = `https://garden.spoonflower.com/c/${data.page_results[2].designId}/p/f/m/${data.page_results[2].thumbnail}`;

    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

const getDefault = async (baseURL) => {
  const res = await fetch(baseURL);
  try {
    const data = await res.json();
    console.log(data.page_results);

    // const pica = Array.from(document.getElementsByClassName("design-pic"));
    // console.log(pica);
    // pica.forEach((imag) => {
    // const pica = Array.from(document.getElementsByClassName("design-pic"));
    // console.log(pica);
    // pica.forEach((imag) => {
    // pica[0].src = `https://garden.spoonflower.com/c/${data.page_results[0].designId}/p/f/m/${data.page_results[0].thumbnail}`;
    // pica[1].src = `https://garden.spoonflower.com/c/${data.page_results[1].designId}/p/f/m/${data.page_results[1].thumbnail}`;
    // pica[2].src = `https://garden.spoonflower.com/c/${data.page_results[2].designId}/p/f/m/${data.page_results[2].thumbnail}`;

    for (let i = 0; i < data.page_results.length; i++) {
      // for (let i = 0; i < data.total_page_results; i++) { ??????

      // *************************************
      // storing the diffrent section elements
      // *************************************

      const newDesign = document.createElement("article");
      const newDiv = document.createElement("div");
      const newDiv2 = document.createElement("div");
      const newImg = document.createElement("img");
      const newDiv3 = document.createElement("div");
      const newSpan = document.createElement("span");
      const newSpan2 = document.createElement("span");
      const newAnch = document.createElement("a");
      const newPar = document.createElement("p");
      const newAnch2 = document.createElement("a");
      const newAnch3 = document.createElement("a");

      // *************************************
      // creating id, class, data-* attributes
      // there are laready 3 sections built in HTML
      // and therefore I start build from 4
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
      newSpan2.className = "";
      newSpan2.setAttribute("itemprop", "productID");
      newAnch.setAttribute("href", "");
      newAnch.className = "design-name";
      newAnch.setAttribute("title", "");
      newAnch.setAttribute("itemprop", "");
      newPar.className = "designer-box";
      newPar.textContent = "Designer:";
      newAnch2.setAttribute("href", "");
      newAnch2.className = "designer-name";
      newAnch2.setAttribute("title", "");
      newAnch2.setAttribute("itemprop", "");
      newAnch3.className = "";
      newAnch3.setAttribute("href", "");
      newAnch3.textContent = "back home";

      // *************************************
      // creating the text content
      // *************************************
      // newHead.textContent = `Section ${4 + i}`;
      // newPar.textContent =
      //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";
      // newPar2.textContent =
      //   "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";

      // *************************************
      // appending the elements in the section
      // *************************************

      newDiv.appendChild(newDiv2);
      newDiv2.appendChild(newImg);
      newDiv.appendChild(newDiv3);
      newDiv3.appendChild(newSpan);
      newDiv3.appendChild(newSpan2);
      newDiv3.appendChild(newAnch);
      newDiv3.appendChild(newPar);
      newPar.appendChild(newAnch2);
      newDiv.appendChild(newAnch3);

      // ******************************************
      // adding the new section to my section array
      // ******************************************

      designsArray.push(newDiv);
    }

    // ******************************************
    // appending the new sections to main
    // starting from the 3rd element because
    // 3 elements are already built in advance
    // ******************************************

    for (design of designsArray) {
      designsContainer.appendChild(design);
    }
    picas = Array.from(document.getElementsByClassName("design-pic"));
    picast = Array.from(document.getElementsByClassName("designer-name"));
    designName = Array.from(document.getElementsByClassName("design-name"));

    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

getDefault(baseURL).then(function (data) {
  // Add data
  // for (const result of data.page_results) {
  // data.page_results.forEach((result) => {
  // let ind = data.page_results.indexOf(this);
  console.log(data.total_page_results);
  console.log(data.query_hit_count.total_listings);

  for (let step = 0; step < data.total_page_results; step++) {
    postData("/addData", {
      image: data.page_results[step].thumbnail,
      id: data.page_results[step].designId,
      name: data.page_results[step].name,
      designer: data.page_results[step].user.screenName,
      // term: newTerm,
      // sort: bestSelling,
    });
    // }
    //  updateUI();
  }
  // updateUI(data);
  console.log(data.page_results);
  // console.log(ind);
  // });
  // updateUI();
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
    console.log(newData);
    // const picas = Array.from(document.getElementsByClassName("design-pic"));
    // let picas = Array.from(document.getElementsByClassName("design-pic"));
    // let picast = Array.from(document.getElementsByClassName("designer-name"));
    // let designName = Array.from(document.getElementsByClassName("design-name"));
    console.log(picas);
    console.log(picas.length);
    // const firstElement = picas.shift();
    // console.log(firstElement);
    // console.log(picas.shift());
    if (newData.product === "Wallpaper" || newData.product === "Living_Decor") {
      picas.shift().src = `https://garden.spoonflower.com/c/${newData.id}/i/m/${newData.image}`;
    } else
      picas.shift().src = `https://garden.spoonflower.com/c/${newData.id}/p/f/m/${newData.image}`;

    picast.shift().innerHTML = ` ${newData.designer}`;
    designName.shift().innerHTML = newData.name;
    // updateUI(newData);
    // let counter = 0;
    // console.log(counter);
    // counter++;
    // updateUI(newData, counter);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
  console.log(data);
};

/* Function to GET Project Data and dynamically update the UI*/
// const pica = Array.from(document.getElementsByClassName("design-pic"));
// console.log(pica);
// pica.forEach((imag) => {
const updateUI = async (inde) => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);
    console.log(inde);
    // console.log(inde.page_results.indexOf(allData));
    // document.getElementById("date").innerHTML = allData.date;
    // document.getElementById("temp").innerHTML =
    //   Math.round(allData.temperature) + " degrees";
    // document.getElementById("content").innerHTML = allData.feelings;
    // https://garden.spoonflower.com/c/6743135/p/f/m/nE8uB1Ky6nHNGK68-VQL4vozc2iSJqlUsSBXjJKYp6ZeozyVC58yJqogddk/Rustic%20Fall%20-%20Forest%20animals%20-%20les%20animaux%20de%20la%20f%C3%B4ret.jpg
    // https://garden.spoonflower.com/c/12215564/i/m/NgcB-udsPjnSkDuRcAZ0GX2qrYz7m4rZr4os7PcJ6h8ThoEfjuN500La8AWk5pk/Guitar%20Christmas%20Tree.jpg
    const pica = Array.from(document.getElementsByClassName("design-pic"));
    console.log(pica);
    // pica.forEach((imag) => {
    // const pica = Array.from(document.getElementsByClassName("design-pic"));
    // console.log(pica);
    // pica.forEach((imag) => {
    // pica[0].src = `https://garden.spoonflower.com/c/${inde.page_results[0].designId}/p/f/m/${inde.page_results[0].thumbnail}`;
    // pica[1].src = `https://garden.spoonflower.com/c/${inde.page_results[1].designId}/p/f/m/${inde.page_results[1].thumbnail}`;
    // pica[2].src = `https://garden.spoonflower.com/c/${inde.page_results[2].designId}/p/f/m/${inde.page_results[2].thumbnail}`;
    // pica[0].src = `https://garden.spoonflower.com/c/${inde.page_results[0].designId}/p/f/m/${inde.page_results[0].thumbnail}`;
    // pica[1].src = `https://garden.spoonflower.com/c/${inde.page_results[1].designId}/p/f/m/${inde.page_results[1].thumbnail}`;
    // pica[2].src = `https://garden.spoonflower.com/c/${inde.page_results[2].designId}/p/f/m/${inde.page_results[2].thumbnail}`;
    // });
    console.log(counter);
    // for (let indx in pica) {
    pica[
      counter
    ].src = `https://garden.spoonflower.com/c/${inde.id}/p/f/m/${inde.image}`;
    // console.log(indx);
    counter++;

    // }
    // for (let indx in inde.page_results) {
    //   pica[
    //     indx
    //   ].src = `https://garden.spoonflower.com/c/${inde.page_results[indx].designId}/p/f/m/${inde.page_results[indx].thumbnail}`;
    //   console.log(indx);
    // }
    // });
    // console.log(document.getElementsByClassName("design-pic")[0]);
    // console.log(pic);
    // console.log(pic.src);
    // document.getElementById(
    //   "photo"
    // ).src = `https://garden.spoonflower.com/c/${allData.id}/p/f/m/${allData.image}`;
  } catch (error) {
    console.log("error", error);
  }
};

const checkpass = function () {
  if (
    document.getElementById("password").value ===
    document.getElementById("confirm-password").value
  ) {
    // document.getElementById("confirm-password").style.background = "green";
    // document
    //   .getElementById("confirm-password")
    //   .setAttribute("confirm-password", "1");
    document
      .getElementById("confirm-password")
      .style.setProperty(
        "--box-shadow",
        "0 0 0 0.8rem rgba(18, 241, 10, 0.63)"
      );
    // document.getElementById("message").innerHTML = "matching";
  } else {
    document
      .getElementById("confirm-password")
      .style.setProperty(
        "--box-shadow",
        "0 0 0 0.8rem rgba(218, 19, 19, 0.877)"
      );
    // document.getElementById("confirm-password").style.background = "red";
    // document.getElementById("message").innerHTML = "not matching";
  }
};
