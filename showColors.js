var swatch = document.createDocumentFragment()

groups.forEach(function (g, i) {
    var group = document.createElement('div');
    group.className = 'color-group';
    var heading = document.createElement('h2');
    heading.textContent = 'Similar to ' + g.center;
    group.appendChild(heading);

    g.items.forEach(function(l, i){
        var div = document.createElement("div.");
        div.className = "color";
        div.style.backgroundColor = l.color;
        div.innerText = l.color + ' ('+l.files.length+')';
        div.setAttribute('data-files', JSON.stringify(l.files));

        group.appendChild(div);
    });

    swatch.appendChild(group);
});

document.body.appendChild(swatch);
