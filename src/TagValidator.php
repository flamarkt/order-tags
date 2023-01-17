<?php

namespace Flamarkt\OrderTags;

use Flarum\Foundation\AbstractValidator;
use Illuminate\Validation\Rule;

class TagValidator extends AbstractValidator
{
    protected ?Tag $tag = null;

    public function setTag(Tag $tag): void
    {
        $this->tag = $tag;
    }

    protected function getRules(): array
    {
        $slugUnique = Rule::unique('flamarkt_order_tags', 'slug');

        if ($this->tag) {
            $slugUnique->ignoreModel($this->tag);
        }

        return [
            'slug' => [
                'required',
                'regex:/^[a-z0-9_-]+$/i',
                $slugUnique,
                'min:1',
                'max:30',
            ],
            'name' => [
                'required',
                'string',
                'min:1',
                'max:255',
            ],
            'description' => [
                'nullable',
                'string',
                'min:1',
                'max:20000',
            ],
            'icon' => [
                'nullable',
                'string',
                'min:1',
                'max:255',
            ],
            'color' => [
                'nullable',
                'string',
                'min:1',
                'max:255',
            ],
            'notifyTitle' => [
                'nullable',
                'string',
                'min:1',
                'max:255',
            ],
            'notifyMessage' => [
                'nullable',
                'string',
                'min:1',
                'max:20000',
            ],
        ];
    }
}
