import {extend} from 'flarum/common/extend';
import OrderShowPage from 'flamarkt/core/backoffice/pages/OrderShowPage';
import Tag from '../common/models/Tag';
import TagRelationshipSelect from './components/TagRelationshipSelect';

export default function () {

    extend(OrderShowPage.prototype, 'show', function () {
        const tags = this.order!.tags();

        this.tags = Array.isArray(tags) ? tags.filter(tag => typeof tag !== 'undefined') as Tag[] : [];
    });

    extend(OrderShowPage.prototype, 'fields', function (fields) {
        fields.add('tags', m('.Form-group', [
            m('label', 'Tags'),
            TagRelationshipSelect.component({
                relationship: this.tags,
                onchange: (tags: Tag[]) => {
                    this.tags = tags;
                    this.dirty = true;
                },
            }),
        ]));
    });

    extend(OrderShowPage.prototype, 'data', function (data: any) {
        data.relationships = data.relationships || {};

        data.relationships.tags = this.tags;
    });
}
