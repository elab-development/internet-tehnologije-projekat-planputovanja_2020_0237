<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNotNullConstraintToBudgetInPlanPutovanjasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('plan_putovanjas', function (Blueprint $table) {
            //
            $table->decimal('budget', 10, 2)->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('plan_putovanjas', function (Blueprint $table) {
            //
            $table->decimal('budget', 10, 2)->nullable()->change();
        });
    }
}
