import app from 'flamarkt/backoffice/backoffice/app';
import AbstractList from 'flamarkt/backoffice/backoffice/components/AbstractList';
import LinkButton from 'flarum/common/components/LinkButton';
import Tag from '../../common/models/Tag';

export default class TagList extends AbstractList<Tag> {
    head() {
        const columns = super.head();

        columns.add('name', m('th', 'Name'));

        return columns;
    }

    columns(tag: Tag) {
        const columns = super.columns(tag);

        columns.add('name', m('td', tag.name()), 10);

        return columns;
    }

    actions(tag: Tag) {
        const actions = super.actions(tag);

        actions.add('edit', LinkButton.component({
            className: 'Button Button--icon',
            icon: 'fas fa-pen',
            href: app.route('orderTags.show', {
                id: tag.id(),
            }),
        }));

        return actions;
    }
}
