/* Radonguiden javascript */

jQuery(document).ready(function() {

	var animationSpeed = 500;

	/** Variabels that are saved from Radonguiden:
	* buildingType: the type of building that the user wants to measure in, for example "Kontor"/"Office".
	* dataQuantity: the quantity of devices that the user want to purchase
	* measurementType: the type of measurement that the user want to perform, for example "Snabbmätning"/"Quick measurement"
	**/

	/* Disable default behaviour for .radonguiden links */
	jQuery('a.radonguiden').on('click', function(e) {
		e.preventDefault();
		var hideElem = jQuery(this).data('hide-element');
		var showElem = jQuery(this).data('show-element');
		elementHide(hideElem);
		elementShow(showElem);
	});

	/* Functions to handle hiding of elements */
	function elementHide(elem) {
		var windowWidth = jQuery(window).width();
		elementObj = jQuery(elem);
		elementObj.css('position', 'relative');
		elementObj.animate({left: '-' + windowWidth}, animationSpeed);
		window.setTimeout(function() {
			jQuery(elem).hide();
		}, animationSpeed);
	}

	/* Functions to handle showing of elements */
	function elementShow(elem) {
		elementObj = jQuery(elem);
		window.setTimeout(function() {
			elementObj.fadeIn(animationSpeed);
			elementObj.css('left', '0');
		}, animationSpeed);
	}

	/* Handles saving of data containing the type of building that's selected */
	jQuery('[data-radonguiden-building]').on('click', function() {
		buildingType = jQuery(this).attr('data-radonguiden-building');
	});

	/* Handles saving of data from elements with data-save-quantity="name_of_saved_input_field" */
	jQuery('[data-save-quantity]').on('click', function() {
		var inputElementName = jQuery(this).attr('data-save-quantity');
		dataQuantity = jQuery('[name="' + inputElementName + '"]').val();
	});

	/* Handles saving of data containing the type of measurement that's selected */
	jQuery('[data-radonguiden-measurement]').on('click', function() {
		measurementType = jQuery(this).attr('data-radonguiden-measurement');
	});

	/* Shows "Contact us" message if input field quantity exceeds number set in data-radonguiden-max="xxxx" */
	jQuery('[data-radonguiden-max]').bind('keyup mouseup', function () {
		var maxValue = parseInt(jQuery(this).attr('data-radonguiden-max'));
		var currentValue = parseInt(jQuery(this).val());
		var message = jQuery(this).siblings('.radonguiden-quantity-message');
		var chooseBtn = jQuery(this).siblings('.blue-btn');
		if(currentValue > maxValue) {
			message.fadeIn(animationSpeed);
			chooseBtn.fadeOut(animationSpeed);	
		}
		else {
			message.fadeOut(animationSpeed);
			chooseBtn.fadeIn(animationSpeed);
		}
	});

	/* Get the Radonguiden results with ajax */

	jQuery('.radonguiden-get-ajax-results').on('click', function() {
		radeaResultsAjax();
	});

	function radeaResultsAjax() {
		window.setTimeout(function() {
			window.location.href = "#main";
			jQuery('.radonguiden-wrapper').html('<i class="fa fa-cog fa-spin fa-3x fa-fw" style="margin: 120px auto; display: block;"></i><span class="sr-only">Laddar...</span>');
		}, animationSpeed);

	    jQuery.ajax({
	        url: radea.ajax_url,
	        data: {
	            'action': 'radea_radonguiden_ajax',
	            'buildingType' : buildingType,
	            'dataQuantity' : dataQuantity,
	            'measurementType' : measurementType
	        },
	        success:function(data) {
	            window.setTimeout(function() {
	            	jQuery('.radonguiden-wrapper').html('<div>' + data + '</div>');
	            }, animationSpeed);
	        },
	        error: function(errorThrown){
	            console.log(errorThrown);
	        }
	    });
    }	

});