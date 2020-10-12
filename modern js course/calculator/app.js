const loanData = document.getElementById('loanData');
const spinner = document.getElementById('loader');
const resultsCard = document.getElementById('results-card'); 

eventListeners();

function eventListeners() {
  loanData.addEventListener('submit', showSpinner);
}

function showSpinner(e) {
  e.preventDefault();  

  resultsCard.style.display = 'none';

  spinner.style.display = 'block';
  // Clear error after 3 seconds
  setTimeout(calcRepayment, 1000);
}
function calcRepayment() { 
     
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');  
  
  spinner.style.display = 'none';
 
  const principal = amount.value;
  const calculatedInterest = interest.value / 100 / 12;
  const calculatedPayments = years.value * 12;
 
  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);
 
  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);    

    resultsCard.style.display = "block";
  } else {
    showError('Please check your numbers')
  }
  
}
 
// Show Error
function showError(error){
   // Create a div
   const errorDiv = document.createElement('div');
 
   // Get elements
   const card = document.querySelector('.card');
   const heading = document.querySelector('.heading');
 
   // Add class
   errorDiv.className = 'alert alert-danger';
 
   // Create text node and append to div
   errorDiv.appendChild(document.createTextNode(error));
 
   // Insert error above heading
   card.insertBefore(errorDiv, heading);
 
   // Clear error after 3 seconds
   setTimeout(clearError, 3000);
}
 
// Clear error
function clearError(){
   document.querySelector('.alert').remove();
}