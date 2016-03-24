var bus = {
		api : config.bus.apiURL || '',
		stop: config.bus.stop || '',
		updateDataInterval: config.bus.interval || 3000000,
		busList: [],
		busLocation: '.bus',
}


bus.updateData = function (callback) {		
	if (config.bus.apiURL != '' && config.bus.stop  != ''){
		var url = "/controllers/bus.php?base=" + bus.api + "&stop=" + bus.stop 	
		$.get(url, function (data) {
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

bus.updateWidget = function (eventList) {
	var _is_new = true;
	if ($('.bus-table').length) {
		_is_new = false;
	}
	table = $('<table/>').addClass('xsmall').addClass('bus-table');
	opacity = 1;
	
	for (var i in eventList) {
		var e = eventList[i];
		var row = $('<tr/>').attr('id', 'event'+i).css('opacity',opacity).addClass('event');
		row.append($('<td/>').html(e.route).addClass('description'));
		row.append($('<td/>').html(e.destination).addClass('days dimmed'));
		row.append($('<td/>').html(e.duetime + ' min').addClass('days dimmed'));
		if (! _is_new && $('#event'+i).length) {
			$('#event'+i).updateWithText(row.children(), this.fadeInterval);
		} else {
			// Something wrong - replace whole table
			_is_new = true;
		}
		table.append(row);
		opacity -= 1 / eventList.length;
	}
	if (_is_new) {
		$(this.busLocation).updateWithText(table, this.fadeInterval);
	}

}

bus.init = function () {

	this.updateData(this.updateWidget.bind(this));

	this.dataIntervalId = setInterval(function () {
		this.updateData(this.updateWidget.bind(this));
	}.bind(this), this.updateDataInterval);

}
