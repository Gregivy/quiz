var enterPage = new tabris.Page({
  topLevel: true,
  background: "white",
  title: "Вход"
});

var username = new tabris.TextInput({
	layoutData: {left: "10%", top: "30%", right: "10%"},
	message: "Введите ваш логин"
}).appendTo(enterPage);

var password = new tabris.TextInput({
	layoutData: {left: "10%", top: [username,10], right: "10%"},
	type: "password",
	message: "Введите ваш пароль"
}).appendTo(enterPage);

var loginButton = new tabris.Button({
	layoutData: {left: "10%", top: [password,10], width:100},
	text: "Войти"
}).appendTo(enterPage);

var regButton = new tabris.Button({
	layoutData: {left: [loginButton,10], right: "10%", top: [password,10]},
	text: "Регистрация"
}).appendTo(enterPage);

module.exports = enterPage;