/*
data.js
Load JSON data
*/

const jsonData = "../data/site.json";

// Ajax request
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      let obj = JSON.parse(this.responseText);
      xhrSuccess(obj);
    } else {
      xhrError();
    }
  }
};
xhr.open("GET", jsonData, true);
xhr.send();

// Execute function if data loaded
xhrSuccess = obj => {
  showLayout(obj.site);
};

// Display error if data is not loaded
xhrError = () => {
  console.error(`Error loading data: ${jsonData}`);
};
