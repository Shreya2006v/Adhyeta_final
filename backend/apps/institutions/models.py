from django.db import models

class College(models.Model):
    name = models.CharField(max_length=255, unique=True)
    principal_name = models.CharField(max_length=255, blank=True, null=True)
    principal_phone = models.CharField(max_length=50, blank=True, null=True)
    principal_email = models.EmailField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Branch(models.Model):
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='branches')
    name = models.CharField(max_length=255)
    hod_name = models.CharField(max_length=255, blank=True, null=True)
    hod_phone = models.CharField(max_length=50, blank=True, null=True)
    hod_email = models.EmailField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('college', 'name')

    def __str__(self):
        return f"{self.college.name} - {self.name}"
