<?php

namespace Flamarkt\OrderTags;

use Flarum\Foundation\AbstractValidator;

class TagValidator extends AbstractValidator
{
    protected ?Tag $tag = null;

    public function setTag(Tag $tag): void
    {
        $this->tag = $tag;
    }

    protected function getRules(): array
    {
        return [
            'name' => [
                'required',
                'min:1',
                'max:255',
            ],
        ];
    }
}
