<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Companies Table - ข้อมูลบริษัท/องค์กร
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('website')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('tax_id')->nullable();
            $table->json('settings')->nullable(); // เก็บการตั้งค่าเฉพาะของบริษัท
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Departments Table - แผนกต่างๆ
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('code')->nullable();
            $table->text('description')->nullable();
            $table->foreignId('parent_id')->nullable()->constrained('departments')->onDelete('set null');
            $table->foreignId('manager_id')->nullable()->constrained('users')->onDelete('set null');
            $table->decimal('budget', 15, 2)->nullable();
            $table->json('settings')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['company_id', 'parent_id']);
        });

        // Users Table - ผู้ใช้ทั้งหมดในแพลตฟอร์ม
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->string('avatar')->nullable();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->foreignId('department_id')->nullable()->constrained()->onDelete('set null');
            $table->string('employee_id')->nullable(); // รหัสพนักงาน
            $table->string('position')->nullable(); // ตำแหน่งงาน
            $table->date('hire_date')->nullable(); // วันที่เข้าทำงาน
            $table->json('profile_data')->nullable(); // ข้อมูลเพิ่มเติม
            $table->json('preferences')->nullable(); // การตั้งค่าส่วนตัว
            $table->timestamp('last_login_at')->nullable();
            $table->string('last_login_ip')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_super_admin')->default(false);
            $table->timestamps();

            $table->index(['company_id', 'department_id']);
            $table->index(['email', 'is_active']);
        });

        // Roles Table - บทบาทต่างๆ
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('display_name');
            $table->text('description')->nullable();
            $table->string('module')->nullable(); // ระบบที่เกี่ยวข้อง เช่น 'erp', 'rental', 'classroom'
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->boolean('is_system_role')->default(false); // บทบาทระบบที่ไม่สามารถลบได้
            $table->json('metadata')->nullable(); // ข้อมูลเพิ่มเติม
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['name', 'company_id']);
            $table->index(['module', 'company_id']);
        });

        // Permissions Table - สิทธิ์ต่างๆ
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // เช่น 'erp.users.view', 'rental.bookings.create'
            $table->string('display_name');
            $table->text('description')->nullable();
            $table->string('module'); // ระบบที่เกี่ยวข้อง
            $table->string('resource'); // ทรัพยากร เช่น 'users', 'bookings'
            $table->string('action'); // การกระทำ เช่น 'view', 'create', 'edit', 'delete'
            $table->string('category')->nullable(); // หมวดหมู่ เช่น 'user_management', 'financial'
            $table->boolean('is_system_permission')->default(false);
            $table->json('metadata')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique('name');
            $table->index(['module', 'resource', 'action']);
            $table->index(['module', 'category']);
        });

        // Role Permissions Table - ความสัมพันธ์ระหว่างบทบาทและสิทธิ์
        Schema::create('role_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained()->onDelete('cascade');
            $table->foreignId('permission_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->unique(['role_id', 'permission_id']);
        });

        // User Roles Table - ความสัมพันธ์ระหว่างผู้ใช้และบทบาท
        Schema::create('user_roles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('role_id')->constrained()->onDelete('cascade');
            $table->foreignId('assigned_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('assigned_at')->useCurrent();
            $table->timestamp('expires_at')->nullable(); // สิทธิ์หมดอายุ
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'role_id']);
            $table->index(['user_id', 'expires_at']);
        });

        // System Registry Table - รายชื่อระบบทั้งหมดในแพลตฟอร์ม
        Schema::create('system_registry', function (Blueprint $table) {
            $table->id();
            $table->string('system_key')->unique(); // เช่น 'erp', 'rental', 'classroom'
            $table->string('name');
            $table->string('display_name');
            $table->text('description')->nullable();
            $table->string('version')->default('1.0.0');
            $table->string('icon')->nullable();
            $table->string('color')->default('#3B82F6');
            $table->string('url_prefix')->nullable(); // เช่น '/erp', '/rental'
            $table->string('api_base_url')->nullable(); // URL สำหรับ API
            $table->json('config')->nullable(); // การตั้งค่าเฉพาะของระบบ
            $table->json('permissions')->nullable(); // สิทธิ์ที่ระบบนี้ใช้
            $table->boolean('is_enabled')->default(true);
            $table->boolean('requires_auth')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Audit Logs Table - บันทึกการกระทำทั้งหมด
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('system_key')->nullable(); // ระบบที่เกิดการกระทำ
            $table->string('action'); // การกระทำ เช่น 'login', 'create', 'update', 'delete'
            $table->string('resource_type'); // ประเภททรัพยากร เช่น 'User', 'Role', 'Booking'
            $table->string('resource_id')->nullable(); // ID ของทรัพยากร
            $table->json('old_values')->nullable(); // ค่าเดิม (สำหรับ update/delete)
            $table->json('new_values')->nullable(); // ค่าใหม่ (สำหรับ create/update)
            $table->text('description')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->string('session_id')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamp('created_at');

            $table->index(['user_id', 'created_at']);
            $table->index(['system_key', 'created_at']);
            $table->index(['action', 'created_at']);
            $table->index(['resource_type', 'resource_id']);
        });

        // User Sessions Table - จัดการ session ของผู้ใช้
        Schema::create('user_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('session_id')->unique();
            $table->string('token_hash');
            $table->json('device_info')->nullable();
            $table->string('ip_address')->nullable();
            $table->timestamp('last_activity_at');
            $table->timestamp('expires_at');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['user_id', 'is_active']);
            $table->index(['expires_at']);
        });

        // System Settings Table - การตั้งค่าระบบ
        Schema::create('system_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('string'); // string, integer, boolean, json
            $table->string('category')->default('general');
            $table->text('description')->nullable();
            $table->boolean('is_public')->default(false); // แสดงใน frontend หรือไม่
            $table->boolean('is_encrypted')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('system_settings');
        Schema::dropIfExists('user_sessions');
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('system_registry');
        Schema::dropIfExists('user_roles');
        Schema::dropIfExists('role_permissions');
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('users');
        Schema::dropIfExists('departments');
        Schema::dropIfExists('companies');
    }
};
