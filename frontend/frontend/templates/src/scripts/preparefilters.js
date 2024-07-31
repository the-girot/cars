function prepareFilters() {
    fetch("api/sizhistory/getfiltersdata")
        .then((response) => response.json())
        .then((data) => {

            // Здесь вы можете обработать полученные данные
            Object.getOwnPropertyNames(data).forEach(key => {
                let list = document.getElementById("list " + key);
                Array.from(data[key]).forEach(value => {
                    list.innerHTML += '<li><a class="dropdown-item">' + value + '</a></li>'
                });

            });
        })
        .catch((error) => console.error("Ошибка:", error));

}
