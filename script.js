const input = document.querySelector("input");
const list_box = document.querySelector(".list-box");
const mov_obj = "https://yts.mx/api/v2/list_movies.json?sort_by=year&limit=50";

input.addEventListener("input", (e) => {
  if (input.value == "") {
    list_box.innerHTML = "";
    console.log("did it wokr");
  } else {
    setTimeout(async () => {
      const usr_input = input.value.toLowerCase();
      const result = await fetch(mov_obj).then((res) => {
        return res.json();
      });
      let found_items = [],
        j = 0;
      for (let i of result.data.movies) {
        if (i.title.toLowerCase().includes(usr_input)) {
          found_items[j] = {
            title: i.title,
            year: i.year,
            cover: i.small_cover_image,
          };
          j++;
        }
      }
      list_box.innerHTML = "";
      if (found_items.length == 0) {
        list_box.innerHTML += `<li><i>NO RESULTS FOUND!</i></li>`;
      } else {
        for (let i = 0; i < found_items.length; i++) {
          list_box.style.display = "block";
          list_box.innerHTML += `
          <li>
          <img src = '${found_items[i].cover}'>${found_items[i].title} (${found_items[i].year})
          </li>`;
        }
      }
    }, 1000);
  }
});
