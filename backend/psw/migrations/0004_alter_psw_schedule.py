# Generated by Django 4.1.1 on 2022-09-17 14:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('psw', '0003_alter_psw_schedule'),
    ]

    operations = [
        migrations.AlterField(
            model_name='psw',
            name='schedule',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='psw.scheduleitem'),
        ),
    ]
