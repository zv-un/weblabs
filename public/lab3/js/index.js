const form = document.querySelector("#profile-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  //   const formData = new FormData(e.target);
  console.log(e.target);
  console.log(formData);

  fetch("http://localhost:3000/api/lab3/form", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      throw err;
    });
});
