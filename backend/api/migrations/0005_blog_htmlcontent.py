# Generated by Django 5.0.6 on 2024-07-20 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_rename_upvotes_blog_upvotevalue_upvotes'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='htmlContent',
            field=models.TextField(default=''),
        ),
    ]
