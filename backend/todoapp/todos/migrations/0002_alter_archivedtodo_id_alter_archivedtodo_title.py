# Generated by Django 4.0.1 on 2022-05-22 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='archivedtodo',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='archivedtodo',
            name='title',
            field=models.CharField(max_length=50),
        ),
    ]
