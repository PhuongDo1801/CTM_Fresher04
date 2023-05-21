const unit = document.querySelector('.detail-employee__unit');
const unitList  =document.querySelector('.detail-employee__unit__list')
const employeeClose = document.querySelector('.detail-employee__title__item__close-icon')
const formDetail = document.querySelector('.form-detail')
const addEmployee = document.querySelector('.add-employee')
const pagingSetup = document.querySelector('.content__table__paging__quantity__item')
const pagingList = document.querySelector('.paging__display-setting')
const tableEditButton = document.getElementsByClassName('table-edit-button')[0]
const tableEditColumnList = document.getElementsByClassName('table-edit-column__list')[0]
const tableEditColumnIcon = document.getElementsByClassName('table-edit-column__icon')[0]

unit.addEventListener('click', function() {
    unitList.style.display = (unitList.style.display === 'block') ? 'none' : 'block'  
});

employeeClose.addEventListener('click', function() {
    formDetail.style.display = 'none'
});

addEmployee.addEventListener('click', function() {
    formDetail.style.display = 'block'
})

pagingSetup.addEventListener('click', function() {
    pagingList.style.display = (pagingList.style.display === 'block') ? 'none' : 'block'
})

tableEditButton.addEventListener('click', function() {
    formDetail.style.display = formDetail.style.display = 'none' ? 'block' : 'none'  
})

tableEditColumnIcon.addEventListener('click', function() {
    tableEditColumnList.style.display = (tableEditColumnList.style.display === 'none') ? 'block' : 'none'
})