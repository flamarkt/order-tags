<?php

namespace Flamarkt\OrderTags\Filter;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;

class VisibleCustomer implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'visible';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $filterState->getQuery()->where('flamarkt_order_tags.visible_customer', $negate ? '!=' : '=', $filterValue);
    }
}
