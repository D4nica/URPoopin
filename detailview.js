let reviews = [];

function goBack() {
  window.history.back();
}

async function fetchAll() {
  const [reviewJSON, brJSON] = await Promise.all([
    fetch("reviews.json"),
    fetch("bathrooms.json"),
  ]);

  reviews = await reviewJSON.json();
  const brs = await brJSON.json();

  const br = brs.find((item) => item.id == detailID);

  if (!br) {
    console.error("bathroom w id ", detailID, " not found.");
    return;
  }

  await getBR(br);

  setReviews(reviews.filter((r) => r.brID == detailID));
}

// fetch("reviews.json")
//   .then((res) => res.json())
//   .then((data) => {
//     reviews = data;
//     console.log("Reviews fetched.");
//   })
//   .catch((e) => console.e("Error in loading JSON: ", e));

// fetch("bathrooms.json")
//   .then((res) => res.json())
//   .then((data) => {
//     const i = data.find((item) => item.id == detailID);
// if (!id) {
//   console.error("br not found.");
//   return;
// }
//     getBR(i);
//     console.log("Bathroom fetched.");

//     setReviews(reviews.filter((j) => j.brID==i.id));
//   })
//   .catch((e) => console.e("Error in loading JSON: ", e));

function getID(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const detailID = getID("id");

async function getBR(item) {
  document.getElementById("title").innerHTML = `
    <div class="title-container">
      <img src="https://cdn.glitch.global/653b67c6-e6ce-468f-8e86-545a89c06582/arrow_back.png?v=1731805645233" 
      alt="Arrow Icon" class="arrow-icon" onclick="goBack()" />
      <span>${item.building}, Floor ${item.floor}</span>
    </div>
  `;

  if (item.description) {
    document.getElementById("desc").innerHTML = `
      <p>*${item.description}</p>
    `;
  }

  let mapImage = "";
  switch (item.building) {
    case "Douglass":
      mapImage =
        "https://cdn.glitch.global/653b67c6-e6ce-468f-8e86-545a89c06582/Douglass_Pin.png?v=1731794661689";
      break;
    case "Wilson Commons":
      mapImage =
        "https://cdn.glitch.global/653b67c6-e6ce-468f-8e86-545a89c06582/Wilco_Pin.png?v=1731794713070";
      break;
    case "Rush Rhees":
      mapImage =
        "https://cdn.glitch.global/653b67c6-e6ce-468f-8e86-545a89c06582/RR_Pin.png?v=1731794745021";
      break;
    default:
      mapImage =
        "https://cdn.glitch.global/653b67c6-e6ce-468f-8e86-545a89c06582/URmaps_RC.jpg?v=1731741444459";
  }

  // Set the map image dynamically
  document.querySelector("img[alt='Map of University of Rochester']").src =
    mapImage;

  let tags = "";
  switch (item.gender) {
    case "Unisex":
      tags += `
      <div class="tag-item">
        <span class="material-symbols-outlined">wc</span>
        <p> Unisex </p>
      </div>
      `;
      break;
    case "Female":
      tags += `
      <div class="tag-item">
        <span class="material-symbols-outlined">woman</span>
        <p> Female </p>
      </div>
      `;
      break;
    case "Male":
      tags += `
      <div class="tag-item">
        <span class="material-symbols-outlined">man</span>
        <p> Male </p>
      </div>
      `;
      break;
  }
  if (item.ada) {
    tags += `
    <div class="tag-item">
      <span class="material-symbols-outlined">accessible_forward</span>
      <p> Accessible </p>
    </div>
  `;
  }
  if (item.family) {
    tags += `
    <div class="tag-item">
      <span class="material-symbols-outlined">family_restroom</span>
      <p> Family </p>
    </div>
  `;
  }
  if (item.sanitary) {
    tags += `
    <div class="tag-item">
      <span class="material-symbols-outlined">menstrual_health</span>
      <p> Sanitary Products Available </p>
    </div>
  `;
  }

  document.getElementById("tag-list").innerHTML = tags;
}

// setReviews(reviews.filter((i) => i.brID==item.id));

function setReviews(brReviews) {
  let myReviews = "";
  if (brReviews.length === 0) {
    myReviews = `
      <div class="review-box">
        <a href=login.html>
          <p> No reviews yet. <span class="login-link">Write your own now!</span> </p>
        </a>
      </div>
    `;
  } else {
    brReviews.forEach((i) => {
      let stars = "";
      for (let j = 0; j < 5; j++) {
        if (j < i.stars) {
          stars += `<span class="fa fa-star checked"></span>`;
        } else {
          stars += `<span class="fa fa-star"></span>`;
        }
      }

      myReviews += `
        <div class="review-individ">
          <p> ${i.text} </p>
        </div>
      `;
    });
  }

  document.getElementById("reviews-list").innerHTML = myReviews;
}

fetchAll();
