<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flamarkt_order_tag', function (Blueprint $table) {
            $table->unsignedInteger('order_id');
            $table->unsignedInteger('tag_id');
            $table->timestamps();

            $table->foreign('order_id')->references('id')->on('flamarkt_orders')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('flamarkt_order_tags')->onDelete('cascade');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('flamarkt_order_tag');
    },
];
