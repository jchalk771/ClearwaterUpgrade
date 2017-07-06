//Noted in ACUB
function debugObject(object) {
	var output = '';
	for (property in object) {
		output += property + ': ' + object[property] + '; ' + "<BR>";
	}
	logDebug(output);
}