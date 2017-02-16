import moment from 'moment';

let listItemBuilder = function () {
	const config = {
		GOOGLE_HOST: "https://www.google.co.kr/#newwindow=1"
	};

	return {
		build: function (program) {
			const programName = program.programName;
			const dayOfBroadcast = program.dayOfBroadcast;

			// 요일 차이 계산
			let daysBefore = moment().day() - dayOfBroadcast;
			if (daysBefore < 0) {
				daysBefore += 7;
			}

			const lastDateOfBroadcast = moment().subtract(daysBefore, 'day');
			const link = config.GOOGLE_HOST + '&q=' + programName + ' ' + lastDateOfBroadcast.format('YYMMDD');

			return '<a href=\"' + link + '\" target="_blank" class="list-group-item">'
				+ programName
				+ '<span class="badge">' + lastDateOfBroadcast.format('YYYY-MM-DD') + '</span>'
				+ '</a>';
		}
	}
};

export default listItemBuilder();