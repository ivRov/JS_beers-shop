 
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
                        <li><img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/NCI_Visuals_Food_Beer.jpg/1200px-NCI_Visuals_Food_Beer.jpg" alt="img"></li>
                        <li class="nameApi">${elem.name}</li>
                        <li class="alcoholApi">alc: ${elem.alcohol}</li>
                        <li class="idApi">coast: ${elem.id} tg</li>  
                        <li id="counts"><button class="counterMinus">-</button>
                        <span class="counter">0</span>
                        <span><button class="counterPlus">+</button></span>
                        </li>
                        <li class="hrefBuy" ><a class="hrefBuyBtn" href="#">buy</a></li>
                    </ul>
                </div>
            </div>
            `
// обращаемся к html добавляем туда див с карточками товара
            let cardsHTML = document.querySelector('.cardsHTML')
            let div = document.createElement("div")
            div.className = 'topDivCart'
            div.innerHTML = card

            cardsHTML.appendChild(div) 
            cart.set(elem.id,0)
     })
     return beers
// счетчик товара
}).then(CreateCounter => {
    let counts = document.querySelectorAll('#counts')
        counts.forEach(elem => {
        let parents = elem.closest('.main')
        let id = parents.id
        let counter = elem.querySelector('.counter')
        let counterPlus = elem.querySelector('.counterPlus')
        let counterMinus = elem.querySelector('.counterMinus')
         
        counterPlus.addEventListener('click',function() {
            let getId = cart.get(+id)
            getId += 1
            cart.set(+id,+getId)
            counter.innerText = getId
            counterSum()  
            
        })
        counterMinus.addEventListener("click", function() {
            let getId = cart.get(+id)
            if(counter.innerText>0) {
                getId -= 1
                cart.set(+id,+getId)
                counter.innerText = getId
                counterSum()  
            }});
            
     })
    return CreateCounter
  
}).then(getObjBtnBuy => {
// получаем в мар нужную карточку 
    let btn = document.querySelectorAll('.hrefBuy')
    btn.forEach(el => el.addEventListener('click', function(preventDef){
        preventDef.preventDefault()
        let parentsGetID = el.closest('.main')
        let id = parentsGetID.id
        let getId = cart.get(+id)
        let parentsForCounter = el.parentElement
        let counter = parentsForCounter.querySelector('.counter')
        
        if (getId==0) {
            getId += 1
            cart.set(+id,+getId)
            counter.innerText = getId
        }
        // счетчик в хедере
        counterSum()
     
    })) 
})

// событие на клик корзины получить карту товара
let shopingCard = document.querySelector('.shopingCard')

shopingCard.addEventListener('click',function() {
    let sumWithInitial = calculateSum()
    document.querySelectorAll('.shopCart').forEach(el => el.remove())
    addCardToShop()
    let sum = document.querySelector('.sum')
    let card = document.querySelector('.card')
    sumWithInitial > 0 ? sum.innerText = `total: ${sumWithInitial} tg` : sum.innerText =''
    sumWithInitial > 0 ? card : card.innerHTML =`shopping card <span><a href="#" class="close">+</a></span>`
    let shoppingMain = document.querySelector('.shoppingMain')
    shoppingMain.style.display ='block'
    let close = document.querySelector('.close')
    close.addEventListener('click',function(){
        shoppingMain.style.display = 'none'
    })
})

// сумма заказа
function calculateSum() {
    return  beersArr.reduce((acc,value) => {
        let quantity = cart.get(value.id)
        if (quantity > 0) {
            acc += value.id * quantity
        }
        return acc
    },0) 
}

// поиск и отрисовка в корзине карточек товара
function addCardToShop() {
    cart.forEach((counter,key) => {
        if(counter>0) {
           let buyCart = beersArr.find(({id}) => id == key)
            let divData = {
                    png:'<img class="logoShop" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/NCI_Visuals_Food_Beer.jpg/1200px-NCI_Visuals_Food_Beer.jpg" alt="img"></img>',
                    name:buyCart.name,
                    alc:buyCart.alcohol,
                    coast:buyCart.id,
                }
                
            let divCreatre = document.createElement('div')
                divCreatre.className = 'shopCart'
                divCreatre.innerHTML =
                `
                <ul class="ulShopCart" id="${divData.coast}">
                    <li class="shopCartPng">${divData.png}</li>
                    <li class="shopCartName">Call: ${divData.name}</li>
                    <li class="shopCartAlc">Alc: ${divData.alc}</li>
                    <li class="count">
                    Count: ${counter}
                    <span> <button class="countMinus">-</button> </span>
                    <span><button class="countPlus">+</button></span></li></li>
                    <li class="shopCartName">${divData.coast} tg</li>
                    
                </ul>
                `
                let shopping = document.querySelector('.shopping')
                shopping.append(divCreatre)

                let countMinus = document.querySelectorAll('.countMinus')
                countMinus.forEach(el => {
                    let x = el.closest('.ulShopCart')
                    
                })
            
    }
    })
}
//   количество товаров в корзине
function counterSum() {
    let sumCarts = 0 ;
    cart.forEach(el => {
     return sumCarts+=el
    })
    let shoppingCardLink = document.querySelector('.shoppingCardLink')
    shoppingCardLink.textContent = 'shopping card' + ' ' + sumCarts
    if (sumCarts > 0) {
     shoppingCardLink.style.color = 'yellow'
    }
    if (sumCarts == 0) {
        shoppingCardLink.style.color = 'white'
       }
}     






