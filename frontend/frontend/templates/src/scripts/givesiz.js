function loadhdc() {
    const perno = document.getElementById("perno").value;
    if (document.getElementById("perno").classList.contains('is-invalid'))
        return
    if (perno === ""){
        document.getElementById("perno").classList.add('is-invalid')
        return
    }
        
    fetch("api/givesiz/loadhdc?" + new URLSearchParams({
        perno: perno
    }))
        .then((response) => response.json())
        .then((data) => {
            // Здесь вы можете обработать полученные данные
            Object.getOwnPropertyNames(data).forEach(key => {
                document.getElementById(key).value = "";
                if (data[key] === null)
                    document.getElementById("perno").classList.add("is-invalid")
                else {
                    document.getElementById("perno").classList.remove("is-invalid")
                    document.getElementById(key).value = data[key]
                }
                
                

            });
        })
        .catch((error) => console.error("Ошибка:", error));

}
const rus = {
    "barcode": "Штрих-код:",
    "sizname": "Название СИЗ:",
    "typename": "Тип СИЗ:",
    "size": "Размер: ",
    "standardname": "В стандартах:",
    "ost": "Остаток"
}

let siz_sizes = {}
function loadsiz(arg) {
    const barcode = String(document.getElementById("barcode").value);
    console.log("Fetching data for barcode:", barcode);

    fetch("api/givesiz/loadsiz?" + new URLSearchParams({ barcode: barcode }))
        .then((response) => {
            console.log("API Response:", response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log("Data received:", data);
            insert_content(data);
            
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            document.getElementById("sizinfo").innerHTML = "Информация о СИЗ отсутствует";
            document.getElementById("table").innerHTML = "";
            document.getElementById("barcode").classList.add(arg);
        });
}

function addListenerOnCount(element) {
    const el_id = element.id.split(" ")[1];
    let list_items = Array.from(
        document.getElementById("list " + el_id).getElementsByClassName("dropdown-item")
    );
    const balance = document.getElementById("balance");
    list_items.forEach((list_item) => {
        list_item.addEventListener("click", () => {
            balance.innerText = "Остаток: " + siz_sizes[list_item.textContent][1];
        });
    });
}

function insert_content(data){
    console.log(data)
    let list
    try {
        list = document.getElementById("list sizename");
        list.innerHTML = "";
    } catch (e) {
    }
    const modal = document.getElementById("sizinfo");
    modal.innerHTML = ""

    let html = ""

    if (!(data["siz"]["mess"] === undefined)) {
        html = '<p class="text-center">' + data["siz"]["mess"] + '</p>'
        modal.innerHTML = html
    }

    else {
        Object.getOwnPropertyNames(data["siz"]).forEach(key => {
            html += '<div class="d-flex flex-row"><div class="p-2">' + rus[key] + '</div>' + '<div class="p-2 flex-grow-1">' + data["siz"][key] + '</div></div>'

        });

        modal.innerHTML = html
        try{
        document.getElementById("sizename").value = data["siz"]["size"]
        document.getElementById("balance").innerText = "Остаток: " + data["siz"]["ost"]}
        catch(e){}


    }
}


function givesizaddtotable() {
    const barcode = document.getElementById("barcode");
    const perno = document.getElementById("perno");
    const fio = document.getElementById("fio");
    const sizename = document.getElementById("sizename");
    const tbody = document.getElementById("output");
    const countElement = document.getElementById('countsiz');
    const balance = document.getElementById("balance");
    const flexCheckOnDuty = document.getElementById("flexCheckOnDuty");
    const flexCheckMassGive = document.getElementById("flexCheckMassGive");
    flag = false;
    if (fio.value === ""){
        perno.classList.add("is-invalid")
        flag = true

    }
    if (sizename.value === ""){
        flag = true
        sizename.classList.add("is-invalid")
        
    }
    if (barcode.value === ""){
        barcode.classList.add("is-invalid")
        flag = true

    }
    if (isNaN(Number(countElement.value))){
        countElement.classList.add("is-invalid")
        flag = true

    }
    if (Number(balance.textContent.split(": ")[1]) < Number(countElement.value)){
        countElement.classList.add("is-invalid")
        flag = true

    }
    if (flag)
        return

    balance.textContent = balance.textContent.split(": ")[0] + ": " + (Number(balance.textContent.split(": ")[1]) - Number(countElement.value))
    // siz_sizes[sizename.textContent][1] = Number(balance.textContent.split(": ")[1])
    let checkbox1 = '<input class="form-check-input" type="checkbox" '
    let checkbox2 = '<input class="form-check-input" type="checkbox" '

    if (flexCheckMassGive.checked)
        checkbox1 += 'checked="checked"/>'
    else
        checkbox1 += '/>'

    if (flexCheckOnDuty.checked)
        checkbox2 += 'checked="checked"/>'
    else
        checkbox2 += '/>'

    const row = tbody.insertRow();
    row.innerHTML = "<td>" + barcode.value + "</td><td>" +
                    sizename.value + "</td><td>" +
                    fio.value + '</td><td>' +
                    perno.value + '</td><td>' +
                    countElement.value + '</td><td>' +
                    checkbox1 + '</td><td>' +
                    checkbox2 + '</td>';

    // Add delete button to the new row
    const cell = row.insertCell();
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.onclick = function() { row.remove(); }; // Add click event to delete the row
    cell.appendChild(deleteButton);

    tbody.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            event.target.closest("tr").remove(); // Delete the closest row when the button is clicked
        }
    });
}

