from django.contrib import admin
from django.urls import path
from .views import BlogPostCreate, TotalBlogList, MyBlogList, DeleteBlog, UpdateUpvotes


urlpatterns = [
    path('blog/', BlogPostCreate.as_view(), name = 'blog-creation'),
    path('blog/posts/', TotalBlogList.as_view(), name = 'blog-list'),
    path('blog/myposts/', MyBlogList.as_view(), name = 'blog-mylist'),
    path('blog/delete/<int:pk>/', DeleteBlog.as_view(), name = 'delete-blog'),
    path('blog/posts/changeUpvote/', UpdateUpvotes.as_view(), name = 'change-upvote'),
]