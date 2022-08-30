const form = document.getElementById("a-form")
const formParts = form.querySelectorAll(".part")
const stepControl = document.getElementById("step-control")
const steps = stepControl.querySelectorAll(".step")
const btnControl = document.getElementById("btn-control")
const nextBtn = btnControl.querySelector(".btn-primary")
const prevBtn = btnControl.querySelector(".btn-bare")
const cartPanel = document.getElementById("cart-panel")
const total = document.getElementById("total")

const firstItemPrice = 3999
const secondItemPrice = 1299
let step = 0
let priceArr = [firstItemPrice, secondItemPrice]

// 步驟切換
function handleBtnControlClicked(e) {
  e.preventDefault()
  const nowStep = steps[step]
  if (e.target.matches(".btn-primary") && e.target.innerHTML === "下一步") {
    const nextStep = steps[step + 1]
    nowStep.classList.remove("active")
    nowStep.classList.add("checked")
    nextStep.classList.add("active")
    formParts[step].classList.toggle("d-none")
    formParts[step + 1].classList.toggle("d-none")
    step += 1
  } else if (e.target.matches(".btn-bare")) {
    const prevStep = steps[step - 1]
    nowStep.classList.remove("active")
    prevStep.classList.remove("checked")
    prevStep.classList.add("active")
    formParts[step].classList.toggle("d-none")
    formParts[step - 1].classList.toggle("d-none")
    step -= 1
  }
  setBtnDisplayNone()
}

// 下一步按鍵
function setBtnDisplayNone() {
  if (step === 0) {
    prevBtn.classList.add("d-none")
    nextBtn.classList.add("w-100")
  } else {
    prevBtn.classList.remove("d-none")
    nextBtn.classList.remove("w-100")
  }

  if (step === 2) {
    nextBtn.innerHTML = "確認下單"
  } else {
    nextBtn.innerHTML = "下一步"
  }
}

// 更改商品數量
function modifyCartItems(e) {
  if (e.target.matches(".circle") && e.target.innerHTML === "+") {
    const presentAmount = e.target.previousElementSibling
    const newAmount = Number(presentAmount.innerText) + 1
    presentAmount.innerText = newAmount
    if (e.target.parentElement.parentElement.parentElement.matches(".first")) {
      addPrice(e, firstItemPrice)
    } else if (
      e.target.parentElement.parentElement.parentElement.matches(".second")
    ) {
      addPrice(e, secondItemPrice)
    }
  } else if (e.target.matches(".circle") && e.target.innerHTML === "-") {
    const presentAmount = e.target.nextElementSibling
    const newAmount = Number(presentAmount.innerText) - 1
    presentAmount.innerText = newAmount
    if (e.target.parentElement.parentElement.parentElement.matches(".first")) {
      decreasePrice(e, firstItemPrice)
    } else if (
      e.target.parentElement.parentElement.parentElement.matches(".second")
    ) {
      decreasePrice(e, secondItemPrice)
    }
  }
}

// 更改商品價格
function addPrice(e, items) {
  priceArr.push(items)
  const itemsPrice = e.target.parentElement.nextElementSibling
  const filteredArr = priceArr.filter((p) => p === items)
  const price = filteredArr.reduce((a, b) => a + b)
  itemsPrice.innerText = `$${parseInt(price).toLocaleString()}`
  getTotalPrice()
}

function decreasePrice(e, items) {
  const itemsPrice = e.target.parentElement.nextElementSibling
  const index = priceArr.indexOf(items)
  let filteredArr = priceArr.filter((p) => p === items)

  if (filteredArr.length > 1 && index > -1) {
    priceArr.splice(index, 1)
  } else {
    return (e.target.nextElementSibling.innerText = "1")
  }
  filteredArr = priceArr.filter((p) => p === items)
  if (filteredArr.length >= 1) {
    const price = filteredArr.reduce((a, b) => a + b)
    itemsPrice.innerText = `$${parseInt(price).toLocaleString()}`
  }
  getTotalPrice()
}

// total price
function getTotalPrice(e) {
  const totalPrice = priceArr.reduce((a, b) => a + b)
  total.lastElementChild.innerText = `$${parseInt(totalPrice).toLocaleString()}`
}

btnControl.addEventListener("click", handleBtnControlClicked)
cartPanel.addEventListener("click", modifyCartItems)
