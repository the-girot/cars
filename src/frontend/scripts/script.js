
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
  try{
    document.getElementById("que_label").innerText = states__[step].que_label
    document.getElementById("btn_question").innerText = states__[step].btn_question
    document.getElementById("buttons").innerHTML = states__[step].buttons}
    catch(err){}
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




const search_field = document.getElementById("search-field question");
const list_items = Array.from(
    document.getElementById("list-answer").getElementsByClassName("dropdown-item")
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
        document.getElementById("btn_question").textContent = list_item.textContent;
    });
});
