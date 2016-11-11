var c2l = require("./c2l");
var userToken;
var globalYear;

window.FirebasePlugin.onTokenRefresh(function(token) {
    // save this server-side and use it to push notifications to this device
    userToken = token;
}, function(error) {
    console.error(error);
});

var padding = "10%";
var paddingBottom = 3;
var font = "14px";
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
  keyboard: "email",
  font: font
}).appendTo(scrollView);

var regPhonenumber = new tabris.TextInput({
  layoutData: {left: padding, top: [regMail,paddingBottom], right: padding},
  message: "Мобильный, пример +79851234567",
  keyboard: "phone",
  font: font
}).appendTo(scrollView);

var regName = new tabris.TextInput({
  layoutData: {left: padding, top: [regPhonenumber,paddingBottom], right: padding},
  message: "Ваше ФИО",
  font: font
}).appendTo(scrollView);

var regGenderText = new tabris.TextView({
	layoutData: {left: padding, top: [regName,paddingBottom+8], right: "40%"},
	text: "Ваш пол: ",
  font: font
}).appendTo(scrollView);

var regGender = new tabris.Picker({
 	layoutData: {left: [regGenderText,0], top: [regName,paddingBottom], right: padding},
	items: ["Мужчина","Женщина"],
  font: font
}).appendTo(scrollView);

var regAge = new tabris.TextInput({
  layoutData: {left: padding, top: [regGender,paddingBottom], right: padding},
  message: "Дата рождения",
  keyboard: "number",
  font: font
}).on("tap", function () {
  var options = {
    date: new Date(),
    maxDate: new Date(),
    mode: 'date'
  };
   
  function onSuccess(date) {
      globalYear = date;
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      regAge.set("text",day+"."+month+"."+year);
      regAge.set("focused",false);
  }
   
  function onError(error) { // Android only 
      console.log('Error: ' + error);
  }
   
  datePicker.show(options, onSuccess, onError);
}).appendTo(scrollView);

var regSphere = new tabris.TextInput({
  layoutData: {left: padding, top: [regAge,paddingBottom], right: padding},
  message: "Ваша cфера деятельности",
  font: font
}).appendTo(scrollView);

var regJob = new tabris.TextInput({
  layoutData: {left: padding, top: [regSphere,paddingBottom], right: padding},
  message: "Ваша должность",
  font: font
}).appendTo(scrollView);

var regCarText = new tabris.TextView({
  layoutData: {left: padding, top: [regJob,paddingBottom+8], right: "40%"},
  text: "Марка вашего авто: ",
  font: font
}).appendTo(scrollView);

var regCar = new tabris.Picker({
    layoutData: {left: [regCarText,0], top: [regJob,paddingBottom], right: padding},
    items: [],
    font: font
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
    items: [],
    font: font
}).appendTo(scrollView);

var regCarKuzovText = new tabris.TextView({
  layoutData: {left: padding, top: [regCarModel,paddingBottom+8], right: "40%"},
  text: "Кузов вашего авто: ",
  font: font
}).appendTo(scrollView);

var regCarKuzov = new tabris.Picker({
    layoutData: {left: [regCarKuzovText,0], top: [regCarModel,paddingBottom], right: padding},
    items: ["Седан","Универсал","Хетчбэк","Купе","Лимузин","Микроавтобус","Минивэн","Хардтоп","Таун-кар","Комби","Лифтбэк","Фастбэк","Кабриолет","Родстер","Фаэтон","Ландо","Брогам","Тарга","Спайдер","Шутингбрейк","Пикап","Фургон"],
    font: font
}).appendTo(scrollView);

var regCarYear = new tabris.TextInput({
  layoutData: {left: padding, top: [regCarKuzov,paddingBottom], right: padding},
  message: "Год выпуска авто",
  keyboard: "number",
  font: font
}).appendTo(scrollView);

var regCityText = new tabris.TextView({
  layoutData: {left: padding, top: [regCarYear,paddingBottom+8], right: "40%"},
  text: "Ваш город: ",
  font: font
}).appendTo(scrollView);

var regCity = new tabris.Picker({
    layoutData: {left: [regGenderText,0], top: [regCarYear,paddingBottom], right: padding},
    items: ["Москва","Санкт-Петербург","Другой"],
    font: font
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
    age:globalYear,
    sphere:regSphere.get("text"),
    job:regJob.get("text"),
    car:regCar.get("selection"),
    carmodel:regCarModel.get("selection"),
    kuzov:regCarKuzov.get("selection"),
    caryear:regCarYear.get("text"),
    city:regCity.get("selection"),
    reg_id: userToken
  };
  if (data.email=="" || data.phone=="" || data.name=="" || data.age=="" || data.caryear=="" || data.sphere=="" || data.job=="") {
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

    /*window.FirebasePlugin.subscribe(c2l(data.sex.toUpperCase()));
    window.FirebasePlugin.subscribe(c2l((data.age+"лет").toUpperCase()));
    window.FirebasePlugin.subscribe(c2l(data.job.toUpperCase()));
    window.FirebasePlugin.subscribe(c2l(data.car.toUpperCase()));
    window.FirebasePlugin.subscribe(c2l(data.city.toUpperCase()));*/

    page.open();
  }).catch(function(err) {
    navigator.notification.alert("Для работы приложения необходимо интернет соединение.", null, "Ошибка соединения!", "Ок");
  });
}).appendTo(scrollView);

module.exports = function(cp,fields,cip) {
  ip = cip;
  page = cp;
  //regSphere.set("items", fields.spheres);
  //jobs = fields.jobs;
  cars = fields.cars;
  //regJob.set("items", fields.jobs[fields.spheres[0]]);
  regCar.set("items", fields.marks);
  regCarModel.set("items", fields.cars[fields.marks[0]]);
  return regPage;
}