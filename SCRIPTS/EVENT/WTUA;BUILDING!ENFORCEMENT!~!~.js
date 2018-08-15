//Branch
//jec 170724 conversion begin

try{

	//@TODO, make sure this script stays active and inspUserId stays global (no "var") or subsequent branches will  could use aa.person.getUser(AInfo['Assigned Inspector'].split(' ')[0], '', AInfo['Assigned Inspector'].split(' ')[1]); instead it would keep them from needing a lookup or to maintain a standard choice my option is cumbersome i am sure if i discuss with Clearwater staff we can come to a better solution.
	//throw 'inspUserId' is undefined
	if (AInfo['Assigned Inspector'] != null) {
		inspUserId = lookup("BCP_INSPECTORS",AInfo['Assigned Inspector']);
	} else {
		inspUserId = null;
	}

}catch(err){
	logDebug("An error occurred in WTUA:Building/Enforcement/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170724 conversion end