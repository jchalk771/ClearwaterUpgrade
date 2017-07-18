/*------------------------------------------------------------------------------------------------------/
| Program: ActiveExpiredCases.js  Trigger: Batch    Client : Clearwater, FL
|
| Version 1.0 - Base Version. 8/15/2010 - Nicholas Dorrough - City of Clearwater
|
| Move cases from Active to Expired when a case expires
|
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
| START: USER CONFIGURABLE PARAMETERS
/------------------------------------------------------------------------------------------------------*/
var showMessage = true;					// Set to true to see results in popup window
var showDebug = true;					// Set to true to see debug messages in event log and email confirmation
var maxSeconds = 1 * 60;				// number of seconds allowed for batch processing, usually < 5*60
/*------------------------------------------------------------------------------------------------------/
| END: USER CONFIGURABLE PARAMETERS
/------------------------------------------------------------------------------------------------------*/
//Needed HERE to log parameters below in eventLog
var sysDate = aa.date.getCurrentDate();
var batchJobID = aa.batchJob.getJobID().getOutput();
var batchJobName = "" + aa.env.getValue("BatchJobName");
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

var emailAddress = "nicholas.dorrough@myclearwater.com";
var emailText = "";
var paramsOK = true;

var CommentNote = "Case Expired by Active Expired Batch";

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
|
/-----------------------------------------------------------------------------------------------------*/
var stdChoice = "ACTIVE_EXPIRED_CASES";

var bizDomScriptResult = aa.bizDomain.getBizDomain(stdChoice);
    	
