// const postsList = document.querySelector('.posts-list');
// const postsList = document.getElementById('POSTLIST');
const postsList = document.getElementById('card');

// const postsListId = document.querySelector('.posts-list');
// const addPostForm = document.querySelector('add-post-form');
const addPostForm = document.getElementById('add');
const titleValue = document.getElementById('title-value');
const bodyValue = document.getElementById('body-value');


let output = '';
let arr= [];

const renderPosts = (posts) => {
posts.forEach(post =>{
     output +=`
    <div class="card mt-4 col-md-6 bg-ligt">
      <div class="card-body" data-id=${post._id}>
        <h5 class="card-title">${post.work}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
        <p class="card-text">
          ${post.status}
        </p>
        <a href="#" class="card-link" id="edit-post">edit</a>
        <a href="#" class="card-link" id="delete-post" name=${post._id}>delete</a>
      </div>
    </div>
    `;
    }); 
     // postsList.innerHTML = output;
    document.getElementById("card").innerHTML=output;

}
const url = 'https://unicode-frontend1.onrender.com/todo';

//----------------------------------------------------------------------------//
//get
try {
 fetch(url)
.then(res => res.json())
// .then(data => renderPosts(data))
.then(data => {
 arr = data;

 const doSort = (arr)=>{
  return arr
  .sort((a,b) =>{
    if(a.status > b.status){return 1;}
    if(b.status > a.status){return -1;}
    return 0;
  })

 }
//  arr.sort();
 console.log(arr);

data.forEach(post =>{
    output +=`
    <div class="card mt-4 col-md-6 bg-ligt">
      <div class="card-body" data-id=${post._id}>
        <h5 class="card-title">${post.work}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
        <p class="card-text">
          ${post.status}
        </p>
        <a href="#" class="card-link" id="edit-post">edit</a>
        <a href="#" class="card-link" id="delete-post" name=${post._id}>delete</a>
      </div>
    </div>
    `;
});
document.getElementById("card").innerHTML=output;


}) 
} catch (error) {
  console.log("There is some ERROR")
}

//----------------------------------------------------------------------------//
addPostForm.addEventListener('submit',(e)=>{
  e.preventDefault();

fetch('https://unicode-frontend1.onrender.com/todo', {
method: 'POST',
body: JSON.stringify({
  work:titleValue.value,
  status:bodyValue.value,                                   
  

}),
headers: {
  'Content-type': 'application/json; charset=UTF-8',
},
})
.then((res) => res.json())
.then(data => {
  const dataArr = [];
  dataArr.push(data);
  renderPosts(dataArr); //maybe we need use updatedrArr so the deletion are maintained
  console.log(data);

})

//to empty the text area
titleValue.value='';
bodyValue.value='';

})

//----------------------------------------------------------------------------//
postsList.addEventListener('click',(e)=>{
  e.preventDefault();

  // console.log('hello');
  let delButtonIsPressed = e.target.id =='delete-post';
  let editButtonIsPressed = e.target.id =='edit-post';

  let id = e.target.parentElement.dataset._id;
  console.log(e.target.parentElement.dataset._id);

  if(delButtonIsPressed){
      console.log('done');
      fetch(`${url}/${id}`, {
    method: 'DELETE',
       })
      //  .then(data => renderPosts(data))
      .then(res => res.json())
     .then(()=> location.reload())
  }
});