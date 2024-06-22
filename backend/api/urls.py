from django.contrib import admin
from django.urls import path
from .views import blogPostCreate, totalBlogList, myBlogList, deleteBlog


urlpatterns = [
    path('blog/', blogPostCreate.as_view(), name = 'blog-creation'),
    path('blog/posts/', totalBlogList.as_view(), name = 'blog-list'),
    path('blog/myposts/', myBlogList.as_view(), name = 'blog-mylist'),
    path('blog/delete/<int:pk>/', deleteBlog.as_view(), name = 'delete-blog'),
]