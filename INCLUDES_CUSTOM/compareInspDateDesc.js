//custom function
//jec 170706 conversion begin
//Noted in ASIUA
function compareInspDateDesc(a,b) { 
	try{
		return (a.getScheduledDate().getEpochMilliseconds() < b.getScheduledDate().getEpochMilliseconds()); 
	}catch(err){
		logDebug("An error occurred in custom function compareInspDateDesc Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end