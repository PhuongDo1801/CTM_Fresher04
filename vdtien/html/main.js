const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function openEmployeeDetailForm() {
  $(
    '.content-header__action .content-header-action__openForm'
  ).addEventListener('click', function () {
    $('#employeeDetail').classList.add('flex')
  })
}
function onClsoeEmployeeDetailForm() {
  $('.dialog-header-actions__close').addEventListener('click', function () {
    $('#employeeDetail').classList.remove('flex')
  })
}

function onOpenPopup() {
  $('.popup--info').classList.add('flex')
}
function onClosePopup() {}
function toggleColAction(idEmployee) {
  $(`#${idEmployee} .td-action__icon .icon-wrapper`).addEventListener(
    'click',
    function () {
      $(`#${idEmployee} .td-action-list`).classList.toggle('block')
      $(`#${idEmployee} .td-action__icon .icon-wrapper`).classList.toggle(
        'border--blue'
      )
    }
  )
}
function onClickRemoveRecord(idEmployee) {
  $(`#${idEmployee} .td-action-list .td-action-item--remove`).addEventListener(
    'click',
    function () {
      $(`#${idEmployee} .td-action-list`).classList.toggle('block')
      $(`#${idEmployee} .td-action__icon .icon-wrapper`).classList.toggle(
        'border--blue'
      )
      $('.popup--warning').classList.add('flex')
    }
  )
}
function onclosePopup() {
  $('.popup--warning .popup__bottom .btn--sub').addEventListener(
    'click',
    function () {
      $('.popup--warning').classList.remove('flex')
    }
  )
}
function onClickDropdownNumberRecordInPage() {
  $('.record-in-page .dropdown-container .icon-wrapper').addEventListener(
    'click',
    function () {
      $('.record-in-page .dropdown-container .icon-wrapper').classList.toggle(
        'active'
      )
      $('.record-in-page .dropdown-container').classList.toggle('border--focus')
      $('.record-in-page .dropdown-list.record-in-page-list').classList.toggle(
        'block'
      )
    }
  )
}

openEmployeeDetailForm()
onClsoeEmployeeDetailForm()
onClickDropdownNumberRecordInPage()
toggleColAction('employee1')
onClickRemoveRecord('employee1')
onclosePopup()
