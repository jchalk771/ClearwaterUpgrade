//custom function
//noted in ASIUA
//jec 170706 conversion begin
function addOwnersFromAPOToCap() {
	try{
		var parcelListResult = aa.parcel.getParcelDailyByCapID(capId, null);
		if (parcelListResult.getSuccess())
			var parcelList = parcelListResult.getOutput();
		else {
			logDebug("**ERROR: Failed to get Parcel List " + parcelListResult.getErrorMessage());
			return false;
		}

		// Get the list of owners already on the case
		var currentOwnerListResult = aa.owner.getOwnerByCapId(capId);
		var currentOwnerList = null;
		if (currentOwnerListResult.getSuccess())
			currentOwnerList = currentOwnerListResult.getOutput();
		else {
			logDebug("**ERROR: Failed to get Current Owner List " + currentOwnerListResult.getErrorMessage());
			return false;
		}

		for (var thisP in parcelList) {
			var ownerListResult = aa.owner.getOwnersByParcel(parcelList[thisP]);
			if (ownerListResult.getSuccess())
				var ownerList = ownerListResult.getOutput();
			else {
				logDebug("**ERROR: Failed to get Owner List " + ownerListResult.getErrorMessage());
				return false;
			}

			for (var thisO in ownerList) {
				var bExisting = false;

				for (var thisC in currentOwnerList) {
					if (currentOwnerList[thisC].getL1OwnerNumber() == ownerList[thisO].getL1OwnerNumber()) {
						bExisting = true;
						break;
					}
				}

				// Only add the owner if it is not already in our list
				if (bExisting == false) {
					ownerList[thisO].setCapID(capId);
					ownerList[thisO].setPrimaryOwner("N");
					createOResult = aa.owner.createCapOwnerWithAPOAttribute(ownerList[thisO]);

					if (createOResult.getSuccess())
						logDebug("Created CAP Owner");
					else
						{
						logDebug("**WARNING: Failed to create CAP Owner " + createOResult.getErrorMessage());
					}
				}

			}
		}

	}catch(err){
		logDebug("An error occurred in custom function addOwnersFromAPOToCap Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end





	