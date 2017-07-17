//custom function
//jec 170717 conversion begin
function setPrimaryLicProf(capId){
	try{

		var profArr = getLicenseProfessional(capId);		
		comment("Prof Arr is " + profArr);		
		var primaryMsg = "";		
		if ((profArr != null) && (profArr.length = 1)) {		
			comment("Array populated");		
			for( var x in profArr) {	
			  	comment("Primary Status is " + profArr[x].getPrintFlag());	
			  	if(profArr[x].getPrintFlag() =="N") {
			  		profArr[x].setPrintFlag("Y");		
		            aa.licenseProfessional.editLicensedProfessional(profArr[x]);		
				    primaryMsg = "Contractor set to Primary.";
		        }	
		    }        		
			return primaryMsg;		
		    comment("Action: "+ primaryMsg);		
		} 
		else		
			comment("Problem with contractor");		

	}catch(err){
		logDebug("An error occurred in custom function setPrimaryLicProf Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170717 conversion end