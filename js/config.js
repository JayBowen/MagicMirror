var config = {
    lang: 'en',
    time: {
        timeFormat: 12,
        displaySeconds: true,
        digitFade: false,
    },
    weather: {
        //change weather params here:
        //units: metric or imperial
        params: {
            q: 'Dublin, Ireland',
            units: 'metric',
            // if you want a different lang for the weather that what is set above, change it here
            lang: 'en',
            APPID: 'a2f5d885c9215aa79104df122fb23872'
        }
    },
    bus:{
    	apiURL: 'https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=<!stopNum!>&format=json',
    	stop: '274',
    	interval: 60000
    },
    compliments: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
            'Good morning, handsome!',
            'Enjoy your day!',
            'How was your sleep?'
        ],
        afternoon: [
            'Hello, beauty!',
            'You look sexy!',
            'Looking good today!'
        ],
        evening: [
            'Wow, you look hot!',
            'You look nice!',
            'Hi, sexy!'
        ]
    },
    calendar: {
        maximumEntries: 10, // Total Maximum Entries
		displaySymbol: true,
		defaultSymbol: 'calendar', // Fontawsome Symbol see http://fontawesome.io/cheatsheet/
        urls: [
		{
			symbol: 'calendar-plus-o', 
			url: 'https://p05-calendarws.icloud.com/ca/subscribe/1/zyTzEAtIciMW8lQVCMnNOXJv4B37ze4KWIHNxPC4-VtDZYXRxuYi0o8BQvTZ0dt8'
		},
		{
			symbol: 'soccer-ball-o',
			url: 'https:/p05-calendarws.icloud.com/ca/subscribe/1/zyTzEAtIciMW8lQVCMnNOXJv4B37ze4KWIHNxPC4-VtDZYXRxuYi0o8BQvTZ0dt8',
		},
		// {
			// symbol: 'mars',
			// url: "https://server/url/to/his.ics",
		// },
		// {
			// symbol: 'venus',
			// url: "https://server/url/to/hers.ics",
		// },
		// {
			// symbol: 'venus-mars',
			// url: "https://server/url/to/theirs.ics",
		// },
		]
    },
    news: {
        feed: 'https://www.irishtimes.com/cmlink/news-1.1319192'
    }
}
