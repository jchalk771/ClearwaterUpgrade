//custom function
//jec 170717 conversion begin
//Comments in this version are still enabled, disabled in some events but not all
//disable as appropriate
function getPrimaryEmail4PlanReview(capId){
	try{
		var profArr = getLicenseProfessional(capId);
		comment("Prof Arr is " + profArr);
		var eAddress = "";
		if (profArr != null) {
		    comment("Prof Array populated");
		  	for( var x in profArr) {
				comment("Index is " + x + "Email is " + profArr[x].getEmail());
	          	comment("Index is " + x + "Primary Status is " + profArr[x].getPrintFlag());
	            comment("Index is " + x + "License Number is " + profArr[x].getLicenseNbr());
				if(profArr[x].getPrintFlag() =="Y") {
					eAddress = profArr[x].getEmail();
	                if (eAddress == null) {
	                	eAddress = "No email.";
	                    comment ("contractor Email is"+ eAddress);
	                }

					if(profArr[x].getLicenseNbr()=="OUTTOBID"){
						eAddress = getArch_ENG_Email(capId);
						comment ("Arch email is"+ eAddress);
					}           	
	                    	           
	               	if(profArr[x]. getLicenseNbr()=="OWNER"){
						eAddress = "Owner-Builder"
						comment ("Owner email is"+ eAddress);
					}
				}          
	        }        
		}
		else {
			comment("PROF ARRAY is null")
	    }

	    comment("Final eAddress is " + eAddress);
	    return eAddress;

	}catch(err){
		logDebug("An error occurred in custom function getPrimaryEmail4PlanReview Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170717 conversion end