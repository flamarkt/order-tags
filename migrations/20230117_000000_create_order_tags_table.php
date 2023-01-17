<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flamarkt_order_tags', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->index();
            $table->boolean('visible_customer');
            $table->boolean('notify_customer');
            $table->timestamps();
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('flamarkt_order_tags');
    },
];
