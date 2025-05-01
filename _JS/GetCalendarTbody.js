function GetCalendarTbody(Year, Month, FirstDayOfWeek)
{
    let Result = '';

    let ThisDay = FirstDayOfWeek;
    let ThisDate = 1;
    while(ThisDate <= (new Date(Year, Month + 1, 0)).getDate())
    {
        // add tr if needed
        if (ThisDay == FirstDayOfWeek) Result += '<tr>';

        // add begin padding days if needed
        if (ThisDate == 1) while(ThisDay != (new Date(Year, Month, 1)).getDay()) {Result += '<td class="calendar_begin_padding_day"></td>'; ThisDay++;}

        // add day
        Result += '<td class="calendar_day">' + ThisDate + '</td>';

        // add end padding days if needed
        if (ThisDate == (new Date(Year, Month + 1, 0)).getDate()) while(ThisDay != FirstDayOfWeek + 6) {Result += '<td class="calendar_end_padding_day"></td>'; ThisDay++;}

        // update ThisDay and ThisDate
        if (ThisDay == FirstDayOfWeek + 6) {Result += '</tr>'; ThisDay = FirstDayOfWeek;} else ThisDay++;
        ThisDate++
    }

    return Result;
}
