from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import render
from .serializers import userSerializer, blogSerailizer, CommentSerializer, UpvoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import F
from .models import Blog, Comment, Upvotes
from django.shortcuts import get_object_or_404

# Create your views here.
class UpvotesGet(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        upvotes = Upvotes.objects.filter(author=self.request.user)
        serializer = UpvoteSerializer(upvotes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ViewComments(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        post = request.query_params.get('post')
        try:
            blog = Blog.objects.get(id=int(post))
            comments = Comment.objects.filter(post=blog)
            serialzer = CommentSerializer(comments, many=True)
            return Response(serialzer.data, status=status.HTTP_200_OK)
        except Comment.DoesNotExist:
            return Response({'error': 'error loading comments'}, status=status.HTTP_404_NOT_FOUND)

class CreateComment(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = CommentSerializer(data=request.data)
        blog = Blog.objects.get(id=request.data.get('post'))
        if serializer.is_valid():
            serializer.save(post=blog, author=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': 'issue'}, status=status.HTTP_400_BAD_REQUEST)

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
        try:
            blog = Blog.objects.get(id=bId)
            user = self.request.user
            upvote, created = Upvotes.objects.get_or_create(author=user, blog=blog)
            if not created:
                if (vote == 1 and upvote.isUpvote) or(vote == -1 and not upvote.isUpvote):
                    upvote.delete()
                    Blog.objects.filter(id = bId).update(upvoteValue=F('upvoteValue')-vote)
                    return Response('unvoted', status=status.HTTP_202_ACCEPTED)
                vote *= 2
                upvote.isUpvote = not upvote.isUpvote
                upvote.save()
                Blog.objects.filter(id = bId).update(upvoteValue=F('upvoteValue')+vote)
                return Response('changed', status=status.HTTP_202_ACCEPTED)
            if(vote == -1):
                upvote.isUpvote = not upvote.isUpvote
                upvote.save()
            Blog.objects.filter(id = bId).update(upvoteValue=F('upvoteValue')+vote)
            return Response(f'{self.request.user.id}', status=status.HTTP_202_ACCEPTED)
        except Exception as error:
            return Response(error, status=status.HTTP_401_UNAUTHORIZED)

class SpecificBlog(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        blogId = request.GET.get('id')
        try:
            blog = Blog.objects.get(id=int(blogId))
            serializer = blogSerailizer(blog)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except (ValueError, ObjectDoesNotExist):
            return Response({'error': 'Blog not found'},status=status.HTTP_404_NOT_FOUND)

class MyBlogList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        blogs = request.user.blogs.all()
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
        blogs = Blog.objects.all()[::-1]
        serializer = blogSerailizer(blogs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BlogPostCreate(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = blogSerailizer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateUserView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        users = User.objects.get(id=request.GET.get('id'))
        serializer = userSerializer(users)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = userSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, pk): 
        try:
            #user = User.objects.get(id=pk)
            user = User.objects.all()
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        