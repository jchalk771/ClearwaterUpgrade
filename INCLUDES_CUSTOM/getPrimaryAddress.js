//custom function
//jec 170724 conversion begin
function getPrimaryAddress(){
	try{

		var addressLine = "";

		adResult = aa.address.getPrimaryAddressByCapID(capId, "Y");

		if (adResult.getSuccess()) {
			ad = adResult.getOutput().getAddressModel();

			//addParameter(params, "$$addressLine$$", ad.getDisplayAddress());
			addressLine = ad.getDisplayAddress();
		}

		return addressLine;

	}catch(err){
		logDebug("An error occurred in custom function getPrimaryAddress Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170724 conversion end