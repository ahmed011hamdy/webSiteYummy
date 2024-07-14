/// <reference types="../@types/jquery"/>
/*******************************************************************aside bar*/
$('#open').on('click', function () {
    $('#close').removeClass('d-none');
    $('#open').addClass('d-none');
    $('#logo-Yumm').animate({ left: '25%' }, 800);
    $('.w-25').animate({ left: '0px' }, 800);
    $('#links a').show(1100)
})

$('#close').on('click', function () {
    $('#open').removeClass('d-none');
    $('#close').addClass('d-none');
    $('#logo-Yumm').animate({ left: '0px' }, 800);
    $('.w-25').animate({ left: '-25%' }, 800);
    $('#links a').hide(1100);
})

/********************************************************************default API */
let Main = document.querySelector('.main')
async function DefaultApi(search = " ") {

    loding.classList.remove('d-none');

    const Api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    const respone = await Api.json()
    loding.classList.add('d-none');
    respone.meals
    if (respone.meals != null) {
        DefaultMeal(respone.meals);
    }
}
DefaultApi()
function DefaultMeal(meal) {
    let contan = ``;
    console.log(meal);
    for (let i = 0; i < meal.length; i++) {
        contan += `
        <div id="${meal[i].idMeal}" class="colData col-md-3">
                        <figure id="figure" class="overflow-hidden position-relative  rounded-4 bg-black text-center">
                            <img id="img" src="${meal[i].strMealThumb}" class="w-100" alt="">
                            <figcaption class="figcaption d-flex align-items-center fs-1">
                                <p id="desc_img">${meal[i].strMeal}</p>
                            </figcaption>
                        </figure>
                    </div>
        `
    }
    Main.innerHTML = contan;

    $('.colData').on('click', function () {
        detailsAPI(this.id)
    })
}

/***********************************************************dispalyDetails */
async function detailsAPI(id) {
    loding.classList.remove('d-none');

    let API = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let respone = await API.json()
    loding.classList.add('d-none');
    console.log(respone.meals);
    defaultDetails(respone.meals);

}
function defaultDetails(meal) {
    let contain = ` <div class="col-md-4 ">
                        <div class="position-relative">
                            <img  src="${meal[0].strMealThumb}" class="w-100 rounded-3" alt="${meal[0].strMeal}">
                            <div class="icon position-absolute top-0 end-0">
                                <i class="icon1 fa-solid fa-qrcode"></i>
                                <div class=" text-light position-absolute top-50">
                                    <i class="icon_2 fa-solid fa-plus"></i>
                                    <i class="icon_2 fa-solid fa-list-ul"></i>
                                </div>
                            </div>
                            <h2 class="text-light mt-2">${meal[0].strMeal}</h2>
                        </div>
                    </div>
                    <div class="col-md-7 text-light">
                        <p class="fs-1">Instructions</p>
                        <p>${meal[0].strInstructions} </p>
                        <h3 class="fw-bolder">Area : <span class="fs-3 fw-medium">${meal[0].strArea}</span></h3>
                        <h3 class="fw-bolder">Category : <span class="fs-3 fw-medium">${meal[0].strCategory}</span></h3>
                        <h3 class="fw-bolder">Recipes :
                            <p id="Recipes" class="fs-5 mt-3 fw-medium">${AllRecipes(meal)} </p>
                        </h3>
                        <h3 class="fw-bolder">Tags :
                            <p id="Tags" class="fs-5 mt-3 fw-medium"> ${AllTags(meal)}</p>
                        </h3>
                        <a id="source" target="_blank" href="${meal[0].strSource}"><button class="btn btn-success">source</button></a>
                        <a id="Youtube" target="_blank" href="${meal[0].strYoutube}"><button class="btn btn-danger">Youtube</button></a>
                    </div>`
    Main.innerHTML = contain;
    DIVsearch.classList.add('d-none')
}
function AllRecipes(meal) {
    let arrRecipes = [];
    let Measure = 'strMeasure';
    let Ingredient = 'strIngredient'
    for (let i = 1; i < 21; i++) {
        if (meal[0][Measure + i] == " " || meal[0][Measure + i] == null || meal[0][Ingredient + i] == " " || meal[0][Ingredient + i] == null) {
            continue;
        }
        else {
            arrRecipes.push(`<span class="bg-info-subtle text-dark rounded-2 mb-3 me-3 px-2 d-inline-block">${meal[0][Measure + i] + meal[0][Ingredient + i]}</span >`)
        }
    }
    return arrRecipes.join(' ');
}
function AllTags(meal) {
    let arrTags = [];
    let str;
    let strTags = 'strTags';
    if (meal[0][strTags] != null) {
        str = meal[0][strTags].replace(',', ' ').split(' ');
        for (let i = 0; i < str.length; i++) {
            arrTags.push(`<span class="bg-danger-subtle text-dark rounded-2 mb-3 me-3 px-2 d-inline-block"> ${str[i]} </span>`)
        }
    }
    return arrTags.join(' ');
}

