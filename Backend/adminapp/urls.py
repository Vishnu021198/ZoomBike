from django.urls import path
from .views import (
    AdminLoginView,
    UserListView,
    admin_user_block,
    admin_user_unblock,
    OwnerListView
)
from . import views
urlpatterns = [
    path("admin-login/", AdminLoginView.as_view(), name="admin-login"),
    path("user-list/", UserListView.as_view(), name="user-list"),
    path("user/<int:pk>/block/",views.admin_user_block, name="user-list"),
    path("user/<int:pk>/unblock/",views.admin_user_unblock, name="user-list"),
    path("owner-list/", OwnerListView.as_view(), name="owner-list"),
]
