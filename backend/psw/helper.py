from tracemalloc import start
from .models import PSW, ScheduleItem, Client
from django.db.models import F, Func, ExpressionWrapper, DecimalField

def schedule():
    class Sin(Func):
        function = 'SIN'

    class Cos(Func):
        function = 'COS'

    class Acos(Func):
        function = 'ACOS'

    class Radians(Func):
        function = 'RADIANS'

    cli = Client(name="John", address="Jane Street", description="needs help")
    cli_lat = 43.460628 # Client Latitude
    cli_lon = -80.516492 # Client Longitude
    cli_start_time = 48 # 12:00 - 1pm
    cli_end_time = 51 #12:45 - 1pm
    cli_date = '20220917'

    cli.save()

    radlat = Radians(cli_lat) 
    radlong = Radians(cli_lon) 
    radflat = Radians(F('latitude'))
    radflong = Radians(F('longitude'))

    Expression = 6371.0 * Acos(Cos(radlat) * Cos(radflat) *
                           Cos(radflong - radlong) +
                           Sin(radlat) * Sin(radflat))

    annotated_psws = PSW.objects.annotate(abs_calculation=ExpressionWrapper(Expression, output_field=DecimalField())).order_by('abs_calculation')

    print(annotated_psws)
    for psw in annotated_psws:
        print(psw.abs_calculation)

    potential_psws = annotated_psws.filter(abs_calculation__lt = 20)

    print(potential_psws)

    for psw in potential_psws:
        print("===%s's Schedule===" % psw.name)
        # print(psw._meta.fields)
        schedule = ScheduleItem.objects.filter(psw__name=psw.name, date=cli_date)

        if not schedule:
            continue
        for i, item in enumerate(schedule):
            print("Task #%d" % i)
            print("Starts at: %d:%02d" % ((item.start_time*15)//60, (item.start_time*15%60)))
            print("Ends at: %d:%02d" % ((item.end_time*15)//60, (item.end_time*15%60)))

        sorted_schedule = schedule.order_by('start_time')
        if len(sorted_schedule) == 0:
            available = True
        else:
            available = False

        for i in range(len(sorted_schedule)):
            # Iterates until the next job is later than the requested jobs end time
            if sorted_schedule[i].start_time > cli_end_time+1: 
                # Check if the job starts after the PSW's previous job
                if i-1 < 0 or sorted_schedule[i-1].end_time < cli_start_time -1:
                    available = True
        
        if available:
            s = ScheduleItem(psw=psw, date=cli_date, client=cli, latitude=cli_lat, longitude=cli_lon, start_time=cli_start_time, end_time=cli_end_time)
            s.save()
                    