/************************************************************************************************************search */
let searchName = document.getElementById('searchName');
let searchLetter = document.getElementById('searchLetter');
let DIVsearch = document.querySelector('.Search');

$('#Search').on('click', function () {
    DIVsearch.classList.remove('d-none')
    Main.innerHTML = '';
    $('#logo-Yumm').animate({ left: '0px' }, 800);
    $('.w-25').animate({ left: '-25%' }, 800);
    $('#open').removeClass('d-none');
    $('#close').addClass('d-none');
    Main.classList.remove('d-none');
    Contact.classList.add('d-none');

})

searchName.addEventListener('input', function () {
    DefaultApi(searchName.value);
})

async function Letter(letter) {

    loding.classList.remove('d-none');
    if (letter == '') {
        letter = 'a'
    }
    let Api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let respone;
    respone = await Api.json();
    loding.classList.add('d-none');
    console.log(respone.meals);
    DefaultMeal(respone.meals);
}

searchLetter.addEventListener('input', function () {
    Letter(searchLetter.value);
})

/************************************************************************************************************Categories */
async function ApiCategories() {

    loding.classList.remove('d-none');

    let Api = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let respone = await Api.json()
    loding.classList.add('d-none');
    console.log(respone.categories);
    dipalyCategories(respone.categories)

}
$('#Categories').on('click', function () {
    DIVsearch.classList.add('d-none')
    ApiCategories();
    $('#logo-Yumm').animate({ left: '0px' }, 800);
    $('.w-25').animate({ left: '-25%' }, 800);
    $('#open').removeClass('d-none');
    $('#close').addClass('d-none');
    Main.classList.remove('d-none')
    Contact.classList.add('d-none');

})
function dipalyCategories(meals) {
    let contan = ``;
    console.log(meals);

    for (let i = 0; i < meals.length; i++) {
        contan += `
        <div id="${meals[i].idCategory}" class="colData col-md-3">
                        <figure id="figure" class="overflow-hidden position-relative  rounded-4 bg-black text-center">
                            <img id="img" src="${meals[i].strCategoryThumb}" class="w-100" alt="">
                            <figcaption class="figcaption text-center fs-1">
                                <h2 id="desc_img" class="fs-2"> ${meals[i].strCategory}</h2>
                                <p class="fs-6">${meals[i].strCategoryDescription.split(' ').slice(0, 20).join(' ')}</p>
                            </figcaption>
                        </figure>
                    </div>
        `
    }
    Main.innerHTML = contan;

    $('.colData').on('click', function () {
        dispalyDataCategories(meals[this.id].strCategory)
    })
}

