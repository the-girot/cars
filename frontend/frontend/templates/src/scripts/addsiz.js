function clearform() {
    document.getElementById("btn typename").textContent = "Тип СИЗ";
    document.getElementById("btn sizename").textContent = "Размер";
    document.getElementById("barcode").value = "";
    document.getElementById("standardname").value = "";
    document.getElementById("sizname").value = "";
    document.getElementById("creator").value = "";
    document.getElementById("shelftime").value = "";
    document.getElementById("shelftimedatestart").value = "";
}

let types_dict = {}
function loadtypes() {
        fetch("api/givesiz/loadtypes")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            types_dict = data
            const types = document.getElementById("list typename")
            Object.getOwnPropertyNames(data).forEach(el => {
                types.innerHTML += '<li><a class="dropdown-item" onclick="get_sizes(this)">' + el + '</a></li>'
            })
            // insert_content(data)

        })
        .catch((error) => {
            // document.getElementById("sizinfo").innerHTML = "Проверьте правильность штрихкода";
            // document.getElementById("table").innerHTML = "";
            console.error("Ошибка:", error)
        })
}

function get_sizes(element) {
    document.getElementById("btn sizename").textContent = "Размер";
    console.log(123123123)
    html = ""
    const sizes = document.getElementById("list sizename")
    Array.from(types_dict[element.textContent]["sizes"]).forEach(el => {
        html += '<li><a class="dropdown-item">' + el + '</a></li>'
    })
    sizes.innerHTML = html
    console.log(sizes)
    
    
}


function createnewsiz() {
    try{
    document.getElementById("newsiz").innerHTML = ""
    newsizform = {
        "typename": document.getElementById("btn typename"),
        "sizename": document.getElementById("btn sizename"),
        "barcode": document.getElementById("barcode"),
        "standardname": document.getElementById("standardname"),
        "sizname": document.getElementById("sizname"),
        "total": document.getElementById("total"),
        "creator": document.getElementById("creator"),
        "shelftime": document.getElementById("shelftime"),
        "shelftimedatestart": document.getElementById("shelftimedatestart"),

    }

    Object.getOwnPropertyNames(newsizform).forEach(key => {
        if (newsizform[key].value.replace("Тип СИЗ", "").replace("Размер", "") === "")
            newsizform[key].classList.add("is-invalid")
        if (newsizform[key].textContent === "Тип СИЗ")
            newsizform[key].classList.add("btn-danger")
        if (newsizform[key].textContent === "Размер")
            newsizform[key].classList.add("btn-danger")
        return
    })
    fetch("api/addtodb/newsiz",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
              "siz_name": newsizform["sizname"].value,
              "el_id": types_dict[newsizform["typename"].textContent][newsizform["sizename"].textContent],
              "standard_name": newsizform["standardname"].value,
              "shelf_life": newsizform["shelftime"].value,
              "barcode": newsizform["barcode"].value,
              "total": newsizform["total"].value,
              "shelf_life_start_date": newsizform["shelftimedatestart"].value,
              "balance": newsizform["total"].value,
            }
        )

    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        if (data["res"] === true)
            document.getElementById("newsiz").innerHTML = '<p class="text-center">Новый сиз добавлен</p>'
            
        clearform()
    })
    .catch(error => {
        console.error("Error:", error)
        document.getElementById("newsiz").innerHTML = '<p class="text-center">Ошибка при добавлении СИЗ</p>'
    });}
    catch{
        document.getElementById("newsiz").innerHTML = '<p class="text-center">Ошибка при добавлении СИЗ</p>'
    }
} 



function setvalidsiz() {
    document.getElementById("barcode").classList.add('is-valid')
    
}