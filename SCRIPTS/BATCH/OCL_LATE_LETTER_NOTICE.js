/*------------------------------------------------------------------------------------------------------/
| Program: OCL_Late_Letter_Notice.js  Trigger: Batch    Client : Clearwater, FL
|
| Version 1.0 - Base Version. 7/20/2010 - Nicholas Dorrough - City of Clearwater
|
| Adding a Notes comment to all cases that should have received a Lien Letter last month
|
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
| START: USER CONFIGURABLE PARAMETERS
/------------------------------------------------------------------------------------------------------*/
var showMessage = true;					// Set to true to see results in popup window
var showDebug = true;					// Set to true to see debug messages in event log and email confirmation
var maxSeconds = 180 * 60;				// number of seconds allowed for batch processing, usually < 5*60
/*------------------------------------------------------------------------------------------------------/
| END: USER CONFIGURABLE PARAMETERS
/------------------------------------------------------------------------------------------------------*/
//Needed HERE to log parameters below in eventLog
var sysDate = aa.date.getCurrentDate();
var batchJobID = aa.batchJob.getJobID().getOutput();
var batchJobName = "" + aa.env.getValue("batchJobName");
var message =	"";							// Message String
var debug = "";								// Debug String
var br = "<BR>";							// Break Tag
var feeSeqList = new Array();				// invoicing fee list
var paymentPeriodList = new Array();		// invoicing pay periods

//Global variables
var startDate = new Date();
var startTime = startDate.getTime(); // Start timer
var timeExpired = false;
var expireDate = new Date();
var systemUserObj = aa.person.getUser("ADMIN").getOutput();
var currentUserID = aa.env.getValue("CurrentUserID");   		// Current User
var capId;				// CapId object
var cap;				// Cap object
var capIDString;
var appTypeResult;
var appTypeString;		// Convert application type to string ("Building/A/B/C")
var appTypeArray;		// Array of application type string
var parentCapId;
var parentCapString;
var partialCap;
var capName;
var capStatus;

var capDetail;
var capDetailObjResult;

var emailAddress = "lydia.moreda@myclearwater.com";
var emailText = "";
var paramsOK = true;

var useAppSpecificGroupName = false;					// Use Group name when populating App Specific Info Values

var endDate = new Date();
endDate.setDate(1);
endDate.setDate(endDate.getDate()-1);
endDate.setHours(23, 59, 59, 999);
var startDate = new Date(endDate);
startDate.setDate(1);
startDate.setHours(0, 0, 0, 0);

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
|
/-----------------------------------------------------------------------------------------------------*/

var bizDomScriptResult = aa.bizDomain.getBizDomain("OCL_LATE_CASES");

if (bizDomScriptResult.getSuccess())
{
	var bizDomScriptObj = bizDomScriptResult.getOutput();
	
	// Use the list iterator to go through the standard choice
	var iterator = bizDomScriptObj.listIterator();
	
	// Get the first entry
	var entry;
	
	// Go through each entry
	do
	{
		entry = iterator.next();
		if( entry )
		{
			doOCLLateLetter( entry.getDispBizdomainValue() );
		}
	}
	while (iterator.hasNext());

}
else
{
	logDebug("lookup(" + stdChoice + "," + stdValue + ") does not exist");
}

var endDate = new Date();
var endTime = endDate.getTime();
logDebug( "Job took " + ((( endTime - startTime ) * 0.001) / 60) + " minutes to complete (" + (endTime - startTime) + " ms)");



/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/

if (debug.indexOf("**ERROR") > 0)
{
aa.env.setValue("ScriptReturnCode", "1");
aa.env.setValue("ScriptReturnMessage", debug);
aa.env.setValue("ScriptReturnMessage", message);
}
else
{
aa.env.setValue("ScriptReturnCode", "0");
if (showMessage) aa.env.setValue("ScriptReturnMessage", message);
if (showDebug) 	aa.env.setValue("ScriptReturnMessage", debug);
}

