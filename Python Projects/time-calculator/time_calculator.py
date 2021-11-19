def add_time(start, duration):

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

    # Calculate hours and resolve next day situation
    day = 0
    result_hours = hours + duration_hours
    if result_hours > 24:
        day = result_hours / 24
        result_hours %= 24
    
    # Calculate minutes and resolve next hour situation
    result_minutes = minutes + duration_minutes
    if result_minutes > 60:
        result_hours += result_minutes / 60
        result_minutes %= 60
    
    if result_hours >= 12:
        am_or_pm = "PM"
        if result_hours >= 13:
            result_hours -= 12
    else:
        am_or_pm = "AM"

    new_time = str(result_hours).zfill(2) + ":" + str(result_minutes).zfill(2) + " " + am_or_pm
    
    return new_time