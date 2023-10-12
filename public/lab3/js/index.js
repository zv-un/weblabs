const form = document.querySelector("#profile-form");
const previewImage = document.getElementById("avatar-preview");
const activeErrors = [];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  activeErrors.forEach((field) => {
    form[field].classList.remove("error");
    form[field].dataset.error = "";
  });

  const formData = new FormData(this);

  fetch("http://localhost:3000/api/lab3/form", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!data.success) {
        showErrors(data.validation);
      } else {
        console.log(data);
        form.reset();
        previewImage.src = "/lab3/img/Avatar.jpg";
      }
    })
    .catch((err) => {
      throw err;
    });
});

document.getElementById("avatar").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
});

const showErrors = (listOfErrors) => {
  for (const key in listOfErrors) {
    if (Object.hasOwnProperty.call(listOfErrors, key)) {
      const error = listOfErrors[key];
      const inputfield = form[key];

      if (inputfield) {
        inputfield.parentElement.classList.add("error");
        inputfield.parentElement.dataset.error = error.message;
      }
    }
  }
};

const preloadForm = () => {
  fetch("/api/lab3/form", { method: "GET" })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      if (data.success) {
        const { avatar, ...fields } = data.formData;

        if (avatar) {
          previewImage.src = `/lab3/uploads/${avatar}`;
        }

        for (const key in fields) {
          if (Object.hasOwnProperty.call(fields, key)) {
            const element = fields[key];

            if (Array.isArray(element)) {
              form[key].forEach((checkbox) => {
                if (element.some((option) => option === checkbox.value)) {
                  checkbox.checked = true;
                }
              });
            } else {
              form[key].value = element;
              form[key].checked = element === "on" ? true : false;
            }
          }
        }
      }
    });
};

document.onreadystatechange = (e) => {
  if (e.target.readyState === "interactive") {
    preloadForm();
  }
};
