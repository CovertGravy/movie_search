const input = document.querySelector("input");
const list_box = document.querySelector(".list-box");
const mov_obj = "https://yts.mx/api/v2/list_movies.json?sort_by=year&limit=50";

input.addEventListener("input", () => {
  if (input.value == "" || input.value) {
    list_box.innerHTML = "";
  }
  setTimeout(async () => {
    const usr_input = input.value.toLowerCase();
    const result = await fetch(mov_obj).then((res) => {
      return res.json();
    });
    result.data.movies.forEach((element) => {
      if (element.title.toLowerCase().includes(usr_input)) {
        list_box.innerHTML += `<li><img src = '${element.small_cover_image}'>${element.title} (${element.year})</li>`;
      }
    });
    list_box.style.display = "block";
  }, 0);
});
