<?php

namespace Flamarkt\OrderTags\Api\Controller;

use Flamarkt\OrderTags\Api\Serializer\TagSerializer;
use Flamarkt\OrderTags\TagRepository;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class TagStoreController extends AbstractCreateController
{
    public $serializer = TagSerializer::class;

    public function __construct(
        protected TagRepository $repository
    )
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return $this->repository->store(RequestUtil::getActor($request), (array)Arr::get($request->getParsedBody(), 'data'));
    }
}
