//custom function
//jec 170706 conversion begin
//noted in ACUB
function validateComment(stringToTest) {
	try{
		logDebug("String to validate: [" + stringToTest + "]");
		//logDebug( aa.env.getParamValues() );
		var i = 0;
		var code = 0;
		var string = stringToTest.toString();
		// Go through each character and make sure they are within our range
		for (i = 0; i < string.length(); i++) {
			code = string.charCodeAt(i);
			if (code <= 0 || code >= 127)
				return false;
		}
		return true;
	}catch(err){
		logDebug("An error occurred in custom function validateComment Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end