//Branch
//jec 170714 conversion begin

try{

	if (AInfo['Type of Case'] == "Hotel Development Agreement") {
		//branch ("es_renbr_cap")
		//@TODO - This may never have been executing before.  Case didn't match	"ES_RENBR_CAP". Test and document.
		var vCap = capId;
		var capNbr;
		var newExt;
		var newAltID;
		comment("Var vCap = " + vCap);
		capNbr = capId.getCustomID();
		comment("Var vCap = " + capNbr);
		newExt = capNbr.substring(3);
		comment("Ext = " + newExt);
		newAltID = "HDA" + newExt;
		comment("New AltId = " + newAltID);
		aa.cap.updateCapAltID(capId, newAltID);
	}
	
}catch(err){
	logDebug("An error occurred in ASA:Planning/Development Agreement/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170714 conversion end