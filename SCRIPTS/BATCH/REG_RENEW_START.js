/*------------------------------------------------------------------------------------------------------/
| Program: REG_Renew_Start.js  Trigger: Batch    Client : Clearwater, FL
|
| Version 1.0 - Base Version. 6/24/2010 - Nicholas Dorrough - City of Clearwater
|      8/11/2014 - Lydia Moreda - City of Clearwater
|      Staff decided to not post the fee this year, as almost all
|      renewals require documentation.
| REG Renewal Batch that is used to set all REG cases to their new status.  It will also post
| fees appropriate to the categories the REG has assigned to it and post a note for when the letter
| will be sent out.
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

var emailAddress = "lydia.moreda@myclearwater.com";
var emailText = "";
var paramsOK = true;

var IdleWorkflowNote, REGRenewalNote;
IdleWorkflowNote = "Moved to IDLE by REG batch";
REGRenewalNote = "(2015-2016)";


/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
|
/-----------------------------------------------------------------------------------------------------*/

var bizDomScriptResult = aa.bizDomain.getBizDomain("REG_RENEWAL_CASES");
    	
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
			doREGRenewal( entry.getDispBizdomainValue(), entry.getDispDescription() );
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

function closeTask(wfstr,wfstat,wfcomment,wfnote) // optional process name
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

function doREGRenewal( altid, action )
{
	// Do the bulk of the work here
	logDebug(altid + ":" + action);
	
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
	
	// Do work based on the action
	if( action == "IDLE" )
	{
		// 1. Move workflow to Idle (NC)
		updateTask("Renewal","Idle", IdleWorkflowNote, IdleWorkflowNote);
	}
	
	else
	{
		if( action == "FEE" )
		{
			// 1. Move workflow to Renew (N)
			closeTask("Issue REG","Renewal Notice", REGRenewalNote, REGRenewalNote);
			
			// 2. Post fee
			//addFee("REGS","T_REG","FINAL",1, "Y", capId);
		}
		else
		{
			// 1. Update the workflow (NC)
			updateTask("Renewal", "Renewal Notice", REGRenewalNote, REGRenewalNote);
		}
		
		// NOTE: RENEW action only gets the workflow comment
		
		// Add note workflow comment
		//updateTask("Renewal", "Notes", WorkflowNote, WorkflowNote);
	}
}