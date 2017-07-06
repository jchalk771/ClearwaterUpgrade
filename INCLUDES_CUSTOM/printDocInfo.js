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
	        aa.print("File Name[" + count + "] is:" + docModel.getFileName());
	        //fileNameList.push(docModel.getFileName());
	        aa.print("File Type[" + count + "] is:" + docModel.getDocType());
	        comment("Doc Type = " + docModel.getDocType());
	        aa.print("EDMS Name[" + count + "] is:" + docModel.getSource());
	        aa.print("Department[" + count + "] is:" + docModel.getDocDepartment());
	        aa.print("Description[" + count + "] is:" + docModel.getDocDescription());
	        aa.print("Category[" + count + "] is:" + docModel.getDocCategory());
	        comment("Category = " + docModel.getDocCategory());
	        aa.print("Document Name[" + count + "] is:" + docModel.getDocName());
	        aa.print("Document Date[" + count + "] is:" + docModel.getFileUpLoadDate());
	        aa.print("Document Group[" + count + "] is:" + docModel.getDocGroup());

	        aa.print(" ");
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