<?php

namespace Flamarkt\OrderTags\Listener;

use Flamarkt\Core\Order\Event\Saving;
use Illuminate\Support\Arr;

class SaveOrder
{
    public function handle(Saving $event)
    {
        $relationships = (array)Arr::get($event->data, 'relationships');

        if (Arr::exists($relationships, 'tags')) {
            $event->actor->assertCan('backoffice');

            $ids = [];

            foreach ((array)Arr::get($relationships, 'tags.data') as $tagInfo) {
                $id = Arr::get($tagInfo, 'id');

                if ($id) {
                    $ids[] = $id;
                }
            }

            $event->order->afterSave(function ($order) use ($ids) {
                $order->tags()->sync($ids);
            });
        }
    }
}
