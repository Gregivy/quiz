var _ = require("underscore");
var c2l = require("./c2l");

var ip = "http://192.168.43.11:3000/";

window.FirebasePlugin.onNotificationOpen(function(notification) {
    console.log(notification);
}, function(error) {
    console.log(error);
});

var userdata = function(){
	return localStorage.getItem("userdata")?JSON.parse(localStorage.getItem("userdata")):{};
};

console.log(userdata());

tabris.ui.set("background", "#ff4f38");

var quizes = [];

function loadQuizes(afterLoading,onError) {
	fetch(ip+"api/quizes").then(function(response) {
		if (response.status !== 200) {
			onError();
			return;
		}
		response.json().then(function(qs){
			//quizes = qs.data;
			_.map(qs,function(el) {
				if (el.img.file) el.img.file = el.img.file.replace("localhost","192.168.43.11");
				return el;
			});
			afterLoading(qs);
		});
	}).catch(function(err) {
		onError();
	});
}

function fullQuizListLoad() {
	loadQuizes(function(data) {
		fullList.remove(0,fullList.get("items").length);
		fullList.insert(data);
		//console.log(fullList._items);
		fullList.refresh();
		fullList.set("refreshIndicator",false);
	}, function() {
		navigator.notification.alert("Для работы приложения необходимо интернет соединение.", null, "Ошибка соединения!", "Ок");
		console.log("Ошибка соединения!");
		fullList.set("refreshIndicator",false);
	});	
}

function userQuizListLoad() {
	loadQuizes(function(data) {
		var ud = userdata();
		userList.remove(0,userList.get("items").length);
		userList.insert(_.filter(data, function (quiz) {
			var trg = true;
			if (quiz.cars && quiz.cars.length>0 && quiz.cars.indexOf(ud.car)==-1) {trg = false;}
			else if (quiz.jobs && quiz.jobs.length>0 && quiz.jobs.indexOf(ud.job)==-1) {trg = false;} 
			else if (quiz.sex && quiz.sex!="none" && quiz.sex!=ud.sex) {trg = false;}
			else if (quiz.cities && quiz.cities.indexOf("none")==-1 && quiz.cities.indexOf(ud.city)==-1) {trg = false;}
			else if (quiz.fromage && ud.age!="" && ud.age<quiz.fromage) {trg = false;} 
			else if (quiz.toage && ud.age!="" && ud.age>quiz.toage) {trg = false;} 
			return trg;
		}));
		//console.log(fullList._items);
		userList.refresh();
		userList.set("refreshIndicator",false);
	}, function() {
		navigator.notification.alert("Для работы приложения необходимо интернет соединение.", null, "Ошибка соединения!", "Ок");
		userList.set("refreshIndicator",false);
	});	
}

/*fetch("http://192.168.43.11:3000/api/quizes").then(function(response) {
	return response.json();
}).then(function(qs){
	quizes = qs.data;
	fullList.remove(0,-1);
	fullList.insert(quizes);
	console.log(fullList._items);
});*/

var page = new tabris.Page({
  topLevel: true,
  title: "Оплачиваемые опросы"
});

var regPage;
var regFunction = function () {
	fetch(ip+"api/fields").then(function(response) {
		if (response.status !== 200) {
			navigator.notification.alert("Для работы приложения необходимо интернет соединение.", regFunction, "Ошибка соединения!", "Ок");
			return;
		}
		response.json().then(function(data){
			var data = data.data;
			console.log(data);
			var fields = {};
			fields.spheres = [];
			fields.jobs = {};
			fields.cars = _.findWhere(data, {type: "cars"}).value.split("\n");		
			var jobs = _.findWhere(data, {type: "jobs"}).value;
			jobs = jobs.split("-").slice(1);
			for (var i=0; i<jobs.length; i++) {
				var t = jobs[i].split("\n");
				var sphere = t.shift();
				fields.spheres.push(sphere);
				fields.jobs[sphere] = _.filter(t,function(s) { return s==""?false:true;});
			}
			console.log(ip);

			regPage = require("./regpage")(page,fields,ip);
			regPage.open();
		});
	}).catch(function(err) {
		navigator.notification.alert("Для работы приложения необходимо интернет соединение.", regFunction, "Ошибка соединения!", "Ок");
	});
}
if (!localStorage.getItem('registered')) {
	regFunction();
} else {
	page.open();
}


var enterPage = require("./enterpage");

var fullList = require("./list")(quizes);

var userList = require("./list")([]);

var infoView = require("./infoview");



//var picWidth = tabris.device.get("screenWidth")/3;

var tabFolder = new tabris.TabFolder({
  layoutData: {left: 0, top: 0, right: 0, bottom: 0},
  background: "#ff4f38",
  textColor: "white",
  paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
}).appendTo(page);

var fullListTab = new tabris.Tab({
  title: 'Все опросы',
  background: "white",
}).appendTo(tabFolder);

var userListTab = new tabris.Tab({
  title: 'Мои опросы',
  background: "white"
}).appendTo(tabFolder);

var infoTab = new tabris.Tab({
  title: 'Информация',
  background: "white"
}).appendTo(tabFolder);

fullList.appendTo(fullListTab);
userList.appendTo(userListTab);
infoView.appendTo(infoTab);

fullList.on("refresh", function (widget) {
	//call update from server
	fullQuizListLoad();
});

userList.on("refresh", function (widget) {
	//call update from server
	userQuizListLoad();
});


fullQuizListLoad();
userQuizListLoad();
//enterPage.open();

//page.open();v