
const categories = async() =>{
    try{
        const res = await  fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const  data = await res.json();
        categoriesData(data.categories)

    }catch(error){
        console.error(error)
    }
}
const categoryVideos = async() =>{
    try{
        const res = await  fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
        const  data = await res.json();
        // videosData(data.videos)

    }catch(error){
        console.error(error)
    }
}

const categoriesLoadDta = async(id) =>{
    const res = await fetch (`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    const data = await res.json();
    videosData(data.category)
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
            <button onclick=categoriesLoadDta(${item?.category_id}) class="btn btn-outline btn-info">${item?.category}</button>
        `;
        categoriesContain.appendChild(div);

    })
}

// videos js
const videosData = (videos) =>{
    const videosContain = document.getElementById('videos-contain');
    if(videos.length === 0){
        videosContain.classList.remove('grid')
        videosContain.innerHTML = `
        <h3 class="flex justify-center items-center container font-bold text-xl">No More Data.</h3>
    `;
    }
    else{
        videosContain.classList.add('grid')
        videosContain.innerHTML = "";
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
                        <i class="fa-solid fa-circle-check text-blue-600 text-xl"></i>
                    </div>
                    <div class="">
                    <h6>View: ${video?.others?.views}</h6>
                    </div>
                </div>
            </div>
        `;
        videosContain.appendChild(newDiv);
    })
}

categories()
categoryVideos()