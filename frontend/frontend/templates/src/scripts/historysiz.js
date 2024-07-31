const keys = {
    "barcode": "Штрих-код",
    "sizname": "Название СИЗ",
    "typename": "Тип СИЗ",
    "sizename": "Размер СИЗ",
    "date": "Дата",
    "count": "",
    "perno": "Табельный номер",
    "fio": "ФИО",
    "department": "Должность",
    "chef": "Руководитель",
    "is_returned": "Статус возврата",
    "is_on_group": "Статус группы",
    "is_on_duty": "Статус дежурный",
    
}
let currentPage = 1

function changePage(direction) {
    if (direction < 0 && currentPage === 1)
        return
    currentPage += direction
    document.getElementById("page-info").innerText = `Страница ${currentPage}`
    getHistoryData()
}

function clearfilters() {
    Object.getOwnPropertyNames(keys).forEach(value => {
        document.getElementById("btn " + value).textContent = keys[value];
    })
}

function getfiltersdata(){
    let filters = {};
    for (const value of Object.getOwnPropertyNames(keys)) {
        if (value === "count") {
            continue; // Skips to the next iteration in the loop
        }
    
        const data = document.getElementById("btn " + value);
    
        if (keys[value] !== data.innerText) {
            if (!(data.innerText.includes("группу") || data.innerText.includes("ежурный") || data.innerText.includes("ернул"))) {
                filters[value] = data.innerText;
            } else {
                filters[value] = !data.innerText.includes("Не");
            }
        }
    }
    let limit = document.getElementById("btn limit").innerText;
    let body = {"filters": filters}
    if (limit.includes("Строк на странице")){
       limit = 25
    }
    body["limit"] =  limit;
    body["offset"] = (currentPage - 1) * limit
    console.log(JSON.stringify(body, null, 2))
    return JSON.stringify(body)

}

function getHistoryData() {
    const body = getfiltersdata();
    fetch("api/sizhistory/gethistory", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body
    })
        .then((response) => response.json())
        .then((data) => {
            html = "";
            // Здесь вы можете обработать полученные данные
            Array.from(data["distribution_history"]).forEach(value => {
                html += "<tr>"
                Object.getOwnPropertyNames(keys).forEach(key => {
                   html += "<td>" + value[key] + "</td>"
                });
                html += "</tr>"
            });
            document.getElementById("tableBody").innerHTML = html;
        })
        .catch((error) => console.error("Ошибка:", error));
}

function addListenerOnInput(element) {
    const el_id = element.id.split(" ")[1];
    console.log(element.textContent)
    let search_field = document.getElementById("search-field " + el_id);
    let list_items = Array.from(
        document.getElementById("list " + el_id).getElementsByClassName("dropdown-item")
    );

    function Search() {
        list_items.forEach((list_item) => {
            if (!list_item.outerText.toLowerCase().includes(search_field.value.toLowerCase())) {
                if (!list_item.classList.contains("visually-hidden")) {
                    list_item.classList.add("visually-hidden");
                }
            } else {
                try {
                    list_item.classList.remove("visually-hidden");
                } catch (err) {}
            }
        });
    }
    try {
        search_field.addEventListener("input", Search);
    }
    catch (err) {}
    list_items.forEach((list_item) => {
        list_item.addEventListener("click", () => {
            console.log(list_item)
            element.textContent = list_item.textContent;
        });
    });
}
