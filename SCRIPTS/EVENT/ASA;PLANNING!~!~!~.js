//Branch
//jec 170714 conversion begin

try{

	editAppSpecific("Application Received", jsDateToASIDate(startDate));
	editTaskDueDate("Determination of Completeness", dateAdd(startDate, 10, "Y"));
	assignTask("Determination of Completeness", aa.person.getUser(null, null, AInfo['Planner']));
		

}catch(err){
	logDebug("An error occurred in ASA:Planning/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170707 conversion end