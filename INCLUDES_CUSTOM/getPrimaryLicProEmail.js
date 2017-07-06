//custom function
//jec 170706 conversion begin
//noted in DUA
function getPrimaryLicProEmail(capId){
	try{
		var profArr = getLicenseProfessional(capId);
		   comment("Prof Arr is " + profArr);
		   var eAddress = "";
		   if (profArr != null){
			  //var Contacts = capContactResult.getOutput();
		      comment("Array populated");
			  
			  for(var x in profArr) {
			  	comment("Index is " + x + "Email is " + profArr[x].getEmail());
		        comment("Primary Status is " + profArr[x].getPrintFlag());
			  	if(profArr[x].getPrintFlag() =="Y") {
			  		var eAddress = profArr[x].getEmail(); 
			      	comment ("eAddress is"+ eAddress);
		        } 
		      }        
			  return eAddress;
		   }
	}catch(err){
		logDebug("An error occurred in custom function getPrimaryLicProEmail Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end