/*------------------------------------------------------------------------------------------------------/
| <===========Internal Functions and Classes (Used by this script)
/------------------------------------------------------------------------------------------------------*/

function debugObject(object)
{
	var output = ''; 
	for (property in object) { 
	  output += "<font color=red>" + property + "</font>" + ': ' + "<bold>" + object[property] + "</bold>" +'; ' + "<BR>"; 
	} 
	logDebug(output);
}

/*function closeTask(wfstr,wfstat,wfcomment,wfnote) // optional process name
{
	var useProcess = false;
	var processName = "";
	if (arguments.length == 5) 
		{
		processName = arguments[4]; // subprocess
		useProcess = true;
		}
	
	var workflowResult = aa.workflow.getTasks(capId);
		if (workflowResult.getSuccess())
		 	var wfObj = workflowResult.getOutput();
		else
		  	{ logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage()); return false; }
	
	if (!wfstat) wfstat = "NA";
	
	for (i in wfObj)
	{
		var fTask = wfObj[i];
		if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase())  && (!useProcess || fTask.getProcessCode().equals(processName)))
		{
		var dispositionDate = aa.date.getCurrentDate();
		var stepnumber = fTask.getStepNumber();
		var processID = fTask.getProcessID();

		if (useProcess)
			aa.workflow.handleDisposition(capId,stepnumber,processID,wfstat,dispositionDate, wfnote,wfcomment,systemUserObj ,"Y");
		else
			aa.workflow.handleDisposition(capId,stepnumber,wfstat,dispositionDate, wfnote,wfcomment,systemUserObj ,"Y");
		
		logMessage("Closing Workflow Task: " + wfstr + " with status " + wfstat);
		logDebug("Closing Workflow Task: " + wfstr + " with status " + wfstat);
		}			
	}
}*/

function logDebug(dstr) {

	debug+=dstr + br;
}

function logMessage(dstr)
{
	debug+=dstr + br;
}

//
//matches:  returns true if value matches any of the following arguments
//
function matches(eVal,argList) {
for (var i=1; i<arguments.length;i++)
	if (arguments[i] == eVal)
		return true;

}

function doOCLLateLetter( altid )
{
	// Do the bulk of the work here
	capId = aa.cap.getCapID(altid).getOutput();
	
	// Attempt to get the case based on the string passed in
	if (capId == null) {
		logDebug("Could not get " + altid + "!!!");
		return;
	}
	//cap = aa.cap.getCap(capId).getOutput();
	
	updateTask("Renewal", "Notes", "BTR Final Notice Sent", "BTR Final Notice Sent");
}

/*function doLienLetterCategory( appType )
{
	var capCount = 0;
	
    var getCapResult = aa.cap.getByAppType(appGroup,appType);
	if (!getCapResult.getSuccess())
	{
		logDebug( "ERROR: getting caps by app type: " + getCapResult.getErrorMessage()+ ".");
		return false;
	}
	
	var csmArray = getCapResult.getOutput(); //array of CapScriptModel objects
	
	for (i in csmArray)
	{
		if (elapsed() > maxSeconds)
		{
			logMessage("WARNING","A script timeout has caused partial completion of this process.  Please re-run.  " + elapsed() + " seconds elapsed, " + maxSeconds + " allowed.") ;
			timeExpired = true ;
			break;
		}
		
		capId = csmArray[i].getCapID();
		var val = getAppSpecific( "Issued", capId );
		var valStruct = getAppSpecific( "Structure Use", capId ); 
		var valProposed = getAppSpecific( "Proposed Structure Use", capId ); 
		
		var estValue = 0;
		var valobj = aa.finance.getContractorSuppliedValuation(capId,null).getOutput();	// Calculated valuation
		if (valobj.length) 
		{
			estValue = valobj[0].getEstimatedValue();
		}
		
		if( val != "" && val != null && parseInt(estValue) > 2499 && 
				(matches( valStruct, "1 & 2 Family Residence", "Apt, Condo" ) || 
				matches( valProposed, "1 & 2 Family Residence", "Apt, Condo" )) )
		{
			var issuedDate = new Date( val );
			
			if( issuedDate >= startDate && issuedDate <= endDate )
			{
				logDebug( "Found a cap "+capId.getCustomID() );
				logDebug( "-App spec [Issued]: " + val + " " + issuedDate );
				logDebug( "-App spec [Structure Use]: " + valStruct );
				logDebug( "-App spec [Proposed Structure Use]: " + valProposed );
				logDebug( "-Job value " + estValue );
				
				//doLienLetter( capId.getCustomID() );
				aa.set.add("LIEN_0710", capId);
				++capCount;
			}
		}
	}
	
	return capCount;
}*/

