<?php

namespace Flamarkt\OrderTags;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;

/**
 * @property int $id
 * @property string $name
 * @property bool $visible_customer
 * @property bool $notify_customer
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Tag extends AbstractModel
{
    use EventGeneratorTrait;
    use ScopeVisibilityTrait;

    public $timestamps = true;

    protected $casts = [
        'visible_customer' => 'bool',
        'notify_customer' => 'bool',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $table = 'flamarkt_order_tags';
}
