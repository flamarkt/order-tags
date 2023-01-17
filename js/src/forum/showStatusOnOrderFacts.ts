import {extend} from 'flarum/common/extend';
import OrderFact from 'flamarkt/core/forum/components/OrderFact';
import OrderFacts from 'flamarkt/core/forum/components/OrderFacts';
import TagLabels from '../common/components/TagLabels';

export default function () {
    extend(OrderFacts.prototype, 'items', function (items) {
        items.add('tags', m(OrderFact, {
            title: 'Status',
            className: 'FlamarktOrderFact--tags',
        }, this.wrapContent(TagLabels.component({
            orderTags: this.attrs.order.tags(),
        }))), 150);
    });
}
