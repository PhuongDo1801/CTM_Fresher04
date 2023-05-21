function openDetailInfoEmployee() {
    document.getElementById('detail-info-employee').style.display = 'block';
    document.getElementById('container').style.pointerEvents = 'none';
    document.getElementById('sidebar').style.background = '#e0e0e0';
    document.getElementById('content-main').style.background = '#e0e0e0';
    document.getElementById('list-employee').style.background = '#e0e0e0';
    document.getElementById('pagination').style.background = '#e0e0e0';
}

function closeDetailInfoEmployee() {
    document.getElementById('detail-info-employee').style.display = 'none';
    document.getElementById('container').style.pointerEvents = 'auto';
    document.getElementById('sidebar').style.background = '#1F1F1F';
    document.getElementById('content-main').style.background = 'white';
    document.getElementById('list-employee').style.background = 'white';
    document.getElementById('pagination').style.background = 'white';
}

function openSelectFunction() {
    var func_style = document.getElementById('table-select-function').style.display;
    if(func_style == 'block') {
        document.getElementById('table-select-function').style.display = 'none';
    }
    else{
        document.getElementById('table-select-function').style.display = 'block';
    }
}

function openSelectPaging() {
    var func_style = document.getElementById('menu-paging').style.display;
    if(func_style == 'block') {
        document.getElementById('menu-paging').style.display = 'none';
    }
    else{
        document.getElementById('menu-paging').style.display = 'block';
    }
}