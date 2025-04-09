from django.db import models
from django.contrib.auth.models import User

class Notes(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    day = models.DateField()  # Chỉ lưu ngày, không cần giờ phút
    time_start = models.TimeField()  # Chỉ lưu giờ bắt đầu
    time_end = models.TimeField()  # Chỉ lưu giờ kết thúc
    tag = models.CharField(max_length=100, blank=True, null=True)  # Cho phép để trống
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Liên kết với User

    def __str__(self):
        return self.title
