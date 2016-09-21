var quizes = [
	{title:"Номер 1", desc:"Описание ацушпаоуцщаоуцщаоцщуаоуща", img:["1.jpg","2.jpg","3.jpg"], link:""},
	{title:"Номер 1", desc:"Описание ацушпаоуцщаоуцщаоцщуаоуща", img:["1.jpg","2.jpg","3.jpg"], link:""},
	{title:"Номер 1", desc:"Описание ацушпаоуцщаоуцщаоцщуаоуща", img:"", link:""},
	{title:"Номер 1", desc:"Описание ацушпаоуцщаоуцщаоцщуаоуща", img:"", link:""},
	{title:"Номер 1", desc:"Описание ацушпаоуцщаоуцщаоцщуаоуща", img:"", link:""},
	{title:"Номер 1", desc:"Описание ацушпаоуцщаоуцщаоцщуаоуща", img:"", link:""},
	{title:"Номер 1", desc:"Описание ацушпаоуцщаоуцщаоцщуаоуща", img:"", link:""},
];

var padding = "5%";
var paddingBottom = 10;

var page = new tabris.Page({
  topLevel: true,
  title: "Оплачиваемые опросы"
});

var regPage = new tabris.Page({
  topLevel: true,
  title: "Регистрация"
});

var regMail = new tabris.TextInput({
  layoutData: {left: padding, top: paddingBottom, right: padding},
  message: "Ваш email",
  keyboard: "email"
}).appendTo(regPage);

var regPhonenumber = new tabris.TextInput({
  layoutData: {left: padding, top: [regMail,paddingBottom], right: padding},
  message: "Ваш номер мобильного",
  keyboard: "phone"
}).appendTo(regPage);

var regName = new tabris.TextInput({
  layoutData: {left: padding, top: [regPhonenumber,paddingBottom], right: padding},
  message: "Ваше имя"
}).appendTo(regPage);

var regSurname = new tabris.TextInput({
  layoutData: {left: padding, top: [regName,paddingBottom], right: padding},
  message: "Ваша фамилия"
}).appendTo(regPage);

var regFathersname = new tabris.TextInput({
  layoutData: {left: padding, top: [regSurname,paddingBottom], right: padding},
  message: "Ваше отчество"
}).appendTo(regPage);

var regGenderText = new tabris.TextView({
	layoutData: {left: padding, top: [regFathersname,paddingBottom], right: "40%"},
	text: "Ваш пол: "
}).appendTo(regPage);

var regGender = new tabris.Picker({
  	layoutData: {left: [regGenderText,0], top: [regFathersname,paddingBottom], right: padding},
  	items: ["Мужчина","Женщина"]
}).appendTo(regPage);

var regButton = new tabris.Button({
  	layoutData: {left: padding, top: [regGender,paddingBottom], right: padding},
  	background: "green",
  	text: "Зарегистрироваться"
}).on("select", function () {
	//regPage.close();
	page.open();
}).appendTo(regPage);


var fullList = require("./list")(quizes);

//var picWidth = tabris.device.get("screenWidth")/3;

var tabFolder = new tabris.TabFolder({
  layoutData: {left: 0, top: 0, right: 0, bottom: 0},
  paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
}).appendTo(page);

var fullListTab = new tabris.Tab({
  title: 'Все опросы'
}).appendTo(tabFolder);

var userListTab = new tabris.Tab({
  title: 'Мои опросы'
}).appendTo(tabFolder);

var infoTab = new tabris.Tab({
  title: 'Информация'
}).appendTo(tabFolder);

fullList.appendTo(fullListTab);

fullList.on("refresh", function (widget) {
	//call update from server
	fullList.refresh();
	fullList.set("refreshIndicator",false);
});

regPage.open();
//page.open();