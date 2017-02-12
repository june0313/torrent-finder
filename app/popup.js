/**
 * Created by wayne on 2016. 11. 18..
 *
 */

$(document).ready(function () {
	"use strict";

	var programName = $('#program-name');
	var daySelector = $('#day-selector');
	var addButton = $('#btn-add-program');
	var deleteAllButton = $('#btn-delete-all-program');
	var programList = $('#program-list');
	var chromeStorage = chrome.storage.sync;

	var config = {
		GOOGLE_HOST: "https://www.google.co.kr/#newwindow=1"
	};

	chromeStorage.get('data', function (result) {
		displayProgramDataList(result['data']);
	});

	addButton.on('click', function () {
		if (!programName.val()) {
			return;
		}

		syncProgramDataList();
	});

	deleteAllButton.on('click', function () {
		chromeStorage.clear();
	});

	function saveToStorage(programDataList) {
		chromeStorage.set({'data': programDataList}, function () {
			console.log("program list saved successfully.");
		});
	}

	function buildAnchorElement(program) {
		var programName = program.programName;
		var dayOfBroadcast = program.dayOfBroadcast;

		// 요일 차이 계산
		var daysBefore = moment().day() - dayOfBroadcast;
		if (daysBefore < 0) {
			daysBefore += 7;
		}

		var lastDateOfBroadcast = moment().subtract(daysBefore, 'day');
		var link = config.GOOGLE_HOST + '&q=' + programName + ' ' + lastDateOfBroadcast.format('YYMMDD');

		return '<a href=\"' + link + '\" target="_blank" class="list-group-item">'
			+ programName
			+ '<span class="badge">' + lastDateOfBroadcast.format('YYYY-MM-DD') + '</span>'
			+'</a>';
	}

	function displayProgramDataList(programDataList) {
		programList.empty();

		$(programDataList).each(function () {
			var anchorElement = buildAnchorElement(this);
			programList.append(anchorElement);
		});
	}

	function syncProgramDataList() {
		chromeStorage.get('data', function (result) {
			var programDataList = result['data'] || [];

			// TODO : 같은 프로그램에 대해 중복 처리 필요
			programDataList.push({
				programName: programName.val(),
				dayOfBroadcast: daySelector.val()
			});

			saveToStorage(programDataList);
			displayProgramDataList(programDataList);
		});
	}

});
