function name(arr) {
   
}
   
async function getFnApi () {
    let res = await fetch ('https://random-data-api.com/api/v2/beers?size=10')
    let resJson = await res.json()
    
    return resJson
}
getFnApi()
    .then(resJson => {
        resJson.forEach ((elem) => {
            let card = 
            `
            <div id="${elem.id}" class="main">
                <div class="listOne">
                    <ul id='listUl'>
                        <li><img class="logo" src="https://static.politexpert.net/upload/images/2022/5/6/704458_full.jpeg" alt=""></li>
                        <li class="nameApi">${elem.name}</li>
                        <li class="alcoholApi">alc: ${elem.alcohol}</li>
                        <li class="idApi">coast: ${elem.id} tg</li>  
                        <li class="hrefBuy"><a class="hrefBuyBtn" href="#">Купить</a></li>
                    </ul>
                </div>
            </div>
            `
            let cardsHTML = document.querySelector('.cardsHTML')
            let div = document.createElement("div")
            div.className = 'a'

            div.innerHTML = card

            cardsHTML.appendChild(div)

            name(elem) 
       
        }) 
        
    })

    getFnApi()
    .then(result => {
        let btn = document.querySelectorAll('.main')
        btn.forEach(x => x.addEventListener('click', function(){
            console.log(result);
        }))
    }) 










    function addCardToShop() {
        cart.forEach((counter,key) => {
            if(counter>0) {
               let buyCart = beersArr.find(({id}) => id == key)
    
               let divData = {
                        png:'<img class="logoShop" src="https://static.politexpert.net/upload/images/2022/5/6/704458_full.jpeg" alt=""></img>',
                        name:buyCart.name,
                        alc:buyCart.alcohol,
                        coast:buyCart.id,
            }
            let divCreatre = document.createElement('div')
                    divCreatre.className = 'shopCart'
                    divCreatre.innerHTML = 
                    `
                    <ul class="ulShopCart">
                        <li class="shopCartPng">${divData.png}</li>
                        <li class="shopCartName">Call:${divData.name}</li>
                        <li class="shopCartAlc">Alc:${divData.alc}</li>
                        <li class="shopCartName">${divData.coast}</li>
                    
                    </ul>
                    `
                    let shopping = document.querySelector('.shopping')
                    
                    shopping.append(divCreatre)
                   
        }
        })
    }
    
    



















     
 let cart = new Map()
 let beersArr = []



// запрос на сервер получаем данные и преобразуем в json
fetch('https://random-data-api.com/api/v2/beers?size=10')
    .then(res => res.json())
    .then(beers => {
// для каждого елемента создаем карточку товара
        beersArr = beers
        beers.forEach ((elem) => {
            let card = 
            ` 
            <div class="main" id="${elem.id}">
                <div class="listOne">
                    <ul id='listUl'>
                        <li><img class="logo" src="https://static.politexpert.net/upload/images/2022/5/6/704458_full.jpeg" alt=""></li>
                        <li class="nameApi">${elem.name}</li>
                        <li class="alcoholApi">alc: ${elem.alcohol}</li>
                        <li class="idApi">coast: ${elem.id} tg</li>  
                        <li id="counts"><button class="counterMinus">-</button>
                        <span class="counter">0</span>
                        <span><button class="counterPlus">+</button></span>
                        </li>
                        <li class="hrefBuy" ><a class="hrefBuyBtn" href="#">Купить</a></li>
                    </ul>
                </div>
            </div>
            `
// обращаемся к html добавляем туда див с карточками товара
            let cardsHTML = document.querySelector('.cardsHTML')
            let div = document.createElement("div")
            div.className = 'a'
            div.innerHTML = card

            cardsHTML.appendChild(div) 
            cart.set(elem.id,0)
     })
     return beers
// добавляем счетчик для каждого товара
}).then(CreateCounter => {
    let counts = document.querySelectorAll('#counts')
     counts.forEach(elem => {
        let parents = elem.closest('.main')
        let id = parents.id
        let counter = elem.querySelector('.counter')
        let counterPlus = elem.querySelector('.counterPlus')
        let counterMinus = elem.querySelector('.counterMinus')
         
        counterPlus.addEventListener('click',function() {
            let e = cart.get(+id)
             e += 1
            cart.set(+id,+e)
            counter.innerText = e
            console.log(e);
        })
        counterMinus.addEventListener("click", function() {
            let e = cart.get(+id)
            if(counter.innerText>0) {
                e -= 1
                cart.set(+id,+e)
                counter.innerText = e
            }});  
     })
    
    return CreateCounter
  
}).then(getObjBtnBuy => {
// получаем в мар нужную карточку
    let btn = document.querySelectorAll('.hrefBuy')
    btn.forEach(x => x.addEventListener('click', function(){
        let parentsGetID = x.closest('.main')
        let id = parentsGetID.id
        let e = cart.get(+id)
        let parentsForCounter = x.parentElement
        let counter = parentsForCounter.querySelector('.counter')
        
        if (e==0) {
         e += 1
         cart.set(+id,+e)
         counter.innerText = e
        }
    })) 
    
})

function AddCartToShop(arr) {
    cart.forEach((val,key) => {
        if (val > 0) {
            arr.forEach(el => {
                if(el.id==key){
                    let newCart = 
                    `
                    <div class="shop">
                    <ul class="ulShop">
                    <li>${el.name}</li>
                    <li>${el.alcohol}</li>
                    <li>${el.id}</li>
                    </ul>
                    </div>
                    `
                }
            })
        }
    })
    
}

let shopingCard = document.querySelector('.shopingCard')

