var comboboxes = document.querySelectorAll('.combobox');
var showBtn = document.querySelector('.combobox .btn-show-options');


comboboxes.forEach(function(combobox) {
  var input = combobox.querySelector('input[type="text"]');
  var list = combobox.querySelector('ul');
  var options = combobox.querySelectorAll('li');

  showBtn.addEventListener('click', function() {
    // if(list.style.display = 'none'){
    //   list.style.display = 'block';
    // }
    // if(list.style.display = 'block'){
    //   list.style.display = 'block';
    // }
    
    list.style.display = list.style.display === 'none' ? 'block' : 'none';
  });

  input.addEventListener('click', function() {
    list.classList.toggle('show');
  });

  options.forEach(function(option) {
    option.addEventListener('click', function() {
      input.value = option.textContent;
      list.classList.remove('show');
    });
  });

  input.addEventListener('input', function() {
    var value = this.value.toLowerCase();
    var inputText = this.value.toLowerCase();
    console.log(value)

    if (inputText.length > 0) {
        list.style.display = 'block';
      } else {
        list.style.display = 'none';
      }

    options.forEach(function(option) {
      if (option.textContent.toLowerCase().indexOf(value) === -1) {
        option.style.display = 'none';
      } else {
        option.style.display = 'block';
      }
    });
  });
});
