<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flamarkt_order_tags', function (Blueprint $table) {
            $table->increments('id');
            $table->string('slug')->unique();
            $table->string('name')->index();
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->string('color')->nullable();
            $table->boolean('is_primary');
            $table->boolean('visible_customer');
            $table->boolean('notify_customer');
            $table->string('notify_subject')->nullable();
            $table->text('notify_message')->nullable();
            $table->timestamps();
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('flamarkt_order_tags');
    },
];
