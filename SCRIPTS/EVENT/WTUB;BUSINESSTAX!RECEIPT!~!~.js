//Branch
//jec 170721 conversion begin

try{
	//Law Change per Lydia 7.19.17
	//if (appHasCondition(null,"Not Met",null,null) && matches(wfTask,"Issue BTR","Renewal") && !matches(wfStatus,"2nd Notice","Enforcement","Final Notice","Renewal Delinquent - RED","Denied","Hold","Moved in City","Moved Out of City","Notes","Out of Business","Renewal Notice","Void","Withdrawn")) {
	//	showMessage = true;
	//	comment("Cannot complete issuance at this time because there are conditions that have not been met.");
	//	cancel = true;
	//}	
	
	if(appHasCondition(null,"Not Met",null,null) && matches(wfTask,"Issue BTR","Renewal", "Issue New - 16-17") && !matches(wfStatus,"2nd Notice","Enforcement","Final Notice","Renewal Delinquent - RED","Denied","Hold","Moved in City","Moved Out of City","Notes","Out of Business","Renewal Notice","Void","Withdrawn")){
		showMessage = true; 
		comment("Cannot complete issuance at this time because there are conditions that have not been met."); 
		cancel = true;
	}	

}catch(err){
	logDebug("An error occurred in WTUB:BusinessTax/Receipt/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170721 conversion end