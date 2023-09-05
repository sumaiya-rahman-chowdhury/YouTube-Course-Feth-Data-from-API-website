let info = [] 
const hiddenContainer = document.getElementById('hidden');
const hancleClick = async()=>{
    
    const tabContainer = document.getElementById('tab-container');
    const datas = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await datas.json() ;
    // console.log(data.data);
    data.data.forEach((data)=>{
       
        const div = document.createElement('div');
        div.innerHTML = `
        <a class="tab bg-[#25252533] text-black  px-[20px] rounded-[4px] hover:bg-[#FF1F3D] tab-active" onclick="LoadCategoryData('${data.category_id}')">${data.category}</a> 
        `
    
        tabContainer.appendChild(div)
    });
}
const LoadCategoryData = async(id)=>{
    const cards = document.getElementById('cards');
    cards.innerHTML = " "
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    // console.log(data.data);
    
   info = data.data;
   
    // 
    // 
    // hidden layer)****************************
    if((info).length == 0){
      hiddenContainer.classList.remove('hidden');
    }
    else{
        hiddenContainer.classList.add('hidden')
    }
    // ***********************************
    // 
    displayShow(info);
   

}
const displayShow= (info) =>{
    const cards = document.getElementById('cards');
    cards.innerHTML = " "
    info.forEach((data)=>{
      
        const div = document.createElement('div');
        const time = data?.others?.posted_date !== undefined ? data.others.posted_date : " ";
        const hrs = Math.floor(time / 3600);
        const remSec = time % 3600;
        const minutes =  Math.floor(remSec / 60)
       
        div.innerHTML = `
        <div class="card  bg-base-100 shadow-xl">
        <div>
        <img src="${data?.thumbnail}" alt="Shoes" class="rounded w-full h-[200px] relative"/>
        <p class="text-[10px] absolute top-[11.5rem] right-[0.5rem] text-white bg-black px-1 rounded font-bold">${hrs !== 0 ? hrs + 'hrs' : " "}  ${minutes !==0 ? minutes + 'min ago' : " "} </p>
        </div>
        <div class="mt-[20px] mb-[9px]">
            <div class="flex gap-x-4 ">
                <img src="${data?.authors[0]?.profile_picture}" alt="" class="w-[50px] h-[50px] rounded-full">
                <h2 class="card-title">${data?.title}</h2>
            </div>
         <div class="flex ml-[4.25rem] mt-2 gap-x-2 items-center">
            <p class="text-[#171717B3] text-[14px]">${data?.authors[0]?.profile_name}</p>
            ${data?.authors[0]?.verified !== false ? '<img src="fi_10629607.svg" alt="Verified" class="w-5 h-5">' : ''}
         </div>
          <p class="text-[#171717B3] text-[14px] ml-[4.25rem] mt-2">${data?.others?.views} views</p>
        </div>
      </div>

        
        `
        cards.appendChild(div);

    
    })
}

const sortByViews = () =>{
    info.sort((a,b)=>{
        const num1 = parseFloat(a.others.views) ;
        const num2 = parseFloat(b.others.views) ;
        return num2 - num1

    })
    console.log(info)

    displayShow(info)

}




hancleClick();
LoadCategoryData("1000")
