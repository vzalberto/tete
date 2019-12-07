function toggle(id) {
    var e = document.getElementById(id);
    if(e.style.display == 'inline')
        e.style.display = 'none';
    else
        e.style.display = 'inline';
}

function toggle_box(id) {
    var e = document.getElementById(id);
    if(e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
}