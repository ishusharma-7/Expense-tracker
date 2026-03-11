
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")

const transactionsList = document.getElementById("transactions")

const balance = document.getElementById("balance")
const income = document.getElementById("income")
const expense = document.getElementById("expense")

let transactions = JSON.parse(localStorage.getItem("transactions")) || []


export function initTracker(){

renderTransactions()
showDate()

form.addEventListener("submit", addTransaction)

}


function showDate(){

const d = new Date()

document.getElementById("date").innerText =
d.toLocaleDateString("en-IN")

}


function addTransaction(e){

e.preventDefault()

const textValue = text.value.trim()
const amountValue = +amount.value

if(!textValue || !amountValue) return

const transaction = {

id: Date.now(),
text: textValue,
amount: amountValue

}

transactions.push(transaction)

updateLocalStorage()
renderTransactions()

form.reset()

}


function deleteTransaction(id){

transactions = transactions.filter(t => t.id !== id)

updateLocalStorage()
renderTransactions()

}


function renderTransactions(){

transactionsList.innerHTML = ""

transactions.forEach(t=>{

const li = document.createElement("li")

li.classList.add(t.amount>0?"income":"expense")

li.innerHTML = `

${t.text}

<span>
${t.amount>0?"+":""}₹${Math.abs(t.amount)}
<span class="delete" data-id="${t.id}">x</span>
</span>

`

transactionsList.appendChild(li)

})


document.querySelectorAll(".delete").forEach(btn=>{

btn.addEventListener("click",()=>{

deleteTransaction(Number(btn.dataset.id))

})

})

updateSummary()

}


function updateSummary(){

const amounts = transactions.map(t=>t.amount)

const total = amounts.reduce((acc,v)=>acc+v,0)

const inc = amounts
.filter(a=>a>0)
.reduce((acc,v)=>acc+v,0)

const exp = amounts
.filter(a=>a<0)
.reduce((acc,v)=>acc+v,0)

balance.innerText = `₹${total}`
income.innerText = `₹${inc}`
expense.innerText = `₹${Math.abs(exp)}`

}


function updateLocalStorage(){

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
)

}