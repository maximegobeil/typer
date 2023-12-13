from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User
from . import models

# Register your models here.


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "password1", "password2", 'email'),
            },
        ),
    )


admin.site.register(models.Stat)
admin.site.register(models.Option)
admin.site.register(models.Snippet)
