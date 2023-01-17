import {extend} from 'flarum/common/extend';
import OrderList from 'flamarkt/core/backoffice/components/OrderList';
import TagLabels from '../common/components/TagLabels';

export default function () {
    extend(OrderList.prototype, 'head', function (columns) {
        columns.add('tags', m('th', 'Tags'), 60);
    });

    extend(OrderList.prototype, 'columns', function (columns, order) {
        columns.add('tags', m('td', TagLabels.component({
            orderTags: order.tags(),
        })), 60);
    });
}
