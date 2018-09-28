
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
	// 第2引数に渡した関数はスタックトレースから除外される
	Error.captureStackTrace(error, caller || getTrace);
	Error.prepareStackTrace = prepareStackTrace;
	var stack = error.stack;
	Error.prepareStackTrace = original;
	return stack;
}
var getCallerInfo = function(caller) {
	var t = getTrace(caller);
	//t={ 
	//  name: 'ng',
	//  file:'C:\\_Program\\wg\\GitHub\\ngchat-func\\functions\\apps\\utils\\res.js',
	//  line: 4,
	//  column: 9 
	//}
	if (!t) {
		return "";
	}
	var file = t.file.replace(/\\/g, '\/').replace(/\/\//g, '\/');
	var at = file.lastIndexOf("/");
	if (at != -1) {
		file = file.substr(at);
	}
	return file + "#" + t.name + "(" + t.line + ") ";
}

var info = function(msg, obj) {
    if (obj) {
        console.log(getCallerInfo(info) + " " + msg, obj);
    } else {
        console.log(getCallerInfo(info) + " " + msg);
    }
};
exports.info = info;

var warn = function(msg, obj) {
    if (obj) {
        console.warn(getCallerInfo(warn) + " " + msg, obj);
    } else {
        console.warn(getCallerInfo(warn) + " " + msg);
    }
};
exports.warn = warn;
