<?php

namespace Flamarkt\OrderTags;

use Flarum\Search\AbstractSearcher;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class TagSearcher extends AbstractSearcher
{
    protected function getQuery(User $actor): Builder
    {
        return Tag::whereVisibleTo($actor);
    }
}
