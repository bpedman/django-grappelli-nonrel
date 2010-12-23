.. |grappelli| replace:: Grappelli
.. |filebrowser| replace:: FileBrowser

.. _dashboard_setup:

Dashboard Setup
===============

**New in Grappelli 1.3:** Please see :ref:`Release Notes <releasenotes>`.

With the Django Admin-Interface, the admin index page reflects the structure of your applications/models. With ``grappelli.dashboard`` you are able to change that structure and rearrange (or group) apps and models.

.. note::
    ``grappelli.dashboard`` is a simplified version of `Django Admin Tools <http://packages.python.org/django-admin-tools/>`_: Bookmarks, Menus and the custom App-Index are not available with Grappelli.

Add ``grappelli.dashboard`` to your Installed Apps
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Open settings.py and add ``grappelli.dashboard`` to your ``INSTALLED_APPS``::

    INSTALLED_APPS = (
        'grappelli.dashboard',
        'grappelli', # required
        'filebrowser', # optional
        'django.contrib.admin', # required
    )

.. note::
    It's important that ``grappelli.dashboard`` is listed before ``grappelli`` and before ``django.contrib.admin``.

Create a custom Dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^

To customize the index and app index dashboards, the first step is to do
the following::
    
    python manage.py customdashboard

This will create a file named ``dashboard.py`` in your project directory.
If for some reason you want another file name, you can do::

    python manage.py customdashboard somefile.py

The created file contains the class ``CustomIndexDashboard`` that corresponds to the admin index page dashboard.

ow you need to tell django-admin-tools to use your custom dashboard(s).
Open your settings.py file and add the following::

    ADMIN_TOOLS_INDEX_DASHBOARD = 'yourproject.dashboard.CustomIndexDashboard'

If you only want a custom index dashboard, you would just need the first
line. Obviously, you need to change "yourproject" to the real project name, 
if you have chosen a different file name or if you renamed the dashboard
classes, you'll also need to change the above string to reflect your 
modifications.

At this point the dashboards displayed in the index and the app index 
should be your custom dashboards, now you can read XXX 
to learn how to create your custom dashboard.

Create custom Dashboards for multiple admin sites
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In the following example we will assume that you have two admin site
instances: the default django admin site and a custom admin site of your
own. In your urls, you should have something like this::

    from django.conf.urls.defaults import *
    from django.contrib import admin
    from yourproject.admin import admin_site

    admin.autodiscover()

    urlpatterns = patterns('',
        (r'^admin/', include(admin.site.urls)),
        (r'^myadmin/', include(admin_site.urls)),
    )

Now to configure your dashboards, you could do::

    python manage.py customdashboard django_admin_dashboard.py
    python manage.py customdashboard my_admin_dashboard.py

And to tell django-admin-tools to use your custom dashboards depending on
the admin site being used, you just have to add the following to your project
settings file::

    ADMIN_TOOLS_INDEX_DASHBOARD = {
        'django.contrib.admin.site': 'yourproject.django_admin_dashboard.CustomIndexDashboard',
        'yourproject.admin.admin_site': 'yourproject.my_admin_dashboard.CustomIndexDashboard',
    }

Note that the same applies for the ``ADMIN_TOOLS_APP_INDEX_DASHBOARD``
settings variable.


