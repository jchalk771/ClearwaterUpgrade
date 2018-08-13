/*------------------------------------------------------------------------------------------------------/
| Program: OCL_Renew_To_Issued_Nightly.js  Trigger: Batch    Client : Clearwater, FL
| In database it is BTR_NIGHTLY_BATCH4 script
|
| Version 1.0 - Base Version. 7/20/2010 - Nicholas Dorrough - City of Clearwater
|
| Move BTR cases from Red/Renewal to Issued when fees were all paid
|
| Modified 7/15/2011 - Changed email address from Nick to Lydia
| Modified 8/01/2018 
| - Changed email address from Lydia to John
| - updated BTRCommentNote to 2018-2019
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

var emailAddress = "john.warner@myclearwater.com";

var emailText = "";
var paramsOK = true;

var BTRCommentNote, BTRCurrentYear;
BTRCurrentYear = new Date().getFullYear(); 
BTRCommentNote = "2018-2019 updated via script BTR_NightlyBatch";

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
|
/-----------------------------------------------------------------------------------------------------*/
var stdChoice = "OCL_RENEWAL_TO_ISSUED";

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
				doBTRStatusToIssued( entry.getDispBizdomainValue() );
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

function debugObject(object)
{
	var output = ''; 
	for (property in object) { 
	  output += property + ': ' + object[property]+'; ' + "<BR>"; 
	} 
	logDebug(output);
}

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

function logDebug(dstr) {

    if (!aa.calendar.getNextWorkDay) {

		vLevel = 1;
		if (arguments.length > 1)
			vLevel = arguments[1];

		if ((showDebug & vLevel) == vLevel || vLevel == 1)
			debug += dstr + br;

		if ((showDebug & vLevel) == vLevel)
			aa.debug(aa.getServiceProviderCode() + " : " + aa.env.getValue("CurrentUserID"), dstr);
		}
	else {
			debug+=dstr + br;
		}

}

function logMessage(dstr)
{
	message+=dstr + br;
}

function loopTask(wfstr,wfstat,wfcomment,wfnote) // optional process name
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
				aa.workflow.handleDisposition(capId,stepnumber,processID,wfstat,dispositionDate, wfnote,wfcomment,systemUserObj ,"L");
			else
				aa.workflow.handleDisposition(capId,stepnumber,wfstat,dispositionDate, wfnote,wfcomment,systemUserObj ,"L");
			
			logMessage("Closing Workflow Task: " + wfstr + " with status " + wfstat + ", Looping...");
			logDebug("Closing Workflow Task: " + wfstr + " with status " + wfstat + ", Looping...");
		}			
	}
}

function doBTRStatusToIssued( altid )
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
	
	var capStatus = cap.getCapStatus();
	
	logDebug( "Moving " + altid + " from " + capStatus + " to Issued." );
	loopTask("Renewal","Issue Renewal", BTRCommentNote, BTRCommentNote);
}
