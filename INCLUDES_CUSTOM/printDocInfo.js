//custom function
//jec 170706 conversion begin
//noted in DUA
function printDocInfo(docModelList){
	try{
		var count = 0;
	    var documentList = aa.util.newArrayList();
	    // var fileNameList = aa.util.newArrayList();

	    var it = docModelList.iterator();
	    comment("This is iterator:" + it);
	    while (it.hasNext()) {
	        var docModel = it.next();
	        //updating aa.print with logDebug - jec 8.23.17
	        logDebug("File Name[" + count + "] is:" + docModel.getFileName());
	        //fileNameList.push(docModel.getFileName());
	        logDebug("File Type[" + count + "] is:" + docModel.getDocType());
	        comment("Doc Type = " + docModel.getDocType());
	        logDebug("EDMS Name[" + count + "] is:" + docModel.getSource());
	        logDebug("Department[" + count + "] is:" + docModel.getDocDepartment());
	        logDebug("Description[" + count + "] is:" + docModel.getDocDescription());
	        logDebug("Category[" + count + "] is:" + docModel.getDocCategory());
	        comment("Category = " + docModel.getDocCategory());
	        logDebug("Document Name[" + count + "] is:" + docModel.getDocName());
	        logDebug("Document Date[" + count + "] is:" + docModel.getFileUpLoadDate());
	        logDebug("Document Group[" + count + "] is:" + docModel.getDocGroup());

	        logDebug(" ");
	        comment("This is docArray: " + count + " " + docModel.getDocName());
	        comment("This is docDate: " + count + " " + docModel.getFileUpLoadDate());
	       // comment("This is docDate: " + count + " " + docModel.getDocUpLoadBy());
	        //comment("This is docDate: " + count + " " + docModel.getUpLoadBy());
	        //comment("This is docDate: " + count + " " + docModel.getDocumentUpLoadBy());
	        comment("This was uploaded by : " + count + " " + docModel.getFileUpLoadBy());
	        comment("This is docNbr: " + count + " " + docModel.getDocumentNo());
	        comment("This is docStatus: " + count + " " + docModel.getDocStatus());
	        count++;

	        // If the doc category is the certain defined category, added.
	        //if (categoryTaskMap != null && categoryTaskMap.size() > 0) {
	         //   var categoryIterator = categoryTaskMap.keySet().iterator();
	         //   comment("This is categoryIterator: " + categoryIterator);
	         //   while (categoryIterator.hasNext()) {
	         //       var key = categoryIterator.next();
	          //      comment("This is key: " + key);
	         //       if (key != null) {
	         //           if (key.equals(docModel.getDocCategory())) {
	         //               documentList.add(docModel);
	         //               if (!categorys.contains(key)) {
	         //                   categorys.add(key);
	         //               }
	         //           }
	         //       }
	         //   }
	       // }
	    }
	    //return documentList;

	}catch(err){
		logDebug("An error occurred in custom function printDocInfo Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end