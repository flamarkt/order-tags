<?php

namespace Flamarkt\OrderTags\Filter;

use Flarum\Search\GambitInterface;
use Flarum\Search\SearchState;

class FulltextGambit implements GambitInterface
{
    public function apply(SearchState $search, $bit): void
    {
        // If no search token was passed, we want to return everything
        if (!$bit) {
            return;
        }

        $search->getQuery()->where('name', 'like', '%' . $bit . '%');
    }
}
