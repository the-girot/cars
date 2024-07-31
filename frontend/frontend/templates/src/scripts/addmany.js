// let siz_sizes = {}

function loadsizaddmany(element) {

    const barcode = document.getElementById("barcode").value;
    if (barcode === ""){
        document.getElementById("barcode").classList.add('is-invalid')
        return
    }
     fetch("api/givesiz/loadsiz?" + new URLSearchParams({
        barcode: barcode
    }))
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            document.getElementById("sizname").value = ""
            document.getElementById("sizname").value = data["siz"]["sizname"]
            document.getElementById("sizename").value = ""
            document.getElementById("sizename").value = data["siz"]["size"]
            

        })
        .catch((error) => {
            document.getElementById("barcode").classList.add('is-invalid')
            console.error("Ошибка:", error)
        })
}

function addtotable(){
    const count = document.getElementById("count");
    const barcode = document.getElementById("barcode");
    const sizename = document.getElementById("sizename");
    const tbody = document.getElementById("tbody");
    // console.log(siz_sizes[sizename.textContent][0])
    // console.log(count.value)
    flag = false
    if (count.value === ""){
        count.classList.add("is-invalid")
        flag = true
        
    }
        
        
    if (sizename.value === ""){
        sizename.classList.add("is-invalid")
        flag = true
    }
        
    if (barcode.value === ""){
        barcode.classList.add("is-invalid")
        flag = true
    }
    if (flag)
        return
        
    let html = "<tr><td contenteditable='true'>"+ barcode.value +
        "</td><td>" + '<span style="visibility: hidden;">' +
        sizename.value + ' </span>' +
        sizename.value + "</td><td>" +
        count.value + "</td></tr>"
    const row = tbody.insertRow();
    row.innerHTML += html
    count.value = ""
    sizename.value = ""
    barcode.value = ""
    sizname.value = ""
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
            rowData.value = cells[2].textContent; // Предполагаем, что третья ячейка содержит значение
            jsonData.push(rowData);
        }
    })
    console.log(JSON.stringify({"stock_list": jsonData}));
    fetch("api/addtodb/addtostock?",{
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({"stock_list": jsonData})

    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        tbody.innerHTML = ""
        // Здесь вы можете обработать полученные данные
    })
    .catch((error) => console.error("Ошибка:", error));
    
}

