<?php

namespace Flamarkt\OrderTags\Notification;

use Carbon\Carbon;
use Flamarkt\Core\Notification\AbstractOrderUpdateBlueprint;
use Flamarkt\Core\Order\Order;
use Flamarkt\OrderTags\Tag;
use Flarum\Formatter\Formatter;
use Symfony\Contracts\Translation\TranslatorInterface;

class OrderTaggedBlueprint extends AbstractOrderUpdateBlueprint
{
    public function __construct(
        Order      $order,
        public Tag $tag
    )
    {
        parent::__construct($order);
    }

    public static function getType(): string
    {
        return 'orderTagged';
    }

    public function getData(): array
    {
        $translator = resolve(TranslatorInterface::class);

        return [
            // Ensure a new notification is sent if the tag is removed and re-added
            // Also necessary to ensure it sends for hidden tags that might have the same subject/message
            'date' => Carbon::now()->toW3cString(),
            'tag' => $this->tag->visible_customer ? $this->tag->slug : null,
            'subject' => $this->getEmailSubject($translator),
            'messageHtml' => $this->getEmailMessage($translator),
        ];
    }

    public function getEmailSubject(TranslatorInterface $translator): string
    {
        // TODO: replacement pattern for order number/date/etc
        if ($this->tag->notify_subject) {
            return $this->tag->notify_subject;
        }

        return parent::getEmailSubject($translator);
    }

    public function getEmailMessage(TranslatorInterface $translator): string
    {
        if ($this->tag->notify_message) {
            return resolve(Formatter::class)->render($this->tag->notify_message);
        }

        return parent::getEmailSubject($translator);
    }
}
