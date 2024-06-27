from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import render
from .serializers import userSerializer, blogSerailizer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.db.models import F
from .models import Blog

# Create your views here.
class UpdateUpvotes(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        vote = request.data.get('vote')
        bId = request.data.get('blogId')
        try:
            vote = int(vote)
            bId = int(bId)
        except (ValueError, TypeError):
            return Response({'error': 'Invalid vote or blog id values'}, status=status.HTTP_400_BAD_REQUEST)
        blogs = Blog.objects.filter(id = bId).update(upvotes=F('upvotes')+vote)
        return Response(blogs.data, status=status.HTTP_202_ACCEPTED)


class MyBlogList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        blogs = Blog.objects.filter(author=self.request.user)
        serializer = blogSerailizer(blogs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteBlog(APIView):
    permission_classes = [AllowAny]
    def delete(self, request, pk):
        try:
            blog = Blog.objects.get(id=pk)
            blog.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Blog.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class TotalBlogList(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        blogs = Blog.objects.all()
        serializer = blogSerailizer(blogs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BlogPostCreate(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = blogSerailizer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateUserView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        users = User.objects.all()
        serializer = userSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = userSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteUserView(APIView):
    permission_classes = [AllowAny]
    def delete(self, request, pk): 
        try:
            user = User.objects.get(id=pk)
            user.delete
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        