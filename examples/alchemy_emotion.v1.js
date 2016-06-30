/// Detects emotions (anger, digust, fear, joy, and sadness)
/// http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/alchemy-language/api/v1/#emotion_analysis

'use strict';

var watson = require('watson-developer-cloud');

var alchemy_language = watson.alchemy_language({
	api_key : '<API Key>'
});


var params = {
	text : 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
};

alchemy_language.emotion(params, function(err, response) {
	if (err) {
		console.log('error:', err);
	} else {
		console.log('---- English ----');
		console.log(JSON.stringify(response, null, 2));
	}
});

/// error: { error: 'unsupported-text-language', code: 400 }
params = {
	text : '我新買的palermo gm 包包 ,今天一早發現旁邊掛協背帶的五金掉漆,整個超心痛的,我才買不到一個月才背了三次而已, LV不是以品質聞名嗎,花了四萬多塊確得到這樣的東西,整個就覺得很生氣ㄝ,有人也有跟我一樣的情形嗎??'
};
alchemy_language.emotion(params, function(err, response) {
	if (err) {
		console.log('---- Chinese ----');
		console.log('error:', err);
	} else {
		console.log('---- Chinese ----');
		console.log(JSON.stringify(response, null, 2));
	}
});

// URL GetEmotion
// http://www.charliechaplin.com/en/synopsis/articles/29-The-Great-Dictator-s-Speech
/*
 * curl -X POST -d "apikey=50a401913bbfd70099ef1d1d3a5d4f43545b203a" -d
 * "outputMode=json" -d
 * "url=http://www.charliechaplin.com/en/synopsis/articles/29-The-Great-Dictator-s-Speech"
 * "https://gateway-a.watsonplatform.net/calls/url/URLGetEmotion"
 */
params = {
	url : 'http://www.charliechaplin.com/en/synopsis/articles/29-The-Great-Dictator-s-Speech'
};

alchemy_language.emotion(params, function(err, response) {
	if (err) {
		console.log('error:', err);
	} else {
		console.log('---- English Url ----');
		console.log(JSON.stringify(response, null, 2));
	}
});


// curl -X POST -d "apikey=50a401913bbfd70099ef1d1d3a5d4f43545b203a" -d "outputMode=json" -d "url=http://forum.fashionguide.com.tw/post_list.php?topic_id=122315" "https://gateway-a.watsonplatform.net/calls/url/URLGetEmotion"
// "status": "ERROR", "statusInfo": "unsupported-text-language"