async function dispalyDataCategories(Categories) {

    loding.classList.remove('d-none');
    const Api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Categories}`)
    const respone = await Api.json()
    loding.classList.add('d-none');
    respone.meals
    if (respone.meals != null) {
        DefaultMeal(respone.meals);
    }

}


/*************************************************************************************************************Area */
async function ApiArea() {
    loding.classList.remove('d-none');
    let Api = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let respone = await Api.json()
    loding.classList.add('d-none');
    console.log(respone.meals);
    dispalyArea(respone.meals)

}
$('#Area').on('click', function () {
    ApiArea();
    DIVsearch.classList.add('d-none');
    $('#logo-Yumm').animate({ left: '0px' }, 800);
    $('.w-25').animate({ left: '-25%' }, 800);
    $('#open').removeClass('d-none');
    $('#close').addClass('d-none');
    Main.classList.remove('d-none')
    Contact.classList.add('d-none');

})
function dispalyArea(Area) {
    let contan = ``;
    console.log(Area);

    for (let i = 0; i < Area.length; i++) {
        contan += `
        <div id="${Area[i].strArea}" class="colData col-md-3">
                        <div class="overflow-hidden position-relative text-light fa-arrow-pointer rounded-4 bg-black text-center">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h2 id="desc_img" class="fs-2"> ${Area[i].strArea}</h2>
                        </div>
                    </div>
        `
    }
    Main.innerHTML = contan;

    $('.colData').on('click', function () {
        dispalyDataArea(this.id)
    })
}

async function dispalyDataArea(Area) {
    loding.classList.remove('d-none');
    const Api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
    const respone = await Api.json()
    loding.classList.add('d-none');
    respone.meals
    if (respone.meals != null) {
        DefaultMeal(respone.meals);
    }

}


/***********************************************************************************************************Ingredients */
$('#Ingredients').on('click', function () {
    ApiIngredients()
    DIVsearch.classList.add('d-none');
    $('#logo-Yumm').animate({ left: '0px' }, 800);
    $('.w-25').animate({ left: '-25%' }, 800);
    $('#open').removeClass('d-none');
    $('#close').addClass('d-none');
    Main.classList.remove('d-none')
    Contact.classList.add('d-none');
})

async function ApiIngredients() {
    loding.classList.remove('d-none');
    let Api = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let respone = await Api.json()
    loding.classList.add('d-none');
    diplayIngredients(respone.meals)
}

function diplayIngredients(meals) {
    let contan = ``;
    console.log(meals);

    for (let i = 0; i < 20; i++) {
        contan += `
        <div id="${meals[i].idIngredient}" class="colData col-md-3">
                        <div class="overflow-hidden position-relative text-light fa-arrow-pointer rounded-4 bg-black text-center">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h2 id="desc_img" class="fs-2">${meals[i].strIngredient}</h2>
                            <p class="fs-6">${meals[i].strDescription.split(' ').slice(0, 10).join(' ')}</p>
                        </div>
                    </div>
        `
    }
    Main.innerHTML = contan;

    $('.colData').on('click', function () {
        DiplayIngredients(meals[this.id - 1].strIngredient)
    })
}

async function DiplayIngredients(meal) {
    loding.classList.remove('d-none');
    const Api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`)
    const respone = await Api.json()
    loding.classList.add('d-none');
    respone.meals
    if (respone.meals != null) {
        DefaultMeal(respone.meals);
    }

}




/***********************************************************************************************************contact us */
let NameInput = document.getElementById('Name');
let EmailInput = document.getElementById('Email');
let AgeInput = document.getElementById('Age');
let PhoneInput = document.getElementById('Phone');
let PasswordInput = document.getElementById('Password');
let RePasswordInput = document.getElementById('RePassword');
let btn = document.getElementById('btn');
let inputs = document.querySelectorAll('.Contact input');
let Contact = document.querySelector('.Contact');

$('#Contact').on('click', function () {
    DIVsearch.classList.add('d-none');
    $('#logo-Yumm').animate({ left: '0px' }, 800);
    $('.w-25').animate({ left: '-25%' }, 800);
    $('#open').removeClass('d-none');
    $('#close').addClass('d-none');
    Main.classList.add('d-none')
    Contact.classList.remove('d-none');
})

