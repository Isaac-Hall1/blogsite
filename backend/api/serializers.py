from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Blog, Comment

class blogSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'created_at', 'author', 'upvotes']
        extra_kwargs = {'author': {'read_only': True}}

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only':True}}
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'content', 'author', 'created_at']
        extra_kwargs = {'author': {'read_only': True}}
