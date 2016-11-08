function tfx(v) {
	return (v - 0).toFixed(8);
}

function relBox(box) {
	return {
		x: box.x,
		y: box.y,
		width: box.width,
		height: box.height
	};
}

function stopEventPropagation(event) {
	if ('stopPropagation' in event) // Mozilla, Opera, Safari
		event.stopPropagation();
	 else if ('cancelBubble' in event) // IE
		event.cancelBubble = true;
	 else
		throw Error('Browser unrecognized');
}

function preventDefault(event) {
	if ('preventDefault' in event)
		event.preventDefault();
	if (Prototype.Browser.IE) {
		event.returnValue = false;
		event.keyCode = 0;
	}
	return false;
}

function unicodeLiteral(str) {
	function fixedHex(number, length) {
		var str = number.toString(16).toUpperCase();
		while (str.length < length)
			str = "0" + str;
		return str;
	}
	var i,
		result = "";
	for (i = 0; i < str.length; ++i) {
		if (str.charCodeAt(i) > 126 || str.charCodeAt(i) < 32)
			result += "\\u" + fixedHex(str.charCodeAt(i), 4);
		else
			result += str[i];
	}
	return result;
}

function convertToPixels(value, measure) {
	if (!value) return null;
	switch (measure) {
	case 'px':
		return value;
	case 'cm':
		return (value * 37.795278).toFixed();
	case 'pt':
		return (value * 1.333333).toFixed();
	case 'inch':
		return (value * 96).toFixed();
	}
}

function convertFromPixels(value, measure) {
	if (!value) return null;
	switch (measure) {
	case 'px':
		return value;
	case 'cm':
		return (value * 0.026458).toFixed(3);
	case 'pt':
		return (value * 0.75).toFixed(1);
	case 'inch':
		return (value * 0.010417).toFixed(3);
	}
}

function ifDef(dst, src, prop, def) {
	dst[prop] = !Object.isUndefined(src[prop]) ? src[prop] : def;
}

function assert(condition, comment) {
	if (!condition)
		throw new Error(comment ? ('Assertion failed: ' + comment) : 'Assertion failed');
}

function assertDefined(v) {
	assert(!isNullOrUndefined(v));
}

function isUndefined(variable) {
	return Object.isUndefined(variable); // use prototype.js method for now
}

function isNull(variable) {
	return variable === null;
}

function isNullOrUndefined(v) {
	return isUndefined(v) || isNull(v);
}

function isObject(obj) {
	return obj === Object(obj);
}

module.exports = {
	tfx: tfx,
	stopEventPropagation: stopEventPropagation,
	preventDefault: preventDefault,
	unicodeLiteral: unicodeLiteral,
	ifDef: ifDef,
	assert: assert,
	assertDefined: assertDefined,
	isUndefined: isUndefined,
	isNull: isNull,
	isNullOrUndefined: isNullOrUndefined,
	isObject: isObject,
	relBox: relBox,
	convertToPixels: convertToPixels,
	convertFromPixels: convertFromPixels
};