if (bizDomScriptResult.getSuccess())
{
	var bizDomScriptObj = bizDomScriptResult.getOutput();
	
	// Use the list iterator to go through the standard choice
	var iterator = bizDomScriptObj.listIterator();
	
	// Get the first entry
	var entry;
	
	// Go through each entry
	if( bizDomScriptObj.size() == 0 )
	{
		logDebug("No entries in " + stdChoice + ".  Exiting batch.");
	}
	else
	{
	
		// Go through each entry
		do
		{
			entry = iterator.next();
			if( entry )
			{
				doExpireCase( entry.getDispBizdomainValue() );
			}
		}
		while (iterator.hasNext());
	}

}
else
{
	logDebug("StdChoice " + stdChoice + " does not exist");
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
function addFee(fcode,fsched,fperiod,fqty,finvoice) // Adds a single fee, optional argument: fCap
{
	// Updated Script will return feeSeq number or null if error encountered (SR5112) 
	var feeCap = capId;
	var feeCapMessage = "";
	var feeSeq_L = new Array();				// invoicing fee for CAP in args
	var paymentPeriod_L = new Array();			// invoicing pay periods for CAP in args
	var feeSeq = null;
	if (arguments.length > 5) 
		{
		feeCap = arguments[5]; // use cap ID specified in args
		feeCapMessage = " to specified CAP";
		}
	
	assessFeeResult = aa.finance.createFeeItem(feeCap,fsched,fcode,fperiod,fqty);
	if (assessFeeResult.getSuccess())
		{
		feeSeq = assessFeeResult.getOutput();
		logMessage("Successfully added Fee " + fcode + ", Qty " + fqty + feeCapMessage);
		logDebug("The assessed fee Sequence Number " + feeSeq + feeCapMessage);
	
		if (finvoice == "Y" && arguments.length == 5) // use current CAP
			{
			feeSeqList.push(feeSeq);
			paymentPeriodList.push(fperiod);
			}
		if (finvoice == "Y" && arguments.length > 5) // use CAP in args
			{
			feeSeq_L.push(feeSeq);
			paymentPeriod_L.push(fperiod);
			var invoiceResult_L = aa.finance.createInvoice(feeCap, feeSeq_L, paymentPeriod_L);
			if (invoiceResult_L.getSuccess())
				logMessage("Invoicing assessed fee items" + feeCapMessage + " is successful.");
			else
				logDebug("**ERROR: Invoicing the fee items assessed" + feeCapMessage + " was not successful.  Reason: " +  invoiceResult.getErrorMessage());
			}
		}
	else
		{
		logDebug( "**ERROR: assessing fee (" + fcode + "): " + assessFeeResult.getErrorMessage());
		feeSeq = null;
		}
	
	return feeSeq;
   
}

function addLicenseCondition(cType,cStatus,cDesc,cComment,cImpact)
{
// Optional 6th argument is license number, otherwise add to all CAEs on CAP
refLicArr = new Array();
if (arguments.length == 6) // License Number provided
	{
		var refLicPro = getRefLicenseProf(arguments[5]);
		if( refLicPro != null )
		{
			refLicArr.push();
		}
		else
		{
			logDebug("**ERROR: Could not get the reference to the license professional supplied: " + arguments[5]);
			return false;
		}
	}
else // adding to cap lic profs
	{
	var capLicenseResult = aa.licenseScript.getLicenseProf(capId);
	if (capLicenseResult.getSuccess())
		{ var refLicArr = capLicenseResult.getOutput();  }
	else
		{ logDebug("**ERROR: getting lic profs from Cap: " + capLicenseResult.getErrorMessage()); return false; }
	}

for (var refLic in refLicArr)
	{
	if (arguments.length == 7) // use sequence number
		licSeq = refLicArr[refLic].getLicSeqNbr();
	else
		licSeq = refLicArr[refLic].getLicenseProfessionalModel().getLicSeqNbr();

	if (licSeq >= 0)
		{
		var addCAEResult = aa.caeCondition.addCAECondition(licSeq, cType, cDesc, cComment, null, null, cImpact, cStatus, sysDate, null, sysDate, sysDate, systemUserObj, systemUserObj);

		if (addCAEResult.getSuccess())
			{
			logDebug("Successfully added licensed professional (" + licSeq + ") condition (" + cImpact + ") " + cDesc);
			}
		else
			{
			logDebug( "**ERROR: adding licensed professional (" + licSeq + ") condition (" + cImpact + "): " + addCAEResult.getErrorMessage());
			}
		}
	else
		logDebug("No reference link to license : " + refLicArr[refLic].getLicenseNbr());
	}
}

function debugObject(object)
{
	var output = ''; 
	for (property in object) { 
	  output += "<font color=red>" + property + "</font>" + ': ' + "<bold>" + object[property] + "</bold>" +'; ' + "<BR>"; 
	} 
	logDebug(output);
}

function getPrimaryLicenseProfessional()
{
	var refLicArr = new Array();
	var returnObject = null;
	
	var capLicenseResult = aa.licenseScript.getLicenseProf(capId);
	if (capLicenseResult.getSuccess())
	{ 
		var refLicArr = capLicenseResult.getOutput();  
	}
	else
	{ 
		logDebug("**ERROR: getting lic profs from Cap: " + capLicenseResult.getErrorMessage()); return false; 
	}
	
	if( refLicArr == null || refLicArr.length == 0 )
	{
		logDebug("**No license professionals for Cap: " + capLicenseResult.getErrorMessage()); 
		return returnObject;
	}
	
	for (var refLic in refLicArr)
	{
		if (arguments.length == 6) // use sequence number
			licSeq = refLicArr[refLic].getLicSeqNbr();
		else
			licSeq = refLicArr[refLic].getLicenseProfessionalModel().getLicSeqNbr();
	
		// Iterate over all of the license professionals
		if (licSeq >= 0)
		{
			if ( refLicArr[refLic].getPrintFlag() == 'Y' && getRefLicenseProf(refLicArr[refLic].getLicenseNbr()) != null )
			{
				// Found the primary, save the information
				logDebug("Primary License Professional found: " + refLicArr[refLic].getLicenseNbr());
				returnObject = refLicArr[refLic];
				break;
			}
		}
		else
			logDebug("No reference link to license : " + refLicArr[refLic].getLicenseNbr());
	}
	
	return returnObject;
}

function getRefLicenseProf(refstlic)
{
	var refLicObj = null;
	var refLicenseResult = aa.licenseScript.getRefLicensesProfByLicNbr(aa.getServiceProviderCode(),refstlic);
	if (!refLicenseResult.getSuccess())
		{ logDebug("**ERROR retrieving Ref Lic Profs : " + refLicenseResult.getErrorMessage()); return false; }
	else
	{
		var newLicArray = refLicenseResult.getOutput();
		if (!newLicArray) return null;
		for (var thisLic in newLicArray)
			if (refstlic && refstlic.toUpperCase().equals(newLicArray[thisLic].getStateLicense().toUpperCase()))
				refLicObj = newLicArray[thisLic];
	}
	
	return refLicObj;
}

function logDebug(dstr) {

   debug+=dstr + br;
}

function logMessage(dstr)
{
	message+=dstr + br;
}

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

function doExpireCase( altid )
{
	// Do the bulk of the work here
	logDebug(altid);
	
	// Attempt to get the case based on the string passed in
	capId = aa.cap.getCapID(altid).getOutput();
	if (capId == null) {
		logDebug("Could not get " + altid + "!!!");
		return;
	}
	cap = aa.cap.getCap(capId).getOutput();
	if (cap == null) {
		logDebug("Could not get cap for " + altid + "!!!");
		return;
	}
	
	// Move the status to expired
	logDebug( "Moving " + altid + " from Active to Expired." );
	updateTask("Active Permit","Expired", CommentNote, CommentNote);
	
	// Add the fee
	logDebug( "Adding an expired fee." ); 
	addFee("EXPN","B_NCC","FINAL",1,"Y",capId);
	
	// Attach a condition to the license professional
	/*var licProf = getPrimaryLicenseProfessional();
	if( licProf != null )
	{
		logDebug( "Attaching a condition to " + licProf.getLicenseNbr() );
		addLicenseCondition("LicPro", "Not Met", "Expired CAP", altid, "Notice", licProf.getLicenseNbr());
	}
	else
	{
		logDebug( "**No primary license professional found for " + altid );
	}*/
}