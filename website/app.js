const baseURL =
  "https://pythias.spoonflower.com/search/v1/designs?page_size=12&terms=";
const APIsort = "&sort=";

// Event listener to add function to existing HTML DOM element

document.getElementById("search").addEventListener("click", performAction);
document
  .getElementById("sort-select")
  .addEventListener("change", performAction);

const counter = 0;
let picas = Array.from(document.getElementsByClassName("design-pic"));
let picast = Array.from(document.getElementsByClassName("designer-name"));
let designName = Array.from(document.getElementsByClassName("design-name"));

/* Function called by event listener */
function performAction(e) {
  const newTerm = document.getElementById("term").value;
  const newSort = document.getElementById("sort-select").value;
  console.log(newTerm);
  console.log(newSort);

  getTerm(baseURL, newTerm, APIsort, newSort).then(function (data) {
    // Add data
    // for (const result of data.page_results) {
    // data.page_results.forEach((result) => {
    // let ind = data.page_results.indexOf(this);
    for (let step = 0; step < data.total_page_results; step++) {
      console.log(newTerm);
      console.log(newSort);
      postData("/addData", {
        image: data.page_results[step].thumbnail,
        id: data.page_results[step].designId,
        name: data.page_results[step].name,
        designer: data.page_results[step].user.screenName,
        term: newTerm,
        sort: newSort,
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

const getTerm = async (baseURL, term, sort, newSort) => {
  console.log(sort);
  const res = await fetch(baseURL + term + sort + newSort);
  console.log(res);
  try {
    const data = await res.json();
    console.log(data.page_results);
    console.log(sort);

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
    console.log(picas);
    console.log(picas.length);
    // const firstElement = picas.shift();
    // console.log(firstElement);
    // console.log(picas.shift());
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
