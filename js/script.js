
const categories = async() =>{
    try{
        const res = await  fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const  data = await res.json();
        categoriesData(data.categories)

    }catch(error){
        console.error(error)
    }
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
        const newbtn = document.createElement('btn');
        newbtn.innerText = item.category;
        newbtn.className = 'btn btn-outline btn-info';
        categoriesContain.appendChild(newbtn);

    })
}

categories()