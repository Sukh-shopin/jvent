/* Postcode check javascript */

jQuery(document).ready(function() {

	/* Texts to show on success/fail */
	successText = '<img src="http://radea.se/ uploads/2014/08/radonsanering_03.png"><h2>Kul, du verkar bo i ett län där du kan ta del av våra tjänster.</h2><br><p><strong>För villaägare</strong></p><p>För dig erbjuder vi både kostnadsfria radonbesiktningar men också gratis ventilationskontroller för ditt hus. Läs mer på den här sidan.</p><br><p><strong>För flerbostadshus</strong></p><p>För dig erbjuder vi en enklare kostnadsfri radonbesiktning men också större radonutredningar. Vi kan även utreda och lämna förslag på ventilationsförbättringar i ert hus. Läs mer om radonutredning och ventilation.</p>';
	failedText = '<img src="http://radea.se/ uploads/2014/08/radonsanering_03.png"><h2>Tyvärr...</h2><p>Du verkar tyvärr inte bo i ett län där vi erbjuder kostnadsfria radonbesiktningar eller ventilationskontroller.</p>';

	postCodeInput = jQuery('input[name="postcode"]');
	resultsElement = jQuery('#postcode-check-result');

	/* Create an object with all the accepted post codes */
	var postCodes = {
		one: {min: 10000, max: 19999},
		two: {min: 40000, max: 54999},
		three: {min: 72000, max: 79999},
		four: {min: 30000, max: 31999}
	}

	jQuery('#postcode-check-submit').on('click', function() {

		/* Get the user's postcode from the input field */
		userPostcode = Number(postCodeInput.val());
		postCodeAllowed = false;
		
		/* Loop through all postcodes and check if the one submitted
		by the user is allowed */

		for(var postCode in postCodes) {
			var min = postCodes[postCode].min;
			var max = postCodes[postCode].max;
			if(userPostcode >= min && userPostcode <= max) {
				postCodeAllowed = true;
			}
		}

		/* If the postcode is allowed, show successText. Otherwise, show failedText */

		if(postCodeAllowed) {
			resultsElement.html(successText);
		}

		else {
			resultsElement.html(failedText);
		}
		resultsElement.hide();
		resultsElement.fadeIn();
	});

});