function newdistribution() {
    const tbody = document.getElementById("output");
    const rows = tbody.querySelectorAll('tr');
    let jsonData = [];
    rows.forEach(row => {
        const rowData = {};
        const cells = row.querySelectorAll('td'); // Получаем ячейки в текущей строке
        console.log(cells)

        if (cells.length > 0) {
            rowData.barcode = cells[0].textContent; 
            rowData.el_id = cells[1].textContent.split(" ")[1];
            rowData.perno = cells[3].textContent; 
            rowData.count = cells[4].textContent; 
            rowData.is_on_group  = cells[5].firstChild.checked,
            rowData.is_on_duty  = cells[6].firstChild.checked,
            jsonData.push(rowData);
        }
    })
    // console.log(jsonData)

    fetch("api/givesiz/newdistribution",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "distributions": jsonData
            })
        

    })
    .then((response) => response.json(
    ))
    .then((data) => {
        // console.log(data)
        // Здесь вы можете обработать полученные данные
        tbody.innerHTML = ""
        localStorage.removeItem("givesiztable");
    })
    .catch((error) => console.error("Ошибка:", error));
}


function sendtodb() {
    const tbody = document.getElementById("tbody");
    const rows = tbody.querySelectorAll('tr');
    let jsonData = [];
    rows.forEach(row => {
        const rowData = {};
        const cells = row.querySelectorAll('td'); // Получаем ячейки в текущей строке

        if (cells.length > 0) {
            rowData.barcode = cells[0].textContent; // Предполагаем, что первая ячейка содержит ID
            rowData.el_id = cells[1].textContent.split(" ")[0];
            rowData.count = cells[2].textContent; // Предполагаем, что третья ячейка содержит значение
            jsonData.push(rowData);
        }
    })
    console.log(jsonData)
    fetch("api/givesiz/newdistribution",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "distributions": jsonData
            })})
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        // Здесь вы можете обработать полученные данные
    })
    .catch((error) => console.error("Ошибка:", error));
    tbody.innerHTML = ""
}






function replenishmentsizomattotable(){
    const barcode = document.getElementById("barcode");
    const sizename = document.getElementById("sizename");
    const tbody = document.getElementById("output");
    const countElement = document.getElementById('countsiz');
    const balance = document.getElementById("balance");
    flag = false;
    if (sizename.value === ""){
        flag = true
        sizename.classList.add("is-invalid")
        
    }
    if (barcode.value === ""){
        barcode.classList.add("is-invalid")
        flag = true

    }
    if (isNaN(Number(countElement.value))){
        countElement.classList.add("is-invalid")
        flag = true

    }
    if (Number(balance.textContent.split(": ")[1]) < Number(countElement.value)){
        countElement.classList.add("is-invalid")
        flag = true

    }
    if (flag)
        return

    const row = tbody.insertRow();

    balance.textContent = balance.textContent.split(": ")[0] +": " + (Number(balance.textContent.split(": ")[1]) - Number(countElement.value))
    sizename.textContent = Number(balance.textContent.split(": ")[1])
    row.innerHTML = "<tr><td>" +
        barcode.value + "</td><td>" +
        sizename.textContent + "</td><td>" +
        countElement.value
        +'</td></tr>'

        const cell = row.insertCell();
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-danger");
        deleteButton.onclick = function() { row.remove(); }; // Add click event to delete the row
        cell.appendChild(deleteButton);
    
        tbody.addEventListener("click", function(event) {
            if (event.target.classList.contains("delete-btn")) {
                event.target.closest("tr").remove(); // Delete the closest row when the button is clicked
            }
        });

}

function replenishmentsizomat() {
    const tbody = document.getElementById("output");
    const rows = tbody.querySelectorAll('tr');
    let jsonData = [];
    rows.forEach(row => {
        const rowData = {};
        const cells = row.querySelectorAll('td'); // Получаем ячейки в текущей строке

        if (cells.length > 0) {
            rowData.barcode = cells[0].textContent; // Предполагаем, что первая ячейка содержит ID
            rowData.perno = 1;
            rowData.count = cells[2].textContent; // Предполагаем, что третья ячейка содержит значение
            rowData.is_on_duty = false;
            rowData.is_on_group = false;
            jsonData.push(rowData);
        }
    })
    console.log(JSON.stringify({
        "distributions": jsonData
        }))
    fetch("api/givesiz/newdistribution",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "distributions": jsonData
            })})
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        // Здесь вы можете обработать полученные данные
    })
    .catch((error) => console.error("Ошибка:", error));
    tbody.innerHTML = ""
}
let count = 1;

function increment() {
const countElement = document.getElementById('countsiz');
  count++;
  countElement.value = count;
}

function decrement() {
    const countElement = document.getElementById('countsiz');
  if (count > 1) {
    count--;
    countElement.value = count;
  }
}