var infoView = new tabris.ScrollView({
  	left: 0, right: 0, top: 0, bottom: 0
});

var header1 = new tabris.TextView({
	layoutData: {left: "5%", top: "5%", right: "5%"},
	font: "bold 34px",
	text: "Общее"
}).appendTo(infoView);

var text1 = new tabris.TextView({
	layoutData: {left: "5%", top: [header1,15], right: "5%"},
	font: "14px",
	text: "Прежде чем выпустить на рынок новый продукт, например новый сок или напиток, его должны протестировать, для этого на опрос приглашаются люди (респонденты) которые высказывают свое мнение об этом продукте, нравится ли его дизайн и что они думают, только после исследования на наш рынок выходит новый продукт! За свое мнение участники получают различное денежное вознаграждение, стоимость которого зависит от конкретного опроса. Платные опросы это сбор первичной информации от участников опроса! На самом опросе людям задают вопросы, узнают их мнение о продукте. Им часто дают просматривать рекламные ролики, после просмотра спрашивают что их впечатлило, они заполняют небольшую анкету, в ней кратко описывают свое мнение. После такого тестирования реклама, новый фильм или телепередача выходит на телевидение. За ваше участие в опросах и за ваше мнение, исследовательская компания выплачивает Вам вознаграждение (от 400 до 5000 руб.) Опросы обычно проходят в офисе исследовательской компании. Продолжительность платных опросов различная (от 40 мин до 3,5 ч.)."
}).appendTo(infoView);

var header2 = new tabris.TextView({
	layoutData: {left: "5%", top: [text1,15], right: "5%"},
	font: "bold 34px",
	text: "Виды исследований"
}).appendTo(infoView);

var text2 = new tabris.TextView({
	layoutData: {left: "5%", top: [header2,15], right: "5%"},
	font: "14px",
	markupEnabled: true,
	text: "<b>ХОЛЛ-ТЕСТ</b>– это короткий опрос, на котором участники исследования (респонденты) обычно что-то дегустируют, после чего заполняют краткую анкету, где описывают свое мнение. Обычно длительность такого опроса 30-40 минут. Обычное вознаграждение за данный опрос составляет от 350 до 1000 руб. Во время такого опроса часто проводится тестирование упаковки товара, рекламных роликов, концепции товара или услуги, цены на товар и др.<br/><br/><b>ФОКУС ГРУППА</b> создается для предоставления возможности ее участникам в ходе умело направляемой дискуссии высказываться по теме обсуждения, пытаясь ее раскрыть со своей точки зрения. При изучении фокус-групп можно получить широкий круг мнений. Например, это может быть уровень удовлетворенности и постоянства потребителей, восприятие уровня обслуживания (и его постоянстве), какие компании считаются лидерами по качеству предоставляемых услуг.<br/><br/><b>ГЛУБИННОЕ ИНТЕРВЬЮ</b> - это качественный метод, применяемый при проведении маркетинговых исследований. Глубинное интервью представляет собой личную беседу интервьюера с респондентом в форме, побуждающей последнего к подробным ответам на задаваемые вопросы. В ходе такой беседы интервьюер может выяснять мнения, убеждения, осведомленность или привычки респондента.<br/><br/><b>ДОМАШНИЙ ВИЗИТ</b> - этот вид опроса проходит у респондента дома. К нему в заранее оговоренное время приходят 2-3 человека (представители маркетинговой компании) беседую с ним о его образе жизни, привычка, потребляемой продукции. Длительность визита составляет от часа до трех. Во время визита проходит видео и фотосъемка. <br/><br/><b>ТАЙНЫЙ ПОКУПАТЕЛЬ</b> -Это специальный человек, который приходит на торговую точку и под видом обычного покупатель делает заказы. При этом тайный покупатель внимательно всё оценивает - от манеры общения продавцов до того как расположен товар на полках. После совершения покупки составляется детальный отчёт"
}).appendTo(infoView);

module.exports = infoView;