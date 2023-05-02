// const postsList = document.querySelector('.posts-list');
// const postsList = document.getElementById('POSTLIST');
const postsList = document.getElementById('card');

// const postsListId = document.querySelector('.posts-list');
// const addPostForm = document.querySelector('add-post-form');
const addPostForm = document.getElementById('add');
const titleValue = document.getElementById('title-value');
const bodyValue = document.getElementById('body-value');

//----------------------------------------------------------------------------//

let output = '';

const renderPosts = (posts) => {
posts.forEach(post =>{
        output +=`
        <div class="card mt-4 col-md-6 bg-ligt">
          <div class="card-body" data-id=${post.id}>
            <h5 class="card-title">${post.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${now}</h6>
            <p class="card-text">
              ${post.body}
            </p>
            <a href="#" class="card-link" id="edit-post">edit</a>
            <a href="#" class="card-link" id="delete-post">delete</a>
          </div>
        </div>
        `;
    }); 
     // postsList.innerHTML = output;
    document.getElementById("card").innerHTML=output;

}
//----------------------------------------------------------------------------//

var now = new Date();
document.write(now.togetDateString);

//----------------------------------------------------------------------------//


const url = 'https://jsonplaceholder.typicode.com/posts';
// const url = 'https://jsonplaceholder.typicode.com/posts';


//get//
fetch(url)
.then(res => res.json())
.then(data => renderPosts(data))
// .then(data => {
  

// data.forEach(post =>{
//     output +=`
//     <div class="card mt-4 col-md-6 bg-ligt">
//       <div class="card-body" data-id=${post.id}>
//         <h5 class="card-title" id="card-titleId">${post.title}</h5>
//         <h6 class="card-subtitle mb-2 text-muted"></h6>
//         <p class="card-text" id="card-textId">
//           ${post.body}
//         </p>
//         <a href="#" class="card-link" id="edit-post" onclick="edit()">edit</a>
//         <a href="#" class="card-link" id="delete-post" onclick="delete()">delete</a>
//       </div>
//     </div>
//     `;
// });
// document.getElementById("card").innerHTML=output;

// })
// function delete() {
//   swal({
//     title: "Good job!",
//     text: "You added a post!",
//     icon: "success",
//   });
// }

/* <button class="card-link" id="delete-post" onclick="delete()">delete</button> */

// .then(data => console.log(data))

//----------------------------------------------------------------------------//


//delete-edit
postsList.addEventListener('click',(e)=>{
    e.preventDefault();
    // console.log('hello');
    let delButtonIsPressed = e.target.id =='delete-post';
    let editButtonIsPressed = e.target.id =='edit-post';

    let id = e.target.parentElement.dataset.id;
    console.log(e.target.parentElement.dataset.id);

    if(delButtonIsPressed){
        // console.log('done');
        fetch(`${url}/${id}`, {
      method: 'DELETE',
         })
        //  .then(data => renderPosts(data))
        .then(res => res.json())
       .then(()=> location.reload())
    }

    if(editButtonIsPressed){
      const parent = e.target.parentElement;
      let titleContent = parent.getElementById('card-titleId').textContent;
      let bodyContent = parent.getElementById('card-textId').textContent;
      // const titleValue : HTMLElement
      titleValue.value = titleContent;
      bodyValue.value = bodyContent;


    //   fetch(`${url}/${id}`, {
    // method: 'DELETE',
    //    })
    //   //  .then(data => renderPosts(data))
    //   .then(res => res.json())
    //  .then(()=> location.reload())
  }


});

// });

//     if(delButtonIsPressed){
//         // console.log('done');
//         fetch(`${url}/${id}`,{
//             method: 'DELETE',
//         })
//         .then(res => res.json())
//         .then(() => location.reload())
//     }

// });

//----------------------------------------------------------------------------//

//insrt post

addPostForm.addEventListener('submit',(e)=>{
    e.preventDefault();

  fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title:titleValue.value,
    body:bodyValue.value,                                   
    

  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((res) => res.json())
  .then(data => {
    const dataArr = [];
    dataArr.push(data);
    renderPosts(dataArr);
    console.log(data);

  })

  //to empty the text area
  titleValue.value='';
  bodyValue.value='';

})

// fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   body: JSON.stringify({
//     title: titleValue.value,
//     body:bodyValue.value,
//     userId: 1,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((data) =>  {
//         const dataArr = [];
//         dataArr.push(data);
//         renderPosts(dataArr);
    
//       })
//       console.log(data);

//----------------------------------------------------------------------------//

//EDIT