function elapsed() {
	var thisDate = new Date();
	var thisTime = thisDate.getTime();
	return ((thisTime - startTime) / 1000); 
}

/*function getAppSpecific(itemName)  // optional: itemCap
{
	var updated = false;
	var i=0;
	var itemCap = capId;
	if (arguments.length == 2) itemCap = arguments[1]; // use cap ID specified in args
   	
	if (useAppSpecificGroupName)
	{
		if (itemName.indexOf(".") < 0)
			{ logDebug("**WARNING: editAppSpecific requires group name prefix when useAppSpecificGroupName is true") ; return false; }
		
		
		var itemGroup = itemName.substr(0,itemName.indexOf("."));
		var itemName = itemName.substr(itemName.indexOf(".")+1);
	}
	
    var appSpecInfoResult = aa.appSpecificInfo.getByCapID(itemCap);
	if (appSpecInfoResult.getSuccess())
 	{
		var appspecObj = appSpecInfoResult.getOutput();
		
		if (itemName != "")
		{
			for (i in appspecObj)
				if( appspecObj[i].getCheckboxDesc() == itemName && (!useAppSpecificGroupName || appspecObj[i].getCheckboxType() == itemGroup) )
				{
					return appspecObj[i].getChecklistComment();
					break;
				}
		} // item name blank
	} 
	else
		{ logDebug( "**ERROR: getting app specific info for Cap : " + appSpecInfoResult.getErrorMessage()); }
}*/

//matches:  returns true if value matches any of the following arguments
/*function matches(eVal,argList)
	{
   	for (var i=1; i<arguments.length;i++)
   		if (arguments[i] == eVal)
   		return true;

	}
*/

function updateTask(wfstr,wfstat,wfcomment,wfnote) // optional process name, cap id
{
var useProcess = false;
var processName = "";
if (arguments.length > 4) 
	{
	if (arguments[4] != "")
		{
		processName = arguments[4]; // subprocess
		useProcess = true;
		}
	}
var itemCap = capId;
if (arguments.length == 6) itemCap = arguments[5]; // use cap ID specified in args

var workflowResult = aa.workflow.getTasks(itemCap);
if (workflowResult.getSuccess())
	var wfObj = workflowResult.getOutput();
else
{ logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage()); return false; }
        
if (!wfstat) wfstat = "NA";
        
for (i in wfObj)
	{
	var fTask = wfObj[i];
	if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase())  && (!useProcess || fTask.getProcessCode().equals(processName)))
		{
		var dispositionDate = aa.date.getCurrentDate();
		var stepnumber = fTask.getStepNumber();
		var processID = fTask.getProcessID();
		if (useProcess)
			aa.workflow.handleDisposition(itemCap,stepnumber,processID,wfstat,dispositionDate, wfnote,wfcomment,systemUserObj,"U");
		else
			aa.workflow.handleDisposition(itemCap,stepnumber,wfstat,dispositionDate,wfnote,wfcomment,systemUserObj,"U");
		logMessage("Updating Workflow Task " + wfstr + " with status " + wfstat);
		logDebug("Updating Workflow Task " + wfstr + " with status " + wfstat);
		}                                   
	}
}