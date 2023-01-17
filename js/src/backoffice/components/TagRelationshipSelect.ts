import app from 'flamarkt/backoffice/backoffice/app';
import AbstractRelationshipSelect from 'flamarkt/backoffice/common/components/AbstractRelationshipSelect';
import highlight from 'flarum/common/helpers/highlight';
import icon from 'flarum/common/helpers/icon';
import Tag from '../../common/models/Tag';

export default class TagRelationshipSelect extends AbstractRelationshipSelect<Tag> {
    protected resultsCache = new Map<string, Tag[]>();

    search(query: string) {
        if (!query) {
            m.redraw();
            return Promise.resolve();
        }

        return app.store
            .find<Tag[]>('flamarkt/order-tags', {
                filter: {q: query},
                page: {limit: 5},
            })
            .then((results) => {
                this.resultsCache.set(query, results);
                m.redraw();
            });
    }

    results(query: string) {
        if (!query) {
            return [];
        }

        query = query.toLowerCase();

        const results = this.resultsCache.get(query);

        // Indicates still loading
        if (typeof results === 'undefined') {
            return null;
        }

        return (results || [])
            .concat(
                app.store
                    .all<Tag>('flamarkt-order-tags')
                    .filter(tag => tag.name().toLowerCase().substr(0, query.length) === query)
            )
            .filter((e, i, arr) => arr.lastIndexOf(e) === i)
            .sort((a, b) => a.name().localeCompare(b.name()));
    }

    item(tag: Tag, query?: string) {
        const iconName = tag.icon();

        return [
            iconName ? [icon(iconName), ' '] : null,
            query ? highlight(tag.name(), query) : tag.name(),
        ];
    }
}
