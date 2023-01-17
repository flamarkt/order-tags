<?php

namespace Flamarkt\OrderTags;

use Flamarkt\OrderTags\Event\Deleted;
use Flamarkt\OrderTags\Event\Deleting;
use Flamarkt\OrderTags\Event\Saving;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

class TagRepository
{
    use DispatchEventsTrait;

    public function __construct(
        Dispatcher             $events,
        protected TagValidator $validator
    )
    {
        $this->events = $events;
    }

    public function query(): Builder
    {
        return Tag::query();
    }

    public function visibleTo(User $actor = null): Builder
    {
        $query = $this->query();

        if ($actor) {
            return $query->whereVisibleTo($actor);
        }

        return $query;
    }

    public function findOrFail($id, User $actor = null): Tag
    {
        return $this->visibleTo($actor)->findOrFail($id);
    }

    public function save(Tag $tag, User $actor, array $data): Tag
    {
        $attributes = Arr::get($data, 'attributes');

        $this->validator->assertValid($attributes);

        if (Arr::exists($attributes, 'name')) {
            $tag->name = (string)Arr::get($attributes, 'name');
        }

        if (Arr::exists($attributes, 'visibleCustomer')) {
            $tag->visible_customer = (bool)Arr::get($attributes, 'visibleCustomer');
        }

        if (Arr::exists($attributes, 'notifyCustomer')) {
            $tag->notify_customer = (bool)Arr::get($attributes, 'notifyCustomer');
        }

        $this->events->dispatch(new Saving($tag, $actor, $data));

        $tag->save();

        $this->dispatchEventsFor($tag, $actor);

        return $tag;
    }

    public function store(User $actor, array $data): Tag
    {
        $actor->assertCan('create', Tag::class);

        return $this->save(new Tag(), $actor, $data);
    }

    public function update(Tag $tag, User $actor, array $data): Tag
    {
        $actor->assertCan('edit', $tag);

        $this->validator->setTag($tag);

        return $this->save($tag, $actor, $data);
    }

    public function delete(Tag $tag, User $actor)
    {
        $actor->assertCan('delete', $tag);

        $this->events->dispatch(new Deleting($tag, $actor));

        $tag->delete();

        $this->events->dispatch(new Deleted($tag, $actor));
    }
}
