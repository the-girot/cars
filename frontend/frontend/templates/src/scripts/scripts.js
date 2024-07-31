let inputString = '';

document.addEventListener('keydown', function(event) {
    if (document.activeElement.tagName === 'INPUT') {
        console.log('Поле ввода данных выбрано.');
    } else {
        if (!isNaN(parseInt(event.key))) {
            inputString += event.key;
        }
    }
});


setInterval(function() {
    if (inputString.length === 12) {
        document.getElementById("barcode").value = inputString;
        // console.log(inputString);
    }
    inputString = '';
}, 1000);

try {
    document.getElementById("givesiz").click();
}
catch (e) {

}
function getDate() {
    let date = new Date();
    return date.toLocaleString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

document.getElementById("date_today").innerHTML = getDate();

function toggleClass(element) {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        if (link === element) {
            link.classList.remove("border", "border-white", "text-white");
            link.classList.add("bg-white", "text-black");
        } else {
            link.classList.remove("bg-white", "text-black");
            link.classList.add("border", "border-white", "text-white");
        }
    });
    loadContent(element.id);
}

function savestate(el_id) {
    const table = document.getElementById(el_id);
    if (table){
    const tableHtml = table.innerHTML;
    localStorage.setItem(el_id, tableHtml);
    }
    
}

function loadstate(el_id) {
    const savedTableHtml = localStorage.getItem(el_id);
    const table_content = document.getElementById(el_id);
    if (savedTableHtml && table_content) {
        table_content.innerHTML = savedTableHtml; // Update table content with saved HTML
    }

    const tbody = table_content.querySelector('tbody'); // Select the tbody element inside the table

    tbody.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            event.target.closest('tr').remove(); // Delete the closest row when the button is clicked
        }
    });
}

function clearstate(el_id) {
    localStorage.removeItem(el_id);
}


tables = [
    "givesiztable",
    "addmanytable",
    "givesiztablesizomat"
    
]

function loadContent(el_id) {
    fetch("sections/" + el_id + ".html")
        .then((response) => response.text())
        .then((html) => {
            tables.forEach(element => {
                savestate(element)
            });
            // Создание элемента div для размещения контента
            const div = document.getElementById("main__content");
            div.innerHTML = html;
            const inputFields = document.querySelectorAll('input');

            // Для каждого поля input добавляем обработчик события
            inputFields.forEach(input => {
                input.addEventListener('focus', function() {
 
                    if (this.classList.contains('is-invalid')) {
        
                        this.classList.remove('is-invalid');
                    }
                    if (this.classList.contains('is-valid')) {
        
                        this.classList.remove('is-valid');
                    }
                   
                });
            });
            try{
            const sizename = document.getElementById("btn sizename")
            // console.log(sizename)
            sizename.addEventListener('focus', function(){
                if (sizename.classList.contains('btn-danger')) {
        
                    sizename.classList.remove('btn-danger');
                }
            })}
            catch{}
            try{
            const typename = document.getElementById("btn typename")
            // console.log(typename)
            typename.addEventListener('focus', function(){
                if (typename.classList.contains('btn-danger')) {
        
                    typename.classList.remove('btn-danger');
                }
            })}
            catch{}
            tables.forEach(element => {
                try{
                loadstate(element)}
                catch(e){}
            });

        });
}
function logout() {
    fetch("/auth/jwt/logout", {method: "POST"})
        .then((response) => response.text())
        .then((html) => {
            // Создание элемента div для размещения контента
            window.location.href = "/";
        });
}

