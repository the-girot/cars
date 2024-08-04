
let step = 0
function increment() {
  if (step <11) {
    step++;
  }
}

function decrement() {
  if (step > 0) {
    step--;
  }
}
function loadContent() {
    document.getElementById("que_label").innerText = states__[step].que_label
    document.getElementById("btn_question").innerText = states__[step].btn_question
    document.getElementById("buttons").innerHTML = states__[step].buttons
    if (states__[step].choosed != "")
        document.getElementById("btn_question").textContent = states__[step].choosed
    if (Object.keys(states__[step].requested_data).length === 0) {
        getlistdata()
        
    }
    else{
        createlistitems(states__[step].requested_data);
    }
}








function prepare_list() {
    
    const search_field = document.getElementById("search-field-question");
    const list_items = Array.from(
        document.getElementById("list-answer").getElementsByClassName("dropdown-item")
    );
    console.log(list_items)
    
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
            document.getElementById("btn_question").textContent = list_item.textContent;
            set_choosed()
        });
    });
    
}

function set_choosed() {
    console.log(step)
    // Get the chosen text content from the button
    var ch = document.getElementById("btn_question").textContent.trim();
    console.log(states__[step].requested_data[ch]["p"])

    // Update the 'choosed' property in the current state
    states__[step].choosed = ch;

    // Iterate over each parameter in the 'param' array of the current state
    states__[step].param.forEach(p => {
        // Log the entire requested_data for debugging

        // Check if requested_data for the chosen key exists and has the property p
        console.log(p)
        if (states__[step].requested_data[ch] && states__[step].requested_data[ch]["p"][p]) {
            // Set the item in localStorage
            localStorage.setItem(p, states__[step].requested_data[ch]["p"][p]);
        } else {
            console.warn('Data for', p, 'not found in requested_data');
        }

        // Log the value retrieved from localStorage for debugging
        console.log(localStorage.getItem(p));
    });
}

function getlistdata() {
    // Base URL from the current state
    let baseUrl = states__[step].url;

    // Collect parameters from localStorage
    let params = states__[step].attrs.map(attr => `${attr}=${encodeURIComponent(localStorage.getItem(attr))}`).join('&');

    // Complete URL with encoded parameters
    let url = `${baseUrl}?${params}`;

    // Fetch data from the constructed URL
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Get the list element and prepare the initial HTML content
            createlistitems(data)

        })
        .catch(error => {
            console.error("Ошибка при получении данных:", error);
        });
}

function createlistitems(data) {
            let list = document.getElementById("list-answer");
            let htmlContent = '<li><input type="text" id="search-field-question" class="form-control" aria-label="Ввод текста с помощью раскрывающейся кнопки"/></li><li><hr class="dropdown-divider" /></li>';

            // Append each data key as a dropdown item
            Object.getOwnPropertyNames(data).forEach(key => {
                htmlContent += `<li><a class="dropdown-item">${key}</a></li>`;
            });

            // Update the list's HTML content in one operation
            list.innerHTML = htmlContent;

            // Store the fetched data in the current state
            states__[step].requested_data = data;
            console.log(states__[step].requested_data);

            // Prepare the list for display (assuming this function exists)
            prepare_list();
    
}

function get_final() {
    fetch("frontend/final.html")
     .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            div = document.getElementById("main__container")
            div.innerHTML = data
            document.getElementById("cars_h2").innerText = "Введите имя и номер телефона, чтобы получить бесплатную оценку"
            // Обработайте данные ответа здесь
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}


function get_simple_appr() {
    const regionId = localStorage.getItem("region");
    const brand = localStorage.getItem("brand");
    const model = localStorage.getItem("model");
    const creationYear = localStorage.getItem("creationYear");

    console.log(regionId, brand, model, creationYear);

    // Формируем URL с параметрами
    const url = new URL("/get_apprasial", window.location.origin);
    url.searchParams.append("regionId", regionId);
    url.searchParams.append("brand", brand);
    url.searchParams.append("model", model);
    url.searchParams.append("creationYear", creationYear);
    flag = false
    username = document.getElementById("exampleFormControlInput1").value
    phone = document.getElementById("exampleFormControlInput2").value
    if (username === ""){
        document.getElementById("errmess").innerText = "Введите все поля"
        return
    }
    if (phone === ""){
        document.getElementById("errmess").innerText = "Введите все поля"
        return
    }


    function isValidPhoneNumber(phoneNumber) {
    // Регулярное выражение для проверки номера телефона
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    // Проверка номера телефона с помощью регулярного выражения
    return phoneRegex.test(phoneNumber);
}
    if (isValidPhoneNumber(phone) !== true){
         document.getElementById("errmess").innerText = "Введите корректный номер телефона"
         return
    }




    // Выполняем запрос
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            document.getElementById("main__container").innerHTML = "<p id='res'>"+ "От " + data["min"] +" до "+ data["max"] +"</p>"
            // Обработайте данные ответа здесь
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

getlistdata()

