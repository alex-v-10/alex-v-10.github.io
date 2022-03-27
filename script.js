let reviewButton = document.getElementById("reviewButton");
let reviewTitle = document.getElementById("reviewTitle");
let reviewText = document.getElementById("reviewText");
let reviewName = document.getElementById("reviewName");
let reviewsRow = document.getElementById("reviewsRow");

reviewButton.addEventListener("click", function () {
  if (reviewTitle.checkValidity() && reviewText.checkValidity()) {
    event.preventDefault();
    let name = "Anonymous";
    if (reviewName.value !== "") {
      name = reviewName.value;
    }
    let element = document.createElement("div");
    element.classList.add("col-lg-4", "col-md-6", "py-3");
    element.innerHTML = `<div class="card h-100">
              <div class="card-body">
                <h4 class="card-title">${reviewTitle.value}</h4>
                <blockquote class="blockquote mb-0">
                  <p class="card-text">${reviewText.value}</p>
                  <footer class="text-end blockquote-footer"><i>${name}</i></footer>
                </blockquote>
              </div>
            </div>`;
    reviewsRow.appendChild(element);
  }
});

/*
${reviewTitle.value}
${reviewText.value}
${name}
 */