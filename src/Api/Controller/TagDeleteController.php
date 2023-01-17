<?php

namespace Flamarkt\OrderTags\Api\Controller;

use Flamarkt\OrderTags\TagRepository;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class TagDeleteController extends AbstractDeleteController
{
    public function __construct(
        protected TagRepository $repository
    )
    {
    }

    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);

        $tag = $this->repository->findOrFail(Arr::get($request->getQueryParams(), 'id'), $actor);

        $this->repository->delete($tag, $actor);
    }
}
