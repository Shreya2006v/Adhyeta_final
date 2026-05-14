import os
import pandas as pd
from django.core.management.base import BaseCommand
from django.conf import settings
from apps.institutions.models import College, Branch

class Command(BaseCommand):
    help = 'Import colleges and branches from the excel file'

    def handle(self, *args, **options):
        file_path = os.path.join(settings.BASE_DIR.parent, 'engineering_colleges_complete_contacts.xlsx')
        
        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f"File not found: {file_path}"))
            return

        try:
            df = pd.read_excel(file_path)
            
            # Clean dataframe (fill NaN with empty string to avoid db null constraint issues on strings if any)
            df = df.fillna('')

            colleges_created = 0
            branches_created = 0

            for index, row in df.iterrows():
                college_name = str(row.get('College', '')).strip()
                if not college_name:
                    continue

                principal_name = str(row.get('Principal', '')).strip()
                principal_phone = str(row.get('Principal Phone', '')).strip()
                principal_email = str(row.get('Principal Email', '')).strip()

                # Get or Create College
                college, created = College.objects.get_or_create(
                    name=college_name,
                    defaults={
                        'principal_name': principal_name,
                        'principal_phone': principal_phone,
                        'principal_email': principal_email,
                    }
                )
                if created:
                    colleges_created += 1

                branch_name = str(row.get('Branch', '')).strip()
                if branch_name:
                    hod_name = str(row.get('HOD Name', '')).strip()
                    hod_phone = str(row.get('HOD Phone', '')).strip()
                    hod_email = str(row.get('HOD Email', '')).strip()

                    branch, b_created = Branch.objects.get_or_create(
                        college=college,
                        name=branch_name,
                        defaults={
                            'hod_name': hod_name,
                            'hod_phone': hod_phone,
                            'hod_email': hod_email,
                        }
                    )
                    if b_created:
                        branches_created += 1

            self.stdout.write(self.style.SUCCESS(
                f'Successfully imported {colleges_created} colleges and {branches_created} branches.'
            ))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error importing data: {e}"))
