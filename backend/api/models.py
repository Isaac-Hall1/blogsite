from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=80)
    content = models.TextField()
    htmlContent = models.TextField(default='')
    created_at = models.DateTimeField(auto_now_add=True)
    upvoteValue = models.IntegerField(default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blogs')

    def __str__(self):
        return self.title
    
class Comment(models.Model):
    post = models.ForeignKey(Blog, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.post
    
class Upvotes(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    isUpvote = models.BooleanField(default=True)

    class Meta:
        unique_together = ('author', 'blog')

    def __str__(self):
        return self.post