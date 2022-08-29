import './scss/main.scss'
console.log('JS loaded!')

const form = document.getElementById('a-form')
const formParts = form.querySelectorAll('.part')
const stepControl = document.getElementById('step-control')
const steps = stepControl.querySelectorAll('.step')
const btnControl = document.getElementById('btn-control')
const nextBtn = btnControl.querySelector('.btn-primary')
const prevBtn = btnControl.querySelector('.btn-bare')

let step = 0

// 步驟切換
function handleBtnControlClicked(e) {
  e.preventDefault()
  const target = e.target
  const nowStep = steps[step]
  if (e.target.matches('.btn-primary') && e.target.innerHTML === '下一步') {
    const nextStep = steps[step + 1]
    nowStep.classList.remove('active')
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step + 1].classList.toggle('d-none')
    step += 1
  } else if (e.target.matches('.btn-bare')) {
    const prevStep = steps[step - 1]
    nowStep.classList.remove('active')
    prevStep.classList.remove('checked')
    prevStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step - 1].classList.toggle('d-none')
    step -= 1
  }
  setBtnDisplayNone()
}

// 下一步按鍵
function setBtnDisplayNone() {
  if (step === 0) {
    prevBtn.classList.add('d-none')
    nextBtn.classList.add('w-100')

  } else {
    prevBtn.classList.remove('d-none')
    nextBtn.classList.remove('w-100')
  }

  if (step === 2) {
    nextBtn.innerHTML = '確認下單'
  } else {
    nextBtn.innerHTML = '下一步'
  }
}

// 更改商品數量
// function modifyCartItemAmount(e) {
  
// }

btnControl.addEventListener('click', handleBtnControlClicked)
