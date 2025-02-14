// active btn------
function activeCategoryBtn (id) {
    const categoryBtns = document.getElementsByClassName('btn-category');
    
    for(const categoryBtn of  categoryBtns){
        categoryBtn.classList.add('btn-outline')
    }
    document.getElementById(`category-btn-${id}`).classList.remove('btn-outline');
}


//  fetch api data-----------------------------------------------------

const categories = async() =>{
    try{
        const res = await  fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const  data = await res.json();
        categoriesData(data.categories)

    }catch(error){
        console.error(error)
    }
}
const categoryVideos = async(searchId = "") =>{
    try{
        const res = await  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchId}`);
        const  data = await res.json();
        videosData(data.videos)

    }catch(error){
        console.error(error)
    }
}

const categoriesLoadDta = async(id) =>{
    const res = await fetch (`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    const data = await res.json();

    activeCategoryBtn(id)
    videosData(data.category)
}

 const videoLoadData =  async(videoId) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
    const data = await res.json();
    videoDisplayDataDetaild(data.video)
 };

 const videoDisplayDataDetaild = (videoDetails) =>{
    // document.getElementById('showModalData').click();
    console.log(videoDetails)
    document.getElementById('customModal').showModal();
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = `
        <img src="${videoDetails?.thumbnail}" alt="">
        <h2 class="card-title font-bold">${videoDetails?.title}</h2>
        <h2 class="card-title font-light">${videoDetails?.description}</h2>
    `
 }

const categoriesData = (data) =>{
    const categoriesContain = document.getElementById('categories-contain');
    // methor-1
    // for(category of data){
    //     console.log(category.category)
    
    // mathord- 2
    // }
    // const categorys = data?.map(cat => console.log(cat))
    // console.log(categorys)

    data.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = 
        `
            <button id="category-btn-${item?.category_id}" onclick="categoriesLoadDta('${item?.category_id}')" class="btn btn-outline btn-info btn-category">${item?.category}</button>
        `;
        categoriesContain.appendChild(div);
    })
}

// videos js
const videosData = (videos) =>{
    const videosContain = document.getElementById('videos-contain');
    videosContain.innerHTML = "";

    if(videos.length == 0){
        videosContain.classList.remove('grid')
        videosContain.innerHTML = `
        <h3 class="flex justify-center items-center container font-bold text-xl">No More Data.</h3>
        `;
        return;
    }
    else{
        videosContain.classList.add('grid');
    }

    videos.forEach(video =>{
        const newDiv = document.createElement('div');
        newDiv.innerHTML =`
            <div class="card bg-base-100 shadow-xl">
                <figure>
                    <img class="w-full h-56 object-cover" src="${video?.thumbnail}"
                    alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title font-bold">${video?.title}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class ="flex gap-4">
                        <h4 class="font-semibold ">${video?.authors[0].profile_name} </h4>
                        ${video?.authors[0].verified == true ? `<i class="fa-solid fa-circle-check text-blue-600 text-xl"></i>` : 'False'}
                        
                    </div>
                    <div class="">
                    <h6>View: ${video?.others?.views}</h6>
                    </div>
                    <button onclick = 'videoLoadData("${video.video_id}")' class="btn btn-outline btn-info">Details</button>
                </div>
            </div>
        `;
        videosContain.appendChild(newDiv);
    })
}

document.getElementById('search-id').addEventListener('keyup', (e)=>{
    const searchEvent = e.target.value;
    categoryVideos(searchEvent)
})


categories()
categoryVideos()