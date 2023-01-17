<?php

namespace Flamarkt\OrderTags;

use Flarum\Filter\AbstractFilterer;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class TagFilterer extends AbstractFilterer
{
    protected function getQuery(User $actor): Builder
    {
        return Tag::whereVisibleTo($actor);
    }
}
