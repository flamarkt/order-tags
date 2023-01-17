<?php

namespace Flamarkt\OrderTags;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;

/**
 * @property int $id
 * @property string $slug
 * @property string $name
 * @property string $description
 * @property string $icon
 * @property string $color
 * @property bool $is_primary
 * @property bool $visible_customer
 * @property bool $notify_customer
 * @property string $notify_subject
 * @property string $notify_message
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Tag extends AbstractModel
{
    use EventGeneratorTrait;
    use ScopeVisibilityTrait;

    public $timestamps = true;

    protected $casts = [
        'is_primary' => 'bool',
        'visible_customer' => 'bool',
        'notify_customer' => 'bool',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $table = 'flamarkt_order_tags';
}
