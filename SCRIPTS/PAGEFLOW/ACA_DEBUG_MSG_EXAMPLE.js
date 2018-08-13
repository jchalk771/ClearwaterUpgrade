//Accela_PROD/SCRIPTS/PAGEFLOW/ACA_DEBUG_MSG_EXAMPLE.js
//For use in debugging ACA Scripts 
//The following code returns a message to the user when creating a permit in ACA.
//Msgt displays in pink at top of page in ACA when the Continue button is pressed.
//Connect script via v30 ACA Admin page flow. Add to Continue button as a page flow script
//Following works 
//The following error displays top of page when customer hits continue
	




//**********************************
var CapModel = aa.env.getValue("CapModel");
var resultLabel;
var currentdate = new Date(); 
var vToday = (currentdate.getMonth()+1)  + "/" 
                + currentdate.getDate() + "/"
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

aa.print("");
if (CapModel != null)
{
	
	// populates variable
	resultLabel = "Today is " + vToday;
	aa.print("resultLabel = "+ resultLabel);
}

printMessage(resultLabel);

function printMessage(label)
{
	if (label == undefined || label == null)
	{
		aa.env.setValue("ErrorCode", 0);
	}
	else
	{
		aa.env.setValue("ErrorCode", 2);
		aa.env.setValue("ErrorMessage",resultLabel );
	}	
}