const input = document.querySelector("input");
const list_box = document.querySelector(".list-box");
const mov_obj = "https://yts.mx/api/v2/list_movies.json?sort_by=year&limit=50";

input.addEventListener("input", async (e) => {
  if (e.value == "") {
    list_box.innerHTML = "";
  } else {
    const usr_input = input.value.toLowerCase();
    // console.log(usr_input);
    const result = await fetch(mov_obj).then((res) => {
      return res.json();
    });
    // console.log(res);
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
    // console.log(found_items);
    // console.log(result.length);
    list_box.innerHTML = "";
    if (found_items.length == 0) {
      list_box.innerHTML += `<li><span><i>NO RESULTS FOUND!</i></span></li>`;
    } else {
      for (let i = 0; i < found_items.length; i++) {
        list_box.innerHTML += `<li class="animate__animated d-none"><span><img src = '${found_items[i].cover}'><b><i>${found_items[i].year}</i></b></span><span>${found_items[i].title}</span></li>`;
      }

      const list_item = document.querySelectorAll("li");
      for (let i = 0; i < list_item.length; i++) {
        setTimeout(() => {
          list_item[i].classList.remove("d-none");
          list_item[i].classList.add("animate__fadeInRight");
        }, 1000 * i);
      }
    }
  }
});
