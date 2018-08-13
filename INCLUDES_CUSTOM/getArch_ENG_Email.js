//custom function
//jec 170721 conversion begin
function getArch_ENG_Email(capId){
	try{

		//var contactType = "Applicant";//Contact in building casess in contact?, not applicant
		//var contact;
		var capContactResult = aa.people.getCapContactByCapID(capId);
		comment("ContactResult is " + capContactResult);
		var emailAddress = "";
		if (capContactResult.getSuccess()) {
			var conArr = capContactResult.getOutput();
			comment("Array populated");
			comment("conArr is " + conArr);
			
			if(conArr.length > 0 )
			{
				for (y in conArr) 
				{
					comment("Index is " + y + "Contact Type is " + conArr[y].getCapContactModel().getPeople().getContactType());
					if (conArr[y].getCapContactModel().getPeople().getContactType() == "Architect" ||
							conArr[y].getCapContactModel().getPeople().getContactType() == "Engineer") 
					{
						if (conArr[y].getEmail() != null) 
						{
							comment("Contacts's email is " + conArr[y].getEmail());
							emailAddress = conArr[y].getEmail();
						} 	
						else 
						{
							emailAddress = "No email."
						}
					}
				}
			}
			else
			{	
				comment("Length of contact array is 0.");
				emailAddress = "Problem";
			}
		} 
		else 
		{
			comment("Nothing in the Contacts Array");
			emailAddress = "Problem";
		}
		return emailAddress;

	}catch(err){
		logDebug("An error occurred in custom function getArch_ENG_Email Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170721 conversion end
