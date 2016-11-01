var c2l = require("./c2l");
var userToken;

window.FirebasePlugin.onTokenRefresh(function(token) {
    // save this server-side and use it to push notifications to this device
    userToken = token;
}, function(error) {
    console.error(error);
});

var padding = "10%";
var paddingBottom = 5;
var font = "18px";
var jobs;
var ip;

var regPage = new tabris.Page({
  topLevel: true,
  background: "white",
  title: "Регистрация"
});

var scrollView = new tabris.ScrollView({
  left: 0, right: 0, top: 0, bottom: 0
}).appendTo(regPage);

var regMail = new tabris.TextInput({
  layoutData: {left: padding, top: paddingBottom, right: padding},
  message: "Ваш email",
  keyboard: "email"
}).appendTo(scrollView);

var regPhonenumber = new tabris.TextInput({
  layoutData: {left: padding, top: [regMail,paddingBottom], right: padding},
  message: "Мобильный, пример +79851234567",
  keyboard: "phone"
}).appendTo(scrollView);

var regName = new tabris.TextInput({
  layoutData: {left: padding, top: [regPhonenumber,paddingBottom], right: padding},
  message: "Ваше ФИО"
}).appendTo(scrollView);

var regGenderText = new tabris.TextView({
	layoutData: {left: padding, top: [regName,paddingBottom+8], right: "40%"},
	text: "Ваш пол: ",
  font: font
}).appendTo(scrollView);

var regGender = new tabris.Picker({
  	layoutData: {left: [regGenderText,0], top: [regName,paddingBottom], right: padding},
  	items: ["Мужчина","Женщина"]
}).appendTo(scrollView);

var regAge = new tabris.TextInput({
  layoutData: {left: padding, top: [regGender,paddingBottom], right: padding},
  message: "Дата рождения",
  keyboard: "number"
}).on("tap", function () {
  var options = {
    date: new Date(),
    maxDate: new Date(),
    mode: 'date'
  };
   
  function onSuccess(date) {
      regAge.set("text",date);
      regAge.set("focused",false);
  }
   
  function onError(error) { // Android only 
      console.log('Error: ' + error);
  }
   
  datePicker.show(options, onSuccess, onError);
}).appendTo(scrollView);

var regSphereText = new tabris.TextView({
  layoutData: {left: padding, top: [regAge,paddingBottom+8], right: "40%"},
  text: "Ваш сфера деятельности: ",
  font: font
}).appendTo(scrollView);

var regSphere = new tabris.Picker({
    layoutData: {left: [regGenderText,0], top: [regAge,paddingBottom], right: padding},
    items: []
}).on("change:selection", function (w,s,o) {
  regJob.set("items", jobs[s]);
}).appendTo(scrollView);

var regJobText = new tabris.TextView({
  layoutData: {left: padding, top: [regSphere,paddingBottom+8], right: "40%"},
  text: "Ваша должность: ",
  font: font
}).appendTo(scrollView);

var regJob = new tabris.Picker({
    layoutData: {left: [regGenderText,0], top: [regSphere,paddingBottom], right: padding},
    items: []
}).appendTo(scrollView);

var regCarText = new tabris.TextView({
  layoutData: {left: padding, top: [regJob,paddingBottom+8], right: "40%"},
  text: "Марка вашего авто: ",
  font: font
}).appendTo(scrollView);

var regCar = new tabris.Picker({
    layoutData: {left: [regCarText,0], top: [regJob,paddingBottom], right: padding},
    items: []
}).on("change:selection", function (w,s,o) {
  regCarModel.set("items", cars[s]);
}).appendTo(scrollView);

var regCarModelText = new tabris.TextView({
  layoutData: {left: padding, top: [regCar,paddingBottom+8], right: "40%"},
  text: "Модель вашего авто: ",
  font: font
}).appendTo(scrollView);

var regCarModel = new tabris.Picker({
    layoutData: {left: [regCarModelText,0], top: [regCar,paddingBottom], right: padding},
    items: []
}).appendTo(scrollView);

var regCarKuzovText = new tabris.TextView({
  layoutData: {left: padding, top: [regCarModel,paddingBottom+8], right: "40%"},
  text: "Кузов вашего авто: ",
  font: font
}).appendTo(scrollView);

var regCarKuzov = new tabris.Picker({
    layoutData: {left: [regCarKuzovText,0], top: [regCarModel,paddingBottom], right: padding},
    items: ["Седан","Универсал","Хетчбэк","Купе","Лимузин","Микроавтобус","Минивэн","Хардтоп","Таун-кар","Комби","Лифтбэк","Фастбэк","Кабриолет","Родстер","Фаэтон","Ландо","Брогам","Тарга","Спайдер","Шутингбрейк","Пикап","Фургон"]
}).appendTo(scrollView);

var regCarYear = new tabris.TextInput({
  layoutData: {left: padding, top: [regCarKuzov,paddingBottom], right: padding},
  message: "Год выпуска авто"
}).appendTo(scrollView);

var regCityText = new tabris.TextView({
  layoutData: {left: padding, top: [regCarYear,paddingBottom+8], right: "40%"},
  text: "Ваш город: ",
  font: font
}).appendTo(scrollView);

var regCity = new tabris.Picker({
    layoutData: {left: [regGenderText,0], top: [regCar,paddingBottom], right: padding},
    items: ["Москва","Санкт-Петербург","Другой"]
}).appendTo(scrollView);


var regButton = new tabris.Button({
  	layoutData: {left: padding, top: [regCity,paddingBottom], right: padding},
  	background: "#cc3d00",
    textColor: "white",
  	text: "Зарегистрироваться"
}).on("select", function () {
  var data = {
    email:regMail.get("text"),
    phone:regPhonenumber.get("text"),
    name:regName.get("text"),
    sex:regGender.get("selection"),
    age:regAge.get("text"),
    sphere:regSphere.get("selection"),
    job:regJob.get("selection"),
    car:regCar.get("selection"),
    carmodel:regCarModel.get("selection"),
    kuzov:regCarKuzov.get("selection"),
    caryear:regCarYear.get("text"),
    city:regCity.get("selection"),
    reg_id: userToken
  };
  if (data.email=="" || data.phone=="" || data.name=="" || data.age=="" || date.caryear=="") {
    navigator.notification.alert("Пожалуйста, заполните все поля!", null, "", "Ок");
    return;
  }
	fetch(ip+"api/users", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(function(res) {
    res.json().then(function(data){
      console.log(data);
    });
    localStorage.setItem('registered','true');
    data.job = data.sphere+"_"+data.job;
    data.car = data.car+"_"+data.carmodel;
    localStorage.setItem("userdata",JSON.stringify(data));

    window.FirebasePlugin.subscribe(c2l(data.sex.toUpperCase()));
    window.FirebasePlugin.subscribe(c2l((data.age+"лет").toUpperCase()));
    window.FirebasePlugin.subscribe(c2l(data.job.toUpperCase()));
    window.FirebasePlugin.subscribe(c2l(data.car.toUpperCase()));
    window.FirebasePlugin.subscribe(c2l(data.city.toUpperCase()));

    page.open();
  }).catch(function(err) {
    navigator.notification.alert("Для работы приложения необходимо интернет соединение.", null, "Ошибка соединения!", "Ок");
  });
}).appendTo(scrollView);

module.exports = function(cp,fields,cip) {
  ip = cip;
  page = cp;
  regSphere.set("items", fields.spheres);
  jobs = fields.jobs;
  cars = fields.cars;
  regJob.set("items", fields.jobs[fields.spheres[0]]);
  regCarModel.set("items", fields.cars[fields.marks[0]]);
  return regPage;
}