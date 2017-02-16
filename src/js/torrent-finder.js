import $ from 'jquery';
import storage from './chrome-storage';
import listItemBuilder from './list-ltem-builder';

let torrentFinder = function () {
	const programName = $('#program-name');
	const daySelector = $('#day-selector');
	const addButton = $('#btn-add-program');
	const deleteAllButton = $('#btn-delete-all-program');
	const programList = $('#program-list');

	function init () {
		storage.get('data', function (result) {
			displayProgramDataList(result['data']);
		});
	}

	function bindEvent () {
		addButton.on('click', function () {
			if (!programName.val()) {
				return;
			}

			syncProgramDataList();
		});

		deleteAllButton.on('click', function () {
			storage.clear();
		});
	}

	function displayProgramDataList(programDataList) {
		programList.empty();

		$(programDataList).each(function () {
			let anchorElement = listItemBuilder.build(this);
			programList.append(anchorElement);
		});
	}

	function syncProgramDataList() {
		storage.get('data', function (result) {
			let programDataList = result['data'] || [];

			// TODO : 같은 프로그램에 대해 중복 처리 필요
			programDataList.push({
				programName: programName.val(),
				dayOfBroadcast: daySelector.val()
			});

			saveToStorage(programDataList);
			displayProgramDataList(programDataList);
		});
	}

	function saveToStorage(programDataList) {
		storage.set({'data': programDataList}, function () {
			console.log("program list saved successfully.");
		});
	}

	return {
		init: function () {
			init();
			bindEvent();
		}
	}
};

export default torrentFinder();