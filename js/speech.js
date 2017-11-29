var text = null;

function startRecognize() {
	if(plus.os.name == 'Android' && navigator.userAgent.indexOf('StreamApp') > 0) {
		plus.nativeUI.toast('当前环境暂不支持语音识别插件');
		return;
	}
	var options = {};
	options.engine = 'iFly';
	options.punctuation = false; // 是否需要标点符号 
	plus.speech.startRecognize(options, function(s) {
		alert(s);
		$.ajax({
			type: "post",
			dateType: "json",
			url: "http://106.15.183.25:8091/api/v1/app/speech",
			async: true,
			data: {
				"content": s
			},
			success: function(res) {
				if(res.code == 10000) {
					if(res.data.status == '1') {
						alert(res.data.content);
					} else if(res.data.status == '0') {
						plus.nativeUI.toast("听不清楚，请您重新说一遍吧~~");
					}
				}
			}
		});
	}, function(e) {

	});
}