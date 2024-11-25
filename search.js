// let bathroomData = [];
// const searchText = document.getElementById("searchbar");

// function brList(data) {
//   const list = document.getElementById("bathroom-list");
//   list.innerHTML = ""
  
//   if (!data || data.length===0) {
//     list.innerHTML = `<h2>No bathrooms available.</h2>`;
//     return;
//   }
  
//   data.forEach((i) => {
    
//     let stars = "";
//       for (let j = 0; j < 5; j++) {
//         if (j < i.stars) {
//           stars += `<span class="fa fa-star checked"></span>`;
//         } else stars += `<span class="fa fa-star"></span>`;
//       }
    
//     const item = document.createElement("div");
//     item.className = "bathroom-box";
//     item.innerHTML = `
//       <a href="bathroompage.html?id=${i.id}">
//         <span class="bathroom-link">
//           <div class="bathroom-name-container">
//             <h2 class="bathroom-name">${i.building}, Floor ${i.floor}</h2>
//             <h2 class="bathroom-gender">${i.gender}</h2>
//           </div>
//         </span>
//       </a>
//       <div class="bathroom-rating">
//         ${stars}
//         <i class="heart-empty fa fa-heart"></i>
//       </div>
//     `;
//     list.appendChild(item);
//   })
// }

// fetch("bathrooms.json")
//   .then((res) => res.json())
//   .then((data) => {
//     bathroomData = data;
//     brList(bathroomData);
//     console.log("Data fetched.");
//   }).catch((e) => console.e("Error in loading JSON: ", e));

// searchText.addEventListener("input", function (event) {
//   const inp = this.value.toLowerCase();
  
//   if (!inp) {
//     brList(bathroomData);
//     return;
//   }
  
//   const data = bathroomData.filter((item) => 
//     item.building.toLowerCase().includes(inp));
  
//   brList(data);
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const hearts = document.querySelectorAll(".heart");

//   hearts.forEach((heart) => {
//     heart.addEventListener("click", function () {
//       console.log("Before toggle:", this.classList);
//       this.classList.toggle("fa-heart");
//       this.classList.toggle("fa-heart-o");
//       console.log("After toggle:", this.classList);
//     });
//   });
// });

let bathroomData = [];
const searchText = document.getElementById("searchbar");

function brList(data) {
  const list = document.getElementById("bathroom-list");
  list.innerHTML = "";
  
  if (!data || data.length === 0) {
    list.innerHTML = `<h2>No bathrooms available.</h2>`;
    return;
  }
  
  data.forEach((i) => {
    let stars = "";
    for (let j = 0; j < 5; j++) {
      if (j < i.stars) {
        stars += `<span class="fa fa-star checked"></span>`;
      } else {
        stars += `<span class="fa fa-star"></span>`;
      }
    }
    
    const item = document.createElement("div");
    item.className = "bathroom-box";
    item.innerHTML = `
      <a href="bathroompage.html?id=${i.id}">
        <span class="bathroom-link">
          <div class="bathroom-name-container">
            <h2 class="bathroom-name">${i.building}, Floor ${i.floor}</h2>
            <h2 class="bathroom-gender">${i.gender}</h2>
          </div>
        </span>
      </a>
      <div class="bathroom-rating">
        ${stars}
        <i class="heart-empty fa fa-heart"></i>
      </div>
    `;
    list.appendChild(item);
  });
}

fetch("bathrooms.json")
  .then((res) => res.json())
  .then((data) => {
    bathroomData = data;
    brList(bathroomData);
    console.log("Data fetched.");
  })
  .catch((e) => {
    console.error("Error in loading JSON: ", e);
  });

searchText.addEventListener("input", function (event) {
  document.getElementById("search-query").innerHTML = ""
  const inp = this.value.toLowerCase();
  
  if (!inp) {
    brList(bathroomData);
    return;
  }
  
  const data = bathroomData.filter((item) => 
    item.building.toLowerCase().includes(inp)
  );
  
  // document.getElementById("search-query").innerHTML = `Results for "${this.value}"`;
  brList(data);
});

// stop pg from reloading on enter
searchText.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    
    const inp = this.value.toLowerCase();
    const filteredData = bathroomData.filter((item) => item.building.toLowerCase().includes(inp));
    brList(filteredData);
    
    document.getElementById("search-query").innerHTML = `Results for "${this.value}"`;
    this.value = ''; 
  }
});

// I GIVE UP!!!!!!!!!!!
// document.addEventListener("DOMContentLoaded", function () {
//   const hearts = document.querySelectorAll(".heart");
  
//   hearts.forEach((heart) => {
//     heart.addEventListener("click", function () {
//       this.classList.toggle("heart");
//       this.classList.toggle("heart-empty");
      
//       console.log("After toggle:", this.classList);
//     });
//   });
  
//   const emptys = document.querySelectorAll(".heart-empty");
  
//   emptys.forEach((heart) => {
//     heart.addEventListener("click", function () {
//       this.classList.toggle("heart-empty");
//       this.classList.toggle("heart");
      
//       console.log("After toggle:", this.classList);
//     });
//   });
// });
