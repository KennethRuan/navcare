import logging
from tracemalloc import start
from .models import PSW, ScheduleItem, Client
from django.db.models import F, Func, ExpressionWrapper, DecimalField

def schedule(schedule_item):
    class Sin(Func):
        function = 'SIN'

    class Cos(Func):
        function = 'COS'

    class Acos(Func):
        function = 'ACOS'

    class Radians(Func):
        function = 'RADIANS'

    # Testing Vars
    cli_name = schedule_item["cli_name"]
    cli_lat = schedule_item["cli_lat"]
    cli_lon = schedule_item["cli_lon"]
    cli_notes = schedule_item["cli_notes"]

    # cli_name = "John"
    # cli_lat = 43.460628 # Client Latitude
    # cli_lon = -80.516492 # Client Longitude
    # cli_notes = 'Reported back pain, restricts mobility'

    if len(Client.objects.filter(name=cli_name)) > 0:
        cli = Client.objects.filter(name=cli_name)[0]
    else:
        cli =  Client(name=cli_name, latitude=cli_lat, longitude=cli_lon, notes=cli_notes)
    
    cli_start_time = schedule_item["start_time"] # 12:00
    cli_end_time = schedule_item["end_time"] # 12:45
    cli_date = schedule_item["date"]
    apmt_desc = schedule_item["apmt_desc"]

    # cli_start_time = 48 # 12:00
    # cli_end_time = 51 # 12:45
    # cli_date = '20220918'
    # apmt_desc = ''

    cli.save()

    radlat = Radians(cli_lat) 
    radlong = Radians(cli_lon) 
    radflat = Radians(F('latitude'))
    radflong = Radians(F('longitude'))

    Expression = 6371.0 * Acos(Cos(radlat) * Cos(radflat) *
                           Cos(radflong - radlong) +
                           Sin(radlat) * Sin(radflat))

    annotated_psws = PSW.objects.annotate(abs_calculation=ExpressionWrapper(Expression, output_field=DecimalField())).order_by('abs_calculation')

    # print(annotated_psws)
    # for psw in annotated_psws:
    #     print(psw.abs_calculation)

    flag = False
    upper_bound = 20

    while not flag and upper_bound <= 100:

        potential_psws = annotated_psws.filter(abs_calculation__lte = upper_bound).filter(abs_calculation__gte = upper_bound-20)
        print(potential_psws)
        print(upper_bound)
        for psw in potential_psws:
            # print("===%s's Schedule===" % psw.name)
            # print(psw._meta.fields)
            schedule = ScheduleItem.objects.filter(psw__name=psw.name, date=cli_date)
            
            available = False
            if len(schedule) > 0:
                # for i, item in enumerate(schedule):
                    # print("Task #%d" % i)
                    # print("Starts at: %d:%02d" % ((item.start_time*15)//60, (item.start_time*15%60)))
                    # print("Ends at: %d:%02d" % ((item.end_time*15)//60, (item.end_time*15%60)))

                sorted_schedule = schedule.order_by('start_time')
                # print(len(sorted_schedule))
                available = False
                print("run")
                for i in range(len(sorted_schedule)):
                    # Iterates until the next job is later than the requested jobs end time
                    if sorted_schedule[i].start_time > cli_end_time or i == len(sorted_schedule)-1: 
                        # Check if the job starts after the PSW's previous job
                        if i-1 < 0 or sorted_schedule[i-1].end_time < cli_start_time -1:
                            available = True
                            print("Found " + str(psw))
            
            if available:
                s = ScheduleItem(psw=psw, date=cli_date, client=cli, appointment_desc=apmt_desc, latitude=cli_lat, longitude=cli_lon, start_time=cli_start_time, end_time=cli_end_time)
                s.save()
                flag = True
                break

        upper_bound += 20

    if not flag:
        logging.debug("Suitable PSW couldn't be found")
                    

