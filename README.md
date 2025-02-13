## UserManagerWIthLaravel
# 1. Install Dependencies
composer install
npm install
# 2. Set Up the Environment File
cp .env.example .env
# 3.  Run Migrations and Seeders
php artisan migrate
php artisan db:seed
php artisan db:seed --class=RoleSeeder          
>> php artisan db:seed --class=PermissionSeeder
# 4. Compile Frontend Assets
npm run dev
npm run build
