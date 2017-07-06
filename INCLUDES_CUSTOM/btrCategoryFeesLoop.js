//custom function
//formerly ES_BTR_CATEGORY_FEES_LOOP
//jec 170706 conversion begin
function btrCategoryFeesLoop(){
	try{
		BTRCATrow = CATEGORIES[eachrow];
		BTRCategory = BTRCATrow["Category"];
		BTRCATcode = BTRCategory.substring(0,6);
		comment("BTRCATcode is: " + BTRCATcode);
		BTRCATvalue = lookup("BUSINESS_TAX_CAT",BTRCATrow["Category"]);
		comment("BTRCATvalue is: " + BTRCATvalue);
		BTRCATqty = BTRCATrow["Quantity"];
		comment("BTRCATqty is: " + BTRCATqty);
		if (BTRCATvalue >= 0 && !matches(BTRCATcode,"009000","012000","016030","022000","027050","033030","035060","043000","058010","058030","061000","061010","070040","071020","091000","091010","091020","091030","091040","091050","091060","091070","091090","091090","092000","101000","019010","035030","074020","085000","089020","099010","099020","103020","110020")) {
			BTRCATfee = BTRCATvalue;
		}

		if (BTRCATcode == "009000") {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(25.20 * BTRCATqty);
		}

		if (BTRCATcode == "012000") {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(25.20 * BTRCATqty);
		}

		if (BTRCATcode == "016030" && BTRCATqty > 10) {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(12.60 * (BTRCATqty-10));
		}

		if (BTRCATcode == "016030" && BTRCATqty <= 10) {
			BTRCATfee = BTRCATvalue;
		}

		if (BTRCATcode == "022000") {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(12.60 * BTRCATqty);
		}

		if (BTRCATcode == "027050") {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(31.50 * BTRCATqty);
		}

		if (BTRCATcode == "033030") {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(1.10 * BTRCATqty);
		}

		if (BTRCATcode == "035060") {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(12.60 * (BTRCATqty-1));
		}

		if (BTRCATcode == "043000") {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(25.20 * (BTRCATqty-1));
		}

		if (BTRCATcode == "058030") {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(31.50 * (BTRCATqty-1));
		}

		if (BTRCATcode == "061000") {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(25.20 * BTRCATqty);
		}

		if (BTRCATcode == "061010") {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(25.20 * BTRCATqty);
		}

		if (matches(BTRCATcode,"099010","099020")) {
			BTRCATfee = parseFloat((Math.round(BTRCATqty /1000)) * BTRCATvalue + 1.00);
			comment("Calc Amt is: " + parseFloat(Math.round(BTRCATqty /1000)));
			comment("BTR fee is: " + BTRCATfee);
		}

		if (matches(BTRCATcode,"099010","099020") && BTRCATfee < 50.00) {
			BTRCATfee = 50.00;
			comment("BTRCatfee is " +BTRCATfee );
		}

		if (BTRCATcode == "070040") {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat((Math.ceil((BTRCATqty-3000)/1000)) * 5.30);
			comment("Calc Amount is: " + parseFloat(Math.ceil((BTRCATqty-3000)/1000)));
			comment("No rounding Calc Amount is: " + parseFloat((BTRCATqty-3000)/1000));
		}

		if (BTRCATcode == "071020" && BTRCATqty > 25) {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(4.00 * (BTRCATqty-25));
		}

		if (BTRCATcode == "071020" && BTRCATqty <= 25) {
			BTRCATfee = BTRCATvalue;
		}

		if (matches(BTRCATcode,"091000","091010","091020","091030","091040","091050","091060","091070","091080","091090") && BTRCATqty > 5) {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(1.70 * (BTRCATqty-5));
		}

		if (matches(BTRCATcode,"091000","091010","091020","091030","091040","091050","091060","091070","091080","091090") && BTRCATqty <= 5) {
			BTRCATfee = BTRCATvalue;
		}

		if (BTRCATcode == "092000") {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(12.60 * BTRCATqty);
		}

		if (BTRCATcode == "101000") {
			BTRCATfee = parseFloat(BTRCATvalue) + parseFloat(25.20 * (BTRCATqty-1));
		}

		if (matches(BTRCATcode,"016090","019010","035030","058010","074020","085000","089020","093070","103020","110020")) {
			BTRCATfee = BTRCATvalue * BTRCATqty;
		}

		if (BTRCATfee > 0) {
			BTRCATtotalfee = parseFloat(BTRCATtotalfee) + parseFloat(BTRCATfee);
			comment("BTRCATfee is: " + BTRCATfee);
			comment("BTRCATtotalfee is: " + BTRCATtotalfee);
		}
	}catch(err){
		logDebug("An error occurred in custom function btrCategoryFeesLoop Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end