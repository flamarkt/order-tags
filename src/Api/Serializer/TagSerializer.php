<?php

namespace Flamarkt\OrderTags\Api\Serializer;

use Flamarkt\OrderTags\Tag;
use Flarum\Api\Serializer\AbstractSerializer;

class TagSerializer extends AbstractSerializer
{
    protected $type = 'flamarkt-order-tags';

    /**
     * @param Tag $tag
     * @return array
     */
    protected function getDefaultAttributes($tag): array
    {
        $attributes = [
            'name' => $tag->name,
        ];

        if ($this->actor->can('backoffice')) {
            $attributes += [
                'visibleCustomer' => $tag->visible_customer,
                'notifyCustomer' => $tag->notify_customer,
                'createdAt' => $this->formatDate($tag->created_at),
            ];
        }

        return $attributes;
    }
}
