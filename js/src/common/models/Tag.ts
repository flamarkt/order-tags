import Model from 'flarum/common/Model';

export default class Tag extends Model {
    slug = Model.attribute<string>('slug');
    name = Model.attribute<string>('name');
    description = Model.attribute<string | null>('description');
    descriptionHtml = Model.attribute<string | null>('descriptionHtml');
    icon = Model.attribute<string | null>('icon');
    color = Model.attribute<string | null>('color');
    isPrimary = Model.attribute<boolean | null>('isPrimary');
    visibleCustomer = Model.attribute<boolean | null>('visibleCustomer');
    notifyCustomer = Model.attribute<boolean | null>('notifyCustomer');
    notifySubject = Model.attribute<string | null>('notifySubject');
    notifyMessage = Model.attribute<string | null>('notifyMessage');

    apiEndpoint() {
        return '/flamarkt/order-tags' + (this.exists ? '/' + (this.data as any).id : '');
    }
}
