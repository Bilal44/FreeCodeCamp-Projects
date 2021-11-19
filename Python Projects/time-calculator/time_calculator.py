def add_time(start, duration, weekday=False):

    DAYS_OF_THE_WEEK = {
        "Monday": 0,
        "Tuesday": 1,
        "Wednesday": 2,
        "Thursday": 3,
        "Friday": 4,
        "Saturday": 5,
        "Sunday": 6
    }

    day, result_hours, result_day = 0, 0, ""

    # Getting useful data from start string
    time, am_or_pm = start.split()
    hours, minutes = time.split(':')
    hours = int(hours)
    minutes = int(minutes)

    # Making the clock into 24 hour format
    if am_or_pm == "PM":
        hours += 12

    # Extract hours and minuts as ints from duration
    duration_hours, duration_minutes = duration.split(':')
    duration_hours = int(duration_hours)
    duration_minutes = int(duration_minutes)

    # Calculate minutes and resolve next hour situation
    result_minutes = minutes + duration_minutes
    if result_minutes > 60:
        result_hours += int(result_minutes / 60)
        result_minutes %= 60

    # Calculate hours and resolve next day situation
    result_hours += hours + duration_hours
    if result_hours > 24:
        day = int(result_hours / 24)
        result_hours %= 24
    
    # 24 hour clock to AM/PM conversion
    if result_hours >= 12:
        am_or_pm = "PM"
        if result_hours >= 13:
            result_hours -= 12
    else:
        am_or_pm = "AM"
        # Cover edge case of 00:00 hours
        result_hours += 12 if result_hours == 0 else 0

    new_time = str(result_hours) + ":" + str(result_minutes).zfill(2) + " " + am_or_pm

    if weekday:
        result_day = (DAYS_OF_THE_WEEK[weekday.lower().capitalize()] + day) % 7
        for i, j in DAYS_OF_THE_WEEK.items():
            if j == result_day:
                result_day = i
                break
        new_time += ", " + str(result_day)

    if day > 0:
        if day == 1:
            new_time +=  " (next day)"
        else:
            new_time += " (" + str(day) + " days later)"    

    return new_time