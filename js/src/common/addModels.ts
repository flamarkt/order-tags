import app from 'flarum/common/app';
import Model from 'flarum/common/Model';
import Order from 'flamarkt/core/common/models/Order';
import Tag from './models/Tag';

export default function () {
    app.store.models['flamarkt-order-tags'] = Tag;

    Order.prototype.tags = Model.hasMany<Tag>('tags');
}
