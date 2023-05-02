// const postsList = document.querySelector('.posts-list');
// const postsList = document.getElementById('POSTLIST');
const postsList = document.getElementById("card");

// const postsListId = document.querySelector('.posts-list');
// const addPostForm = document.querySelector('add-post-form');
const addPostForm = document.getElementById("add");
const titleValue = document.getElementById("title-value");
// const bodyValue = document.getElementById('body-value');
const bodyValue = document.querySelector(".dropdown-item");
const btnSubmit = document.querySelector(".btn");
const optnSubmit = document.querySelector(".dropdown-menu");

optnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(bodyValue.value);
});

let output = "";
let arr = [];

const renderPosts = (posts) => {
  arr.sort((a, b) => a.status.length - b.status.length);
  posts.forEach((post) => {
    output += `
    <div class="card mt-4 col-md-6 bg-ligt">
      <div class="card-body" data-id=${post._id}>
        <h5 class="card-title" id=""card-titleId>${post.work}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
        <p class="card-text" id=""card-textId>
          ${post.status}
        </p>
        <a href="#" class="card-link" id="edit-post">edit</a>
        <a href="#" class="card-link" id="delete-post"  name=${post._id}>delete</a>
      </div>
    </div>
    `;
  });
  // postsList.innerHTML = output;
  document.getElementById("card").innerHTML = output;
};
const url = "https://unicode-frontend1.onrender.com/todo";

//----------------------------------------------------------------------------//
//get
try {
  fetch(url)
    .then((res) => res.json())
    // .then(data => renderPosts(data))
    .then((data) => {
      arr = data;

      //  const doSort = (arr)=>{
      //   return arr
      arr.sort((a, b) => {
        if (a.status > b.status) {
          return 1;
        }
        if (b.status > a.status) {
          return -1;
        }
        return 0;
      });

      //  }

      // arr.sort((a,b)=> a.status.length - b.status.length);

      //  arr.sort();
      console.log(arr);

      data.forEach((post) => {
        output += `
    <div class="card mt-4 col-md-6 bg-ligt">
      <div class="card-body" data-id=${post._id}>
        <h5 class="card-title">${post.work}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
        <p class="card-text">${post.status}</p>
        <a href="#" class="card-link" id="edit-post">edit</a>
        <a href="#" class="card-link" id="delete-post" name=${post._id}>delete</a>
      </div>
    </div>
    `;
      });
      document.getElementById("card").innerHTML = output;
    });
} catch (error) {
  console.log("There is some ERROR");
}

//----------------------------------------------------------------------------//
addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   function fun() {
  swal({
    title: "Good job!",
    text: "You added a post!",
    icon: "success",
  });
  //   }

  fetch("https://unicode-frontend1.onrender.com/todo", {
    method: "POST",
    body: JSON.stringify({
      work: titleValue.value,
      status: bodyValue.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);

      renderPosts(dataArr); //maybe we need use updatedrArr so the deletion are maintained
      console.log(data);
    })
    .then(() => location.reload());

  //to empty the text area
  titleValue.value = "";
  bodyValue.value = "";
});

//----------------------------------------------------------------------------//
postsList.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("hello");

  let delButtonIsPressed = e.target.id == "delete-post";
  let editButtonIsPressed = e.target.id == "edit-post";

  let id = e.target.parentElement.dataset.id;
  console.log(e.target.parentElement.dataset.id);

  if (delButtonIsPressed) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });

        console.log("delete");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("_id", id);

        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };

        fetch("https://unicode-frontend1.onrender.com/todo", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .then(() => location.reload())
          .catch((error) => console.log("error", error));
      } else {
        swal("Your imaginary file is safe!");
      }
    });

    // console.log('delete');
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    // var urlencoded = new URLSearchParams();
    // urlencoded.append("_id", id);

    // var requestOptions = {
    //   method: 'DELETE',
    //   headers: myHeaders,
    //   body: urlencoded,
    //   redirect: 'follow'
    // };

    // fetch("https://unicode-frontend1.onrender.com/todo", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .then(()=> location.reload())
    //   .catch(error => console.log('error', error));
  }
  if (editButtonIsPressed) {
    const parent = e.target.parentElement;
    // let titleContent = parent.getElementById('card-titleId').textContent;
    // let bodyContent = parent.getElementById('card-textId').textContent;
    let titleContent = parent.querySelector(".card-title").textContent;
    let bodyContent = parent.querySelector(".card-text").textContent;
    // const titleValue : HTMLElement
    titleValue.value = titleContent;
    bodyValue.value = bodyContent;

    //updating post
    btnSubmit.addEventListener("click", () => {
      console.log("post-update");
    });
  }
});
