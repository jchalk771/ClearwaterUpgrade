//Branch
//jec 170706 conversion begin
try{
	var primaryEmail = getPrimaryEmail(capId);
	comment("The primary email is " + primaryEmail);
	if (documentUploadedFrom == "ACA") {
		//@emailTest - comment for production deployment
			email(testMasterAddress,"noReply@myclearwater.com", " New document on  " + capId.getCustomID() ,"Document was uploaded today by "+primaryEmail );
		//@emailProd - uncomment for production deployment
			//email("sherry.watkins@myClearwater.com","noReply@myclearwater.com", " New document on  " + capId.getCustomID() ,"Document was uploaded today by "+primaryEmail );
			//What about this one?
			//email("lydia.moreda@myClearwater.com","noReply@myclearwater.com", " New document on  " + capId.getCustomID() ,"Document was uploaded today by "+primaryEmail );
	}
}catch(err){
	logDebug("An error occurred in DUA:Planning/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170706 conversion end