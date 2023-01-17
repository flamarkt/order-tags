<?php

namespace Flamarkt\OrderTags\Filter;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;
use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\SearchState;
use Illuminate\Database\Query\Builder;

class OrderTag extends AbstractRegexGambit implements FilterInterface
{
    protected function getGambitPattern(): string
    {
        return 'tag:(.+)';
    }

    protected function conditions(SearchState $search, array $matches, $negate)
    {
        $this->constrain($search->getQuery(), $matches[1], $negate);
    }

    public function getFilterKey(): string
    {
        return 'tag';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $this->constrain($filterState->getQuery(), $filterValue, $negate);
    }

    protected function constrain(Builder $query, $value, bool $negate)
    {
        $ids = explode(',', $value);

        // TODO: filter from slug, restrict to tags the customer can see

        $query->join('flamarkt_order_tag', 'flamarkt_order_tag.order_id', '=', 'flamarkt_orders.id')
            ->whereIn('flamarkt_order_tag.tag_id', $ids, 'and', $negate);
    }
}
