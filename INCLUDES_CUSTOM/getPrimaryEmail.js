//custom function
//jec 170706 conversion begin
//noted in DUA
function getPrimaryEmail(capId){
	try{
		var capContactResult = aa.people.getCapContactByCapID(capId);
		comment("ContactResult is " + capContactResult);
		var emailAddress = "";
		if (capContactResult.getSuccess()) {
			var Contacts = capContactResult.getOutput();
		    comment("Array populated.");
			for (var x in Contacts) {
				comment("Index is " + x + " Last Name is " + Contacts[x].getPeople().lastName);             
		        comment("Index is " + x + " Email is " + Contacts[x].getPeople().getEmail());             
		        comment("Index is " + x + " Print Flag is " + Contacts[x].getPeople().getFlag());
		        comment("Index is " + x + " Contact Type is " + Contacts[x].getPeople().getContactType());
		        if (Contacts[x].getPeople().getContactType() == "Applicant") {
		        	var eAddr = Contacts[x].getPeople().getEmail();//Works
		        }
			}
		}
		
		if (eAddr == null) {
			emailAddress = "No email";
		}
		else {
			emailAddress = eAddr;
		}
		return emailAddress;
	}catch(err){
		logDebug("An error occurred in custom function getPrimaryEmail Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end