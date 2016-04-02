var bus = {
		api : config.bus.apiURL || '',
		stop: config.bus.stop || '',
		updateDataInterval:  30000,
		busList: [],
		busLocation: '.bus',
		logo: config.bus.logo,
		titleApi: config.bus.titleApiUrl,
		stopInfo: []
}


bus.updateData = function (callback) {		
	if (bus.api != '' && bus.stop  != ''){
		var url = "/controllers/bus.php?base=" + bus.api + "&stop=" + bus.stop;
		$.get(url, function (data) {
			console.log(data);
			var results = JSON.parse(data).results;
			if (results.length > 0){
				this.busList = results;
			} else {
				this.busList = JSON.parse(data).errormessage;
			}
			callback(this.busList);
		});
	}
}

bus.getTitle = function () {		
	if (bus.titleApi != '' && bus.stop  != ''){
		var url = "/controllers/bus.php?base=" + bus.titleApi + "&stop=" + bus.stop + "&test=true";
		
		$.ajax({
	        url: url,
	        type: 'GET',
	        async: false,
	        cache: false,
	        timeout: 60000,
	        success: function(data) {
	        	if ((JSON.parse(data).results).length > 0){
	        		console.log(JSON.parse(data).results);
					bus.stopInfo = JSON.parse(data).results;
				} else {
					bus.stopInfo = JSON.parse(data).errormessage;
				}
	        }
	    });
	}
}


bus.updateWidget = function (eventList) {
	var _is_new = true;
	if ($('.bus-table').length) {
		_is_new = false;
	}
	table = $('<table/>').addClass('xsmall').addClass('bus-table');
	
	if (!($('#bus-title').length)) {		
		var titleCell = $('<td/>').attr('colspan', '100%').addClass('bus-title');
		imgCell = $('<div/>').addClass('bus-logo-div');
		imgCell.append($('<img/>').attr('src', bus.logo));
		titleCell.append(imgCell);
		console.log(bus.stopInfo[0].shortname);
		console.log(bus.stopInfo[0].fullname);

		titleCell.append(bus.stopInfo[0].shortname + ', ');
		titleCell.append($('<span/>').html(bus.stopInfo[0].fullname).addClass('dimmed subtitle'));
		var titleRow = $('<tr/>').attr('id', 'busTitle');
		titleRow.append(titleCell);
		table.append(titleRow);
	}
	
	opacity = 1;
	if (eventList == 'No Results'){
		//happens when there are no busses running
		var row = $('<tr/>').attr('id', 'busEvent0').addClass('busEvent');
		row.append($('<td/>').html('No busses in service').addClass('dimmed'));
		table.append(row);
	} else {
		for (var i in eventList) {
			var e = eventList[i];
			var row = $('<tr/>').attr('id', 'busEvent'+i).css('opacity',opacity).addClass('busEvent');
			row.append($('<td/>').html(e.route).addClass('description'));
			row.append($('<td/>').html(e.destination).addClass('days dimmed'));
			if (e.duetime == 'Due'){
				row.append($('<td/>').html(e.duetime).addClass('days dimmed'));
			} else {
				row.append($('<td/>').html(e.duetime + ' min').addClass('days dimmed'));
			}
			if (! _is_new && $('#busEvent'+i).length) {
				$('#busEvent'+i).updateWithText(row.children(), this.fadeInterval);
			} else {
				// Something wrong - replace whole table
				_is_new = true;
			}
			table.append(row);
			opacity -= 1 / eventList.length;
		}
	}
	if (_is_new) {
		$(this.busLocation).updateWithText(table, this.fadeInterval);
	}

}

bus.init = function () {
	this.getTitle();
	this.updateData(this.updateWidget.bind(this));

	this.dataIntervalId = setInterval(function () {
		this.updateData(this.updateWidget.bind(this));
	}.bind(this), this.updateDataInterval);

}
