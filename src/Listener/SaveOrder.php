<?php

namespace Flamarkt\OrderTags\Listener;

use Flamarkt\Core\Order\Event\Saving;
use Flamarkt\Core\Order\Order;
use Flamarkt\OrderTags\Notification\OrderTaggedBlueprint;
use Flamarkt\OrderTags\Tag;
use Flarum\Notification\NotificationSyncer;
use Illuminate\Support\Arr;

class SaveOrder
{
    public function __construct(
        protected NotificationSyncer $notifications
    )
    {
    }

    public function handle(Saving $event): void
    {
        $relationships = (array)Arr::get($event->data, 'relationships');

        if (Arr::exists($relationships, 'tags')) {
            $event->actor->assertCan('backoffice');

            $existingTags = $event->order->tags->pluck('id')->all();

            $ids = [];
            $newIds = [];

            foreach ((array)Arr::get($relationships, 'tags.data') as $tagInfo) {
                $id = Arr::get($tagInfo, 'id');

                if ($id) {
                    $ids[] = $id;

                    if (!in_array($id, $existingTags)) {
                        $newIds[] = $id;
                    }
                }
            }

            $event->order->afterSave(function (Order $order) use ($ids, $newIds) {
                $order->tags()->sync($ids);

                if (!$order->user) {
                    return;
                }

                Tag::query()
                    ->whereIn('id', $newIds)
                    ->where('notify_customer', '1')
                    ->each(function ($tag) use ($order) {
                        $this->notifications->sync(
                            new OrderTaggedBlueprint($order, $tag),
                            [$order->user]
                        );
                    });
            });
        }
    }
}
