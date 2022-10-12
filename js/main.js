const getRandomLinks = () => {
  const value = $(".card");
  delete value.length;
  delete value.prevObject;
  let elements = Object.values(value);
  elements.forEach((element) => {
    let getInfo = $(element).attr("id");

    fetch(
      "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=prefixsearch&prop=pageimages|extracts|contributors|info&inprop=url&exlimit=10&exintro&explaintext&gpslimit=10&pithumbsize=200&gpssearch=" +
        getInfo +
        "&origin=*",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let page = data.query.pages;
        page = page[Object.keys(page)[0]];
        let title = page.title;
        let authors = page.contributors;
        let link = page.fullurl;
        $(element)
          .children(".card__title")
          .children(".card__title-link")
          .text(title)
          .attr("href", link);
        $(element)
          .children(".card__author")
          .children("a")
          .attr("href", link)
          .attr("target", "_blank")
          .text(function () {
            return `By ${authors[0].name}`;
          })
          .attr("title", function () {
            let authorsArray = [];
            authors.forEach((item) => {
              authorsArray.push(item.name);
            });
            authors = authorsArray.join(",\n");
            authors = "Contributors:\n" + authors;
            return authors;
          });
        $(element)
          .children(".card__icon")
          .children(".card__icon-img")
          .attr("src", page.thumbnail.source);
        $(element).children(".card__text").text(page.extract);
      })
      .then(() => {
        $(".cards").removeClass("inactive");
      });
  });
};

const createCards = function (persons) {
  let indexPerson = 0;
  persons.forEach((person) => {
    indexPerson += 1;
    $(".cards").append(`<div class="card" id="${person}">
          <div class="card__icon">
            <img src="" alt="" class="card__icon-img" />
          </div>
          <div class="card__mark">${indexPerson}</div>
          <div class="card__title">
            <a href="#" class="card__title-link"></a>
          </div>
          <div class="card__author"><a href="#"></a></div>
          <p class="card__text"></p>
        </div>`);
  });
};

let wiki = [
  "Steve Jobs",
  "Mark Zuckerberg",
  "Elon Musk",
  "Bill Gates",
  "Jeff Bezos",
  "Jack Ma",
];
createCards(wiki);
getRandomLinks();
