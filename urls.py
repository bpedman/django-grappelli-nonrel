from django.conf.urls.defaults import *

urlpatterns = patterns('',
    
    # SHORTCUTS
    (r'^bookmark/add/$', 'grappelli.views.bookmarks.add_bookmark'),
    (r'^bookmark/remove/$', 'grappelli.views.bookmarks.remove_bookmark'),
    
    # HELP
    (r'^help/(?P<object_id>\d+)/$', 'grappelli.views.help.detail'),
    (r'^help', 'grappelli.views.help.help'),
    
    # GENERIC
    (r'^obj_lookup/$', 'grappelli.views.generic.generic_lookup'),
    
    # FOREIGNKEY LOOKUP
    (r'^related_lookup/$', 'grappelli.views.related.related_lookup'),
    
)