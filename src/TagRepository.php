<?php

namespace Flamarkt\OrderTags;

use Flamarkt\OrderTags\Event\Deleted;
use Flamarkt\OrderTags\Event\Deleting;
use Flamarkt\OrderTags\Event\Saving;
use Flarum\Formatter\Formatter;
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
        protected TagValidator $validator,
        protected Formatter    $formatter
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
        $attributes = (array)Arr::get($data, 'attributes');

        // Ensure attributes on new model are validated
        if (!$tag->exists) {
            if (!Arr::exists($attributes, 'slug')) {
                $attributes['slug'] = '';
            }
            if (!Arr::exists($attributes, 'name')) {
                $attributes['name'] = '';
            }
        }

        $this->validator->assertValid($attributes);

        if (Arr::exists($attributes, 'slug')) {
            $tag->slug = (string)Arr::get($attributes, 'slug');
        }

        if (Arr::exists($attributes, 'name')) {
            $tag->name = (string)Arr::get($attributes, 'name');
        }

        if (Arr::exists($attributes, 'description')) {
            $description = (string)Arr::get($attributes, 'description');

            $tag->description = $description ? $this->formatter->parse($description) : null;
        }

        if (Arr::exists($attributes, 'icon')) {
            $tag->icon = trim((string)Arr::get($attributes, 'icon')) ?: null;
        }

        if (Arr::exists($attributes, 'color')) {
            $tag->color = trim((string)Arr::get($attributes, 'color')) ?: null;
        }

        if (Arr::exists($attributes, 'isPrimary')) {
            $tag->is_primary = (bool)Arr::get($attributes, 'isPrimary');
        }

        if (Arr::exists($attributes, 'visibleCustomer')) {
            $tag->visible_customer = (bool)Arr::get($attributes, 'visibleCustomer');
        }

        if (Arr::exists($attributes, 'notifyCustomer')) {
            $tag->notify_customer = (bool)Arr::get($attributes, 'notifyCustomer');
        }

        if (Arr::exists($attributes, 'notifySubject')) {
            $tag->notify_subject = trim((string)Arr::get($attributes, 'notifySubject')) ?: null;
        }

        if (Arr::exists($attributes, 'notifyMessage')) {
            $notifyMessage = (string)Arr::get($attributes, 'notifyMessage');

            $tag->notify_message = $notifyMessage ? $this->formatter->parse($notifyMessage) : null;
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
