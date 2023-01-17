<?php

namespace Flamarkt\OrderTags\Api\Controller;

use Flamarkt\OrderTags\Api\Serializer\TagSerializer;
use Flamarkt\OrderTags\TagRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class TagShowController extends AbstractShowController
{
    public $serializer = TagSerializer::class;

    public function __construct(
        protected TagRepository $repository
    )
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return $this->repository->findOrFail(Arr::get($request->getQueryParams(), 'id'), RequestUtil::getActor($request));
    }
}
