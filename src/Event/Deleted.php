<?php

namespace Flamarkt\OrderTags\Event;

use Flamarkt\OrderTags\Tag;
use Flarum\User\User;

class Deleted
{
    public function __construct(
        public Tag  $tag,
        public User $actor
    )
    {
    }
}
