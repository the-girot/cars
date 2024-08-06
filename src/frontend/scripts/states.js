const states__ = [
  // {
  //   "param": ["region",],
  //   "attrs": [],
  //   "que_label":"Выберите регион",
  //   "btn_question":"Регион",
  //   "buttons":'<button type="button" class="btn w-100 form_button" onclick="increment(); loadContent();    " >Начать</button>',
  //   "requested_data":{},
  //   "choosed":"",
  //   "url":"regions",'<button type="button" class="btn w-100 form_button" onclick=" decrement(); loadContent();  " >Назад</button>' 
    
    
  // },
  {
    "param": ["brand",],
    "attrs": [],
    "que_label":"Выберите марку",
    "btn_question":"Марка",
    "buttons":'<button type="button" class="btn w-100 form_button" onclick="increment(); loadContent(); " >Далее</button>',
    "requested_data":{},
    "choosed":"",
    "url":"brands",
  },
  {
    "param": ["model",],
    "attrs": ["brand",],
    "que_label":"Выберите модель",
    "btn_question":"Модель",
    "buttons":'<button type="button" class="btn w-100 form_button" onclick="decrement(); loadContent();   " >Назад</button>' 
    +'<button type="button" class="btn w-100 form_button" onclick="increment(); loadContent();    " >Далее</button>',
    "requested_data":{},
    "choosed":"",
    "url":"models",
  },
  {
    "param": ["creationYear",],
    "attrs": ["brand","model",],

    "que_label":"Выберите дату производства",
    "btn_question":"Дата производства",
    "buttons":'<button type="button" class="btn w-100 form_button" onclick="decrement(); loadContent();   " >Назад</button>' 
    +'<button type="button" class="btn w-100 form_button" onclick=" get_final();" >Оценить бесплатно</button>',
    "requested_data":{},
    "choosed":"",
    "url":"creationYears",
  },
//   {
//     "param": ["creationYear",],
//     "attrs": ["brand","model",],

//     "que_label":"Выберите дату производства",
//     "btn_question":"Дата производства",
//     "buttons":'<button type="button" class="btn w-100 form_button" onclick="set_choosed(); decrement(); loadContent(); getlistdata(); prepare_list();  " >Назад</button>' 
//     +'<button type="button" class="btn w-100 form_button" onclick="set_choosed(); increment(); loadContent(); getlistdata(); prepare_list();  " >Далее</button>',
//     "requested_data":{},
//     "choosed":"",
//     "url":"creationYears",
//   },
//   {
//     "param": ["generation",],
//     "attrs": ["brand","model","creationYear",],
//     "que_label":"Выберите поколение",
//     "btn_question":"Поколение",
//     "buttons":'<button type="button" class="btn w-100 form_button" onclick="set_choosed(); decrement(); loadContent(); getlistdata(); prepare_list();  " >Назад</button>' 
//     +'<button type="button" class="btn w-100 form_button" onclick="set_choosed(); increment(); loadContent(); getlistdata(); prepare_list();  " >Далее</button>',
//     "requested_data":{},
//     "choosed":"",
//     "url":"generations ",
//   },
//   {
//     "param": ["body", "doors"],
// "attrs": ["brand","model","creationYear","generation",],
//     "que_label":"Выберите тип кузова",
//     "btn_question":"Кузов",
//     "buttons":'<button type="button" class="btn w-100 form_button" onclick="set_choosed(); decrement(); loadContent(); getlistdata(); prepare_list();  " >Назад</button>' 
//     +'<button type="button" class="btn w-100 form_button" onclick="set_choosed(); increment(); loadContent(); getlistdata(); prepare_list();  " >Далее</button>',
//     "requested_data":{},
//     "choosed":"",
//     "url":"bodies",
//   },
//   {
//     "param": ["gear",],
// "attrs": ["brand","model","creationYear","generation","body","doors",],
//     "que_label":"Выберите КПП",
//     "btn_question":"КПП",
//     "buttons":'<button type="button" class="btn w-100 form_button" onclick="set_choosed(); decrement(); loadContent(); getlistdata(); prepare_list();  " >Назад</button>' 
//     +'<button type="button" class="btn w-100 form_button" onclick="set_choosed(); increment(); loadContent(); getlistdata(); prepare_list();  " >Далее</button>',
//     "requested_data":{},
//     "choosed":"",
//     "url":"gears",
//   },
//   {
//     "param": ["drive",],
// "attrs": ["brand","model","creationYear","generation","body","doors","gear",],
//     "que_label":"Выберите тип привода",
//     "btn_question":"Привод",
//     "buttons":'<button type="button" class="btn w-100 form_button" onclick="set_choosed(); decrement(); loadContent(); getlistdata(); prepare_list();  " >Назад</button>' 
//     +'<button type="button" class="btn w-100 form_button" onclick="set_choosed(); increment(); loadContent(); getlistdata(); prepare_list();  " >Далее</button>',
//     "requested_data":{},
//     "choosed":"",
//     "url":"drives",
//   },
//   {
//     "param": ["engine","power","volume"],
//     "attrs": ["brand","model","creationYear","generation","body","doors","gear","drive",],
//     "que_label":"Выберите двигатель",
//     "btn_question":"Двигатель",
//     "buttons":'<button type="button" class="btn w-100 form_button" onclick="decrement(); loadContent()" >Оценить бесплатно</button>',
//     "requested_data":{},
//     "choosed":"",
//     "url":"engines",
//   },
]