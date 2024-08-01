const states__ = [
  {
    "param": ["region",],
    "que_label":"Выберите регион",
    "btn_question":"Регион",
    "buttons":'<button type="button" class="btn w-100 form_button" onclick="increment(); loadContent()" >Начать</button>' 
    
  },
  {
    "param": ["brand",],
    "que_label":"Выберите марку",
    "btn_question":"Марка",
    "buttons":'<button type="button" class="btn w-100 form_button" onclick="decrement(); loadContent()" >Назад</button>' 
    +'<button type="button" class="btn w-100 form_button" onclick="increment(); loadContent()" >Далее</button>'
  },
  {
    "param": ["model",],
    "que_label":"Выберите модель",
    "btn_question":"Модель",
    "buttons":'<button type="button" class="btn w-100 form_button" onclick="decrement(); loadContent()" >Назад</button>' 
    +'<button type="button" class="btn w-100 form_button" onclick="increment(); loadContent()" >Далее</button>'
  },
  {
    "param": ["creationYear",],
    "que_label":"Выберите дату производства",
    "btn_question":"Дата производства",
    "buttons":'<button type="button" class="btn w-100 form_button" onclick="decrement(); loadContent()" >Назад</button>' 
    +'<button type="button" class="btn w-100 form_button" onclick="increment(); loadContent()" >Далее</button>'
  },
  {
    "param": ["generation",],
    "que_label":"Выберите поколение",
    "btn_question":"Поколение",
    "buttons":'<button type="button" class="btn w-100 form_button" onclick="decrement(); loadContent()" >Назад</button>' 
    +'<button type="button" class="btn w-100 form_button" onclick="increment(); loadContent()" >Далее</button>'
  },
  {
    "param": ["body",],
    "que_label":"Выберите тип кузова",
    "btn_question":"Кузов",
    "buttons":'<button type="button" class="btn w-100 form_button" onclick="decrement(); loadContent()" >Назад</button>' 
    +'<button type="button" class="btn w-100 form_button" onclick="increment(); loadContent()" >Далее</button>'
  },
  {
    "param": ["gear",],
    "que_label":"Выберите КПП",
    "btn_question":"КПП",
    "buttons":'<button type="button" class="btn w-100 form_button" onclick="decrement(); loadContent()" >Назад</button>' 
    +'<button type="button" class="btn w-100 form_button" onclick="increment(); loadContent()" >Далее</button>'
  },
  {
    "param": ["drive",],
    "que_label":"Выберите тип привода",
    "btn_question":"Привод",
    "buttons":'<button type="button" class="btn w-100 form_button" onclick="decrement(); loadContent()" >Назад</button>' 
    +'<button type="button" class="btn w-100 form_button" onclick="increment(); loadContent()" >Далее</button>'
  },
  {
    "param": ["engine",],
    "que_label":"Выберите двигатель",
    "btn_question":"Двигатель",
    "buttons":'<button type="button" class="btn w-100 form_button" onclick="decrement(); loadContent()" >Оценить бесплатно</button>'
  },


]