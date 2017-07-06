//custom function
//jec 170706 conversion begin
//noted in DUA
function onlineCustomerRequest4(docModel, documentModelArray) {
	try{
		//loop through documents
	    //changes doc status to uploaded online
	    //to documents with docSource = ACA and uploaded by like "PUBLIC"
	    for (var cnt in docModel) {
	        var docNbr = docModel[cnt].getDocumentNo();
	        var upLoadedBy = docModel[cnt].getFileUpLoadBy().substring(0,6) ;
	        comment("Doc Nbr = " + docNbr);
	        docUploadedNow = aa.document.getDocumentByPK(docNbr).getOutput();
	        comment("DocUploadedNow is " + docUploadedNow);
	        comment("DocList is " + documentModelArray);
	        comment("DocStatus is " + docModel[cnt].getDocStatus());
	        comment("Doc Date is " + docModel[cnt].getFileUpLoadDate());
	        comment("Doc uploaded by is " + docModel[cnt].getFileUpLoadBy());
	        comment("Var UploadSubString is " + upLoadedBy);

	        //if ((docModel[cnt].getDocStatus() == "Uploaded") && (upLoadedBy =="LMORED"))
	        if ((docModel[cnt].getDocStatus() == "Uploaded") && (upLoadedBy =="PUBLIC")) {
	        	comment("**********************");
	        	comment("Inside if stmt, doc status is Uploaded, needs to change.");
	        	docUploadedNow.setDocStatus("Uploaded Online");
	        	isSuccess = aa.document.updateDocument(docUploadedNow);
	        	comment("isSuccess is " + isSuccess);
	        	comment("Did the status Change?");
	        	//if only one doc uploaded, have to have at least one adhoc task
	        	assignDoc2AdhocTask(documentModelArray);
	        	comment("**********************");
	        }
	    }
	    return "Hello";
	}catch(err){
		logDebug("An error occurred in custom function functionName Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end