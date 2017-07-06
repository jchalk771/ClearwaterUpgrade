//custom function
//jec 170706 conversion begin
//Noted in ACUB
function debugObject(object) {
	try{
		var output = '';
		for (property in object) {
			output += property + ': ' + object[property] + '; ' + "<BR>";
		}
		logDebug(output);
	}catch(err){
		logDebug("An error occurred in custom function debugObject Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end