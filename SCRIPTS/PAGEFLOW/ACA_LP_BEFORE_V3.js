/*------------------------------------------------------------------------------------------------------/
| Program : ACA_LP_BEFORE_V3.js
| Event   : ACA_Before
|
| Usage   : Master Script by Accela.  See accompanying documentation and release notes.
|
| Client  : N/A
| Action# : N/A
|
| Notes   : Updated for Master Script 3.0, 7.6.17 - JChalk, Accela
|			this is for reference only - not currently in use. 
|
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
| START User Configurable Parameters
|
|     Only variables in the following section may be changed.  If any other section is modified, this
|     will no longer be considered a "Master" script and will not be supported in future releases.  If
|     changes are made, please add notes above.
/------------------------------------------------------------------------------------------------------*/
var showMessage = false; 					// Set to true to see results in popup window
var showDebug = false; 						// Set to true to see debug messages in popup window
var useAppSpecificGroupName = false; 		// Use Group name when populating App Specific Info Values
var useTaskSpecificGroupName = false; 		// Use Group name when populating Task Specific Info Values
var useCustomScriptFile = false;  			// if true, use Events->Custom Script, else use Events->Scripts->INCLUDES_CUSTOM
var cancel = false;
var startDate = new Date();
var startTime = startDate.getTime();
var message = ""; 						// Message String
var debug = ""; 							// Debug String
var br = "<BR>"; 						// Break Tag

//add include files
eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",null,useCustomScriptFile));
eval(getScriptText("INCLUDES_CUSTOM",null,useCustomScriptFile));


function getScriptText(vScriptName, servProvCode, useProductScripts) {
	if (!servProvCode)  servProvCode = aa.getServiceProviderCode();
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	try {
		if (useProductScripts) {
			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
		} else {
			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
		}
		return emseScript.getScriptText() + "";
	} catch (err) {
		return "";
	}
}

var cap = aa.env.getValue("CapModel");
var capId = cap.getCapID();
var servProvCode = capId.getServiceProviderCode()       		// Service Provider Code
var publicUser = false;
var currentUserID = aa.env.getValue("CurrentUserID");
if (currentUserID.indexOf("PUBLICUSER") == 0) { currentUserID = "ADMIN"; publicUser = true }  // ignore public users
var capIDString = capId.getCustomID(); 				// alternate cap id string
var systemUserObj = aa.person.getUser(currentUserID).getOutput();  	// Current User Object
var appTypeResult = cap.getCapType();
var appTypeString = appTypeResult.toString(); 			// Convert application type to string ("Building/A/B/C")
var appTypeArray = appTypeString.split("/"); 			// Array of application type string
var currentUserGroup;
var currentUserGroupObj = aa.userright.getUserRight(appTypeArray[0], currentUserID).getOutput()
if (currentUserGroupObj) currentUserGroup = currentUserGroupObj.getGroupName();
var capName = cap.getSpecialText();
var capStatus = cap.getCapStatus();

var AInfo = new Array(); 					// Create array for tokenized variables
loadAppSpecific4ACA(AInfo); 						// Add AppSpecific Info
loadASITables4ACA();
/*------------------------------------------------------------------------------------------------------/
| <===========BEGIN=Main================>
/-----------------------------------------------------------------------------------------------------*/

//ACA_LP_Before
if (appMatch("Building/*/*/*") && capHasExpiredLicProf("EXPIRE", "", "") == true) {
	showMessage = true;
	comment("LicenseProfessional has an expired license.");
}


/*------------------------------------------------------------------------------------------------------/
| <===========END=Main================>
/-----------------------------------------------------------------------------------------------------*/

if (debug.indexOf("**ERROR") > 0) {
		aa.env.setValue("ErrorCode", "1");
		aa.env.setValue("ErrorMessage", debug);
	} else {
		if (cancel) {
			aa.env.setValue("ErrorCode", "-2");
			if (showMessage)
				aa.env.setValue("ErrorMessage", message);
			if (showDebug)
				aa.env.setValue("ErrorMessage", debug);
		} else {
			aa.env.setValue("ErrorCode", "0");
			if (showMessage)
				aa.env.setValue("ErrorMessage", message);
			if (showDebug)
				aa.env.setValue("ErrorMessage", debug);
			}
	}

/*------------------------------------------------------------------------------------------------------/
| <===========External Functions (used by Action entries)
/------------------------------------------------------------------------------------------------------*/
