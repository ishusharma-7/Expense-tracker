// DOM Elements

const form = document.getElementById("form")
const textInput = document.getElementById("text")
const amountInput = document.getElementById("amount")

const transactionsList = document.getElementById("transactions")

const balanceEl = document.getElementById("balance")
const incomeEl = document.getElementById("income")
const expenseEl = document.getElementById("expense")

// Load data from localStorage

let transactions =
JSON.parse(localStorage.getItem("transactions")) || []


// Show today's date

function showDate(){

const today = new Date()

document.getElementById("date").innerText =
today.toLocaleDateString("en-IN")

}


// Add transaction

function addTransaction(e){

e.preventDefault()

const text = textInput.value.trim()
const amount = +amountInput.value

if(!text || !amount) return

const transaction = {

id: Date.now(),
text,
amount

}

transactions.push(transaction)

updateLocalStorage()
renderTransactions()

form.reset()

}


// Delete transaction

function deleteTransaction(id){

transactions = transactions.filter(
t => t.id !== id
)

updateLocalStorage()
renderTransactions()

}


// Render transaction list

function renderTransactions(){

transactionsList.innerHTML = ""

transactions.forEach(t => {

const li = document.createElement("li")

li.classList.add(
t.amount > 0 ? "income" : "expense"
)

li.innerHTML = `

${t.text}

<span>
${t.amount>0?"+":""}₹${Math.abs(t.amount)}

<span class="delete" data-id="${t.id}">
x
</span>

</span>

`

transactionsList.appendChild(li)

})


// Add delete listeners

document.querySelectorAll(".delete")
.forEach(btn => {

btn.addEventListener("click",()=>{

deleteTransaction(Number(btn.dataset.id))

})

})

updateSummary()

}


// Update balance / income / expense

function updateSummary(){

const amounts =
transactions.map(t => t.amount)

const total =
amounts.reduce((acc,val)=>acc+val,0)

const income =
amounts
.filter(a=>a>0)
.reduce((acc,val)=>acc+val,0)

const expense =
amounts
.filter(a=>a<0)
.reduce((acc,val)=>acc+val,0)

balanceEl.innerText = `₹${total}`
incomeEl.innerText = `₹${income}`
expenseEl.innerText = `₹${Math.abs(expense)}`

}


// Save to localStorage

function updateLocalStorage(){

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
)

}


// Event listener

form.addEventListener(
"submit",
addTransaction
)


// Initial load

showDate()
renderTransactions()