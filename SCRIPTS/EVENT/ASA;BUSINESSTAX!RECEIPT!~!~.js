//Branch
//jec 170714 conversion begin

try{

	//branch("ES_BTR_CATEGORY_FEES")
	btrCategoryFees();
	//branch("ES_CW_BTR_CATEGORY_ASIADDFICTICIOUSNOTICE")
	addFicticiousNotice = false;
	if (typeof(CATEGORIES) == "object") {
		for (eachrow in CATEGORIES) 
			//branch("ES_CW_BTR_CATEGORY_ASIADDFICTICIOUSNOTICE_LOOP")
			BTRCATrow = CATEGORIES[eachrow];
			BTRCategory = BTRCATrow["Category"].toString();  //casting as string, dropdown reading as an unspecified object - JEC 8.23.17
			BTRCATcode = BTRCategory.substring(0,6);
			comment("BTRCATcode is: " + BTRCATcode);
			if (!matches(BTRCATcode,"014000","022000","037010","037020","037030","038020","038021","038022","038030","038045","038050","038070","038080","038090","038100","038120","038130","038150","038170","038175","038190","038210","038230","038240","038300","038335","038338","038340","038360","038370","038380","038410","038440","038450","038470","038480","038490","038510","038520","038530","038540","038560","038570","038580","038590","038600","038610","038620","038630","038640","038641","038642","038650","038660","038670","044000","069000","069010","084020","084030","084040","084041","084060","084070","084090","084100","084110","084120","084121","084130","084150","084160","084180","084190","084210","084220","084230","091000","091010","091020", "091030","091040","091050", "091060","091070","093110")) {
				addFicticiousNotice = true;
			}
		}

	if (addFicticiousNotice == true) {
		logDebug("Add ficticious notice");
		addStdCondition("BTR","Fictitious Name Required","Not Met");
	}
	
}catch(err){
	logDebug("An error occurred in ASA:BusinessTax/Receipt/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170714 conversion end