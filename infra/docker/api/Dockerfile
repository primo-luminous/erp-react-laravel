FROM php:8.3-fpm-alpine

# ext พื้นฐาน
RUN apk add --no-cache bash git libpq-dev oniguruma-dev libzip-dev zip unzip icu-dev \
 && docker-php-ext-install pdo pdo_pgsql mbstring zip intl

# composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# เพิ่ม opcache (แนะนำ)
RUN docker-php-ext-install opcache

# healthcheck friendly
EXPOSE 9000

# ถ้าอยาก optimize prod:
# RUN composer install --no-dev --optimize-autoloader
