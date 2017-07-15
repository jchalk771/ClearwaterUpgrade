//Branch
//jec 170714 conversion begin

try{
	//Duplicate per Lydia	
	//if (!feeExists("PERM","NEW","INVOICED")) {
	//	updateFee("PERM","B_OTC","FINAL",1,"N");
	//}

	if ((aa.env.getValue("From")!="AA")) {
		updateFee("PERMT","B_OTC","FINAL",(parseInt(AInfo['Number of Trades'])-1)*30,"Y");
	}

}catch(err){
	logDebug("An error occurred in ASA:Building/Over the Counter/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170714 conversion end