import {extend} from 'flarum/common/extend';
import OrderIndexLayout from 'flamarkt/core/forum/layouts/OrderIndexLayout';
import TagLabels from '../common/components/TagLabels';

export default function () {
    extend(OrderIndexLayout.prototype, 'headerRow', function (columns) {
        columns.add('tags', m('th', 'Status'), 50);
    });

    extend(OrderIndexLayout.prototype, 'orderRow', function (columns, order) {
        columns.add('tags', m('td', TagLabels.component({
            orderTags: order.tags(),
        })), 50);
    });
}