// function countact() {
//     let countan = `
//         <section class="Contact  overflow-hidden d-none text-center">
//             <div class="row">
//                 <div class="text-center vh-100 d-flex flex-column gap-4 justify-content-center align-items-center">
//                     <div class="inputs w-75 gap-3 mx-auto d-flex justify-content-center">
//                         <div class="w-100">
//                             <input id="Name" type="text" placeholder="Enter Your Name" class="form-control">
//                             <div id="alert-name" class="mt-2 d-none alert alert-danger">Special characters 20 and
//                                 numbers
//                                 not
//                                 allowed
//                             </div>
//                         </div>
//                         <div class="w-100">
//                             <input id="Email" type="text" placeholder="Enter Your Email" class="form-control">
//                             <div id="alert-Email" class="mt-2 d-none alert alert-danger">Email not valid
//                                 *exemple@yyy.zzz
//                             </div>
//                         </div>
//                     </div>
//                     <div class="inputs w-75 gap-3 mx-auto d-flex justify-content-center">
//                         <div class="w-100">
//                             <input id="Phone" type="number" placeholder="Enter Your Phone" class="form-control">
//                             <div id="alert-Phone" class="my-2 d-none alert alert-danger">Enter valid Phone Number</div>
//                         </div>
//                         <div class="w-100">
//                             <input id="Age" type="number" placeholder="Enter Your Age" class="form-control">
//                             <div id="alert-Age" class="my-2 d-none alert alert-danger">Enter valid age 10 : 100</div>
//                         </div>
//                     </div>
//                     <div class="inputs w-75 gap-3 mx-auto d-flex justify-content-center">
//                         <div class="w-100">
//                             <input id="Password" type="password" placeholder="Enter Your Password" class="form-control">
//                             <div id="alert-Password" class="mt-2 d-none alert alert-danger">Enter valid password
//                                 *Minimum
//                                 eight characters, at
//                                 least
//                                 one
//                                 letter and one number:* (8 numbers)</div>
//                         </div>
//                         <div class="w-100">
//                             <input id="RePassword" type="password" placeholder="RePassword" class="form-control">
//                             <div id="alert-RePassword" class="mt-2 d-none alert alert-danger">Enter valid repassword
//                             </div>
//                         </div>
//                     </div>
//                     <div class="button">
//                         <button id="btn" class="disabled btn btn-outline-danger">
//                             submit
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     `
//     Main.innerHTML = countan
// }
function regex() {
    let regexUser = {
        Name: /^\w{3,20}$/,
        Email: /^\w{3,20}@gmail.com$/,
        Age: /^([1-9][0-9]|100)$/,
        Phone: /^(010|011|012|015)[0-9]{8}$/,
        Password: /^\d{8}$/,
    }
    NameInput.addEventListener('input', function () {
        if (regexUser.Name.test(NameInput.value)) {
            NameInput.nextElementSibling.classList.add('d-none');
        }
        else {
            NameInput.nextElementSibling.classList.remove('d-none');
        }
    })
    EmailInput.addEventListener('input', function () {
        if (regexUser.Email.test(EmailInput.value)) {
            EmailInput.nextElementSibling.classList.add('d-none');
        }
        else {
            EmailInput.nextElementSibling.classList.remove('d-none');
        }
    })
    PhoneInput.addEventListener('input', function () {
        if (regexUser.Phone.test(PhoneInput.value)) {
            PhoneInput.nextElementSibling.classList.add('d-none');
        }
        else {
            PhoneInput.nextElementSibling.classList.remove('d-none');
        }
    })
    Age.addEventListener('input', function () {
        if (regexUser.Age.test(Age.value)) {
            Age.nextElementSibling.classList.add('d-none');
        }
        else {
            Age.nextElementSibling.classList.remove('d-none');
        }
    })
    PasswordInput.addEventListener('input', function () {
        if (regexUser.Password.test(PasswordInput.value)) {
            PasswordInput.nextElementSibling.classList.add('d-none');
        }
        else {
            PasswordInput.nextElementSibling.classList.remove('d-none');
        }
    })
    RePasswordInput.addEventListener('input', function () {
        if (RePasswordInput.value == Password.value) {
            RePasswordInput.nextElementSibling.classList.add('d-none');
        }
        else {
            RePasswordInput.nextElementSibling.classList.remove('d-none');
        }
    })
    if (regexUser.Name.test(NameInput.value) == true && regexUser.Email.test(EmailInput.value) == true && regexUser.Phone.test(PhoneInput.value) == true && regexUser.Age.test(AgeInput.value) == true && regexUser.Password.test(PasswordInput.value) == true && RePasswordInput.value == Password.value) {
        return true
    }
    else {
        return false
    }
}
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', function (e) {
        if (regex() == true) {
            btn.classList.remove('disabled');
        }
        else {
            btn.classList.add('disabled');
        }
    })
}
/***********************************************************************************************************************contact us */