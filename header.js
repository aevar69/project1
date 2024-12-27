// sidebar
function togglesubmenu(button){
button.nextElementSibling.classList.toggle('show')
button.classList.toggle('rotate')
};

function refreshbutton(){
location.reload();

}

//end sidebar

document.addEventListener('DOMContentLoaded', () => {
    const modalPostForm = document.getElementById('modalPostForm');
    const postsList = document.getElementById('postsList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modalTitleInput = document.getElementById('modalTitleInput');
    const modalDescriptionInput = document.getElementById('modalDescriptionInput');
    const modalPriceInput = document.getElementById('modalPriceInput');
    const modalPhoneInput = document.getElementById('modalPhoneInput');
    const modalCategoryInput = document.getElementById('modalCategoryInput');
      const modalImageInput = document.getElementById('modalImageInput');
    const postModal = new bootstrap.Modal(document.getElementById('postModal'));
    const posts = []; // مصفوفة لتخزين المنشورات
   
  



    // عرض المنشورات
    const renderPosts = (filter = 'all') => {
        postsList.innerHTML = '';
        const filteredPosts = posts.filter(post => filter === 'all' || post.category === filter);
        filteredPosts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.className = 'post-card card shadow-sm mb-3';
            postElement.innerHTML = `
                
                <div class="body-post row g-0">
                <div class="body-picture col-md-4">
                
                <i style="color:white; " id="bil" class="bi bi-chevron-left"></i>

                <div class="image-container">
                <img src="${post.image}" alt="${post.title}" class="resize-image">
                </div>

               <i style="color:white;" id="bir" class="bi bi-chevron-right"></i>


               <div class="heart position-absolute black ">

                  <i id="heart1" onclick=clickheart(this) class="bi bi-heart"></i>

               </div>

                </div>

               

                <div class="card-body">
                
                    <h6 style="color:#d2d2d2;" class="card-title">${post.title}</h6>

                    <p rows="5" cols="30"class="card-text">${post.description}</p>

                    <p class="text-primary">رقم الهاتف: ${post.phoneNumber}</p>

                  <p class="text-price">السعر: ${post.price} دينار</p>

                  <p class="text-type"> type: ${post.category} </p>
                
                  </div>
        </div>
            `;
            postsList.appendChild(postElement);
        });
    };

   




    // إضافة منشور جديد
    modalPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const imageFile = modalImageInput.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const newPost = {
                title: modalTitleInput.value,
                description: modalDescriptionInput.value,
                price: modalPriceInput.value,
                phoneNumber: modalPhoneInput.value,
                category: modalCategoryInput.value,
                image: event.target.result
            };
            posts.push(newPost);
            renderPosts();
            modalPostForm.reset();
            postModal.hide();
        };
        reader.readAsDataURL(imageFile);
    });

    // تطبيق الفلاتر
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderPosts(e.target.getAttribute('data-filter'));
        });
    });

     // عرض المنشورات عند تحميل الصفحة
});