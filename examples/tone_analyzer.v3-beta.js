'use strict';

var watson = require('watson-developer-cloud');
var jsonQuery = require('json-query'); // 宣告程式使用套件

var tone_analyzer = watson.tone_analyzer({
	username : '<User Name>',
	password : '<Password>',
	version : 'v3',
	version_date : '2016-05-19'
});

 var txt = 'Hi Team,' +
 'The times are difficult! Our sales have been disappointing for the past three quarters for our data analytics product suite. We have a competitive data analytics product suite in the industry. But we are not doing a good job at selling it.' +
 'We need to acknowledge and fix our sales challenges. We cannot blame the economy for our lack of execution! We are missing critical sales opportunities. Our clients are hungry for analytical tools to improve their business outcomes. In fact, it is in times such as this, our clients want to get the insights they need to turn their businesses around. We need to buckle up and execute.' +
 'In summary, we have a competitive product, and a hungry market. We have to do our job to close the deals.' +
 'Jennifer Baker' +
 'Sales Leader, North-East region';

// 中文支援不準確且無法解出sentence
//var txt = '親愛的綠先生：'
//		+ '有關：客戶抱怨'
//		+ '在此本人要陳述的是｛請求退貨退款｝的相關事宜。（發票號碼 0438/E748）'
//		+ '今年八月八日，本人在貴公司低歪連鎖店買了一件襯衫。'
//		+ '很不幸的是，這件襯衫的顏色在第一次洗滌時就褪色了。我只穿過一次，然後照著標簽上的說明來清洗它，但它竟然褪色得很厲害，以至於我再也無法穿著它。我將它帶回低歪連鎖店，希望更換一件，但卻被告知其他客戶也遇到同樣的情況，製造廠回覆說那一定是不當洗滌所造成。因此我自己寫信給製造廠，但是六個星期過去了，卻連一封客套的回信也沒收到。'
//		+ '我很失望，因為這個產品不像你們所保證的是不褪色的，而你們的客戶服務也未正確地被展現出來。'
//		+ '要解決這個問題，我會感激你們，如果讓我退錢退貨。' + '附件是收據的拷貝。'
//		+ '我期待你的回函，並且解決我的問題。我等你的回覆到十月十五日，逾期之後，我會尋求消費者保護委員會的幫助。請透過以上地址或電話連繫我。'
//		+ '謝謝你在這件事上的恊助。';

tone_analyzer.tone({
	text : txt
}, function(err, tone) {
	if (err) {
		console.log(err);
	} else {
		try {
			console.log('**** list document_tone tone_name and score ****');
			var tones = jsonQuery('document_tone.tone_categories.tones[*]', {
				data : tone
			});
			var i = 0;
			tones.references[0].forEach(function(entry) {
				console.log((++i) + '.' + JSON.stringify({
					tone_name : entry.tone_name,
					score : entry.score
				}, null, 2));
			});
			console.log('\n');
			console.log('**** list sentences_tone tone_name and score ****');

			var j = 1;
			tone.sentences_tone.forEach(function(entry) { // sentences_tone
				console.log('sentences:' + entry.text);
				i = 1;
				tones = jsonQuery('tone_categories.tones[*]', {
					data : entry
				});
				tones.references[0].forEach(function(entry) {
					console.log((++i) + '.' + JSON.stringify({
						tone_name : entry.tone_name,
						score : entry.score
					}, null, 2));
				});
			});
		} catch (err) {
			console.log(err);
			console.log(JSON.stringify(tone));
		}
	}
});