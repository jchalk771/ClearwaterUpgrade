//Accela_PROD/SCRIPTS/PAGEFLOW/ACA_EXP_LIC_MSG.js

//The following code returns a message to the user when creating a permit in ACA.
//Msg displays in pink at top of page in ACA when the Continue button is pressed.
//Connect script via v360 ACA Admin page flow. Add to Continue button as a page flow script
//Will stop customer if state license is expired
//Will stop customer if user has no license associated with registration

//**********************************
var CapModel = aa.env.getValue("CapModel");
aa.debug( "****************", "CapModel is " + CapModel+ "." );
var cap = aa.env.getValue("CapModel");
aa.debug( "****************", "cap is " + cap+ "." );

var capId = cap.getCapID();
aa.debug( "****************", "capId" + capId);
var appTypeResult = cap.getCapType();
aa.debug( "****************", "appTypeResult" + appTypeResult);

var licNum = "";
var licType = "";
var resultLabel;
var returnMsg = "";
var currentdate = new Date(); 
var br = "<BR>";

//Used to be http://clearwater but after the intranet crash we'll leave it msb-intranet.
//var website = "http://clearwater/Apps20/Accela/ContractorExpiredPermits.aspx";
//Use the one below for PROD:
var website = "http://msb-intranet/Apps20/Accela/ContractorExpiredPermits.aspx";
//Use the one below for DEV:
//var website = "http://msb-intra-test/Apps20/Accela/ContractorExpiredPermits.aspx";

//Set webservice based on aca_config -- does not work: needs more work!
//NOTE that CitizenAccessTest gets data from AccelaDev database for this webservice (only one connectionstring.config file per server)!!!
//if ((lookup("ACA_CONFIGS","ACA_SITE")=="https://172.20.2.52/CitizenAccessDev/Admin/default.aspx") || (lookup("ACA_CONFIGS","ACA_SITE")=="https://172.20.2.52/CitizenAccessTest/Admin/default.aspx"))
//	{var website = "http://msb-intra-test/Apps20/Accela/ContractorExpiredPermits.aspx";}
//else
//	
//	{var website = "http://msb-intranet/Apps20/Accela/ContractorExpiredPermits.aspx";}

	

//get Licensed Profs on CAP
var licProfResult = aa.licenseScript.getLicenseProf(capId);
aa.debug( "****************", "LicProfResult is " + licProfResult + "." );

if (!licProfResult.getSuccess())
   {
	returnMsg = "LicProfResult is null? " + licProfResult ;
   }
else
   {
    var licProfList = licProfResult.getOutput();
    //No valid contractor or licenses expired
		if(licProfList == null)
		{ 
			var returnMsg = "Your account does not have a valid contractor license." +br ;
			returnMsg = returnMsg + "Only licensed contractors may apply for permits online." + br;
			returnMsg = returnMsg + "Please go to account management to associate a contractor to your registration." + br;
			returnMsg = returnMsg + "If you need assistance , please call 727-562-4567 xt 2590. ";  
		}
		else //There's a contractor, does he have correct type for the case?  does he have expired permits?
		{ 
			licNum = licProfList[0].getLicenseNbr();
			aa.debug( "****************", "LicNum is " + licNum );
			licType = licProfList[0].getLicenseType();
			aa.debug( "****************", "LicType is " + licType );
			
			//Must be a tree contractor for tree permits
			if (licNum != null) 
			{
				//returnMsg = "LicNum is not null."
				aa.debug( "****************", "LicNum is not null" );
				if (appTypeResult == "Planning/Tree/TRE/NA") 
				{
					aa.debug( "****************", "It's a tree permit" );
					//returnMsg ="hello";
					if (licType != "Tree Contractor")				
					{ 	
						returnMsg = "You must be a tree contractor to apply for tree removal permits." + br;
						returnMsg = returnMsg + "If you need assistance, please call 727-562-4567 xt 2590.";
					}
						
				}
				if ((appTypeResult == "Building/Construction Permit/NA/NA")||(appTypeResult == "Building/Over the Counter/NA/NA"))
				{
					if (licType != "Contractor")
					{
						returnMsg = "You must be a licensed contractor to apply for building permits online." + br;
						returnMsg = returnMsg + "There is a problem with the contractor on this account." +br;
						returnMsg = returnMsg + "Please call office 727-562-4567.";
					}
					else //contractor license is good, check for expired permits
					{
						aa.debug("***************T","The license number is " + licNum);
						// SAX builder object - Does it like this?
						var saxBuilder = aa.proxyInvoker.newInstance("org.jdom.input.SAXBuilder").getOutput();
						// Load the web service result
						var document = saxBuilder.build(website + "?CheckLicPro=" + licNum);
						// Root of the XML document
						var root = document.getRootElement();       
						// Get the CapList from the XML document
						var capList = root.getChild("CapList");
						// Make sure the list is valid
						
						if( capList.getChildren() != 0 )
						{  
							// Get the cases in a list
							var cases = capList.getChildren(); 
							// Make sure there is at least one case to iterate over
						}
						if( cases.size() > 0 )
						{
							// Build the return message
							returnMsg = "This license professional has expired permits.  Please call the City of Clearwater in order to process." + br ;
							returnMsg += "Expired cases: "  + br;
							// Go through each case in the CapList
							for( i = 0; i < cases.size(); i++ )
							{
								returnMsg +=  cases.get(i).value + br;
							}
						}
					}
				}
   			}
		}
	}
           
aa.print("");
if (CapModel != null)
{
	
	// populates variable
	resultLabel = "Message: " + returnMsg;
	aa.print("resultLabel = "+ resultLabel);
}
if (returnMsg != "")
    {printMessage(resultLabel);}

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

//Script test says this function is missing, but script works in ACA??? without it being present
function getCapID()  {

    var s_id1 = aa.env.getValue("PermitId1");
    var s_id2 = aa.env.getValue("PermitId2");
    var s_id3 = aa.env.getValue("PermitId3");

    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);
    if(s_capResult.getSuccess())
      return s_capResult.getOutput();
    else
    {
      logMessage("**ERROR: Failed to get capId: " + s_capResult.getErrorMessage());
      return null;
    }
  }