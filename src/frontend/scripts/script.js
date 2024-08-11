
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
    try{
        states__[step+1].requested_data = {}
        states__[step+1].choosed = ""
    }catch{}

    // Iterate over each parameter in the 'param' array of the current state
    states__[step].param.forEach(p => {
        // Log the entire requested_data for debugging

        // Check if requested_data for the chosen key exists and has the property p
        console.log(p)
        if (states__[step].requested_data[ch] && states__[step].requested_data[ch]["p"][p]) {
            // Set the item in localStorage
            localStorage.setItem(p, states__[step].requested_data[ch]["p"][p]);
            localStorage.setItem(p+"name", ch)
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
    const brand_name = localStorage.getItem("brandname");
    const model_name = localStorage.getItem("modelname");
    const creationYear_name = localStorage.getItem("creationYearname");
    
    fetch("frontend/final.html")
     .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("pict").src =""
            document.getElementById("cars_h2").classList.add("text-start")
            document.getElementById("cars_h2").innerHTML = brand_name + ", " + model_name + ", " + creationYear_name
            pictrow = document.getElementById("pictrow")
            document.getElementById("pict").src = "./frontend/Frame 1.svg"


            pictrow.innerHTML = 
                '<label for="pict" class="form-label text-start" ><h4 class="mt-4" id="picth4">Как определяется стоимость </h4><p id="pictp">Средняя стоимость автомобиля равняется среднему значению от стоимости всех аналогичных автомобилей, попавших в выборку</p></label>' 
                + pictrow.innerHTML
                
            
            
            div = document.getElementById("main__container")
            div.innerHTML = data
            get_simple_appr()

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
    console.log(model)


    console.log(regionId, brand, model, creationYear);

    // Формируем URL с параметрами
    const url = new URL("/get_apprasial", window.location.origin);
    url.searchParams.append("brand", brand);
    url.searchParams.append("model", model);
    url.searchParams.append("creationYear", creationYear);

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
            html = '<div class="d-flex align-items-center mt-0" id="resblock"><img src="./frontend/coins.svg" alt="Coins" class="icon"></img>'
            
            if (Object.keys(data).length === 0)
                html +="<h3 class='mx-4 text-start' id='res'>Недостаточно данных для онлайн оценки.</h3></div>" 
            // Обработайте данные ответа здесь
            else{
                html +="<h3 class='mx-4 text-start' id='res'>"+ "От " + data["min"] +" до "+ data["max"] +"</h3></div>"
            }
            document.getElementById("resappr").innerHTML += html
            
                
            // Обработайте данные ответа здесь
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function sendyes() {
    // Инициализация флагов и получение значений из формы
    const username = document.getElementById("exampleFormControlInput1").value;
    const phone = document.getElementById("exampleFormControlInput2").value;
    const agreeCheckbox = document.getElementById("agreeCheckbox").checked;
    const clientId = localStorage.getItem("clientId");
    const brand_name = localStorage.getItem("brandname");
    const model_name = localStorage.getItem("modelname");
    const creationYear_name = localStorage.getItem("creationYearname");


    // Проверка на заполненность полей
    if (username === "" || phone === "") {
        document.getElementById("errmess").innerText = "Введите все поля";
        return;
    }

    // Функция для проверки валидности номера телефона
    function isValidPhoneNumber(phoneNumber) {
        // Регулярное выражение для проверки номера телефона
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(phoneNumber);
    }

    // Проверка на валидность номера телефона
    if (!isValidPhoneNumber(phone)) {
        document.getElementById("errmess").innerText = "Введите корректный номер телефона";
        return;
    }

    // Проверка состояния флажка
    if (!agreeCheckbox) {
        document.getElementById("errmess").innerText = "Вы должны согласиться с условиями Политики Конфиденциальности";
        return;
    }

    // Создание объекта данных для отправки
    

    // Отправка POST-запроса
    const url = new URL('/sendtosalebot', window.location.origin);
    url.searchParams.append('phone', phone);
    url.searchParams.append('username', username);
    url.searchParams.append("brand", brand_name);
    url.searchParams.append("model", model_name);
    url.searchParams.append("creationYear", creationYear_name);
    url.searchParams.append("clientId", clientId);

    // Отправка GET-запроса
    fetch(url, {
        method: 'GET'
    })
    .then(response => {
        if (response.ok) {
            // Обработка успешного ответа
            document.getElementById('main__container').classList.add("d-none");
            
            document.getElementById('thankYouMessage').classList.remove("d-none")
            document.getElementById('thankYouMessage').classList.add("d-block")
            console.log("Запрос успешно отправлен.");
        } else {
            // Обработка ошибки ответа
            document.getElementById("errmess").innerText = "Ошибка при отправке данных";
            console.error("Ошибка при отправке данных:", response.statusText);
        }
    })
    .catch(error => {
        // Обработка сетевых ошибок
        document.getElementById("errmess").innerText = "Ошибка при отправке данных";
        console.error("Ошибка при отправке данных:", error);
    });
}




loadContent()

