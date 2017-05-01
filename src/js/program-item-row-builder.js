import moment from 'moment'

const GOOGLE_HOST = "https://www.google.co.kr/#newwindow=1";

class ProgramItemRowBuilder {
    build(program) {        
        const programName = program.programName;
        const dayOfBroadcast = program.dayOfBroadcast;

        moment.locale('ko');

        // 요일 차이 계산
        let daysBefore = moment().day() - dayOfBroadcast;
        if (daysBefore < 0) {
            daysBefore += 7;
        }

        const lastDateOfBroadcast = moment().subtract(daysBefore, 'day');
        const link = GOOGLE_HOST + '&q=' + programName + ' ' + lastDateOfBroadcast.format('YYMMDD');

        return '<tr>'
            + '<td>' + '<a href=\"' + link + '\" target="_blank">' + programName + '</a></td>'
            + '<td>' + moment(lastDateOfBroadcast).format("dddd") + '</td>'
            + '<td>' + '<span class="badge">' + lastDateOfBroadcast.format('YYYY-MM-DD') + '</span></td>'
            // + '<td>' + '<button class="btn btn-danger btn-xs">삭제</button>' + '</td>'
            + '</tr>';
    }
}

export default new ProgramItemRowBuilder();