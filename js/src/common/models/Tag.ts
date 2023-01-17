import Model from 'flarum/common/Model';

export default class Tag extends Model {
    slug = Model.attribute<string>('slug');
    name = Model.attribute<string>('name');
    visibleCustomer = Model.attribute<boolean | null>('visibleCustomer');
    notifyCustomer = Model.attribute<boolean | null>('notifyCustomer');

    apiEndpoint() {
        return '/flamarkt/order-tags' + (this.exists ? '/' + (this.data as any).id : '');
    }
}
