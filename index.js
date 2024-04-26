let LIMIT = 10000;
const CURRENCY = 'руб.';
CURRENCY.className = 'currency';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';




let inputNode = document.querySelector('.js-expense-input');
let buttonAddNode = document.querySelector('.js-button-add');
let buttonResetNode = document.querySelector('.js-button-reset');
let buttonClosePopup = document.querySelector('.js-btn_close_popup');
let buttonChangeLimit = document.querySelector('.js-btn_change_limit');
let buttonOpenPopup = document.querySelector('.btn-open-popup');
let limitChangeNode = document.querySelector('.js-input_change_limit');
const selectorItem = document.querySelector('.js-selector');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-total');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const popupNode = document.querySelector('.js-popup');
const errorTextNode = document.querySelector('.js-error_text');

const expenses = [];


init(expenses);







buttonAddNode.addEventListener('click', function(){
    const expense = getExpenseFromUser();

    if(!expense){
        return;
    }

    const currentCategory = getSelectedCategory();
    if (currentCategory === 'Категория') {
        errorTextNode.classList.add('error_text_on');
        return;
    };
    if (currentCategory !== 'Категория'){
        errorTextNode.classList.remove('error_text_on');
    }

    const newExpense = {amount: expense, category: currentCategory};
    expenses.push(newExpense);





    render();
    console.log(newExpense);

    clearInput();
});


buttonResetNode.addEventListener('click', function(){
    reset();
});


buttonOpenPopup.addEventListener('click', function(){
    popupNode.classList.add('popup_open');
});

buttonClosePopup.addEventListener('click', function(){
    popupNode.classList.remove('popup_open');

});

buttonChangeLimit.addEventListener('click', function(){
    changeLimit();
    popupNode.classList.remove('popup_open');
});

selectorItem.addEventListener('change', function(){
    item = selectorItem.value;
    return item;
})







function init(expenses) {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpenses(expenses);
};



function getExpenseFromUser() {
    if (!inputNode.value) {
        return null;
    }

    return parseInt(inputNode.value);
};

// function clearInput(input) {
//     inputNode.value = '';
// };

const clearInput = (input) => {
    inputNode.value='';
};



function render(expenses) {
    const sum = calculateExpenses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
};



function renderHistory(expense) {
    historyNode.innerHTML = '';
 
    
    expenses.forEach(function(expense){
        const historyItem = document.createElement('li');


        historyItem.className = 'rub';

        historyItem.innerText = `${expense.category} - ${expense.amount} `;

        historyNode.appendChild(historyItem);
        return historyItem;
    });
    
}

function renderSum(sum) {
    sumNode.innerText = sum;
};


function calculateExpenses(expense) {
    let sum = 0;
    expenses.forEach(expense => {
        sum += expense.amount;
    });
    
    return sum;

};


function renderStatus(sum){
    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    }   else{
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - sum} руб.)`;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
};

function reset() {
    historyNode.innerHTML = '';
    sumNode.innerText = '0';
    expenses.length = 0;
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
};

function changeLimit() {
    LIMIT = limitChangeNode.value;
    limitNode.innerText = LIMIT;
    return LIMIT;
};

function getSelectedCategory() {
    return selectorItem.value;
};

function error_text_activated() {
    if (currentCategory === 'Категория') {
        errorTextNode.classList.add('error_text_on');
        return;
    }
 
};
