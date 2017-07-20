//custom function
//jec 170720 conversion begin
function countHistoryItemsForTask(strTask){
	try{

		var count = 0;
	    var historyResult = aa.workflow.getHistory(capId);
	    if (historyResult.getSuccess())
	        var hisObj = historyResult.getOutput();
	    //@TODO - No else here if history fetch is null to return 0 and exit gracefully
	    for (i in hisObj) {
	        var fTask = hisObj[i];
	        if (fTask.getTaskDescription().equals(strTask)) { 
	        	++count; 
	        }
	    }
	    logDebug(strTask + " with " + count + " tasks in history");
	    return count;
	    
	}catch(err){
		logDebug("An error occurred in custom function countHistoryItemsForTask Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170720 conversion end