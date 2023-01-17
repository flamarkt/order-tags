<?php

namespace Flamarkt\OrderTags;

use Flamarkt\Core\Api\Controller\OrderIndexController;
use Flamarkt\Core\Api\Controller\OrderShowController;
use Flamarkt\Core\Api\Controller\OrderStoreController;
use Flamarkt\Core\Api\Controller\OrderUpdateController;
use Flamarkt\Core\Api\Serializer\OrderSerializer;
use Flamarkt\Core\Order\Event\Saving;
use Flamarkt\Core\Order\Order;
use Flamarkt\Core\Order\OrderFilterer;
use Flamarkt\OrderTags\Api\Serializer\TagSerializer;
use Flarum\Extend;

return [
    (new Extend\Frontend('backoffice'))
        ->js(__DIR__ . '/js/dist/backoffice.js')
        ->css(__DIR__ . '/resources/less/backoffice.less')
        ->route('/order-tags', 'orderTags.index')
        ->route('/order-tags/{id:[0-9a-f-]+|new}', 'orderTags.show'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Routes('api'))
        ->get('/flamarkt/order-tags', 'flamarkt.orderTags.index', Api\Controller\TagIndexController::class)
        ->post('/flamarkt/order-tags', 'flamarkt.orderTags.store', Api\Controller\TagStoreController::class)
        ->get('/flamarkt/order-tags/{id:[0-9a-f-]+}', 'flamarkt.orderTags.show', Api\Controller\TagShowController::class)
        ->patch('/flamarkt/order-tags/{id:[0-9a-f-]+}', 'flamarkt.orderTags.update', Api\Controller\TagUpdateController::class)
        ->delete('/flamarkt/order-tags/{id:[0-9a-f-]+}', 'flamarkt.orderTags.delete', Api\Controller\TagDeleteController::class),

    (new Extend\Model(Order::class))
        ->relationship('tags', function (Order $order) {
            return $order->belongsToMany(Tag::class, 'flamarkt_order_tag')
                ->withTimestamps()
                ->orderBy('is_primary', 'desc')
                ->orderBy('name');
        }),

    (new Extend\ApiSerializer(OrderSerializer::class))
        ->hasMany('tags', TagSerializer::class),

    // TODO: visibility scope for included tags
    (new Extend\ApiController(OrderIndexController::class))
        ->addInclude('tags'),
    (new Extend\ApiController(OrderShowController::class))
        ->addInclude('tags'),
    (new Extend\ApiController(OrderUpdateController::class))
        ->addInclude('tags'),
    (new Extend\ApiController(OrderStoreController::class))
        ->addInclude('tags'),

    (new Extend\Event())
        ->listen(Saving::class, Listener\SaveOrder::class),

    // We don't really need this filter, but we need at least one to properly register the filterer in the system
    (new Extend\Filter(TagFilterer::class))
        ->addFilter(Filter\VisibleCustomer::class),

    (new Extend\Filter(OrderFilterer::class))
        ->addFilter(Filter\OrderTag::class),
];
