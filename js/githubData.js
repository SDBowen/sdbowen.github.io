const url = "https://api.github.com/users/sdbowen/repos?sort=updated";

fetch(url)
  .then(response => {
    return response.json();
  })
  .then(function(jsonResponse) {
    parseData(jsonResponse);
  });

let parseData = apiData => {
  reposDetail = [];

  for (let i = 0; i < 3; i++) {
    let currentRepo = {};

    currentRepo.updatedDate = apiData[i].updated_at;
    currentRepo.url = apiData[i].html_url;
    currentRepo.name = apiData[i].name;
    currentRepo.description = apiData[i].description;
    currentRepo.language = apiData[i].language;

    reposDetail.push(currentRepo);
  }

  updatePageElements(reposDetail);
};

let updatePageElements = data => {
  let dateElements = document.querySelectorAll(".heading-date");
  let nameUrlElements = document.querySelectorAll(".repo-item__link");
  let descElements = document.querySelectorAll(".repo-item__description p");
  let languageElements = document.querySelectorAll(".repo-item__language-text");

  for (let i = 0; i < 3; i++) {
    dateElements[i].innerHTML = formatDate(data[i].updatedDate);
    nameUrlElements[i].innerHTML = data[i].name;
    nameUrlElements[i].href = data[i].url;
    descElements[i].innerHTML = data[i].description;
    languageElements[i].innerHTML = data[i].language;
    languageElements[i].className += ` repo-item__language-text--${data[
      i
    ].language.toLowerCase()}`;
  }
};

let formatDate = repoItemDate => {
  let year = repoItemDate.slice(0, 4);
  let month = repoItemDate.slice(5, 7) - 1;
  let day = repoItemDate.slice(8, 10);
  let hour = repoItemDate.slice(11, 13);
  let minute = repoItemDate.slice(14, 16);
  let seconds = repoItemDate.slice(17, 19);

  let repoDate = new Date(Date.UTC(year, month, day, hour, minute, seconds));
  let currentDate = new Date(Date.now());

  // hours*minutes*seconds*milliseconds
  const oneMinute = 60 * 1000;

  differenceInMinutes =
    Math.round(
      Math.abs((repoDate.getTime() - currentDate.getTime()) / oneMinute)
    ) || 1;

  if (differenceInMinutes >= 2880) {
    return `Updated ${Math.round(differenceInMinutes / 1440)} days ago`;
  } else if (differenceInMinutes < 2880 && differenceInMinutes >= 1440) {
    return "Updated 1 day ago";
  } else if (differenceInMinutes >= 120) {
    return `Updated ${Math.round(differenceInMinutes / 60)} hours ago`;
  } else if (differenceInMinutes < 120 && differenceInMinutes >= 60) {
    return "Updated 1 hour ago";
  } else if (differenceInMinutes >= 2) {
    return `Updated ${differenceInMinutes} minutes ago`;
  } else {
    return "Updated 1 minute ago";
  }
};
