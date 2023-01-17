<?php

namespace Flamarkt\OrderTags\Api\Serializer;

use Flamarkt\OrderTags\Tag;
use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Formatter\Formatter;

class TagSerializer extends AbstractSerializer
{
    protected $type = 'flamarkt-order-tags';

    public function __construct(
        protected Formatter $formatter
    )
    {
    }

    /**
     * @param Tag $tag
     * @return array
     */
    protected function getDefaultAttributes($tag): array
    {
        $attributes = [
            'slug' => $tag->slug,
            'name' => $tag->name,
            'descriptionHtml' => $tag->description ? $this->formatter->render($tag->description, null, $this->request) : null,
            'icon' => $tag->icon,
            'color' => $tag->color,
        ];

        if ($this->actor->can('backoffice')) {
            $attributes += [
                'description' => $tag->description ? $this->formatter->unparse($tag->description) : null,
                'isPrimary' => $tag->is_primary,
                'visibleCustomer' => $tag->visible_customer,
                'notifyCustomer' => $tag->notify_customer,
                'notifySubject' => $tag->notify_subject,
                'notifyMessage' => $tag->notify_message ? $this->formatter->unparse($tag->notify_message) : null,
                'createdAt' => $this->formatDate($tag->created_at),
            ];
        }

        return $attributes;
    }
}
