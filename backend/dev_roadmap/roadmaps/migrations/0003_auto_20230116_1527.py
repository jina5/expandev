# Generated by Django 3.2.13 on 2023-01-16 06:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('roadmaps', '0002_alter_node_parent'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='node',
            name='parent',
        ),
        migrations.AddField(
            model_name='node',
            name='childs',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='parent', to='roadmaps.node'),
        ),
    ]
