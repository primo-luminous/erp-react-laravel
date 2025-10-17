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
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('company_id')->nullable()->after('email');
            $table->unsignedBigInteger('department_id')->nullable()->after('company_id');
            $table->string('position')->nullable()->after('department_id');
            $table->string('employee_id')->nullable()->after('position');
            $table->boolean('is_active')->default(true)->after('employee_id');
            
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('set null');
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropForeign(['department_id']);
            $table->dropColumn(['company_id', 'department_id', 'position', 'employee_id', 'is_active']);
        });
    }
};
