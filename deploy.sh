# Kéo các thay đổi mới nhất từ repository
git pull origin main

# Xây dựng lại các container Docker
docker-compose down
docker-compose build
docker-compose up -d 

# In ra thông báo hoàn tất
echo "Triển khai hoàn tất thành công!"