
exports.enabled = true;

var prepareStackTrace = function(error, structuredStackTrace) {
    var trace = structuredStackTrace[0];
    return {
      // method name
      name: trace.getMethodName() || trace.getFunctionName() || "<anonymous>",
      // file name
      file: trace.getFileName(),
      // line number
      line: trace.getLineNumber(),
      // column number
      column: trace.getColumnNumber()
    };
}

var getTrace = function(caller) {
	var original = Error.prepareStackTrace, error = {};
	// // 第2引数に渡した関数はスタックトレースから除外される
	Error.captureStackTrace(error, caller || getTrace);
	Error.prepareStackTrace = prepareStackTrace;
	var stack = error.stack;
	Error.prepareStackTrace = original;
	return stack;
}
var getCallerInfo = function(caller) {
	var t = getTrace(caller);
	// Error \n
	// at 関数名 (ファイル:line:col)\n	←関数名が取れる場合
	// at ファイル:line:col\n			←無名関数の場合
	var lines = t.split("\n");
	if (lines.length < 2) {
		return "";
	}
	var line = lines[1];
	var func = "";
	var row  = "";
	var at   = -1;

	// 関数名を抽出
	var wFunc = line;
	at = wFunc.indexOf(" \(");
	if (at != -1) {
		wFunc = wFunc.substr(0, at);
		at = wFunc.indexOf(" at ");
		if (at != -1) {
			func = wFunc.substr(at + 4);
			// Object. で始まる場合カット
			at = wFunc.indexOf("Object\.");
			if (at == 7) {
				func = func.substr(7);
			}
		}
	}

	// 最後の\ または / 以降を抽出
	var file = line;
	at = file.lastIndexOf("\\");
	if (at == -1) {
		at = file.lastIndexOf("/");
	}
	if (at != -1) {
		file = file.substr(at + 1);
	}
	// ファイル名:行:列 の列をカット
	at = file.lastIndexOf(":");
	if (at != -1) {
		file = file.substr(0, at);
		// ファイル名:行を分割
		at = file.lastIndexOf(":");
		if (at != -1) {
			row  = file.substr(at + 1);
			file = file.substr(0, at);
		}
	}
	if (func.length != 0) {
		return file + "#" + func;
	} else {
		return file + ":" + row;
	}
}

var info = function(msg, obj) {
    if (obj) {
        console.log(/*getCallerInfo(info) + " " + */msg, obj);
    } else {
        console.log(/*getCallerInfo(info) + " " + */msg);
    }
};

exports.info = info;
