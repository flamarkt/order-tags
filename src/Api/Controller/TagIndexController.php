<?php

namespace Flamarkt\OrderTags\Api\Controller;

use Flamarkt\OrderTags\Api\Serializer\TagSerializer;
use Flamarkt\OrderTags\TagFilterer;
use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\Http\UrlGenerator;
use Flarum\Query\QueryCriteria;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class TagIndexController extends AbstractListController
{
    public $serializer = TagSerializer::class;

    public $sortFields = [
        'name',
    ];

    public $sort = [
        'name' => 'asc',
    ];

    public function __construct(
        protected TagFilterer  $filterer,
        protected UrlGenerator $url
    )
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $filters = $this->extractFilter($request);
        $sort = $this->extractSort($request);

        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $include = $this->extractInclude($request);

        $criteria = new QueryCriteria($actor, $filters, $sort);
        $results = $this->filterer->filter($criteria, $limit, $offset);

        $document->addPaginationLinks(
            $this->url->to('api')->route('flamarkt.orderTags.index'),
            $request->getQueryParams(),
            $offset,
            $limit,
            $results->areMoreResults() ? null : 0
        );

        $this->loadRelations($results->getResults(), $include);

        return $results->getResults();
    }
}
